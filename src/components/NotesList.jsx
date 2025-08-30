import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList({ 
  notes, onDelete,onEdit,onCancelEdit,editingNoteId,editingTitle,setEditingTitle,setEditingContent,editingContent,onSaveEdit,onDownload 
}) {
  return (
    <div className="notelist-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-6">
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
