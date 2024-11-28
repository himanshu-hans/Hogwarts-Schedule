export const TEACHERS = [
  {
    name: "Professor Dumbledore",
    id: 1,
    role: "Headmaster",
    isPresent: "Present",
  },
  {
    name: "Minerva McGonagall",
    id: 2,
    role: "Headmistress",
    isPresent: "Present",
  },
  { name: "Horace Slughorn", id: 3, role: "Professor", isPresent: "Present" },
  { name: "Severus Snape", id: 4, role: "Professor", isPresent: "Present" },
  { name: "Rubeus Hagrid", id: 5, role: "Professor", isPresent: "Present" },
];

export const getProfessorName = (id) =>
  TEACHERS.find((item) => item.id === id)?.name || '';