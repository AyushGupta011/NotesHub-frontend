import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList({ 
  notes, onDelete,onEdit,onCancelEdit,editingNoteId,editingTitle,setEditingTitle,setEditingContent,editingContent,onSaveEdit,onDownload 
}) {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-6">
      {notes.map((n) => (
        <NoteCard 
          key={n._id} 
          note={n} 
          onDelete={onDelete} 
          onEdit={onEdit} 
          onDownload={onDownload} 
           editingNoteId={editingNoteId}
        editingTitle={editingTitle}
        editingContent={editingContent}
        setEditingTitle={setEditingTitle}
        setEditingContent={setEditingContent}
          onSaveEdit={onSaveEdit}   // ✅ Pass down
          onCancelEdit={onCancelEdit}

        
        />
      ))}
    </div>
  );
}
