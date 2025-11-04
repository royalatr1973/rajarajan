/**
 * Setup Verification Script
 * Checks if all dependencies and configurations are correct
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Banking Portal Setup...\n');

const checks = [];

// Check 1: Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
checks.push({
  name: 'Node.js Version',
  passed: majorVersion >= 14,
  message: majorVersion >= 14
    ? `✓ Node.js ${nodeVersion} (Required: >= 14.0.0)`
    : `✗ Node.js ${nodeVersion} - Please upgrade to v14+`
});

// Check 2: Required directories
const requiredDirs = [
  'backend',
  'frontend',
  'backend/routes',
  'backend/middleware',
  'backend/utils',
  'backend/data',
  'frontend/css',
  'frontend/js'
];

const dirCheck = requiredDirs.every(dir => {
  const exists = fs.existsSync(path.join(__dirname, dir));
  if (!exists) console.log(`  Missing directory: ${dir}`);
  return exists;
});

checks.push({
  name: 'Project Structure',
  passed: dirCheck,
  message: dirCheck
    ? '✓ All required directories exist'
    : '✗ Some directories are missing'
});

// Check 3: Required files
const requiredFiles = [
  'backend/package.json',
  'backend/server.js',
  'backend/.env',
  'frontend/index.html',
  'frontend/css/main.css',
  'frontend/js/auth.js',
  'README.md'
];

const fileCheck = requiredFiles.every(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  if (!exists) console.log(`  Missing file: ${file}`);
  return exists;
});

checks.push({
  name: 'Required Files',
  passed: fileCheck,
  message: fileCheck
    ? '✓ All required files exist'
    : '✗ Some files are missing'
});

// Check 4: Backend dependencies
let depsCheck = false;
try {
  const packageJson = require('./backend/package.json');
  const requiredDeps = ['express', 'bcryptjs', 'jsonwebtoken', 'cors', 'helmet'];
  depsCheck = requiredDeps.every(dep => packageJson.dependencies && packageJson.dependencies[dep]);

  checks.push({
    name: 'Backend Dependencies',
    passed: depsCheck,
    message: depsCheck
      ? '✓ All required dependencies defined'
      : '✗ Missing required dependencies'
  });
} catch (error) {
  checks.push({
    name: 'Backend Dependencies',
    passed: false,
    message: '✗ Could not read package.json'
  });
}

// Check 5: Environment configuration
let envCheck = false;
try {
  const envPath = path.join(__dirname, 'backend', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  envCheck = envContent.includes('PORT=') &&
             envContent.includes('JWT_SECRET=') &&
             envContent.includes('NODE_ENV=');

  checks.push({
    name: 'Environment Configuration',
    passed: envCheck,
    message: envCheck
      ? '✓ .env file configured'
      : '✗ .env file missing required variables'
  });
} catch (error) {
  checks.push({
    name: 'Environment Configuration',
    passed: false,
    message: '✗ .env file not found (copy from .env.example)'
  });
}

// Check 6: node_modules
const nodeModulesCheck = fs.existsSync(path.join(__dirname, 'backend', 'node_modules'));
checks.push({
  name: 'Dependencies Installed',
  passed: nodeModulesCheck,
  message: nodeModulesCheck
    ? '✓ node_modules exists'
    : '✗ Run "cd backend && npm install"'
});

// Print results
console.log('='.repeat(60));
checks.forEach(check => {
  console.log(`${check.passed ? '✓' : '✗'} ${check.name}`);
  console.log(`  ${check.message}`);
  console.log();
});
console.log('='.repeat(60));

const allPassed = checks.every(check => check.passed);

if (allPassed) {
  console.log('\n🎉 Setup verification PASSED! You\'re ready to start the server.\n');
  console.log('Next steps:');
  console.log('  1. cd banking-portal/backend');
  console.log('  2. npm start (or npm run dev for development)');
  console.log('  3. Open http://localhost:5000 in your browser');
  console.log('  4. Login with username: john.doe, password: Banking@123\n');
  process.exit(0);
} else {
  console.log('\n❌ Setup verification FAILED. Please fix the issues above.\n');
  console.log('Common fixes:');
  console.log('  - Run "cd backend && npm install" to install dependencies');
  console.log('  - Copy backend/.env.example to backend/.env');
  console.log('  - Make sure Node.js v14+ is installed\n');
  process.exit(1);
}
