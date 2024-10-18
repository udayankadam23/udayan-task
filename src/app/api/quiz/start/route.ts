import { NextResponse } from 'next/server';

const dummyQuizData = [
  {
    id: 1,
    text: "What is Newton's first law of motion?",
    options: [
      "F = ma",
      "An object at rest stays at rest unless acted upon by an external force",
      "Every action has an equal and opposite reaction",
      "Energy cannot be created or destroyed"
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    text: "Which planet has the Great Red Spot?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: 2,
  },
  {
    id: 4,
    text: "What is the speed of light in vacuum?",
    options: ["299,792 km/s", "300,000 km/s", "3,000,000 km/s", "30,000 km/s"],
    correctAnswer: 0,
  },
  {
    id: 5,
    text: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Ernest Hemingway", "Harper Lee", "F. Scott Fitzgerald", "John Steinbeck"],
    correctAnswer: 1,
  },
  {
    id: 6,
    text: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "NaCl", "CH4"],
    correctAnswer: 0,
  },
  {
    id: 7,
    text: "Which of these is not a type of elementary particle?",
    options: ["Quark", "Lepton", "Boson", "Neutron"],
    correctAnswer: 3,
  },
  {
    id: 8,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    id: 9,
    text: "What is the unit of electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctAnswer: 2,
  },
  {
    id: 10,
    text: "Who is known as the father of modern computer science?",
    options: ["Alan Turing", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
    correctAnswer: 0,
  },
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: dummyQuizData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch quiz data' }, { status: 500 });
  }
}
