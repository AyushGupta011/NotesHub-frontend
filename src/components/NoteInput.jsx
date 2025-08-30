import React from "react";
import { motion } from "framer-motion";

export default function NoteInput({ title, content, setTitle, setContent, onSave, onLogout }) {
  return (

    
    <motion.div 
      className="noteinput-conatiner bg-white p-6 shadow-xl mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-3">Create a Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onEdit
        className="w-full p-3 mb-3 border rounded-xl"
      />
      <textarea
        rows={3}
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 mb-3 border rounded-xl resize-none"
      />
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-5 py-2 bg-indigo-500 text-white rounded-xl shadow-md"
          onClick={onSave}
        >
          ➕ Save Note
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-5 py-2 bg-red-500 text-white rounded-xl shadow-md"
          onClick={onLogout}
        >
          🚪 Logout
        </motion.button>
      </div>
    </motion.div>
  );
}
