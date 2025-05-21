// physics_questions.js
/**
 * physics_questions.js
 * Contains physics questions data for ePhepha app
 */

const physicsQuestions = [
  {
    unit: 1,
    section: 1,
    questions: [
      {
        id: '1-1-1',
        question: `A block of mass 5 kg is resting on a frictionless inclined plane inclined at 30° to the horizontal. Calculate the acceleration of the block as it slides down the plane.`,
        type: 'numeric',
        answer: 4.9, // expected acceleration in m/s²
        explanation: `The acceleration a = g * sin(θ) = 9.8 * sin(30°) = 4.9 m/s²`
      },
      {
        id: '1-1-2',
        question: `Explain Newton's Second Law of Motion and provide an example demonstrating its application.`,
        type: 'text',
        answer: null,
        explanation: `Newton's Second Law states that Force equals mass times acceleration (F = ma). For example, pushing a car requires a force proportional to its mass and acceleration.`
      }
    ]
  },
  {
    unit: 1,
    section: 2,
    questions: [
      {
        id: '1-2-1',
        question: `Calculate the force required to accelerate a 10 kg object at 2 m/s².`,
        type: 'numeric',
        answer: 20,
        explanation: `F = ma = 10 * 2 = 20 N`
      },
      {
        id: '1-2-2',
        question: `A car accelerates from rest to 20 m/s in 5 seconds. Calculate its acceleration.`,
        type: 'numeric',
        answer: 4,
        explanation: `a = (v - u)/t = (20 - 0)/5 = 4 m/s²`
      }
    ]
  },
  {
    unit: 2,
    section: 1,
    questions: [
      {
        id: '2-1-1',
        question: `Define kinetic energy and write its formula.`,
        type: 'text',
        answer: null,
        explanation: `Kinetic energy is the energy possessed by a body due to its motion. Formula: KE = 1/2 mv²`
      },
      {
        id: '2-1-2',
        question: `Calculate the kinetic energy of a 2 kg object moving at 3 m/s.`,
        type: 'numeric',
        answer: 9,
        explanation: `KE = 1/2 * 2 * 3² = 9 J`
      }
    ]
  },
  {
    unit: 3,
    section: 1,
    questions: [
      {
        id: '3-1-1',
        question: `State and explain the law of conservation of momentum.`,
        type: 'text',
        answer: null,
        explanation: `The total momentum of a closed system remains constant if no external forces act on it. Momentum before collision equals momentum after collision.`
      },
      {
        id: '3-1-2',
        question: `Two objects, 3 kg and 5 kg, move towards each other with velocities 4 m/s and -2 m/s respectively. Calculate their total momentum.`,
        type: 'numeric',
        answer: 4,
        explanation: `Total momentum = (3 * 4) + (5 * -2) = 12 - 10 = 2 kg·m/s`
      }
    ]
  },
  // Add more units and sections as needed, following this structure
];

module.exports = physicsQuestions;
