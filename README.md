# PDFly - Convert DOC to PDF

PDFly is a web application for converting DOC files into secure PDFs, leveraging modern web technologies. Easily upload DOC files, convert them into PDFs, and apply password protection.
![image](https://github.com/user-attachments/assets/1d01f63c-003b-4199-b303-e8a463bbe9ee)
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
 - Go to http://localhost:3000.
 - Use the Choose File button to upload your .doc or .docx file.
   ![image](https://github.com/user-attachments/assets/0ae8f157-96ed-4636-b381-eadc62b5a406)
 - If the File is of other Format
    ![image](https://github.com/user-attachments/assets/3a133899-3ad2-4ca7-9696-7cef61bdc464)
  

3. Convert to PDF:
 - Click the Convert button to process your document.
 - If there is any error from the Backend
   ![image](https://github.com/user-attachments/assets/9c3b26d7-21ac-4ceb-84a2-faa32d53f400)
 - If the File Uploads successfully
   ![image](https://github.com/user-attachments/assets/15f79d91-f02c-452f-940e-b5a0376fd51f)
4. Download PDF:
 - Allow Pop-ups
   ![image](https://github.com/user-attachments/assets/c08c7a4f-feef-4d3a-b1f3-bac2b2724eaa)
- After conversion, click the Download button to save your file.
