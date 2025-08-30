// import React, { useState } from "react";
// import NoteInput from "../components/NoteInput";
// import NotesList from "../components/NotesList";

// export default function NotesPage({ user, notes, createNote, deleteNote, updateNote, downloadPdf, logout }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   // const [editingNoteId, setEditingNoteId] = useState(null);
// const [editingContent, setEditingContent] = useState("");


//   const handleAdd = () => {
//     if (!title && !content) return alert("Please write something!");
//     createNote(title, content);
//     setTitle("");
//     setContent("");
//   };
//   const handleSaveEdit = () => {
//   updateNote(editingNoteId, editingContent);
//   setEditingNoteId(null);
//   setEditingContent("");
// };



//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h2 className="text-4xl font-bold text-indigo-600 text-center">NotesHub</h2>
//       <small className="block text-center text-gray-500">Welcome, {user.name}</small>
      
//       <NoteInput
//         title={title}
//         content={content}
//         setTitle={setTitle}
//         setContent={setContent}
//         onSave={handleAdd}
//         onLogout={logout}
//       />

//       <NotesList
//         notes={notes}
//         onDelete={deleteNote}
//         onEdit={handleSaveEdit}
//         onDownload={downloadPdf}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import NoteInput from "../components/NoteInput";
import NotesList from "../components/NotesList";

export default function NotesPage({
  user,
  notes,
  createNote,
  deleteNote,
  updateNote,
  downloadPdf,
  logout,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const handleAdd = () => {
    if (!title && !content) return alert("Please write something!");
    createNote(title, content);
    setTitle("");
    setContent("");
  };

  const handleEditClick = (note) => {
    setEditingNoteId(note._id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editingTitle && !editingContent) {
      alert("Please write something!");
      return;
    }
    updateNote(editingNoteId, editingTitle, editingContent);
    setEditingNoteId(null);
    setEditingTitle("");
    setEditingContent("");
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingTitle("");
    setEditingContent("");
  };

  return (
    <div className="notepage-container p-8 max-w-4xl mx-auto">


      <NoteInput className="notepage-input"
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        onSave={handleAdd}
        onLogout={logout}
      />

      <NotesList
        notes={notes}
        onDelete={deleteNote}
        onDownload={downloadPdf}
        onEdit={handleEditClick} // pass down edit click
        editingNoteId={editingNoteId}
        editingTitle={editingTitle}
        editingContent={editingContent}
        setEditingTitle={setEditingTitle}
        setEditingContent={setEditingContent}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}
