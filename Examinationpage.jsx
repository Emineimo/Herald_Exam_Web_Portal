import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDatabase,
  get,
  child,
  ref,
  update,
  onValue,
} from "firebase/database";

import image1 from "../images/Done.gif";
const Examinationpage = ({
  TotalMinutes,
  Questions,
  TermAccessible,
  setTermAccessible,
  studentData, setStudentData,
  setSubject,
  subject,
  Username,
  setUsername,
  Password,
  setPassword,
}) => {
  const [currentNo, setCurrentNo] = useState(0);
  const [checked, setchecked] = useState("first");
  const [minute, setMinute] = useState(TotalMinutes);
  const [seconds, setSeconds] = useState(0);
  const [myanswer, setmyanswer] = useState([]);
  const [StudentAnswers, setStudentAnswers] = useState([]);
  const [start, setStart] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [scenerio, setScenerio] = useState(null);
  const navigate = useNavigate();
  // const startingminute = 120;
  // let time = startingminute * 60;

  // const countdownEl = document.getElementById("countdown");
  // setInterval(updateCountdown, 1000);
  // function updateCountdown(e) {
  //   const minutes = Math.floor(time / 60);
  //   let seconds = time % 60;
  //   seconds = seconds < 10 ? '0' + seconds : seconds;
  //   countdownEl.innerHTML = `${minutes} : ${seconds}`;
  //   time--;
  // }
  function finish() {
    try {
      const br = [];
      myanswer.filter((data, i, a) => {
        if (data > 0) {
          br.push(data);
        }
      });
      let score = br.length;
      setScore(br.length);
      // alert(score)
      setSubmitted(true);
      const db = getDatabase();
      update(
        ref(
          db,
          "ListOfStudents/" + `${Password}/` + `${TermAccessible}/` + subject
        ),
        {
          subject: score,
          // Subjects_Handled: []
        }
      ).then(alert("Data saved successfully!"));
    } catch (error) {
      alert(error);
    }
  }
// useEffect(() => {
  
//  const data = Questions.sort((a,b)=> 0.5 - Math.random())
//   ShuffleArray(Questions)
// }, [Questions])

  // For Timer

  useEffect(() => {
    if (start == true) {
      if (minute > -1) {
        const timer = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);

        if (seconds == 0) {
          setMinute(minute - 1);
          setSeconds(59);
        }

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [seconds]);

  useEffect(() => {
    if (minute == -1) {
      setSubmitted(true);
      finish();
      setScenerio("Time Up");
    }

    // return () => {
    //   second
    // }
  }, [seconds]);

  
   
  // Marking system
  useEffect(() => {
    if (Questions) {
      StudentAnswers[currentNo -1] === Questions[currentNo][2] ?
      (myanswer[currentNo ] = 1)
      :
      (myanswer[currentNo ] = 0);
    }
    
  }, [checked])

  useEffect(() => {
    if (StudentAnswers[currentNo - 1] == 'A') {
      setchecked(0)
    } else {
      if (StudentAnswers[currentNo - 1] == 'B') {
        setchecked(1)
      } else {
        if (StudentAnswers[currentNo - 1] == 'C') {
          setchecked(2)
        }
        else {
          if (StudentAnswers[currentNo - 1] == 'D') {
            setchecked(3)
          }
          else { setchecked('z') }
        }
      }
    }
  }, [currentNo])

  //Shuffling
  const ShuffleArray = array =>  {
    for (let i = array.length - 1; i >0; i--  ){
      const j =Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    // return array
  }
function refresh() {
  navigate("/")
  setStudentData(null);
      setSubject(null);
      setPassword(null);
      setUsername(null);
}
  return (
    <>
      {submitted === true && (
        <div>
          <div className="done-img">
            <img src={image1} alt="loading..." className="done" />
          </div>
          <div className="info">
            <h3>{scenerio}!</h3>
            <p>
              You have successfully <br /> completed the examination.
            </p>
           
          </div>
          <div className="dones">
            <button type="submit" className="back-btns" onClick={refresh}>
              Sign out
            </button>
          </div>
        </div>
      )}
      {submitted === false && (
        <div className="Examinationpage">
          {Questions !== null && (
            <div className="second">
              <div className="exam-subject">
                <h3>{subject}</h3>
              </div>
              <div className="question-num">
                <div className="question-div">
                {Questions? <p>
                    <span className="medium">Question</span>
                    <span className="big">{currentNo+1}</span>/{Questions.length - 1}
                  </p>:
                  null}
                </div>
                <div className="countdown">
                {minute?
                <div id="countdown">
                {minute.toString().length > 1 ? (
                  <h1
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: 20,
                    }}
                  >
                    {minute} :{" "}
                  </h1>
                ) : (
                  <h1
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: 20,
                    }}
                  >
                    0{minute} :{" "}
                  </h1>
                )}

                {seconds.toString().length > 1?  (
                  <h1
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: 20,
                    }}
                  >
                    {seconds}
                  </h1>
                ) : (
                  <h1
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: 20,
                    }}
                  >
                    0{seconds}
                  </h1>
                )}
              </div>:null}  
                </div>
                <div className="timer">
                  <button
                    onClick={finish}
                    className="submit-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
              {Questions? 
               <div className="flexbox">
                <div className="question-area">
                  <div className="question">
                  <p>{Questions[currentNo][1]}</p> 
                  </div>
                  {Questions[currentNo][4].Options.map((data, index) => (
                    <div
                      className="exam-div"
                      value={index}
                      onClick={() => {
                        setchecked(index);
                        if (index === 0) {
                          StudentAnswers[currentNo-1] = "A";
                        } else {
                          if (index === 1) {
                            StudentAnswers[currentNo-1] = "B";
                          } else if (index === 2) {
                            StudentAnswers[currentNo-1] = "C";
                          } else if (index === 3) {
                            StudentAnswers[currentNo-1] = "D";
                          } 
                        }
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="radio-input"
                        id="radios"
                        type="radio"
                        name="Questions"
                        onClick={() => {
                          setchecked(index);
                          if (index === 0) {
                            StudentAnswers[currentNo-1] = "A";
                          } else {
                            if (index === 1) {
                              StudentAnswers[currentNo-1] = "B";
                            } else if (index === 2) {
                              StudentAnswers[currentNo-1] = "C";
                            } else if (index === 3) {
                              StudentAnswers[currentNo-1] = "D";
                            }
                          }
                        }}
                        value={index}
                        checked={checked === index }
                      />
                      <div className="options">
                        <p>{data}</p>
                      </div>
                    </div>
                  ))}
                  <button
                    className="back-btn"
                    type="submit"
                    onClick={() =>
                      currentNo > 0 ? (setCurrentNo(currentNo - 1),setScenerio("Congratulations")) : null
                    }
                  >
                    Back
                  </button>
                  <button
                    onClick={() =>
                      currentNo < Questions.length - 2 ?setCurrentNo(currentNo + 1) : null
                    }
                    className="back-btn"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
                <div className="numbers">
                  {Questions.map((data, index) => (
                    <div 
                    ref={data}
                    >
                      <button
                        className="btns "
                        onClick={() => setCurrentNo(index)}
                        style={{
                          backgroundColor:
                            StudentAnswers[index-1] == null
                              ? "lightgrey"
                              : StudentAnswers[index-1] > 0
                              ? "lightgrey"
                              : "#d6491e",
                              borderWidth:2,
                              borderColor: index === currentNo ? 'green' : 'grey',
                        }}
                      >
                        {index+1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              : null}  
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Examinationpage;
