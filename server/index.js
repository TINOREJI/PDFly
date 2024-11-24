import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { convert } from "libreoffice";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT||3000;

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
app.post("/docxtopdf", upload.single("docFile"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file." });
  }

  const inputPath = file.path;
  const outputPdfName = `${path.parse(file.originalname).name}.pdf`;
  const outputPath = path.join(outputDir, outputPdfName);

  try {
    // Read file and convert to PDF
    const docBuffer = await fs.promises.readFile(inputPath);
    const pdfBuffer = await new Promise((resolve, reject) => {
      convert(docBuffer, "pdf", undefined, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Write converted PDF to output directory
    await fs.promises.writeFile(outputPath, pdfBuffer);

    // Send the PDF as a downloadable response
    res.download(outputPath, () => {
      // Cleanup temporary files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error("Error during conversion:", err);
    res.status(500).json({ message: "Error converting DOCX to PDF." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
