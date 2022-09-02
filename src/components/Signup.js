import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

function Signup() {
  const host = "http://localhost:5000/";
  let navigate = useNavigate();
  const myalert = useContext(Notecontext);
  const { alertbtn } = myalert;

  const [user, setUser] = useState({
    Name: "",
    Age: "",
    Email: "",
    Telephone: "",
    Password: "",
  });

  const adduser = async (user) => {
    const response = await fetch(`${host}api/author/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // console.log(response);
    const myuser = await response.json();
    if (myuser.success) {
      // const mytoken = myuser.token;
      // console.log(mytoken);
      // localStorage.setItem("auth-token", mytoken);
      alertbtn("success", "Successfully: Account created successfully");
      navigate("/login");
    } else {
      alertbtn("danger", "Error: Account not created ! Try agian");
    }
  };

  const submitbtn = (e) => {
    e.preventDefault();
    adduser(user);
  };

  const mychange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 className="container mb-3">Signup to iNotebook</h1>
      <form className="container" onSubmit={submitbtn}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            required
            minLength={7}
            onChange={mychange}
            name="Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAge1" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputAge1"
            aria-describedby="emailHelp"
            placeholder="Enter your age"
            required
            min={0}
            max={150}
            onChange={mychange}
            name="Age"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            required
            onChange={mychange}
            name="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTelephone1" className="form-label">
            Telephone
          </label>
          <input
            type="tel"
            className="form-control"
            id="exampleInputTelephone1"
            aria-describedby="emailHelp"
            placeholder="Enter your mobile no."
            required
            minLength={10}
            maxLength={14}
            onChange={mychange}
            name="Telephone"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
            minLength={5}
            onChange={mychange}
            name="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Signup;
