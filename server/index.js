import express from "express";
import multer from "multer";
import qpdf from "node-qpdf"; 
import pdfly from "docx-pdf";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Setup directories
const uploadDir = path.join(__dirname, "file_uploaded");
const outputDir = path.join(__dirname, "files_converted");
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Endpoint for DOCX to PDF conversion
app.post("/docxtopdf", upload.single("docFile"), (req, res) => {
  const file = req.file;
  const password = req.body.password;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file." });
  }

  const inputPath = file.path;
  const outputPdfName = `${path.parse(file.originalname).name}.pdf`;
  const outputPath = path.join(outputDir, outputPdfName);

  // Convert DOCX to PDF
  pdfly(inputPath, outputPath, async (err) => {
    if (err) {
      console.error("Error during conversion:", err);
      return res.status(500).json({ message: "Error converting DOCX to PDF." });
    }

    try {
      // Apply password protection if password is provided
      if (password && password.length >= 4) {
        const encryptedPath = path.join(outputDir, `protected_${outputPdfName}`);
        const options = {
          keyLength: 128,
          password: password,
          restrictions: {
            print: 'low',   // Restricts printing to low quality
            useAes: 'y'     // Use AES encryption
          }
        };

        // Encrypt the PDF using qpdf
        await qpdf.encrypt(outputPath, options, encryptedPath);

        // Send encrypted PDF as download
        return res.download(encryptedPath, () => {
          // Cleanup temporary files
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
          fs.unlinkSync(encryptedPath);
        });
      } else {
        // Send unprotected PDF
        return res.download(outputPath, () => {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        });
      }
    } catch (encryptionError) {
      console.error("Error during encryption:", encryptionError);
      return res.status(500).json({ message: "Error applying password protection." });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
