import React from "react";
import { useState, useEffect } from "react";

function About() {
  const host = "http://localhost:5000/";

  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    telephone: "",
  });

  const loginuser = async () => {
    const response = await fetch(`${host}api/author/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    // console.log(response);
    const userdetail = await response.json();
    // console.log(userdetail);
    if (userdetail.message) {
      // console.log(userdetail.userdetails);
      setUser({
        name: userdetail.userdetails.name,
        age: userdetail.userdetails.age,
        email: userdetail.userdetails.email,
        telephone: userdetail.userdetails.telephone,
      });
    } else {
      alert("Invalid Credentials");
    }
  };

  useEffect(() => {
    loginuser();
  }, []);

  return (
    <>
      <div className="container">
        <h1>User Details</h1>
        <table className="table table-primary table-hover table-bordered border-primary">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th scope="row">Age</th>
              <td>{user.age}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th scope="row">Telephone</th>
              <td>{user.telephone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default About;
