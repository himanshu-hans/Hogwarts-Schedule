import React from 'react';

const Attendance = ({ professors, onAttendanceChange }) => {
  return (
    <div className="section">
    <h2>Attendance</h2>
    <div className="table-container">
      <table className="teacherTable">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((teacher) => (
            <tr key={teacher.name}>
              <td>{teacher.name}</td>
              <td>
                <select
                  value={teacher.isPresent? "Present" : "Absent"}
                  onChange={(e) =>
                    onAttendanceChange(teacher.id, e.target.value)
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
  );
};

export default Attendance;