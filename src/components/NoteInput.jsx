import React from "react";
import { motion } from "framer-motion";

export default function NoteInput({ title, content, setTitle, setContent, onSave,createNote, onLogout }) {
  return (

    <div className="input-container flex p-10 items-center justify-center">
    <div
      className="noteinput-container bg-white rounded-2xl p-6 shadow-xl mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.h3 initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }} className="text-lg font-semibold mb-3">Create a Note</motion.h3>
      <motion.input
        type="text"
        placeholder="Title"
        value={title}
        initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}

        onChange={(e) => setTitle(e.target.value)}
        onEdit
        className="w-full p-3 mb-3 border rounded-xl"
      />
      <motion.textarea
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
        rows={3}
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 mb-3 border rounded-xl resize-none"
      />
      <div className="flex gap-3">
        <motion.button
        initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="px-5 py-2 bg-indigo-500 text-white rounded-xl shadow-md"
          onClick={onSave}
        >
          ➕ Save Note
        </motion.button>
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-5 py-2 bg-red-500 text-white rounded-xl shadow-md"
          onClick={onLogout}
        >
          🚪 Logout
        </motion.button> */}
      </div>
    </div>
    </div>
  );
}
