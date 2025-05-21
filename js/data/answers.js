// answers.js
/**
 * answers.js
 * Contains detailed solutions linked to physics questions by ID
 */

const answers = {
  '1-1-1': {
    solution: `The block slides down a frictionless inclined plane with an acceleration given by a = g * sin(θ).
Here, g = 9.8 m/s², θ = 30°.
So, a = 9.8 * sin(30°) = 9.8 * 0.5 = 4.9 m/s².`
  },
  '1-1-2': {
    solution: `Newton's Second Law states that Force (F) equals mass (m) times acceleration (a).
Example: If you push a cart with mass 10 kg to accelerate at 2 m/s², the force applied is F = 10 * 2 = 20 N.`
  },
  '1-2-1': {
    solution: `Force required is calculated by F = ma.
Given m = 10 kg, a = 2 m/s²,
F = 10 * 2 = 20 N.`
  },
  '1-2-2': {
    solution: `Acceleration a = (final velocity - initial velocity) / time.
Here, v = 20 m/s, u = 0 m/s, t = 5 s,
So, a = (20 - 0)/5 = 4 m/s².`
  },
  '2-1-1': {
    solution: `Kinetic energy is energy of motion.
Formula: KE = 1/2 * m * v²,
where m = mass, v = velocity.`
  },
  '2-1-2': {
    solution: `Calculate KE = 1/2 * m * v²,
m = 2 kg, v = 3 m/s,
KE = 0.5 * 2 * 9 = 9 Joules.`
  },
  '3-1-1': {
    solution: `The law of conservation of momentum states total momentum remains constant in an isolated system.
If no external forces act, total momentum before and after collision is equal.`
  },
  '3-1-2': {
    solution: `Calculate total momentum:
p = m1*v1 + m2*v2 = 3*4 + 5*(-2) = 12 - 10 = 2 kg·m/s.`
  }
  // Add more solutions as needed following question IDs
};

module.exports = answers;
