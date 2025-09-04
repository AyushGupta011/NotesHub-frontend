import React, { useState, useEffect } from "react";
import SavedDrawings from "../components/SavedDrawing.jsx";
import api from "../utils/api";
import { jsPDF } from "jspdf";

const ExcalidrawPage = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const res = await api.get(`/api/excalidraw/user/${user.id}`);
        setDrawings(res.data);
      } catch (err) {
        console.error("Error fetching drawings:", err);
      }
    };
    fetchDrawings();
  }, [user.id]);

  const deleteDrawing = async (id) => {
    try {
      await api.delete(`/api/excalidraws/${id}`);
      setDrawings((prev) => prev.filter((d) => d._id !== id));
      alert("Drawing deleted successfully!");
    } catch (err) {
      console.error("Error deleting drawing:", err);
      alert("Failed to delete drawing.");
    }
  };

  const downloadDrawingPdf = (drawing) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(drawing.title || "Untitled Drawing", 14, 20);

    // Insert image from base64 (drawing dataURL)
    if (drawing.elements) {
      doc.addImage(drawing.elements, "PNG", 15, 30, 180, 160);
    }

    const fileName = (drawing.title || "drawing").replace(/[^a-z0-9\\-]+/gi, "_");
    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="p-6">
      {/* Saved drawings list in a separate component */}
      <SavedDrawings
        drawings={drawings}
        deleteDrawing={deleteDrawing}
        downloadDrawingPdf={downloadDrawingPdf}
      />
    </div>
  );
};

export default ExcalidrawPage;
