import './App.css';
import { Jobs } from './Components/Jobs';
import { Navbar } from './Components/Navbar';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import JobState from './ContextAPI/jobState';
import { useState } from 'react';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import {Alert} from './Components/Alert';

function App() {

  const [alertinfo, setalertinfo] = useState({ message: "", type: "" })
  const showAlert = (message, type) => {
    setalertinfo({
      message: message,
      type: type
    })
    setTimeout(() => {
      setalertinfo({ message: "", type: "" });
    }, 1800);
  }

  return (
    <div>
      <JobState>
        <BrowserRouter>
          <Navbar />
          <Alert message={alertinfo.message} type={alertinfo.type} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Jobs showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </JobState>
    </div>
  );
}

export default App;
