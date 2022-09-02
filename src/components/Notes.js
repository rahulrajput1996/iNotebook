import React, { useEffect, useRef, useContext, useState } from "react";
import Notecontext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

function Notes() {
  let navigate = useNavigate();
  const mynotes = useContext(Notecontext);
  const { notes, fetchnotes, updatenote, alertbtn } = mynotes;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchnotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    ETitle: "",
    EDescription: "",
    ETag: "",
  });

  const editpost = () => {
    updatenote(note.id, note.ETitle, note.EDescription, note.ETag);
    refClose.current.click();
    alertbtn("success", "Successfully: Your note is updated");
  };

  const myupdatenote = (content) => {
    ref.current.click();
    setNote({
      id: content._id,
      ETitle: content.title,
      EDescription: content.description,
      ETag: content.tag,
    });
  };

  const mychange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="mytitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emytitle"
                    aria-describedby="emailHelp"
                    name="ETitle"
                    value={note.ETitle}
                    onChange={mychange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mydescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emydescription"
                    name="EDescription"
                    value={note.EDescription}
                    onChange={mychange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mytag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emytag"
                    name="ETag"
                    value={note.ETag}
                    onChange={mychange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={editpost}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="container">
        <h1>Your Notes here</h1>

        {notes.length === 0 && <h1>No notes to display</h1>}
      </div>
      <div className="container row my-3">
        {notes.map((obj) => {
          return (
            <Noteitem note={obj} key={obj.date} myupdatenote={myupdatenote} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
