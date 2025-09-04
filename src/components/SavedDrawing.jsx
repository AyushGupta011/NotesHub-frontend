// frontend/components/SavedDrawings.js
import React from "react";

const SavedDrawings = ({ drawings, deleteDrawing, downloadDrawingPdf }) => {
  return (
    <div>
      <h3 className="mt-6 font-bold">My Saved Drawings</h3>
      {drawings.length === 0 ? (
        <p className="text-gray-500 mt-2">No drawings saved yet.</p>
      ) : (
        drawings.map((d) => (
          <div
            key={d._id}
            className="p-3 border rounded mt-2 flex justify-between items-center"
          >
            <span className="font-medium">{d.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => downloadDrawingPdf(d)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Download PDF
              </button>
              <button
                onClick={() => deleteDrawing(d._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedDrawings;
