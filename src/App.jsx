import React, { useState, useEffect } from "react";
import AuthUI from "./components/AuthUI";
import NotesPage from "./pages/NotePage";
import { jsPDF } from 'jspdf';
import api,{attachToken} from "./utils/api";
import Navbar from "./components/Navbar";
import "../src/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteInput from "./components/NoteInput";



function getUserFromLocalStorage() {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    localStorage.removeItem("user");
    return null;
  }
}


export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

  // useEffect(() => {
  //   if (!token) return;
  //   api.get("/api/notes/list")
  //     .then((res) => setNotes(res.data.notes))
  //     .catch((err) => console.error("Fetch notes failed", err));
  // }, [token]);
  
const signup = async (name, email, password) => {
    const r = await api.post("/api/auth/signup", { name, email, password });
    localStorage.setItem("token", r.data.token);
    localStorage.setItem("user", JSON.stringify(r.data.user));
    setToken(r.data.token);
    setUser(r.data.user);
    
//   const u = r.data.user;

//   localStorage.setItem("token", access);
//   localStorage.setItem("user", JSON.stringify(u));

//   setToken(access);
//   setUser(u);
  attachToken(r.data.token);
  };
  const login = async (email, password) => {
    const r = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", r.data.token);
    localStorage.setItem("user", JSON.stringify(r.data.user));
    setToken(r.data.token);
    setUser(r.data.user);
    // setToken(access);
//   //   setUser(u);
    attachToken(r.data.token);
    alert("you are logged in->>")
  };

  useEffect(() => {

    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
  if (savedToken && savedUser) {
    setToken(savedToken);
    setUser(JSON.parse(savedUser));
   
    attachToken(savedToken);
  }
  if (!savedToken) return
  fetchNotes();
  // api.get(`/api/notes/list?ts=`)
  //   .then((res) => setNotes(res.data.notes))
  //   .catch((err) => console.error("Fetch notes failed:", err.response?.data || err));
}, [token]);

const fetchNotes = async () => {
  try {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;

    attachToken(savedToken); // attach JWT to headers

    const res = await api.get(`/api/notes/list?ts=${Date.now()}`);
    setNotes(res.data.notes);
  } catch (err) {
    console.error("Fetch notes failed:", err.response?.data || err.message);
  }
};


  const logout = async () => {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    attachToken(null);
    alert("you are logged out->>")
  };
  const createNote = async (title, content) => {
    const r = await api.post("/api/notes/new", { title, content });
    setNotes([r.data.note, ...notes]);
  };

  const deleteNote = async (id) => {
    try {
    await api.delete(`/api/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id)); // use prev state
    alert("Note deleted successfully!");
  } catch (err) {
    console.error("Error deleting note:", err.response?.data || err.message);
    alert("Failed to delete note.");
  }
  };

  const updateNote = async (id,updatedTitle,updatedContent) => {
    // const r = await api.put(`/api/notes/update/${id}`, { title: "", content: "" });
    // setNotes((prev) => prev.map((n) => (n._id === id ? r.data.note : n)));
    //find the current note
    try{
    // const currentNote = notes.find(n => n._id === id);

    // append new content
    // const updatedTitle = currentNote?.title + (newTitle ? " | " + newTitle : "");

  //  const updatedContent = currentNote?.content + (newContent ? "\n" + newContent : "");

    const r = await api.put(`/api/notes/update/${id}`, {
      title:updatedTitle,   // keep the same title
      content: updatedContent,     // updated content with appended text
    });

    setNotes((prev) =>
      prev.map((n) => (n._id === id ? r.data.note : n))
    );

    alert("Note updated with new content!");
  } catch(err) {
    console.error("Error updating note:", err.response?.data || err.message);
    alert("Failed to update note.");
  }
};


  

  const downloadPdf = (note) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(note.title || 'Untitled', 14, 20);
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(note.content || '', 180);
    doc.text(lines, 14, 32);
    const name = (note.title || 'note').replace(/[^a-z0-9\\-]+/gi, '_');
    doc.save(`${name}.pdf`);
    
    console.log("PDF download for:", note.title);
  };


  
  //   const shareNote = async (note) => { const url = makeShareUrl(note); if (navigator.share) { try { await navigator.share({ title: note.title || "Note", text: note.content?.slice(0, 120) || "", url }); return; } catch (e) { // fall through to copy
  //  } } await navigator.clipboard.writeText(url); alert("Share link copied to clipboard!"); };


  const handleAdd = () => {
    if (!title && !content) return alert("Please write something!");
    createNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
        <Router>
      <Navbar user={user} onLogout={logout} />
      {!user ? (
        <AuthUI onLogin={login} onSignup={signup} />
      ) : (
        <Routes>
          <Route path="/" />
          <Route
            path="/noteslist"
            element={
              <NotesPage
                notes={notes}
                deleteNote={deleteNote}
                updateNote={updateNote}
                downloadPdf={downloadPdf}
              />
            }
          />
          <Route
            path="/create"
            element={<NoteInput
              title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        onSave={handleAdd}
        onLogout={logout}
         createNote={createNote} />}
          />
        </Routes>
      )}
    </Router>


    
   
  );
}
