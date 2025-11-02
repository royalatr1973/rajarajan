/**
 * Dashboard JavaScript
 * Load and display account summary, transactions
 */

// Check authentication
const user = checkAuth();
if (!user) {
  window.location.href = '/index.html';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo();
  loadAccountSummary();
  setupUserMenu();
});

/**
 * Load and display user info
 */
function loadUserInfo() {
  if (!user) return;

  // Update welcome name
  document.getElementById('welcomeName').textContent = user.fullName || user.username;
  document.getElementById('userName').textContent = user.fullName || user.username;

  // Update avatar
  const avatar = document.getElementById('userAvatar');
  if (avatar) {
    const initials = getInitials(user.fullName || user.username);
    avatar.textContent = initials;
  }
}

/**
 * Load account summary and transactions
 */
async function loadAccountSummary() {
  try {
    // Fetch account summary
    const response = await fetchAPI('/accounts/dashboard/summary');
    const data = await response.json();

    if (data.success) {
      displayAccountSummary(data.summary);
      displayRecentTransactions(data.summary.recentTransactions);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Load summary error:', error);
    document.getElementById('accountsContainer').innerHTML = `
      <div class="alert alert-error">
        Failed to load account summary: ${error.message}
      </div>
    `;
  }
}

/**
 * Display account summary
 */
function displayAccountSummary(summary) {
  // Update stats
  document.getElementById('totalAccounts').textContent = summary.totalAccounts;
  document.getElementById('totalBalance').textContent = formatCurrency(summary.totalBalance);

  // Display accounts
  const container = document.getElementById('accountsContainer');
  container.innerHTML = '';

  if (!summary.accounts || summary.accounts.length === 0) {
    container.innerHTML = '<p>No accounts found.</p>';
    return;
  }

  summary.accounts.forEach(account => {
    const accountCard = createAccountCard(account);
    container.appendChild(accountCard);
  });
}

/**
 * Create account card element
 */
function createAccountCard(account) {
  const card = document.createElement('div');
  card.className = 'account-card';
  card.innerHTML = `
    <div class="account-info">
      <div class="account-type">${account.accountType} Account</div>
      <div class="account-number">Account: ${account.accountNumber}</div>
    </div>
    <div class="account-balance">
      <div class="balance-label">Available Balance</div>
      <div class="balance-amount">${formatCurrency(account.balance)}</div>
    </div>
  `;
  return card;
}

/**
 * Display recent transactions
 */
function displayRecentTransactions(transactions) {
  const tbody = document.getElementById('transactionsBody');
  tbody.innerHTML = '';

  if (!transactions || transactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-secondary);">
          No recent transactions
        </td>
      </tr>
    `;
    return;
  }

  transactions.forEach(txn => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${formatDate(txn.timestamp)}</td>
      <td>${txn.description}</td>
      <td>${txn.category}</td>
      <td class="${txn.type === 'credit' ? 'transaction-credit' : 'transaction-debit'}">
        ${txn.type === 'credit' ? '+' : '-'}${formatCurrency(txn.amount)}
      </td>
      <td>
        <span class="status-badge status-${txn.status}">
          ${txn.status}
        </span>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/**
 * Setup user menu dropdown
 */
function setupUserMenu() {
  // Create user menu dropdown
  const userProfile = document.querySelector('.user-profile');
  if (!userProfile) return;

  // Create dropdown menu
  const dropdown = document.createElement('div');
  dropdown.id = 'userDropdown';
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 200px;
    display: none;
    z-index: 1000;
    margin-top: 0.5rem;
  `;

  dropdown.innerHTML = `
    <div style="padding: 1rem; border-bottom: 1px solid var(--border-color);">
      <div style="font-weight: 600; color: var(--text-primary);">${user.fullName}</div>
      <div style="font-size: 0.875rem; color: var(--text-secondary);">${user.email}</div>
    </div>
    <div style="padding: 0.5rem;">
      <a href="/profile.html" style="display: block; padding: 0.75rem 1rem; color: var(--text-primary); border-radius: var(--radius-sm); transition: background var(--transition-fast);">
        👤 Profile
      </a>
      <a href="/profile.html#settings" style="display: block; padding: 0.75rem 1rem; color: var(--text-primary); border-radius: var(--radius-sm); transition: background var(--transition-fast);">
        ⚙️ Settings
      </a>
      ${user.role === 'admin' ? `
        <a href="/admin.html" style="display: block; padding: 0.75rem 1rem; color: var(--text-primary); border-radius: var(--radius-sm); transition: background var(--transition-fast);">
          🔧 Admin Panel
        </a>
      ` : ''}
      <hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--border-color);">
      <a href="#" onclick="logout(); return false;" style="display: block; padding: 0.75rem 1rem; color: var(--error-red); border-radius: var(--radius-sm); transition: background var(--transition-fast);">
        🚪 Logout
      </a>
    </div>
  `;

  userProfile.style.position = 'relative';
  userProfile.appendChild(dropdown);

  // Add hover styles
  const links = dropdown.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.background = 'var(--bg-tertiary)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.background = 'transparent';
    });
  });
}

/**
 * Toggle user menu
 */
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

/**
 * Get initials from name
 */
function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const userProfile = document.querySelector('.user-profile');
  const dropdown = document.getElementById('userDropdown');

  if (dropdown && userProfile && !userProfile.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Make functions available globally
window.toggleUserMenu = toggleUserMenu;
window.toggleMobileMenu = toggleMobileMenu;
