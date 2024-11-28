/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SUBJECTS_MAPPING, UPPER_HIERARCHY } from '../../data/subjects';
import {
  INITIAL_ALLOCATION,
  allocatedProfessors,
  initAllocations,
} from '../constants';
import { getProfessorName } from '../../data/teachers';

const Schedule = ({ professors }) => {
  const [allocations, setAllocations] = useState(
    JSON.parse(JSON.stringify(initAllocations()))
  );

  const isPresent = (id) => {
    const matchedProf = professors?.find((item) => item.id === id);
    return matchedProf?.isPresent;
  };

  const findAvailableProf = (subject) => {
    const allSubjectProfessorsAndHeirarchy = [
      ...SUBJECTS_MAPPING[subject],
      ...UPPER_HIERARCHY,
    ];

    // professor who is present and is not already allocated
    const availableProfessorId = allSubjectProfessorsAndHeirarchy.find(
      (professorId) =>
        isPresent(professorId) && !allocatedProfessors.has(professorId)
    );
    return availableProfessorId;
  };

  useEffect(() => {
    const newAllocation = allocations.map((al, idx) => {
      if (
        INITIAL_ALLOCATION[idx].professor &&
        isPresent(INITIAL_ALLOCATION[idx].professor.id)
      ) {
        al.professor = INITIAL_ALLOCATION[idx].professor;
        return al;
      }
      const nextAvailableTeacherId = findAvailableProf(al.subject);
      if (nextAvailableTeacherId) {
        al.professor = {
          id: nextAvailableTeacherId,
          name: getProfessorName(nextAvailableTeacherId),
        };
      } else {
        al.professor = null;
      }
      return al;
    });
    setAllocations(newAllocation);
  }, [professors]);

  return (
    <div className="table-container">
      <table aria-label='allocation-table'>
        <thead>
          <tr>
            <th width='30%'>Student</th>
            <th width='30%'>Subject</th>
            <th width='100%'>Professor</th>
          </tr>
        </thead>
        <tbody>
          {allocations?.map(
            ({ key, studentName, subject, professor }) => (
              <tr key={key} aria-label={`allocation for ${studentName}`}>
                <td aria-label={studentName}>
                    {studentName}
                </td>
                <td aria-label={subject}>{subject}</td>
                <td
                  id={`assigned-professor-${
                    professor && professor.id ? professor.id : 'not-assigned'
                  }`}
                  aria-label={professor?.name || 'Not Assigned'}
                >
                  {professor?.name || (
                    <span style={{ color: 'red' }}>Not Assigned</span>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;