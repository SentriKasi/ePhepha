/**
 * testcases.js
 * Unit testing for ePhepha application
 */

// Simple test framework
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

/**
 * Run all tests
 */
function runAllTests() {
  console.log('Running all tests...');
  
  // Reset results
  testResults.passed = 0;
  testResults.failed = 0;
  testResults.tests = [];
  
  // Run all test groups
  testMotivationSystem();
  testPhysicsModule();
  testMainApp();
  
  // Report results
  console.log(`Test results: ${testResults.passed} passed, ${testResults.failed} failed`);
  console.table(testResults.tests);
  
  return testResults;
}

/**
 * Run a single test
 * @param {string} name - Test name
 * @param {Function} testFn - Test function
 */
function runTest(name, testFn) {
  try {
    testFn();
    testResults.passed++;
    testResults.tests.push({ name, status: 'PASSED' });
    console.log(`✅ PASSED: ${name}`);
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name, status: 'FAILED', error: error.message });
    console.error(`❌ FAILED: ${name}`, error);
  }
}

/**
 * Assert that a condition is true
 * @param {boolean} condition - The condition to test
 * @param {string} message - Message to show on failure
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Test the motivation system
 */
function testMotivationSystem() {
  console.log('Testing motivation system...');
  
  runTest('Streak initialization', () => {
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = jest.fn(() => null);
    
    const motivation = require('./motivation.js');
    motivation.initMotivation();
    
    assert(motivation.currentStreak >= 0, 'Default streak should be non-negative');
    
    Storage.prototype.getItem = originalGetItem;
  });
  
  runTest('Streak updates correctly', () => {
    const mockStorage = {};
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;
    
    Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
    Storage.prototype.setItem = jest.fn((key, value) => { mockStorage[key] = value; });
    
    mockStorage.streak = '5';
    mockStorage.lastActive = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    const motivation = require('./motivation.js');
    motivation.updateStreak();
    
    assert(mockStorage.streak === '6', 'Streak should increase by 1');
    
    Storage.prototype.getItem = originalGetItem;
    Storage.prototype.setItem = originalSetItem;
  });
  
  runTest('Motivational messages are non-empty', () => {
    const motivation = require('./motivation.js');
    const message = motivation.getContextualMessage('streak');
    assert(message && message.length > 0, 'Motivational message should not be empty');
  });
}

/**
 * Test the physics module
 */
function testPhysicsModule() {
  console.log('Testing physics module...');
  
  runTest('Physics initialization', () => {
    document.body.innerHTML = `
      <div class="bg-blue-600" style="width: 0%"></div>
      <div class="text-right text-sm">0/10 units explored</div>
    `;
    
    const mockStorage = {};
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;
    
    Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
    Storage.prototype.setItem = jest.fn((key, value) => { mockStorage[key] = value; });
    
    const physics = require('./physics.js');
    physics.initPhysics();
    
    const progressBar = document.querySelector('.bg-blue-600');
    assert(progressBar.style.width !== '0%', 'Progress bar should be updated');
    
    Storage.prototype.getItem = originalGetItem;
    Storage.prototype.setItem = originalSetItem;
  });
  
  runTest('Lesson completion updates progress', () => {
    document.body.innerHTML = `
      <div class="bg-blue-600" style="width: 0%"></div>
      <div class="text-right text-sm">0/10 units explored</div>
      <section><ul><li>Section 1</li><li>Section 2</li></ul></section>
    `;
    
    const mockStorage = {};
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;
    
    Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
    Storage.prototype.setItem = jest.fn((key, value) => { mockStorage[key] = value; });
    
    mockStorage.currentPhysicsUnit = '1';
    mockStorage.currentPhysicsSection = '1';
    mockStorage.physicsScore = '0';
    
    const motivation = require('./motivation.js');
    const originalUpdateStreak = motivation.updateStreak;
    motivation.updateStreak = jest.fn();
    
    const physics = require('./physics.js');
    physics.completeLesson(1, 1, 10);
    
    assert(mockStorage.currentPhysicsSection === '2', 'Section should be incremented');
    assert(mockStorage.physicsScore === '10', 'Score should be updated');
    assert(motivation.updateStreak.mock.calls.length === 1, 'updateStreak should be called');
    
    Storage.prototype.getItem = originalGetItem;
    Storage.prototype.setItem = originalSetItem;
    motivation.updateStreak = originalUpdateStreak;
  });
}

/**
 * Test the main app
 */
function testMainApp() {
  console.log('Testing main app...');
  
  runTest('App initialization', () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { pathname: '/index.html' };
    
    const app = require('./main.js');
    app.initApp();
    
    assert(true, 'App should initialize without errors');
    
    window.location = originalLocation;
  });
  
  runTest('Page routing detection', () => {
    const pages = ['index.html', 'physics.html', 'math.html', 'english.html', 'unknown.html'];
    
    for (const page of pages) {
      const originalLocation = window.location;
      delete window.location;
      window.location = { pathname: `/${page}` };
      
      const originalConsoleLog = console.log;
      const logs = [];
      console.log = jest.fn((...args) => logs.push(args.join(' ')));
      
      const app = require('./main.js');
      app.initApp();
      
      const pageDetected = logs.some(log => log.includes(`Current page: ${page}`));
      assert(pageDetected, `App should detect ${page}`);
      
      console.log = originalConsoleLog;
      window.location = originalLocation;
    }
  });
}

module.exports = {
  runAllTests,
  assert
};

if (typeof require !== 'undefined' && require.main === module) {
  runAllTests();
}
