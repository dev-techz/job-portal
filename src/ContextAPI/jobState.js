import React, { useState } from 'react'
import jobContext from './jobContext';


const JobState = (props) => {

  const host = "https://tiny-teal-deer-hose.cyclic.app";

  const [jobs, setJobs] = useState([])

  // fetch all jobs
  const fetchAllJobs = async () => {
    // API logic 
    const response = await fetch(`${host}/fetchalljobs`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setJobs(json);
  }

  // Add a note
  const addJobs = async (title, description, location, role) => {
    // API logic 
    const response = await fetch(`${host}/addjob`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, location, role })
    });
  }

  // apply for job
  const applyJob = async (id, username, email, number, role, location) => {
    //API Logic
    if (username === undefined || email === undefined || number === undefined) {

    } else {
      const response = await fetch(`${host}/applyjob/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ id, username, email, number, role, location })
      });
      const json = await response.json();
    }

  }

  return (
    <jobContext.Provider value={{ jobs, fetchAllJobs, addJobs, applyJob }}>
      {props.children}
    </jobContext.Provider>
  )
}

export default JobState;