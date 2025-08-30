// import React, { useEffect, useState } from 'react';
// import api, { attachToken } from './utils/api';
// import { jsPDF } from 'jspdf';
// import { updateNote } from '../../backend/controllers/noteController';
//  import { motion } from "motion/react";

// function AuthUI({ onLogin, onSignup }) {
//   const [mode, setMode] = useState('login');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       if (mode === 'login') await onLogin(email, password);
//       else await onSignup(name, email, password);
//     } catch (e) {
//       alert(e.response?.data?.error || e.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 360, margin: "60px auto", border: "1px solid #eee", borderRadius: 12 }}>
//       <h3>{mode === 'login' ? 'Login' : 'Sign up'}</h3>
//       <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
//         {mode === 'signup' && (
//           <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
//         )}
//         <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
//         <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
//         <button type='submit'>{mode === 'login' ? 'Login' : 'Sign up'}</button>
//       </form>
//       <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ marginTop: 8 }}>
// {mode==='login' ? ' New User':'Already a user'  }
//       </button>
//     </div>
//   );
// }

// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
//   const [notes, setNotes] = useState([]);
//     const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [editingNoteId, setEditingNoteId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editContent, setEditContent] = useState("");
//   const [sharedView, setSharedView] = useState(null);




//   useEffect(() => {
//   //   if (token) {
//   //     attachToken(token);
//   //     api.get('api/notes/list').then(r => setNotes(r.data.notes)).catch(() => {});
//   //   }
    
//   // }, [token]);
//   const fetchNotes = async () => {
//     if (!token) return; // no token, don’t fetch

//     // make sure token is attached to axios headers
    

//     try {
//       const res = await api.get('/api/notes/list'); // note the leading slash
//       setNotes(res.data.notes);
//     } catch (err) {
//       console.error("Failed to fetch notes:", err.response?.data || err.message);
//       // handle 401: maybe logout the user or redirect to login
//       if (err.response?.status === 401) {
//         alert("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         setToken("");
//       } 
//     }
//   };

//   fetchNotes();
// }, [token]);


//   const signup = async (name, email, password) => {
//   const r = await api.post('/api/auth/signup', { name, email, password });
//   const access = r.data.token;
//   const u = r.data.user;

//   localStorage.setItem("token", access);
//   localStorage.setItem("user", JSON.stringify(u));

//   setToken(access);
//   setUser(u);
//   attachToken(access);

//   alert("Signed up & logged in ✅");
// };

// const login = async (email, password) => {
//   const r = await api.post('/api/auth/login', { email, password });

//   const access = r.data.token;   // 🔑 changed from accessToken → token
//   const u = r.data.user;

//   localStorage.setItem("token", access);
//   localStorage.setItem("user", JSON.stringify(u));

//   setToken(access);
//   setUser(u);
//   attachToken(access);

//   alert("you are logged in ✅");
// };


//   // const login = async (email, password) => {
//   //   const r = await api.post('/api/auth/login', { email, password });
//   //   const access = r.data.token;
//   //   const u = r.data.user;
//   //   localStorage.setItem('token', access);
//   //   localStorage.setItem('user', JSON.stringify(u));

//   //   setToken(access);
//   //   setUser(u);
//   //   attachToken(access);
//   //   alert("you are logged in->>")
//   // };

//   // const signup = async (name, email, password) => {
//   //   await api.post('/api/auth/signup', { name, email, password });
//   //   localStorage.setItem("token", res.data.token);
//   //   alert('Signed up. Now login.');
//   // };
  


//   const logout = async () => {
//     await api.post('/api/auth/logout');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken('');
//     setUser(null);
//     attachToken(null);
//     alert("you are logged out->>")
//   };


// // api.interceptors.request.use((req) => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     req.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return req;
// // });
// console.log("Token saved in localStorage:", localStorage.getItem("token"));

//   const createNote = async (title, content) => {
//     try{
//     const r = await api.post('/api/notes/new', { title, content });
//     setNotes([r.data.note, ...notes]);
//     }catch(err){
//       console.error("Create note error:", err.response?.data || err.message);

//     }

//   };
 

//   // const deleteNote = async (id) => {
//   //   await api.delete(`/api/notes/${id}`);
//   //   setNotes(notes.filter(n => n._id !== id));
//   // };
//   const updateNote = async (id) => {
//   try {
//     const extraContent = prompt("Enter extra content to add:");

//     if (!extraContent) {
//       alert("Nothing to add.");
//       return;
//     }

