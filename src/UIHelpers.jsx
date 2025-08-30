import React, { useState } from "react";

// ✅ Reusable Button
export const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);

// ✅ Input Field
export const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`border border-gray-300 p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-400 ${className}`}
  />
);

// ✅ Textarea Field
export const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`border border-gray-300 p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-400 ${className}`}
  />
);

// ✅ Empty State (when no notes exist)
export const EmptyState = ({ message }) => (
  <div className="text-gray-500 text-center py-10">{message}</div>
);

// ✅ Note Card
export const NoteCard = ({ note, onEdit, onDelete, onDownload }) => (
  <div className="bg-white p-4 shadow-md rounded-xl mb-4 hover:shadow-lg transition">
    <h3 className="text-lg font-bold">{note.title}</h3>
    <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
    <small className="block text-gray-400">
      {new Date(note.updatedAt).toLocaleString()}
    </small>

    <div className="flex gap-2 mt-2">
      <Button onClick={() => onDownload(note)} className="bg-green-600 hover:bg-green-700">PDF</Button>
      <Button onClick={() => onEdit(note)} className="bg-yellow-500 hover:bg-yellow-600">Edit</Button>
      <Button onClick={() => onDelete(note._id)} className="bg-red-600 hover:bg-red-700">Delete</Button>
    </div>
  </div>
);

// ✅ Modal for Adding/Editing Notes
export const NoteModal = ({ open, note, onSave, onClose }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl mb-2">{note ? "Edit Note" : "New Note"}</h2>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={5}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
          <Button onClick={() => onSave({ title, content })}>
            {note ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};