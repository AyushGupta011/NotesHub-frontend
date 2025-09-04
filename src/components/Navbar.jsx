// import React from 'react'

// const Navbar = ({user}) => {
//   return (
//     <div className='navbar-container'>
//         <div className="logo-name">
//             <h1 className="">NotesHub</h1>
//         </div>
//         <div className="welcome-msg">
// <h2>Welcome,{!user?(""):(user.name) }</h2>
// <h3></h3>
//         </div>
//         <div className="hamburger-menu">
            
//         </div>
//     </div>
//   )
// }

// export default Navbar


// Navbar.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaBars } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Navbar = ({ user, onCreateNote, onViewNotes, onLogout }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate =useNavigate();

//   return (
//     <nav className="navbar-container bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg p-4 flex items-center justify-between">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <h1 className="text-white text-2xl font-bold tracking-wider transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
//           NotesHub
//         </h1>
//       </div>

//       {/* Desktop Links */}
//       <div className="desktop-links hidden gap-10 md:flex items-center space-x-4">
//         <span className="text-white shadow rounded-lg hover:-translate-y-1 hover:scale-105 font-semibold">
//           Welcome, {!user ? "Guest" : user.name}
//         </span>
//         <button
//           onClick={()=> navigate("/noteslist")}
//           className="px-3 py-1 text-white font-semibold rounded-lg shadow hover:-translate-y-1 hover:scale-105 transition-transform"
//         >
//           My Notes
//         </button>
//         <button
//           onClick={() => navigate("/create")}
//           className="px-3 py-1 text-white font-semibold rounded-lg shadow hover:-translate-y-1 hover:scale-105 transition-transform flex items-center gap-1"
//         >
//           <FaPlus /> Create
//         </button>
//         {user && (
//           <button
//             onClick={onLogout}
//             className="px-3 py-1  text-white font-semibold rounded-lg shadow hover:-translate-y-1 hover:scale-105 transition-transform"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Hamburger for mobile */}
//       <div className="md:hidden relative">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-white text-2xl"
//         >
//           <FaBars />
//         </button>

//         {menuOpen && (
        
//           <motion.div 
//           initial={{opacity:0,x:20}}
//           animate={{opacity:1,x:0}} className="absolute text-center right-0 mt-2 w-100 h-100 bg-white rounded-2xl shadow-lg flex flex-col p-20 gap-10 space-y-2">
//             <span className="font-semibold pt-20 text-2xl">Welcome, {!user ? "Guest" : user.name}</span>
//             <button
//               onClick={() => { onViewNotes(); setMenuOpen(false); }}
//               className="text-indigo-600 text-2xl font-semibold"
//             >
//               My Notes
//             </button>
//             <button
//               onClick={() => { onCreateNote(); setMenuOpen(false); }}
//               className="text-green-600 text-center text-2xl justify-center font-semibold flex items-center gap-1"
//             >
//               <FaPlus /> Create
//             </button>
//             {user && (
//               <button
//                 onClick={() => { onLogout(); setMenuOpen(false); }}
//                 className="text-red-600 text-2xl font-semibold"
//               >
//                 Logout
//               </button>
//             )}
//           </motion.div>
          
//         )}
//       </div>
    
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBars, FaPen, FaDrawPolygon } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (type) => {
    setCreateOpen(false);
    setMenuOpen(false);
    if (type === "text") {
      navigate("/create");
    } else if (type === "canvas") {
      navigate("/canvas");
    }
  };

  return (
    <nav className="navbar-container bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h1 onClick={()=> navigate("/")} className="text-white text-2xl font-bold tracking-wider transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
          NotesHub
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="desktop-links hidden gap-10 md:flex items-center space-x-4 relative">
        <span className="text-white shadow rounded-lg hover:-translate-y-1 hover:scale-105 font-semibold">
          Welcome, {!user ? "Guest" : user.name}
        </span>
        <button
          onClick={() => navigate("/noteslist")}
          className="px-3 py-1 text-white font-semibold rounded-lg shadow hover:-translate-y-1 hover:scale-105 transition-transform"
        >
          My Notes
        </button>

        {/* Create Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCreateOpen(!createOpen)}
            className="px-3 py-1 text-white font-semibold rounded-lg shadow hover:-translate-y-1 hover:scale-105 transition-transform flex items-center gap-1"
          >
            <FaPlus /> Create
          </button>
          {createOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-999 right-0 mt-2 w-70 h-30 bg-white rounded-lg shadow-lg flex flex-col"
            >
              <button
                onClick={() => handleCreate("text")}
                className="px-4 py-2 text-center text-indigo-600  hover:bg-gray-100 flex items-center gap-2"
              >
                <FaPen /> <h4 className="font-semibold">Text Note</h4>
              </button>
              <button
                onClick={() => handleCreate("canvas")}
                className="px-4 py-2 text-left text-green-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <FaDrawPolygon /> <h4 className="font-semibold">Canvas Note</h4>
              </button>
            </motion.div>
          )}
        </div>

        {user && (
          <button
            onClick={onLogout}
            className="px-3 py-1 text-white font-semibold rounded-lg shadow hover:-translate-y-1 hover:scale-105 transition-transform"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden  relative z-999">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl"
        >
          <FaBars />
        </button>

        {menuOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            
            transition={{ duration: 0.4 , type: "spring" }}

            className="absolute text-center right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg flex flex-col p-8 gap-6"
          >
            <span className="font-semibold text-xl">
              Welcome, {!user ? "Guest" : user.name}
            </span>
            <button
              onClick={() => { navigate("/noteslist"); setMenuOpen(false); }}
              className="text-indigo-600 text-lg font-semibold"
            >
              My Notes
            </button>

            {/* Create Dropdown for Mobile */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCreate("text")}
                className="text-indigo-600 text-lg font-semibold flex items-center gap-2 justify-center"
              >
                <FaPen /> Text Note
              </button>
              <button
                onClick={() => handleCreate("canvas")}
                className="text-green-600 text-lg font-semibold flex items-center gap-2 justify-center"
              >
                <FaDrawPolygon /> Canvas Note
              </button>
            </div>

            {user && (
              <button
                onClick={() => { onLogout(); setMenuOpen(false); }}
                className="text-red-600 text-lg font-semibold"
              >
                Logout
              </button>
            )}
          </motion.div>
          </AnimatePresence>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
