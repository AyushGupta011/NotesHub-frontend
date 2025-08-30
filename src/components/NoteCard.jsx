import React from "react";
import { motion } from "framer-motion";

export default function NoteCard({
  note,
  onDelete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDownload,
  editingNoteId,
  editingTitle,
  editingContent,
  setEditingTitle,
  setEditingContent,
}) {
  const isEditing = editingNoteId === note._id;

  return (
    <motion.div
      className="notecard-container bg-white border p-6 rounded-3xl shadow-lg hover:shadow-xl transition"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mb-2"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />
          <textarea
            className="w-full border rounded-lg p-2"
            rows={4}
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <button
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl"
              onClick={onSaveEdit}
            >
              💾 Save
            </button>
            <button
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl"
              onClick={onCancelEdit}
            >
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold">{note.title}</h3>
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">
            {note.content}
          </p>
          <small className="block mt-3 text-gray-400">
            {new Date(note.updatedAt).toLocaleString()}
          </small>

          <div className="flex gap-3 mt-4">
            <button
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl"
              onClick={() => onDownload(note)}
            >
              📄 PDF
            </button>
            <button
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl"
              onClick={() => onDelete(note._id)}
            >
              ❌ Delete
            </button>
            <button
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl"
              onClick={() => onEdit(note)}
            >
              ✏️ Edit
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
