


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


//  export default FillablePDF;






// import React, { useRef, useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const FillablePDF = () => {
//     const [pdfUrl, setPdfUrl] = useState('/assets/templateFillable.pdf');
//     const [pdfBytes, setPdfBytes] = useState(null); // Store the filled PDF bytes
//     const fileInputRef = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[1];
//         if (file) {
//             const fileReader = new FileReader();
//             fileReader.onload = async () => {
//                 const typedArray = new Uint8Array(fileReader.result);
//                 const pdfDoc = await PDFDocument.load(typedArray);
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

//     const sendFormDataToBackend = async () => {
//         if (!pdfBytes) {
//             alert('No PDF loaded. Please load a PDF first.');
//             return;
//         }
    
//         // Load the PDF with pdf-lib
//         const pdfDoc = await PDFDocument.load(pdfBytes);
//         const form = pdfDoc.getForm();
//         const fields = form.getFields();
    
//         // Initialize the form data object
//         const formData = {};
    
//         // Extract field names and values
//         fields.forEach((field) => {
//             const name = field.getName();
//             let value;
    
//             if (field.getType === 'Text') {
//                 value = field.getText;
//             } else if (field.getType === 'Checkbox') {
//                 value = field.isChecked();
//             } else if (field.getType === 'Dropdown') {
//                 value = field.getSelected();
//             } else {
//                 value = field.getText(); // Default to getText for other field types
//             }
    
//             // Assign to form data object
//             formData[name] = value || '(empty)';
//         });
    
//         // Debug: Log extracted data
//         console.log('Extracted Form Data:', formData);
    
//         // Send JSON to the backend
//         try {
//             const response = await fetch('http://localhost:8080/api/pdf/form-data', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
    
//             if (response.ok) {
//                 console.log('Form data successfully sent to the backend!');
//                 alert('Form data sent successfully!');
//             } else {
//                 console.error('Error sending form data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
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
//             <button onClick={sendFormDataToBackend}>Send Form Data</button>
//         </div>
//     );
// };

// export default FillablePDF;



// import React, { useState, useRef } from 'react';
// import { PDFDocument, rgb } from 'pdf-lib';
// import axios from 'axios';

// const FillableEditor = () => {
//     const [pdfBytes, setPdfBytes] = useState(null);
//     const [formFields, setFormFields] = useState([]);
//     const pdfContainerRef = useRef(null);

//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const typedArray = new Uint8Array(await file.arrayBuffer());
//             const pdfDoc = await PDFDocument.load(typedArray);

//             // Get form fields
//             const form = pdfDoc.getForm();
//             const fields = form.getFields();

//             const fieldData = fields.map((field) => ({
//                 name: field.getName(),
//                 value: field.acroField.getValue()|| '',
//             }));

//             setFormFields(fieldData);

//             // Save updated PDF for rendering
//             const updatedPdfBytes = await pdfDoc.save();
//             setPdfBytes(updatedPdfBytes);
//         }
//     };

//     const handleFieldChange = (pdfBytes) => {
//         // console.log("handle chnage",name,value);
//         // const updatedFields = formFields.map((field) =>
//         //     field.name === name ? { ...field, value } : field
//         // );
//         // setFormFields(updatedFields);
//         setPdfBytes(pdfBytes);
//         console.log("pdfBytes",pdfBytes);
//     };

//     const sendToBackend = async () => {
//         const jsonPayload = formFields.reduce((acc, field) => {
//             acc[field.name] = field.value;
//             return acc;
//         }, {});

//         try {
//             // const response = await axios.post('http://localhost:8080/api/pdf/form-data', jsonPayload, {
//             //     headers: { 'Content-Type': 'application/json' },
//             // });
//             console.log('Form data sent successfully!');
            
//         } catch (error) {
//             console.error('Error sending form data:', error);
//         }
//     };

//     const renderPdfWithInputs = () => {
//         if (!pdfBytes || !formFields.length) return null;

//         return (
//             <div style={{ position: 'relative', width: '100%', height: '600px', marginTop: '20px' }}>
//                 <embed
//                     src={URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))}
//                     type="application/pdf"
//                     width="100%"
//                     height="100%"
//                     onChange={(pdfBytes) => handleFieldChange(pdfBytes)}

