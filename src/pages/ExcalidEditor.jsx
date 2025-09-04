import React, { useEffect, useState, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { exportToCanvas } from "@excalidraw/excalidraw";
import api from "../utils/api";
import "@excalidraw/excalidraw/index.css";

import { jsPDF } from "jspdf";

const ExcalidEditor = ({ user }) => {
  const [drawings, setDrawings] = useState([]);
  const excalidrawRef = useRef(null);

  // Fetch saved drawings
  useEffect(() => {
     if (!user?._id) return;
    
    const fetchDrawings = async () => {
      try {
        const r = await api.get(`/api/excalidraw/user/${user._id}`);
        setDrawings(r.data);
      } catch (err) {
        console.error("Error fetching drawings:", err.response?.data || err.message);
      }
    };
    fetchDrawings();
  },[user]);

  // Save new drawing
//   const saveDrawing = async () => {
//     const apiRef = excalidrawRef.current;
//     if (!apiRef) return;
//     const elements = apiRef.getSceneElements();
//     const appState = apiRef.getAppState();
//      if (!elements || elements.length === 0) {
//   alert("Nothing to save!");
//   return;
// }

//     try {
//       const r = await api.post("/api/excalidraw/newdraw", {
//         user: user._id,
//         title: "Untitled Drawing",
//          elements,
//          appState
//       });
//       setDrawings([r.data, ...drawings]);
//       alert("Drawing saved!");
//     } catch (err) {
//       console.error("Error saving drawing:", err.response?.data || err.message);
//     }
//   };
const saveDrawing = async () => {
  const apiRef = excalidrawRef.current;
  if (!apiRef) return;

  const { elements, appState, files } = apiRef.getScene();

  try {
    const r = await api.post("/api/excalidraw/newdraw", {
      user: user._id,
      title: "Untitled Drawing",
      elements,
      appState,
      files,
    });
    setDrawings([r.data, ...drawings]);
    alert("Drawing saved!");
  } catch (err) {
    console.error("Error saving drawing:", err.response?.data || err.message);
  }
};

  // Delete drawing
  const deleteDrawing = async (id) => {
    try {
      await api.delete(`/api/excalidraw/${id}`);
      setDrawings((prev) => prev.filter((d) => d._id !== id));
      alert("Drawing deleted!");
    } catch (err) {
      console.error("Error deleting drawing:", err.response?.data || err.message);
    }
  };

  // Download drawing as PDF
  // const downloadPdf = async () => {
  //   const apiRef = excalidrawRef.current;
  //   if (!apiRef) return;

  // const { elements, appState, files } = apiRef.getScene();
  // if (!elements || elements.length === 0) {
  //   alert("Nothing to export!");
  //   return;
  // }



 



  //   // const elements = apiRef.getSceneElements();
  //   // const appState = apiRef.getAppState();

  //   try {
  //     // Convert to canvas
  //     const canvas = await exportToCanvas({
  //       elements,
  //       appState,
  //       files,
  //     });

  //     // Convert canvas → image
  //     const imgData = canvas.toDataURL("image/png");

  //     // Create PDF
  //     const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]); // landscape
  //     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  //     pdf.save("drawing.pdf");
  //   } catch (err) {
  //     console.error("Error exporting PDF:", err);
  //   }
  // };
  const downloadPdf = async () => {
  const apiRef = excalidrawRef.current;
  if (!apiRef) return;

  const { elements, appState, files } = apiRef.getScene();

  try {
    // Convert to canvas
    const canvas = await exportToCanvas({
      elements,
      appState,
      files,
      exportPadding: 10,
      exportBackground: true,
    });

    // Convert canvas → PNG
    const imgData = canvas.toDataURL("image/png");

    // Create PDF sized to canvas
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "l" : "p",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("drawing.pdf");
  } catch (err) {
    console.error("Error exporting PDF:", err);
  }
};


  return (
    <div className="p-6">

      {/* Editor */}
      <div style={{ height: "100rem", border: "1px solid #ccc" }}>
        <Excalidraw ref={excalidrawRef} />
      </div>
      {/* <div className="mt-3 flex gap-3">
        <button
          onClick={saveDrawing}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Drawing
        </button>
        <button
          onClick={downloadPdf}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        > 
          Download as PDF
        </button>
      </div> */}

      {/* Saved drawings list
      <h3 className="mt-6 font-bold">My Saved Drawings</h3>
      {drawings.map((d) => (
        <div key={d._id} className="p-3 border rounded mt-2 flex justify-between">
          <span>{d.title}</span>
          <button
            onClick={() => deleteDrawing(d._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))} */}
    </div>
  );
};

export default ExcalidEditor;
