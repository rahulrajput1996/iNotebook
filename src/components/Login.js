import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

function Login() {
  const host = "http://localhost:5000/";
  let navigate = useNavigate();
  const myalert = useContext(Notecontext);
  const { alertbtn } = myalert;

  const [user, setUser] = useState({
    Email2: "",
    Password2: "",
  });

  const loginuser = async (user) => {
    const response = await fetch(`${host}api/author/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // console.log(response);
    const myuser = await response.json();
    // console.log(myuser);
    if (myuser.success) {
      const mytoken = myuser.token;
      // console.log(mytoken);
      localStorage.setItem("auth-token", mytoken);
      navigate("/");
      alertbtn("success", "Successfully: You are logged in");
    } else {
      alertbtn("danger", "Error: Enter correct credentials ! Try agian");
    }
  };

  const submitbtn = (e) => {
    e.preventDefault();
    loginuser(user);
  };

  const mychange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 className="container ">Login to iNotebook</h1>
      <form className="container" onSubmit={submitbtn}>
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
            name="Email2"
            onChange={mychange}
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
            placeholder="Enter your password"
            required
            minLength={1}
            name="Password2"
            onChange={mychange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
