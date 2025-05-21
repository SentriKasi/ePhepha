/**
 * motivation.js
 * Handles streaks, motivational messages, and user engagement for ePhepha
 */

// Constants
const MOTIVATIONAL_MESSAGES = [
  "Awe fede! You're on your way to that distinction! 💯",
  "Keep it up! You're becoming stronger than yesterday! 💪",
  "One lesson at a time, that's how you build your future! 🚀",
  "The path to success is taken one step at a time! 🏆",
  "Matric power! Keep pushing, you're doing amazing! ⚡",
  "Consistency is key! Your streak is proof of your commitment! 🔥",
  "Every question you answer is one step closer to your goals! 📚",
  "You're putting in the work now for rewards later! 🌟",
  "The grind doesn't stop! Keep that streak alive! 💥",
  "Distinction loading... Keep going! 📈"
];

const STREAK_MESSAGES = [
  "First day! The journey begins! 🌱",
  "Day 2! Building momentum! 🚶",
  "Day 3! You're finding your rhythm! ⏱️",
  "Day 4! Impressive dedication! 👏",
  "Day 5! You're building a great habit! 📝",
  "Day 6! Almost a week, amazing work! ⭐",
  "1 week streak! What an achievement! 🔥",
  "8 days and counting! You're unstoppable! 🚀",
  "9 days straight! Your future self thanks you! 🙏",
  "10 days! Double digits now! 💯",
  "2 weeks! Now that's dedication! 🏆",
  "3 weeks! You're making this a lifestyle! 💪",
  "30 days! A whole month of learning! 🎉"
];

// State variables
let currentStreak = 0;
let lastActive = null;
let totalPoints = 0;

/**
 * Initialize the motivation system
 */
function initMotivation() {
  console.log('Motivation system initialized');

  loadMotivationData();
  checkDailyStreak();
  updateMotivationUI();

  if (Math.random() > 0.5) {
    showRandomMotivationalMessage();
  }
}

/**
 * Load motivation data from localStorage
 */
function loadMotivationData() {
  currentStreak = parseInt(localStorage.getItem('streak') ?? '7', 10);
  lastActive = localStorage.getItem('lastActive') ?? new Date().toISOString().split('T')[0];
  totalPoints = parseInt(localStorage.getItem('totalPoints') ?? '1250', 10);

  console.log(`Loaded motivation data: ${currentStreak} day streak, ${totalPoints} points`);
}

/**
 * Save motivation data to localStorage
 */
function saveMotivationData() {
  localStorage.setItem('streak', currentStreak.toString());
  localStorage.setItem('lastActive', lastActive);
  localStorage.setItem('totalPoints', totalPoints.toString());

  console.log(`Saved motivation data: ${currentStreak} day streak, ${totalPoints} points`);
}

/**
 * Check if the user maintained their daily streak
 */
function checkDailyStreak() {
  const today = new Date().toISOString().split('T')[0];

  if (lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (lastActive === yesterdayString) {
      currentStreak++;
      showStreakIncreasedMessage();
    } else {
      // Realistically reset streak here, but for demo keep as is
      showStreakMessage();
    }

    lastActive = today;
    saveMotivationData();
  }
}

/**
 * Update streak counter after completing an activity
 */
function updateStreak() {
  const today = new Date().toISOString().split('T')[0];

  if (lastActive !== today) {
    lastActive = today;
    currentStreak++;
    saveMotivationData();
    updateMotivationUI();
    showStreakIncreasedMessage();
  }
}

/**
 * Add points to the user's total
 * @param {number} points - Points to add
 */
function addPoints(points) {
  totalPoints += points;
  saveMotivationData();
  updateMotivationUI();
  showPointsEarnedMessage(points);
}

/**
 * Update motivation-related UI elements
 */
function updateMotivationUI() {
  const streakElement = document.querySelector('.bg-blue-800 .font-bold');
  if (streakElement) {
    streakElement.textContent = `${currentStreak} days`;
  }

  const pointsElements = document.querySelectorAll('.bg-blue-800 .font-bold');
  if (pointsElements.length > 1) {
    pointsElements[1].textContent = totalPoints.toLocaleString();
  }
}

/**
 * Show a random motivational message
 */
function showRandomMotivationalMessage() {
  const messageIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  const message = MOTIVATIONAL_MESSAGES[messageIndex];

  console.log(`Motivation: ${message}`);

  const messagePanel = document.querySelector('.bg-blue-50.p-6');
  if (messagePanel) {
    const messageElement = messagePanel.querySelector('.text-lg');
    if (messageElement) {
      messageElement.textContent = message;
    }
  }
}

/**
 * Show streak increased message
 */
function showStreakIncreasedMessage() {
  let messageIndex = Math.min(currentStreak - 1, STREAK_MESSAGES.length - 1);
  messageIndex = Math.max(0, messageIndex);
  const message = STREAK_MESSAGES[messageIndex];

  console.log(`Streak: ${message}`);
}

/**
 * Show current streak message
 */
function showStreakMessage() {
  const streakMessage = `Current streak: ${currentStreak} days! Keep it going!`;
  console.log(streakMessage);

  const streakElement = document.querySelector('.bg-blue-100.text-blue-800');
  if (streakElement) {
    streakElement.textContent = streakMessage;
  }
}

/**
 * Show points earned message
 * @param {number} points - Points earned
 */
function showPointsEarnedMessage(points) {
  console.log(`🎉 You earned ${points} points!`);
}

/**
 * Get a motivational message for the current situation
 * @param {string} context - The context (e.g., 'streak', 'completion')
 * @returns {string} A motivational message
 */
function getContextualMessage(context) {
  switch (context) {
    case 'streak':
      return `${currentStreak} day streak! ${currentStreak > 7 ? 'Impressive!' : 'Keep it up!'}`;
    case 'completion':
      return "Great job completing this lesson! Ready for the next challenge?";
    case 'correct':
      return "Correct! Your hard work is paying off!";
    case 'incorrect':
      return "Not quite, but mistakes are how we learn. Try again!";
    default:
      return MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
  }
}

export {
  initMotivation,
  updateStreak,
  addPoints,
  getContextualMessage
};
