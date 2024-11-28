import React, { useState, useEffect } from "react";
import Samplelogo from "../../images/sample-logo.png";
import Attendance from "../attendence/Attendence";
import Schedule from "../schedule/Schedule";
import { TEACHERS } from "../../data/teachers";

// StudyClass Component
const StudyClass = () => {
  const [professors, setProfessors] = useState(TEACHERS);

  const handleAttendance = (profId, isPresent) => {
    const profMatchIdx = professors.find((prof) => prof?.id === profId);
    profMatchIdx.isPresent = isPresent == "Present" ? true : false;
    setProfessors([...professors]);
  };

  return (
    <>
      <div className="topBar">
        <a href="#" className="logo">
          <img src={Samplelogo} alt="logo" />
        </a>
        <h1 className="schedule-text">Schedule Today's</h1>
      </div>

      <div className="schedule-container">
        {/* Attendance Section */}
        <Attendance
          professors={professors}
          onAttendanceChange={handleAttendance}
        />

        <div className="separator"></div>
        
        {/* Current Schedule Section */}
        <div className="section">
          <h2>Current Schedule</h2>
          <Schedule professors={professors} />
        </div>
      </div>
    </>
  );
};

export default StudyClass;
