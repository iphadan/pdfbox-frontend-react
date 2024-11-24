import logo from './logo.svg';
import './App.css';
import FillableEditor from './components/FillableEditor';
import EditCreatePdf from './components/edit_create_pdf/EditCreatePdf';

function App() {
  return (
    <>
    <div className="App">
      <FillableEditor></FillableEditor>
    </div>
     {/* <div className="App">
     <EditCreatePdf></EditCreatePdf>
   </div> */}
   
   </>
  );
}

export default App;

// import React from 'react';
// import FillableEditor from './components/FillableEditor';

// function App() {
//   return (
//     <div>
//       <h1>Upload and Fill PDF Form</h1>
//       <FillableEditor />
//     </div>
//   );
// }

// export default App;
