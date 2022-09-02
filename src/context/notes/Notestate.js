import Notecontext from "./Notecontext";
import { useState } from "react";

const Notestate = (props) => {
  const host = "http://localhost:5000/";
  let mynotes = [];
  const [notes, setnotes] = useState(mynotes);
  const [alert, setAlert] = useState(null);

  const alertbtn = (type, message) => {
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const fetchnotes = async () => {
    const response = await fetch(`${host}api/note/fetchnote`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const notes = await response.json();
    setnotes(notes);
  };

  //add a note
  const addnote = async (note) => {
    const response = await fetch(`${host}api/note/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(note),
    });
    // console.log(response);
    const mynotes = await response.json();
    setnotes(notes.concat(mynotes));
  };

  //delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const deletenotes = await response.json();
    console.log(deletenotes);

    setnotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  //update a note
  const updatenote = async (id, title, description, tag) => {
    // console.log(id);
    // console.log(title);

    const response = await fetch(`${host}api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        Title: title,
        Description: description,
        Tag: tag,
      }),
    });

    const updatenotes = await response.json();
    console.log(updatenotes);
    // console.log(id);

    setnotes(
      notes.map((note) => {
        if (note._id === id) {
          note.title = title;
          note.description = description;
          note.tag = tag;
        }
        return note;
      })
    );
  };

  return (
    <Notecontext.Provider
      value={{
        notes,
        fetchnotes,
        addnote,
        deletenote,
        updatenote,
        alert,
        alertbtn,
      }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default Notestate;
