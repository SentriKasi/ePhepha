/**
 * physics.js
 * Logic for physics lessons for ePhepha - Matric Power
 */

// Import functions from other modules
import { updateStreak } from './motivation.js';

// Track user progress in the physics lessons
let currentUnit = 8; // Based on the HTML, unit 8 is "In progress"
let currentSection = 1; // Start with the first section of the current unit
let userScore = 0;

/**
 * Initialize the physics module
 */
function initPhysics() {
  console.log('Physics module initialized');
  
  // Load saved progress if available
  loadUserProgress();
  
  // Set up unit click handlers
  setupUnitClickHandlers();
  
  // Update progress indicators
  updateProgressBar();
  
  // If we're on the practice section, load questions
  if (window.location.hash === '#practice') {
    loadPracticeSession();
  }
}

/**
 * Load user progress from localStorage
 */
function loadUserProgress() {
  const savedUnit = localStorage.getItem('currentPhysicsUnit');
  const savedSection = localStorage.getItem('currentPhysicsSection');
  const savedScore = localStorage.getItem('physicsScore');
  
  if (savedUnit) currentUnit = parseInt(savedUnit, 10);
  if (savedSection) currentSection = parseInt(savedSection, 10);
  if (savedScore) userScore = parseInt(savedScore, 10);
  
  console.log(`Loaded progress: Unit ${currentUnit}, Section ${currentSection}, Score: ${userScore}`);
}

/**
 * Save user progress to localStorage
 */
function saveUserProgress() {
  localStorage.setItem('currentPhysicsUnit', currentUnit.toString());
  localStorage.setItem('currentPhysicsSection', currentSection.toString());
  localStorage.setItem('physicsScore', userScore.toString());
  
  console.log(`Saved progress: Unit ${currentUnit}, Section ${currentSection}, Score: ${userScore}`);
  
  // Update overall app progress
  updateOverallProgress();
}

/**
 * Update the overall application progress
 */
function updateOverallProgress() {
  // Calculate progress percentage based on completed units
  const totalUnits = 10;
  const completedUnits = currentUnit - 1; // Units before current are completed
  const progressPercentage = Math.floor((completedUnits / totalUnits) * 100);
  
  // Store to localStorage for the main app to use
  localStorage.setItem('overallProgress', progressPercentage.toString());
}

/**
 * Update the progress bar at the top of the physics page
 */
function updateProgressBar() {
  const progressBar = document.querySelector('.bg-blue-600');
  const progressText = document.querySelector('.text-right.text-sm');
  
  if (progressBar && progressText) {
    // Calculate progress percentage
    const completedUnits = currentUnit - 1; // Units before the current one
    const totalUnits = 10;
    const percentage = Math.min(Math.floor((completedUnits / totalUnits) * 100), 100);
    
    // Update progress bar
    progressBar.style.width = `${percentage}%`;
    
    // Update text
    progressText.textContent = `${completedUnits}/${totalUnits} units explored`;
  }
}

/**
 * Set up click handlers for unit sections
 */
function setupUnitClickHandlers() {
  const unitSections = document.querySelectorAll('main section');
  
  unitSections.forEach((section, index) => {
    // Unit number is index + 1
    const unitNumber = index + 1;
    
    section.addEventListener('click', () => {
      // Only allow clicking units that are not locked
      const isLocked = section.querySelector('.bg-gray-100');
      if (!isLocked) {
        openUnit(unitNumber);
      } else {
        showLockedUnitMessage(unitNumber);
      }
    });
  });
}

/**
 * Open a specific unit
 * @param {number} unitNumber - The unit number to open
 */
function openUnit(unitNumber) {
  console.log(`Opening Unit ${unitNumber}`);
  
  // In a real app, this would navigate to the unit content
  // For now, we'll just update the current unit and save progress
  if (unitNumber > currentUnit) {
    // Advancing to a new unit
    currentUnit = unitNumber;
    currentSection = 1; // Start with first section
    saveUserProgress();
    updateProgressBar();
    
    // Simulate loading unit content
    showUnitStartMessage(unitNumber);
  } else {
    // Reviewing a previously visited unit
    showUnitReviewMessage(unitNumber);
  }
}

/**
 * Show a message when starting a new unit
 * @param {number} unitNumber - The unit being started
 */
function showUnitStartMessage(unitNumber) {
  // Find the unit title
  const unitSection = document.querySelectorAll('main section')[unitNumber - 1];
  const unitTitle = unitSection.querySelector('h2').textContent;
  
  alert(`Starting ${unitTitle}! Complete the lessons to unlock the next unit.`);
  
  // In a real app, this would redirect to the unit content page
}

/**
 * Show a message when reviewing a completed unit
 * @param {number} unitNumber - The unit being reviewed
 */
function showUnitReviewMessage(unitNumber) {
  // Find the unit title
  const unitSection = document.querySelectorAll('main section')[unitNumber - 1];
  const unitTitle = unitSection.querySelector('h2').textContent;
  
  alert(`Reviewing ${unitTitle}. Good for refreshing your knowledge!`);
  
  // In a real app, this would redirect to the unit content page
}

/**
 * Show a message when trying to access a locked unit
 * @param {number} unitNumber - The locked unit number
 */
function showLockedUnitMessage(unitNumber) {
  alert(`Unit ${unitNumber} is locked. Complete the previous units to unlock it.`);
}

/**
 * Load practice session for the current unit
 * This would load questions from the data file in a real implementation
 */
function loadPracticeSession() {
  console.log(`Loading practice session for Unit ${currentUnit}`);
  
  // In a real implementation, this would fetch questions from physics_questions.js
  // For now, we'll simulate it
  
  alert(`Practice session for Unit ${currentUnit} is ready! Complete questions to earn points and increase your streak.`);
  
  // After completing practice, update streak
  updateStreak();
}

/**
 * Complete a physics lesson and update progress
 * @param {number} unitNumber - The unit number
 * @param {number} sectionNumber - The section number
 * @param {number} earnedPoints - Points earned in this lesson
 */
function completeLesson(unitNumber, sectionNumber, earnedPoints) {
  console.log(`Completed Unit ${unitNumber}, Section ${sectionNumber}`);
  
  // Update current section
  if (unitNumber === currentUnit) {
    currentSection = sectionNumber + 1;
    
    // If we completed all sections in a unit, move to next unit
    const unitSection = document.querySelectorAll('main section')[unitNumber - 1];
    const totalSections = unitSection.querySelectorAll('li').length;
    
    if (currentSection > totalSections) {
      currentUnit++;
      currentSection = 1;
    }
  }
  
  // Update score
  userScore += earnedPoints;
  
  // Save progress
  saveUserProgress();
  
  // Update streak
  updateStreak();
  
  // Update progress bar
  updateProgressBar();
}

// Export functions for use in other modules
export {
  initPhysics,
  completeLesson
};
