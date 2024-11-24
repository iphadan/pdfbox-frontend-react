import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Draggable from 'react-draggable';

const EditCreatePdf = () => {
    const [elements, setElements] = useState([]);  // Store elements (text, checkbox, etc.)
    const [pdf, setPdf] = useState(new jsPDF());  // Store jsPDF instance

    // Add a text field
    const addTextField = () => {
        const newElement = {
            type: 'text',
            x: 20,  // Initial position
            y: 20,
            width: 100,
            height: 10,
            value: '',
        };
        setElements([...elements, newElement]);
    };

    // Add a checkbox
    const addCheckbox = () => {
        const newElement = {
            type: 'checkbox',
            x: 20,
            y: 40,
            width: 10,
            height: 10,
            checked: false,
        };
        setElements([...elements, newElement]);
    };

    // Add a radio button
    const addRadioButton = () => {
        const newElement = {
            type: 'radio',
            x: 20,
            y: 60,
            width: 10,
            height: 10,
            checked: false,
        };
        setElements([...elements, newElement]);
    };

    // Add an image
    const addImage = () => {
        const newElement = {
            type: 'image',
            x: 20,
            y: 80,
            width: 100,
            height: 100,
            src: 'https://via.placeholder.com/100',  // Placeholder image
        };
        setElements([...elements, newElement]);
    };

    // Handle text input change
    const handleInputChange = (index, value) => {
        const updatedElements = [...elements];
        updatedElements[index].value = value;
        setElements(updatedElements);
    };

    // Handle checkbox/radio button change
    const handleCheckboxChange = (index) => {
        const updatedElements = [...elements];
        updatedElements[index].checked = !updatedElements[index].checked;
        setElements(updatedElements);
    };

    // Generate PDF
    const generatePdf = () => {
        const doc = new jsPDF();

        elements.forEach((element) => {
            switch (element.type) {
                case 'text':
                    doc.text(element.value, element.x, element.y);
                    break;
                case 'checkbox':
                    doc.rect(element.x, element.y, element.width, element.height);
                    if (element.checked) {
                        doc.line(element.x + 2, element.y + 2, element.x + element.width - 2, element.y + element.height - 2);  // Draw a check
                    }
                    break;
                case 'radio':
                    doc.circle(element.x + element.width / 2, element.y + element.height / 2, element.width / 2);
                    if (element.checked) {
                        doc.circle(element.x + element.width / 2, element.y + element.height / 2, element.width / 4, 'F');  // Draw a filled circle
                    }
                    break;
                case 'image':
                    doc.addImage(element.src, 'PNG', element.x, element.y, element.width, element.height);
                    break;
                default:
                    break;
            }
        });

        doc.save('dynamic_form.pdf');
    };

    return (
        <div>
            <h1>Create or Edit Your PDF</h1>
            <div>
                <button onClick={addTextField}>Add Text Field</button>
                <button onClick={addCheckbox}>Add Checkbox</button>
                <button onClick={addRadioButton}>Add Radio Button</button>
                <button onClick={addImage}>Add Image</button>
                <button onClick={generatePdf}>Generate PDF</button>
            </div>

            <div
                style={{
                    border: '1px solid black',
                    padding: '10px',
                    marginTop: '20px',
                    position: 'relative',
                    height: '500px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <h2>Editor</h2>
                {elements.map((element, index) => (
                    <Draggable
                        key={index}
                        defaultPosition={{ x: element.x, y: element.y }}
                        onStop={(e, data) => {
                            const updatedElements = [...elements];
                            updatedElements[index].x = data.x;
                            updatedElements[index].y = data.y;
                            setElements(updatedElements);
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                left: element.x,
                                top: element.y,
                                width: element.width,
                                height: element.height,
                                border: '1px solid #ccc',
                                padding: '5px',
                            }}
                        >
                            {element.type === 'text' && (
                                <input
                                    type="text"
                                    value={element.value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    placeholder="Enter text"
                                    style={{ width: '100%' }}
                                />
                            )}
                            {element.type === 'checkbox' && (
                                <input
                                    type="checkbox"
                                    checked={element.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            )}
                            {element.type === 'radio' && (
                                <input
                                    type="radio"
                                    checked={element.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            )}
                            {element.type === 'image' && (
                                <img src={element.src} alt="placeholder" style={{ width: '100%' }} />
                            )}
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    );
};

export default EditCreatePdf;
