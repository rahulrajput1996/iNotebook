import React from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

function Alert() {
  const myalert = useContext(Notecontext);
  const { alert } = myalert;
  return (
    <div style={{ height: "70px" }}>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