//     // find the current note
//     const currentNote = notes.find(n => n._id === id);

//     // append new content
//     const updatedContent = (currentNote?.content || "") + "\n" + extraContent;

//     const r = await api.put(`/api/notes/update/${id}`, {
//       title: currentNote?.title,   // keep the same title
//       content: updatedContent,     // updated content with appended text
//     });

//     setNotes((prev) =>
//       prev.map((n) => (n._id === id ? r.data.note : n))
//     );

//     alert("Note updated with new content!");
//   } catch (err) {
//     console.error("Error updating note:", err.response?.data || err.message);
//     alert("Failed to update note.");
//   }
// };

// const deleteNote = async (id) => {
//   try {
//     await api.delete(`/api/notes/${id}`);
//     setNotes((prev) => prev.filter((n) => n._id !== id)); // use prev state
//     alert("Note deleted successfully!");
//   } catch (err) {
//     console.error("Error deleting note:", err.response?.data || err.message);
//     alert("Failed to delete note.");
//   }
// };

//   const downloadPdf = (note) => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text(note.title || 'Untitled', 14, 20);
//     doc.setFontSize(11);
//     const lines = doc.splitTextToSize(note.content || '', 180);
//     doc.text(lines, 14, 32);
//     const name = (note.title || 'note').replace(/[^a-z0-9\\-]+/gi, '_');
//     doc.save(`${name}.pdf`);
//   };
//   const shareNote = async (note) => { const url = makeShareUrl(note); if (navigator.share) { try { await navigator.share({ title: note.title || "Note", text: note.content?.slice(0, 120) || "", url }); return; } catch (e) { // fall through to copy
//    } } await navigator.clipboard.writeText(url); alert("Share link copied to clipboard!"); };

//   if (!user) return <AuthUI onLogin={login} onSignup={signup} />;
//   const handleAddNote = () => {
//     if (!title && !content) {
//       alert("Please write something!");
//       return;
//     }
//     createNote(title, content);
//     setTitle("");
//     setContent("");
//   };

//   return (
//     // <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
//     //   <h2>NotesHub</h2>
//     //   <small>Welcome, {user.name}</small>
//     //   <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
//     //     <button onClick={() => {
//     //       const t = prompt('Title');
//     //       const c = prompt('Content');
//     //       if (t || c) createNote(t, c);
//     //     }}>New</button>
//     //     <button onClick={logout}>Logout</button>
//     //   </div>

//     //   <div style={{ marginTop: 16 }}>
//     //     {notes.map(n => (
//     //       <div key={n._id} style={{ border: '1px solid #ddd', padding: 10, margin: 8, borderRadius: 10 }}>
//     //         <h3 style={{ margin: "4px 0" }}>{n.title}</h3>
//     //         <p style={{ margin: "4px 0" }}>{n.content}</p>
//     //         <small>{new Date(n.updatedAt).toLocaleString()}</small>
//     //         <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//     //           <button onClick={() => downloadPdf(n)}>PDF</button>
//     //           <button onClick={() => deleteNote(n._id)}>Delete</button>
//     //           <button onClick={()=>updateNote(n._id)}>Update</button>
//     //         </div>
//     //       </div>
//     <div className="align-center justify-center flex p-8 max-w-4xl mx-auto">
//       {/* Header */}
//       <motion.h2 
//         className="text-4xl font-bold text-center text-indigo-600 drop-shadow-lg"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         NotesHub
//       </motion.h2>
      
//       <motion.small 
//         className="block text-center text-gray-500 mt-2"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         Welcome, {user.name}
//       </motion.small>

//       {/* Note Input Form */}
//       <motion.div 
//         className="mt-8 bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-6 border border-gray-200"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-lg font-semibold text-gray-700 mb-3">Create a Note</h3>
//         <input 
//           type="text" 
//           placeholder="Title" 
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 mb-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
//         />
//         <textarea
//           rows={3}
//           placeholder="Write your note here..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-3 mb-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
//         />
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-5 py-2 bg-indigo-500 text-white rounded-xl shadow-md hover:shadow-indigo-400/50"
//             onClick={handleAddNote}
//           >
//             ➕ Save Note
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-5 py-2 bg-red-500 text-white rounded-xl shadow-md hover:shadow-red-400/50"
//             onClick={logout}
//           >
//             🚪 Logout
//           </motion.button>
//         </div>
//       </motion.div>