//                 />
                
//             </div>
//         );
//     };

//     return (
//         <div>
//             <h1>Fillable PDF Editor</h1>
//             <input type="file" accept="application/pdf" onChange={handleFileUpload} />
//             {renderPdfWithInputs()}
//             <button style={{ marginTop: '20px' }} onClick={sendToBackend}>
//                 Send to Backend
//             </button>
//         </div>
//     );
// };

// export default FillableEditor;



// import React, { useRef, useState } from 'react';
// import {
//     PDFDocument,
//     PDFTextField,
//     PDFCheckBox,
//     PDFDropdown,
//     PDFRadioGroup,
// } from 'pdf-lib';

// const FillableEditor = () => {
//     const [pdfUrl, setPdfUrl] = useState('');
//     const [formData, setFormData] = useState({});
//     const fileInputRef = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileReader = new FileReader();
//             fileReader.onload = async () => {
//                 const typedArray = new Uint8Array(fileReader.result);
//                 const pdfDoc = await PDFDocument.load(typedArray);

//                 const form = pdfDoc.getForm();
//                 const fields = form.getFields();

//                 // Initialize formData state with field names and empty values
//                 const initialFormData = {};
//                 fields.forEach((field) => {
//                     initialFormData[field.getName()] = '';
//                 });
//                 setFormData(initialFormData);

//                 // Create a URL for the uploaded PDF
//                 const pdfBlob = new Blob([typedArray], { type: 'application/pdf' });
//                 const pdfUrl = URL.createObjectURL(pdfBlob);
//                 setPdfUrl(pdfUrl);
//             };
//             fileReader.readAsArrayBuffer(file);
//         }
//     };

//     const handleInputChange = (name, value) => {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const sendFormDataToBackend = async () => {
//         if (!Object.keys(formData).length) {
//             alert('No PDF loaded. Please load a PDF first.');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:8080/api/pdf/form-data', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 console.log('Form data successfully sent to the backend!');
//                 alert('Form data sent successfully!');
//             } else {
//                 console.error('Error sending form data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
//         }
//     };

//     const renderFormInputs = () => {
//         return Object.keys(formData).map((name) => (
//             <input
//                 key={name}
//                 type="text"
//                 placeholder={name}
//                 value={formData[name]}
//                 onChange={(e) => handleInputChange(name, e.target.value)}
//             />
//         ));
//     };

//     return (
//         <div className='FillableComponent'>
//             <h1>Fillable PDF</h1>
//             <input
//                 type="file"
//                 accept="application/pdf"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//             />
//             {pdfUrl && (
//                 <iframe
//                     src={pdfUrl}
//                     width="100%"
//                     height="600px"
//                     style={{ border: '1px solid black' }}
//                     headers ='none'
//                 ></iframe>
//             )}
//             <br />
//             {renderFormInputs()}
//             <button onClick={sendFormDataToBackend}>Send to Backend</button>
//         </div>
//     );
// };

// export default FillableEditor;

// import React, { useRef, useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const FillableEditor = () => {
//     const [pdfUrl, setPdfUrl] = useState('');
//     const [formData, setFormData] = useState({});
//     const [pdfDoc, setPdfDoc] = useState(null);
//     const fileInputRef = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileReader = new FileReader();
//             fileReader.onload = async () => {
//                 const typedArray = new Uint8Array(fileReader.result);
//                 const pdfDoc = await PDFDocument.load(typedArray);
//                 setPdfDoc(pdfDoc);

//                 const form = pdfDoc.getForm();
//                 const fields = form.getFields();

//                 const initialFormData = {};
//                 fields.forEach((field) => {
//                     initialFormData[field.getName()] = '';
//                 });
//                 setFormData(initialFormData);

//                 const pdfBlob = new Blob([typedArray], { type: 'application/pdf' });
//                 const pdfUrl = URL.createObjectURL(pdfBlob);
//                 setPdfUrl(pdfUrl);
//             };
//             fileReader.readAsArrayBuffer(file);
//         }
//     };

