import { getProfessorName } from '../data/teachers';
import { STUDENTS } from '../data/students';
import { SUBJECTS } from '../data/subjects';

export const TARGETED_SUBJECTS = [SUBJECTS[0]]; // selecting all subjects, but any particular subject can also be select

export const initAllocations = () => {
  const allocations = [];
  STUDENTS.forEach((st) => {
    TARGETED_SUBJECTS.forEach((sub) => {
      const prof = st?.allocations?.[sub];
      let professor = null;
      if (prof) {
        professor = {
          id: prof,
          name: getProfessorName(prof),
        };
      }

      allocations.push({
        key: `${st.id}-${sub}`,
        studentId: st.id,
        studentName: st.name,
        subject: sub,
        professor,
        studentAvatar: st.avatar,
      });
    });
  });
  return allocations;
};

export const INITIAL_ALLOCATION = initAllocations();
// unique professor id
export const allocatedProfessors = new Set(
  INITIAL_ALLOCATION.filter((al) => !!al.professor)?.map(
    (al) => al.professor.id
  )
);