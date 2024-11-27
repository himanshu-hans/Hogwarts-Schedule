import React, { useState, useEffect } from "react";
import Samplelogo from "../../images/sample-logo.png";
import "./StudyClass.css";

const teachers = [
  { name: "Professor Dumbledore", hierarchy: 1, attendance: "Present" },
  { name: "Minerva McGonagall", hierarchy: 2, attendance: "Present" },
  { name: "Rubeus Hagrid", hierarchy: 3, attendance: "Present" },
  { name: "Horace Slughorn", hierarchy: 4, attendance: "Present" },
  { name: "Severus Snape", hierarchy: 5, attendance: "Present" },
];

const students = [
  {
    name: "Harry Potter",
    subject: "Potions Master",
    allocatedTeacher: "Horace Slughorn",
  },
  {
    name: "Draco Malfoy",
    subject: "Potions Master",
    allocatedTeacher: "Professor Dumbledore",
  },
  {
    name: "Hermione Granger",
    subject: "Potions Master",
    allocatedTeacher: "Horace Slughorn",
  },
  { name: "Padma Patil", subject: "Potions Master", allocatedTeacher: "Rubeus Hagrid" },
  {
    name: "Luna Lovegood",
    subject: "Potions Master",
    allocatedTeacher: "Severus Snape",
  },
  {
    name: "Ron Weasley",
    subject: "Potions Master",
    allocatedTeacher: "Professor Dumbledore",
  },
];

const StudyClass = () => {
  const [teacherList, updateTeacherList] = useState(teachers);
  const [studentList, updateStudentList] = useState(students);

  useEffect(() => {
    const revisedStudentList = studentList.map((student) => {
      const assignedTeacher = teacherList.find(
        (teacher) => teacher.name === student.allocatedTeacher
      );

      // If no assigned teacher or if the assigned teacher is absent
      if (!assignedTeacher || assignedTeacher.attendance === "Absent") {
        // Fallback to a teacher in the hierarchy who is present
        const fallbackTeacher = teacherList
          .filter((teacher) => teacher.attendance === "Present")
          .sort((a, b) => a.hierarchy - b.hierarchy)[0];

        return {
          ...student,
          currentTeacher: fallbackTeacher ? fallbackTeacher.name : "Not Assigned",
        };
      }

      return {
        ...student,
        currentTeacher: assignedTeacher.name,
      };
    });

    // Update the student list with the current teacher assignments
    updateStudentList(revisedStudentList);
  }, [teacherList]); // Runs when the teacherList changes

  const modifyTeacherAttendance = (teacherName, attendanceStatus) => {
    updateTeacherList((prevList) =>
      prevList.map((teacher) =>
        teacher.name === teacherName
          ? { ...teacher, attendance: attendanceStatus }
          : teacher
      )
    );
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
        <div className="section">
          <h2>Attendance</h2>
          <div className="table-container">
            <table className="studenTable">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {teacherList.map((teacher) => (
                  <tr key={teacher.name}>
                    <td>{teacher.name}</td>
                    <td>
                      <select
                        value={teacher.attendance}
                        onChange={(e) =>
                          modifyTeacherAttendance(teacher.name, e.target.value)
                        }
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="separator"></div>

        <div className="section">
          <h2>Current Schedule</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student) => (
                  <tr key={student.name}>
                    <td>{student.name}</td>
                    <td>{student.subject}</td>
                    <td>{student.currentTeacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyClass;
