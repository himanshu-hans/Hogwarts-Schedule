const { Given, When, Then, After } = require('@cucumber/cucumber');
const assert = require('assert');
// Dynamically import `chai`
let expect;
(async () => {
  const chaiModule = await import('chai');
  expect = chaiModule.expect;
})();

let studentList = [];

Given('the following teachers are present:', function (dataTable) {
  teacherList = dataTable.hashes().map((row) => ({
    name: row.Teacher,
    attendance: row.Attendance
  }));
});

Given('the following students have their teacher allocations:', function (dataTable) {
  studentList = dataTable.hashes().map((row) => ({
    name: row.Student,
    subject: row.Subject,
    allocatedTeacher: row['Allocated Teacher'] || null
  }));
});

When('I view the "Current Schedule"', function () {
  // Update the current schedule based on teacher attendance
  studentList = studentList.map((student) => {
    const assignedTeacher = teacherList.find(
      (teacher) => teacher.name === student.allocatedTeacher
    );

    if (!assignedTeacher || assignedTeacher.attendance === "Absent") {
      const fallbackTeacher = teacherList
        .filter((teacher) => teacher.attendance === "Present")
        .sort((a, b) => a.hierarchy - b.hierarchy)[0];
      return {
        ...student,
        currentTeacher: fallbackTeacher ? fallbackTeacher.name : "Not Assigned"
      };
    }

    return {
      ...student,
      currentTeacher: assignedTeacher.name
    };
  });
});

Then('I should see the following teacher assignments:', function (dataTable) {
  // Verify the teacher assignments are correct
  dataTable.hashes().forEach((expectedRow) => {
    const student = studentList.find(
      (s) => s.name === expectedRow.Student
    );
    assert.strictEqual(student.currentTeacher, expectedRow.Teacher);
  });
});

When('I change "{string}" attendance to "{string}"', function (teacherName, attendanceStatus) {
  // Update the attendance of a teacher
  const teacher = teacherList.find((t) => t.name === teacherName);
  if (teacher) {
    teacher.attendance = attendanceStatus;
  }
});

Then('I should see the following updated teacher assignments:', function (dataTable) {
  // Verify the updated teacher assignments are correct after attendance changes
  dataTable.hashes().forEach((expectedRow) => {
    const student = studentList.find(
      (s) => s.name === expectedRow.Student
    );
    assert.strictEqual(student.currentTeacher, expectedRow.Teacher);
  });
});