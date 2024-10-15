import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import PasswordStrength from "./Components/PasswordStrength";
function App() {
  const [name, setStudentName] = useState("");
  const [tech, setTechnology] = useState("");
  const [stack, setSub] = useState("");
  const submitReview = () => {
    Axios.post("http://localhost:9000/router1/send", {
      name: name,
      tech: tech,
      stack: stack,
    }).then(() => {
      alert("success");
    });
  };
  return (
    <div className="App">
      <h1>CRUD Application Demo</h1>
      <div className="information">
        <label><b>Student Name</b></label>
        <input type="text" name="name" onChange={(e) => {setStudentName(e.target.value);}} required/>
        <label><b>Technology</b></label>
        <input type="text" name="tech" onChange={(e) => {setTechnology(e.target.value);}} required/>
        <label><b>Stack</b></label>
        <input type="text" name="stack" onChange={(e) => {setSub(e.target.value);}} required/>
        <button onClick={submitReview}><b>Submit</b></button>
      </div>
      <div><PasswordStrength/></div>
    </div>
  );
}
export default App;
