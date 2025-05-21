/**
 * main.js
 * App routing and loader for ePhepha - Matric Power
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('ePhepha application initialized');
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Determine current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  console.log(`Current page: ${currentPage}`);
  
  // Load page-specific functionality
  switch (currentPage) {
    case 'physics.html':
      // Only import physics module if we're on the physics page
      import('./physics.js')
        .then(module => {
          console.log('Physics module loaded');
          module.initPhysics();
        })
        .catch(err => console.error('Failed to load physics module:', err));
      break;
    
    case 'math.html':
      console.log('Math page loaded - functionality coming soon');
      showComingSoonNotification('Mathematics');
      break;
      
    case 'english.html':
      console.log('English page loaded - functionality coming soon');
      showComingSoonNotification('English');
      break;
      
    case 'index.html':
    case '':
      initHomePage();
      break;
      
    default:
      console.log('Unknown page');
  }
  
  // Always load motivation system
  import('./motivation.js')
    .then(module => {
      console.log('Motivation system loaded');
      module.initMotivation();
      updateStreakDisplay();
    })
    .catch(err => console.error('Failed to load motivation system:', err));
    
  // Setup common UI elements
  setupFooterNavigation();
}

/**
 * Initialize home page with subject selection
 */
function initHomePage() {
  console.log('Home page initialized');
  
  // Find all subject links and add click listeners
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a "Coming Soon" subject, prevent navigation
      if (link.querySelector('.text-gray-500')) {
        e.preventDefault();
        const subjectName = link.querySelector('span').textContent.trim();
        showComingSoonNotification(subjectName);
      }
    });
  });
  
  // Update progress circle
  updateProgressCircle();
}

/**
 * Display a notification for coming soon features
 * @param {string} feature - The feature that's coming soon
 */
function showComingSoonNotification(feature) {
  alert(`${feature} lessons are coming soon! Stay tuned for updates.`);
}

/**
 * Update the progress circle on the home page
 */
function updateProgressCircle() {
  const progressCircle = document.querySelector('svg path:nth-child(2)');
  const progressText = document.querySelector('.absolute .text-3xl');
  
  if (progressCircle && progressText) {
    // Get progress from localStorage or default to 25%
    const progress = Number(localStorage.getItem('overallProgress')) || 25;
    
    // Validate progress is between 0 and 100
    const validProgress = Math.min(Math.max(progress, 0), 100);
    
    // Calculate stroke dasharray based on progress (assuming circumference 100)
    progressCircle.setAttribute('stroke-dasharray', `${validProgress}, 100`);
    
    // Update text
    progressText.textContent = `${validProgress}%`;
  }
}

/**
 * Update streak display in the header
 */
function updateStreakDisplay() {
  // Select the specific streak element by a more precise selector
  const streakElement = document.querySelector('.bg-blue-800 .font-bold');
  
  if (streakElement) {
    // Get streak from localStorage or default to 7
    const streakRaw = localStorage.getItem('streak');
    const streak = streakRaw !== null ? Number(streakRaw) : 7;
    
    // Validate streak is a positive number
    const validStreak = Number.isInteger(streak) && streak > 0 ? streak : 7;
    
    streakElement.textContent = `${validStreak} days`;
  }
}

/**
 * Setup footer navigation with active states
 */
function setupFooterNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Highlight the active tab
  const footerLinks = document.querySelectorAll('footer a');
  footerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('bg-blue-700', 'p-2', 'rounded-full');
    } else {
      // Remove active styling if present for other links (cleanup)
      link.classList.remove('bg-blue-700', 'p-2', 'rounded-full');
    }
  });
}

export {
  initApp,
  updateStreakDisplay
};
