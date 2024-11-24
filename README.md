# PDFly - Convert DOC to PDF

PDFly is a web application for converting DOC files into secure PDFs, leveraging modern web technologies. Easily upload DOC files, convert them into PDFs, and apply password protection.

---

## Features
- **Upload and Convert**: Transform `.doc` or `.docx` files into PDF format.
- **Secure Your PDF**: Add password protection to your converted PDF.
- **Download with Ease**: Save the secure PDF to your local machine.

---

## Installation

### Prerequisites
Ensure the following are installed:
- **Git**
- **Node.js** (v16+)
- **Docker** (optional for containerized deployment)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/TINOREJI/PDFly.git
   cd PDFly
   cd client
   ```
2. Install dependencies for client and server:
   ```bash
   npm install
   cd ../server
   npm install
   ```
3. Start the application:
   Start the client:
   ```bash
   cd ../client
   npm run dev
   ```
   Start the server:
   ```bash
   cd ../server
   npm start
   ```
4. Access the app: Open your browser and go to http://localhost:3000.

## Using
1. Upload a Document:
   Go to http://localhost:3000.
   Use the Choose File button to upload your .doc or .docx file.
2. Convert to PDF:
   Click the Convert button to process your document.
   (Optional) Add a password to secure your PDF.
3. Download PDF:
   After conversion, click the Download button to save your file.
