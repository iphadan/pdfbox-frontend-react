


// import React, { useRef, useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const FillablePDF = () => {
//     const [pdfUrl, setPdfUrl] = useState('/assets/templateFillable.pdf');
//     const [pdfBytes, setPdfBytes] = useState(null); // Store the filled PDF bytes
//     const fileInputRef = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileReader = new FileReader();
//             fileReader.onload = async () => {
//                 const typedArray = new Uint8Array(fileReader.result);
//                 const pdfDoc = await PDFDocument.load(typedArray);

//                 // Modify the form fields
//                 const form = pdfDoc.getForm();

//                 // const textField = form.getTextField('yourFieldName'); // Replace with actual field name
//                 // textField.setText('Sample Text'); // Example: Fill a text field

//                 const pdfBytes = await pdfDoc.save();
//                 setPdfBytes(pdfBytes); // Store the filled PDF bytes

//                 // Create a URL for the filled PDF
//                 const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
//                 const pdfUrl = URL.createObjectURL(pdfBlob);
//                 setPdfUrl(pdfUrl);
//             };
//             fileReader.readAsArrayBuffer(file);
//         }
//     };

//     const downloadPdf = () => {
//         if (pdfBytes) {
//             const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = 'filled-form.pdf';
//             link.click();
//         } else {
//             alert('No PDF to download. Please fill a PDF first.');
//         }
//     };

//     return (
//         <div>
//             <h1>Fillable PDF</h1>
//             <input
//                 type="file"
//                 accept="application/pdf"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//             />
//             <iframe
//                 src={pdfUrl}
//                 width="100%"
//                 height="600px"
//                 style={{ border: '1px solid black' }}
//             ></iframe>
//             <br />
//             <button onClick={downloadPdf}>Download Filled PDF</button>
//         </div>
//     );
// };









import React, { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const FillablePDF = () => {
    const [pdfUrl, setPdfUrl] = useState('/assets/templateFillable.pdf');
    const [pdfBytes, setPdfBytes] = useState(null); // Store the filled PDF bytes
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const typedArray = new Uint8Array(fileReader.result);
                const pdfDoc = await PDFDocument.load(typedArray);

                // Modify the form fields (Example: Fill a text field)
                const form = pdfDoc.getForm();
                // Example: const textField = form.getTextField('yourFieldName');
                // textField.setText('Sample Text'); 

                const pdfBytes = await pdfDoc.save();
                setPdfBytes(pdfBytes); // Store the filled PDF bytes

                // Create a URL for the filled PDF
                const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfUrl);
            };
            fileReader.readAsArrayBuffer(file);
            
        }
    };

    const sendFormDataToBackend = async () => {
        if (!pdfBytes) {
            alert('No PDF loaded. Please load a PDF first.');
            return;
        }
    
        // Load the PDF with pdf-lib
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
    
        // Initialize the form data object
        const formData = {};
    
        // Extract field names and values
        fields.forEach((field) => {
            const name = field.getName();
            let value;
    
            if (field.getType === 'Text') {
                value = field.getText;
            } else if (field.getType === 'Checkbox') {
                value = field.isChecked();
            } else if (field.getType === 'Dropdown') {
                value = field.getSelected();
            } else {
                value = field.getText(); // Default to getText for other field types
            }
    
            // Assign to form data object
            formData[name] = value || '(empty)';
        });
    
        // Debug: Log extracted data
        console.log('Extracted Form Data:', formData);
    
        // Send JSON to the backend
        try {
            const response = await fetch('http://localhost:8080/api/pdf/form-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                console.log('Form data successfully sent to the backend!');
                alert('Form data sent successfully!');
            } else {
                console.error('Error sending form data:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };
    
    const downloadPdf = () => {
        if (pdfBytes) {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'filled-form.pdf';
            link.click();
        } else {
            alert('No PDF to download. Please fill a PDF first.');
        }
    };

    return (
        <div>
            <h1>Fillable PDF</h1>
            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                style={{ border: '1px solid black' }}
            ></iframe>
            <br />
            <button onClick={downloadPdf}>Download Filled PDF</button>
            <button onClick={sendFormDataToBackend}>Send Form Data</button>
        </div>
    );
};

export default FillablePDF;
