import React from 'react'

export const JobItem = (props) => {

  const {job,updateJob} = props;

  return (
    <>
    <div className="card d-inline-block text-start my-2 mx-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">{job.description}</p>
        <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-warning btn-sm">Role</button>
                  <button type="button" className="btn btn-secondary btn-sm">{job.role}</button>
                </div>
                <br/>
                <br/>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-warning btn-sm">Location</button>
                  <button type="button" className="btn btn-secondary btn-sm">{job.location}</button>
                </div>  
      </div>
      <button className="fa-regular fa-pen-to-square fa-lg my-3 mx-2 btn btn-primary" onClick={() => { updateJob(job) }}>Apply</button>
    </div>
    </>
  )
}
