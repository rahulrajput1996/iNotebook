import React from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

function Noteitem(props) {
  const mynotes = useContext(Notecontext);
  const { deletenote, alertbtn } = mynotes;
  const { note, myupdatenote } = props;
  const deletepost = () => {
    deletenote(note._id);
    alertbtn("success", "Successfully: Your note is deleted");
  };

  return (
    <>
      <div className="col-sm-3 my-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-start ">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="fa-solid fa-pen-to-square mx-3"
                onClick={() => {
                  myupdatenote(note);
                }}
              ></i>
              <i
                className="fa-solid fa-trash-can mx-3"
                onClick={deletepost}
              ></i>
            </div>
            <h5 className="card-title" style={{ color: "red" }}>
              {note.tag}
            </h5>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Noteitem;
