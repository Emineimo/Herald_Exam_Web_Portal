import React, { useState,useEffect } from 'react';
import Display from "./components/Display";
import Examinationpage from './components/Examinationpage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Donepage from './components/Donepage';


function App() {
  const [Questions, setQuestions] = useState(null)
  const [ShuffledQuestion, setShuffledQuestion] = useState(null)
  const [subject, setSubject] = useState(null)
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [TermAccessible, setTermAccessible] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [TotalMinutes, setTotalMinutes] = useState(0)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Display
          setTotalMinutes={setTotalMinutes}
            Questions={Questions}
            setQuestions={setQuestions}
            setSubject={setSubject}
            setPassword={setPassword}
            Password={Password}
            setUsername={setUsername}
            Username={Username}
            TotalMinutes={TotalMinutes}
            studentData ={studentData}
             setStudentData = {setStudentData}
            TermAccessible={TermAccessible}
            setTermAccessible={setTermAccessible}
            subject={subject} />} />
          <Route path='/Examinationpage' element={<Examinationpage
            Questions={Questions}
            setSubject={setSubject}
            subject={subject}
            TotalMinutes={TotalMinutes}
            setPassword={setPassword}
            Password={Password}
            setUsername={setUsername}
            studentData ={studentData}
             setStudentData = {setStudentData}
            TermAccessible={TermAccessible}
            setTermAccessible={setTermAccessible}
            Username={Username} />} />
          <Route path='/Donepage' element={<Donepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
