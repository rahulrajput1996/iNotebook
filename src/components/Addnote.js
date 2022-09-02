import React from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";
import { useState } from "react";

function Addnote() {
  const mynotes = useContext(Notecontext);
  const { addnote, alertbtn } = mynotes;
  const [note, setNote] = useState({ Title: "", Description: "", Tag: "" });
  const btnclick = (e) => {
    e.preventDefault();
    addnote(note);
    setNote({ Title: "", Description: "", Tag: "" });
    alertbtn("success", "Successfully: New note is created");
  };
  const mychange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <h1 className="my-3">Add Your Notes:</h1>
        <form className="my-3 needs-validation">
          <div className="mb-3">
            <label htmlFor="mytitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="mytitle"
              aria-describedby="emailHelp"
              name="Title"
              onChange={mychange}
              value={note.Title}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mydescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="mydescription"
              name="Description"
              onChange={mychange}
              value={note.Description}
              minLength={10}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mytag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="mytag"
              name="Tag"
              onChange={mychange}
              value={note.Tag}
              minLength={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={
              note.Title.length < 5 ||
              note.Description.length < 10 ||
              note.Tag.length < 3
            }
            className="btn btn-primary"
            onClick={btnclick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default Addnote;
