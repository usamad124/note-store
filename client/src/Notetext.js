import React, { useState, useEffect } from "react";
import HeartComment from "./HeartComment";
import axios from 'axios';
import './App.css';

function NoteText() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((response) => {
          const fetchedUserData = response.data;
          setUserData(fetchedUserData);
          localStorage.setItem("userData", JSON.stringify(fetchedUserData));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    axios
      .get(`http://localhost:5000/notes/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addItem = () => {
    if (title && text) {
      const newNote = {
        title,
        text,
        modified: new Date().toLocaleString(),
      };
      const userId = localStorage.getItem("userId");
      axios
      .post("http://localhost:5000/notes", { userId, ...newNote })
      .then((res) => {
        console.log(res.data);
        setNotes([...notes, newNote]);
        setTitle("");
        setText("");
        setActiveNote(null);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      alert("Please enter a title and text for the note.");
    }
  };

  const handleDelete = index => {
    const noteId = notes[index]._id;
  
    axios
      .delete(`http://localhost:5000/notes/${noteId}`)
      .then(res => {
        console.log(res.data);
        const newList = [...notes];
        newList.splice(index, 1);
        setNotes(newList);
        setActiveNote(null);

      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleNoteClick = (index) => {
    const note = notes[index];
    setTitle(note.title);
    setText(note.text);
    setActiveNote(index);
  };

  const handleSave = () => {
    const updatedNotes = [...notes];
    updatedNotes[activeNote] = {
      ...updatedNotes[activeNote],
      title,
      text,
      modified: new Date().toLocaleString(),
    };
    setNotes(updatedNotes);
    setTitle("");
    setText("");
    setActiveNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setText("");
    setActiveNote(null);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="app">
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          {userData && (
  <div>
    <p>Name: {userData.name}</p>
    <p>Age: {userData.age}</p>
    {userData.profilePicture && (
      <img src={`http://localhost:5000/${userData.profilePicture}`} alt="Profile"   style={{width: "100px", height: "100px"}}/>
    )}
  </div>
)}
        </div>
        <div className="app-sidebar-notes">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`app-sidebar-note ${activeNote === index ? "active" : ""}`}
              onClick={() => handleNoteClick(index)}
            >
              <div className="sidebar-note-title">
                <h3>{note.title}</h3>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
              <p>{note.text}</p>
              <small>Last Modified: {note.modified}</small>
              <HeartComment />
            </div>
          ))}
        </div>
      </div>
      <div className="app-main">
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">Select color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        <div className="app-main-note-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            style={{ color: selectedColor }}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your note here..."
            style={{ color: selectedColor }}
          />
          {activeNote !== null && (
            <div>
              <button onClick={handleSave}>Save</button> <br />
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
          <button onClick={addItem}>Add Text</button>
          {notes.length === 0 && <p>No notes yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default NoteText;