// <div className="mt-10 grid md:grid-cols-2 gap-6">
//   {notes.map((n, i) => (
//     <motion.div
//       key={n._id}
//       className="bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-3xl shadow-lg hover:shadow-xl transition cursor-pointer"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: i * 0.1 }}
//     >
//       {editingNoteId === n._id ? (
//         <>
//           <input
//             className="w-full p-2 mb-2 rounded-lg border border-gray-300"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             placeholder="Title"
//           />
//           <textarea
//             className="w-full p-2 mb-2 rounded-lg border border-gray-300 resize-none"
//             rows={4}
//             value={editContent}
//             onChange={(e) => setEditContent(e.target.value)}
//             placeholder="Content"
//           />
//           <div className="flex gap-2 mt-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="px-3 py-1 bg-blue-500 text-white rounded-lg"
//               onClick={async () => {
//                 const r = await api.put(`/api/notes/update/${n._id}`, {
//                   title: editTitle,
//                   content: editContent,
//                 });
//                 setNotes((prev) =>
//                   prev.map((note) => (note._id === n._id ? r.data.note : note))
//                 );
//                 setEditingNoteId(null);
//                 setEditTitle("");
//                 setEditContent("");
//               }}
//             >
//               💾 Save
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="px-3 py-1 bg-gray-400 text-white rounded-lg"
//               onClick={() => setEditingNoteId(null)}
//             >
//               ❌ Cancel
//             </motion.button>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-xl font-bold text-gray-800">{n.title}</h3>
//           <p className="text-gray-600 mt-2 whitespace-pre-wrap">{n.content}</p>
//           <small className="block mt-3 text-gray-400">
//             {new Date(n.updatedAt).toLocaleString()}
//           </small>

//           <div className="flex gap-3 mt-4">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               className="px-4 py-1 bg-green-500 text-white rounded-xl shadow-md hover:shadow-green-400/50"
//               onClick={() => downloadPdf(n)}
//             >
//               📄 PDF
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               className="px-4 py-1 bg-red-500 text-white rounded-xl shadow-md hover:shadow-red-400/50"
//               onClick={() => deleteNote(n._id)}
//             >
//               ❌ Delete
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               className="px-4 py-1 bg-blue-500 text-white rounded-xl shadow-md hover:shadow-blue-400/50"
//               onClick={() => {
//                 setEditingNoteId(n._id);
//                 setEditTitle(n.title);
//                 setEditContent(n.content);
//               }}
//             >
//               ✏️ Edit
//             </motion.button>
//           </div>
//         </>
//       )}
//     </motion.div>
//   ))}
// </div>
// {sharedView && ( <div className="mx-auto mt-4 max-w-4xl rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900"> You opened a <b>shared note</b>. Title: <b>{sharedView.title || "Untitled"}</b> </div> )}

// </div>

//   );
// }

import React, { useState, useEffect } from "react";
import AuthUI from "./components/AuthUI";
import NotesPage from "./pages/NotePage";
import { jsPDF } from 'jspdf';
import api,{attachToken} from "./utils/api";
import Navbar from "./components/Navbar";
import "../src/App.css"

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notes, setNotes] = useState([]);

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
  if (!token) return;
  api.get(`/api/notes/list?ts=${Date.now()}`)
    .then((res) => setNotes(res.data.notes))
    .catch((err) => console.error("Fetch notes failed:", err.response?.data || err));
}, [token]);


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

  const updateNote = async (id,newContent,newTitle) => {
    // const r = await api.put(`/api/notes/update/${id}`, { title: "", content: "" });
    // setNotes((prev) => prev.map((n) => (n._id === id ? r.data.note : n)));
    //find the current note
    try{
    const currentNote = notes.find(n => n._id === id);

    // append new content
    const updatedTitle = currentNote?.title + (newTitle ? " | " + newTitle : "");

   const updatedContent = currentNote?.content + (newContent ? "\n" + newContent : "");

    const r = await api.put(`/api/notes/update/${id}`, {
      title: updatedTitle,   // keep the same title
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
//    } } await navigator.clipboard.writeText(url); alert("Share link copied to clipboard!"); };


  

  return (
    <>
    <Navbar user ={user}/>
      {!user ?(
   <AuthUI onLogin={login} onSignup={signup} />
      ):(
     <NotesPage 
      user={user} 
      notes={notes} 
      createNote={createNote} 
      deleteNote={deleteNote} 
      updateNote={updateNote} 
      downloadPdf={downloadPdf} 
      logout={logout} 
    />)}
    </>

    
   
  );
}
