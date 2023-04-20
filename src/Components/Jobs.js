import React, { useContext, useEffect, useRef, useState } from 'react'
import jobContext from '../ContextAPI/jobContext'
import { JobItem } from './JobItem';
import { useNavigate } from 'react-router-dom';


export const Jobs = (props) => {
  const context = useContext(jobContext);
  const navigate = useNavigate();
  const { jobs, fetchAllJobs, applyJob } = context;
  const refOpen = useRef(null)
  const refClose = useRef(null)
  const [filter, setFilter] = useState(null)
  const [job, setJob] = useState({ id: "", username: "", email: "", number: "", role: "", location: "", currJob: "" })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchAllJobs();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  const updateJob = (currentJob) => {
    console.log(currentJob);
    refOpen.current.click();
    setJob({ id: currentJob._id, username: "", email: "", number: "", role: currentJob.role, location: currentJob.location, currJob: currentJob.title })
  }

  const handleClick = (e) => {
    if (job.username === "" || job.email ==="" || job.number === "") {
      refClose.current.click();
      props.showAlert("Fill all details", "danger")
    }
    else {
      applyJob(job.id, job.username, job.email, job.number, job.role, job.location)
      refClose.current.click();
      props.showAlert("Job Applied", "info")
    }
  }

  const onChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }



  return (
    <>

      <div className="dropdown">
        <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Location
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => { setFilter(null) }}>All</button></li>
          <li><button className="dropdown-item" onClick={() => { setFilter("bangalore") }}>Bangalore</button></li>
          <li><button className="dropdown-item" onClick={() => { setFilter("hyderabad") }}>Hyderabad</button></li>
          <li><button className="dropdown-item" onClick={() => { setFilter("mumbai") }}>Mumbai</button></li>
          <li><button className="dropdown-item" onClick={() => { setFilter("bhopal") }}>Bhopal</button></li>
        </ul>
      </div>

      <button ref={refOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info text-light">
              <h5 className="modal-title" id="">Applying for {job.currJob}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="username" value={job.username} name="username" onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Id</label>
                  <input type="text" className="form-control" id="email" value={job.email} name="email" onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact No.</label>
                  <input type="text" className="form-control" id="number" name="number" value={job.number} onChange={onChange} required />
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-warning" >Role</button>
                  <button type="button" className="btn btn-secondary" >{job.role}</button>
                </div>
                <br />
                <br />
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-warning">Location</button>
                  <button type="button" className="btn btn-secondary">{job.location}</button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="submit" className="btn btn-success ">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <h2 className=''>Jobs Avilable</h2>
        {jobs.map((e) => {

          if (filter === e.location || filter === null)
            return <JobItem key={e._id} updateJob={updateJob} showAlert={props.showAlert} job={e} />;
          else
            return false
        })}
      </div>
    </>
  )
}
