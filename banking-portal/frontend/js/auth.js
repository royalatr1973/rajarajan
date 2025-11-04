/**
 * Authentication JavaScript
 * Handles login, OTP verification, and session management
 */

// API Configuration
const API_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:5000/api'
  : '/api';

// Global state
let currentOtpIdentifier = null;
let currentCaptcha = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if already logged in
  const token = localStorage.getItem('authToken');
  if (token && window.location.pathname === '/index.html') {
    window.location.href = '/dashboard.html';
    return;
  }

  // Generate initial CAPTCHA
  refreshCaptcha();

  // Setup event listeners
  setupLoginForm();
  setupOTPInputs();
});

/**
 * Generate and display CAPTCHA
 */
function refreshCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptcha = captcha;
  document.getElementById('captchaText').textContent = captcha;
  document.getElementById('captchaInput').value = '';
}

/**
 * Setup login form submission
 */
function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;

    // Validate CAPTCHA
    if (captchaInput !== currentCaptcha) {
      showAlert('Invalid CAPTCHA. Please try again.', 'error');
      refreshCaptcha();
      return;
    }

    // Disable login button
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    loginBtn.textContent = '⏳ Signing In...';

    try {
      // Call login API
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          captcha: 'passed' // Simplified for demo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.requiresMFA) {
        // Show OTP form
        currentOtpIdentifier = data.otpIdentifier;
        showAlert('OTP sent to your registered mobile number. Check console for demo OTP.', 'success');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('otpContainer').style.display = 'block';
      } else {
        // Login successful without MFA
        handleLoginSuccess(data);
      }

    } catch (error) {
      showAlert(error.message, 'error');
      refreshCaptcha();
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = '🔐 Sign In';
    }
  });
}

/**
 * Setup OTP input handling
 */
function setupOTPInputs() {
  const otpInputs = document.querySelectorAll('.otp-input');

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const value = e.target.value;

      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        e.target.value = '';
        return;
      }

      // Move to next input
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      // Move to previous input on backspace
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Verify OTP button
  const verifyBtn = document.getElementById('verifyOtpBtn');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', verifyOTP);
  }

  // Resend OTP button
  const resendBtn = document.getElementById('resendOtpBtn');
  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      showAlert('OTP resent successfully. Check console.', 'info');
      // In production, call API to resend OTP
    });
  }
}

/**
 * Verify OTP
 */
async function verifyOTP() {
  const otpInputs = document.querySelectorAll('.otp-input');
  const otp = Array.from(otpInputs).map(input => input.value).join('');

  if (otp.length !== 6) {
    showAlert('Please enter complete 6-digit OTP', 'error');
    return;
  }

  const verifyBtn = document.getElementById('verifyOtpBtn');
  verifyBtn.disabled = true;
  verifyBtn.textContent = '⏳ Verifying...';

  try {
    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        otpIdentifier: currentOtpIdentifier,
        otp
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'OTP verification failed');
    }

    handleLoginSuccess(data);

  } catch (error) {
    showAlert(error.message, 'error');
    // Clear OTP inputs
    otpInputs.forEach(input => input.value = '');
    otpInputs[0].focus();
  } finally {
    verifyBtn.disabled = false;
    verifyBtn.textContent = '✓ Verify OTP';
  }
}

/**
 * Handle successful login
 */
function handleLoginSuccess(data) {
  // Store auth token and user info
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('userInfo', JSON.stringify(data.user));

  showAlert('Login successful! Redirecting...', 'success');

  // Redirect based on role
  setTimeout(() => {
    if (data.user.role === 'admin') {
      window.location.href = '/admin.html';
    } else {
      window.location.href = '/dashboard.html';
    }
  }, 1000);
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alertContainer');
  if (!alertContainer) return;

  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <span>${getAlertIcon(type)}</span>
    <span>${message}</span>
  `;

  alertContainer.innerHTML = '';
  alertContainer.appendChild(alert);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

/**
 * Get alert icon based on type
 */
function getAlertIcon(type) {
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };
  return icons[type] || 'ℹ';
}

/**
 * Logout function (used across all pages)
 */
async function logout() {
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userInfo');

  // Redirect to login
  window.location.href = '/index.html';
}

/**
 * Check authentication (used by protected pages)
 */
function checkAuth() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    window.location.href = '/index.html';
    return null;
  }

  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}

/**
 * Make authenticated API request
 */
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);

  // Handle unauthorized
  if (response.status === 401 || response.status === 403) {
    logout();
    throw new Error('Session expired. Please login again.');
  }

  return response;
}

// Make functions available globally
window.refreshCaptcha = refreshCaptcha;
window.logout = logout;
window.checkAuth = checkAuth;
window.fetchAPI = fetchAPI;
window.showAlert = showAlert;
