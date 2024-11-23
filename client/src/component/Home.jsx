import React, { useState, useRef } from "react";
import { renderAsync } from "docx-preview";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState(""); // Password state
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [error, setError] = useState("");
  const viewerRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const isValidFileType =
        fileType === "application/msword" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (!isValidFileType) {
        setError("Please upload a valid .doc or .docx file.");
        setSelectedFile(null); // Reset the selected file if it's invalid
        return;
      }

      setSelectedFile(file);
      setIsButtonActive(true);

      try {
        const arrayBuffer = await file.arrayBuffer();
        viewerRef.current.innerHTML = "";
        await renderAsync(arrayBuffer, viewerRef.current);
      } catch (err) {
        console.error("Error rendering the document:", err);
        setError("An error occurred while rendering the document.");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please Select a File!");
      return;
    }

    const formData = new FormData();
    formData.append("docFile", selectedFile);
    formData.append("password", password); // Include the password

    try {
      const response = await fetch("http://localhost:3000/docxtopdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading file.");
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);

      // Open PDF in a new window
      const newWindow = window.open(pdfUrl, "_blank");

      // Add a download button to the new window
      const downloadButton = newWindow.document.createElement("button");
      downloadButton.innerHTML = "Download PDF";
      downloadButton.onclick = () => {
        const link = newWindow.document.createElement("a");
        link.href = pdfUrl;
        link.download = `${selectedFile.name}.pdf`;
        link.click();
      };
      newWindow.document.body.appendChild(downloadButton);
    } catch (err) {
      console.error("Error uploading or converting the file:", err);
      setError("An error occurred while uploading or converting the file.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-10 py-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        <div className={`flex flex-col items-center justify-center w-full ${selectedFile ? 'md:w-1/2' : 'block'}`}>
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-10">Upload Your Document</h1>
          <div className="w-96 h-96 border-4 border-dashed border-purple-800 flex items-center justify-center bg-white rounded-lg">
            <label htmlFor="fileInput" className="flex flex-col items-center justify-center cursor-pointer">
              {/* Image Instead of SVG */}
              <img src="/images/docx.png" alt="PDF icon" className="w-16 h-16 mb-2" />
              <input
                id="fileInput"
                type="file"
                accept=".doc, .docx"
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile ? (
                <p className="text-purple-800 font-medium">{selectedFile.name}</p>
              ) : (
                <p className="text-gray-500 font-semibold">Click to select a .docx file</p>
              )}
            </label>
          </div>

          {/* Password input field */}
          <input
            type="password"
            placeholder="Enter password (Optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 px-8 py-2 border border-purple-800 rounded-md"
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`mt-4 px-8 py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
              isButtonActive
                ? "bg-purple-800 text-white hover:bg-purple-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Upload
          </button>
        </div>

        <div ref={viewerRef} className={`w-full md:w-1/2 h-[600px] bg-white shadow-xl rounded-lg p-4 overflow-auto transition-all ease-in-out duration-300 ${selectedFile ? "block" : "hidden"}`}>
          {!selectedFile && <p className="text-gray-500 text-center">No file selected</p>}
        </div>
      </div>

      {error && <p className="text-danger text-center mt-4">{error}</p>}
    </div>
  );
}

export default Home;