//     const handleInputChange = async (name, value) => {
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         if (pdfDoc) {
//             const form = pdfDoc.getForm();
//             const field = form.getField(name);
//             if (field) {
//                 field.setText(value);

//                 // Save the updated PDF and create a new URL for the iframe
//                 const updatedPdfBytes = await pdfDoc.save();
//                 const updatedPdfBlob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
//                 const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);
//                 setPdfUrl(updatedPdfUrl);
//             }
//         }
//     };

//     const sendFormDataToBackend = async () => {
//         if (!Object.keys(formData).length) {
//             alert('No PDF loaded. Please load a PDF first.');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:8080/api/pdf/form-data', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 console.log('Form data successfully sent to the backend!');
//                 alert('Form data sent successfully!');
//             } else {
//                 console.error('Error sending form data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
//         }
//     };

//     const renderFormInputs = () => {
//         return Object.keys(formData).map((name) => (
//             <input
//                 key={name}
//                 type="text"
//                 placeholder={name}
//                 value={formData[name]}
//                 onChange={(e) => handleInputChange(name, e.target.value)}
//             />
//         ));
//     };

//     return (
//         <div className='FillableComponent'>
//             <h1>Fillable PDF</h1>
//             <input
//                 type="file"
//                 accept="application/pdf"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//             />
//             {pdfUrl && (
//                 <iframe
//                     src={pdfUrl}
//                     width="100%"
//                     height="600px"
//                     style={{ border: '1px solid black' }}
//                     title="PDF Viewer"
//                 ></iframe>
//             )}
//             <br />
//             {renderFormInputs()}
//             <button onClick={sendFormDataToBackend}>Send to Backend</button>
//         </div>
//     );
// };

// export default FillableEditor;


// import React, { useRef, useState, useEffect } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const FillableEditor = () => {
//     const [pdfUrl, setPdfUrl] = useState('');
//     const [formData, setFormData] = useState({});
//     const [pdfDoc, setPdfDoc] = useState(null);
//     const fileInputRef = useRef(null);
//     const intervalRef = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileReader = new FileReader();
//             fileReader.onload = async () => {
//                 const typedArray = new Uint8Array(fileReader.result);
//                 const pdfDoc = await PDFDocument.load(typedArray);
//                 setPdfDoc(pdfDoc);

//                 const form = pdfDoc.getForm();
//                 const fields = form.getFields();

//                 const initialFormData = {};
//                 fields.forEach((field) => {
//                     initialFormData[field.getName()] = field.getText() || '';
//                 });
//                 setFormData(initialFormData);

//                 const pdfBlob = new Blob([typedArray], { type: 'application/pdf' });
//                 const pdfUrl = URL.createObjectURL(pdfBlob);
//                 setPdfUrl(pdfUrl);
//             };
//             fileReader.readAsArrayBuffer(file);
//         }
//     };

//     const handleInputChange = async (name, value) => {
//         // Update formData state
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         if (pdfDoc) {
//             const form = pdfDoc.getForm();
//             const field = form.getField(name);
//             if (field) {
//                 field.setText(value);

//                 // Save the updated PDF and create a new URL for the iframe
//                 const updatedPdfBytes = await pdfDoc.save();
//                 const updatedPdfBlob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
//                 const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);
//                 setPdfUrl(updatedPdfUrl);
//             }
//         }
//     };

//     // Function to sync PDF field values to formData
//     const syncPDFToForm = async () => {
//         if (pdfDoc) {
//             const form = pdfDoc.getForm();
//             const fields = form.getFields();
//             const updatedFormData = {};

//             fields.forEach((field) => {
//                 updatedFormData[field.getName()] = field.getType() || '';
//                 console.log("form",field);
//             });
//             setFormData(updatedFormData);
//         }
//     };

//     useEffect(() => {
//         // Set up an interval to sync PDF data to form
//         intervalRef.current = setInterval(syncPDFToForm, 500); // Sync every 500ms

//         return () => clearInterval(intervalRef.current); // Clean up on unmount
//     }, [pdfDoc]);

//     const sendFormDataToBackend = async () => {
//         if (!Object.keys(formData).length) {
//             alert('No PDF loaded. Please load a PDF first.');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:8080/api/pdf/form-data', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 console.log('Form data successfully sent to the backend!');
//                 alert('Form data sent successfully!');
//             } else {
//                 console.error('Error sending form data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
//         }
//     };

//     const renderFormInputs = () => {
//         return Object.keys(formData).map((name) => (
//             <input
//                 key={name}
//                 type="text"
//                 placeholder={name}
//                 value={formData[name]}
//                 onChange={(e) => handleInputChange(name, e.target.value)}
//             />
//         ));
//     };

//     return (
//         <div className='FillableComponent'>
//             <h1>Fillable PDF</h1>
//             <input
//                 type="file"
//                 accept="application/pdf"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//             />
//             {pdfUrl && (
//                 <iframe
//                     src={pdfUrl}
//                     width="100%"
//                     height="600px"
//                     style={{ border: '1px solid black' }}
//                     title="PDF Viewer"
//                 ></iframe>
//             )}
//             <br />
//             {renderFormInputs()}
//             <button onClick={sendFormDataToBackend}>Send to Backend</button>
//         </div>
//     );
// };

// export default FillableEditor;

import React, { useRef, useState } from 'react';
import { PDFDocument, PDFTextField } from 'pdf-lib';

const FillableEditor = () => {
    const [pdfBytes, setPdfBytes] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const typedArray = new Uint8Array(await file.arrayBuffer());
            const pdfDoc = await PDFDocument.load(typedArray);

            const form = pdfDoc.getForm();
            const fields = form.getFields();

            const initialFormData = {};
            fields.forEach((field) => {
                initialFormData[field.getName()] = '';  // Initialize form data
            });
            setFormData(initialFormData);

            setPdfBytes(typedArray);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const updatePdfWithFormData = async () => {
        if (!pdfBytes) {
            alert('No PDF loaded. Please load a PDF first.');
            return;
        }

        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        Object.keys(formData).forEach((name) => {
            const field = form.getField(name);
            if (field instanceof PDFTextField) {
                field.setText(formData[name]);
            }
        });

        const updatedPdfBytes = await pdfDoc.save();
        const updatedPdfBlob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
        const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);
        setPdfUrl(updatedPdfUrl);

        // Open the modal to display the filled PDF
        setIsModalOpen(true);
    };

    const sendFormDataToBackend = async () => {
        if (!Object.keys(formData).length) {
            alert('No PDF loaded. Please load a PDF first.');
            return;
        }

        try {
            // const response = await fetch('http://localhost:8080/api/pdf/form-data', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData), // Send form data as JSON payload
            // });

            // if (response.ok) {
            //     console.log('Form data successfully sent to the backend!');
            //     alert('Form data sent successfully!');
            // } else {
            //     console.error('Error sending form data:', response.statusText);
            //     alert('Failed to send data to backend.');
            // }
            console.log(formData);
            setIsModalOpen(false);

        } catch (error) {
            console.error('Error during fetch:', error);
            alert('Error sending form data to backend.');
        }
    };

    const renderFormInputs = () => {
        return Object.keys(formData).map((name) => (
            <div key={name} style={{ marginBottom: '15px' }}>
                <label
                    htmlFor={name}
                    style={{
                        display: 'block',
                        fontWeight: 'bold',
                        color: '#444',
                        marginBottom: '5px',
                    }}
                >
                    {name}
                </label>
                <input
                    id={name}
                    type="text"
                    placeholder={name}
                    value={formData[name]}
                    onChange={(e) => handleInputChange(name, e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        width: '100%',
                        fontSize: '16px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </div>
        ));
    };


    return (
        <div style={{ padding: '20px' }}>
            <h1>Fillable PDF Editor</h1>
            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ marginBottom: '20px' }}
            />

            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2>Form</h2>
                {renderFormInputs()}
                <button
                    onClick={updatePdfWithFormData}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Check
                </button>
            </div>

            {/* Modal for PDF Preview */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '80%',
                            height: '80%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h2>PDF Preview</h2>
                        {pdfUrl && (
                            <iframe
                                src={pdfUrl}
                                width="100%"
                                height="80%"
                                style={{ border: '1px none none' }}
                               
                            ></iframe>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Close
                            </button>
                            <button
                                onClick={sendFormDataToBackend}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Send to Backend
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FillableEditor;