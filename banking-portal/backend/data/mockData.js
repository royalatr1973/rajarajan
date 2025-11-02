/**
 * Mock Database
 * In-memory data store for demo purposes
 * In production, replace with MongoDB, PostgreSQL, etc.
 */

const bcrypt = require('bcryptjs');

// Sample users with hashed passwords
// Default password for all users: "Banking@123"
const users = [
  {
    id: 'USR001',
    username: 'john.doe',
    email: 'john.doe@example.com',
    password: '$2a$10$rN7xqZqJZxvyVXN0Y3Jg5.xKzY7qHxWE0sZxqVXN0Y3Jg5.xKzY7q', // Banking@123
    fullName: 'John Doe',
    phone: '+1234567890',
    profilePic: 'assets/images/user-avatar.png',
    role: 'customer',
    isActive: true,
    mfaEnabled: true,
    createdAt: '2023-01-15T10:30:00Z',
    lastLogin: '2025-11-02T08:15:00Z',
    loginAttempts: 0,
    isLocked: false,
    preferences: {
      theme: 'light',
      emailNotifications: true,
      smsNotifications: true
    }
  },
  {
    id: 'USR002',
    username: 'jane.smith',
    email: 'jane.smith@example.com',
    password: '$2a$10$rN7xqZqJZxvyVXN0Y3Jg5.xKzY7qHxWE0sZxqVXN0Y3Jg5.xKzY7q', // Banking@123
    fullName: 'Jane Smith',
    phone: '+1234567891',
    profilePic: 'assets/images/user-avatar.png',
    role: 'customer',
    isActive: true,
    mfaEnabled: true,
    createdAt: '2023-03-20T14:20:00Z',
    lastLogin: '2025-11-01T16:45:00Z',
    loginAttempts: 0,
    isLocked: false,
    preferences: {
      theme: 'dark',
      emailNotifications: true,
      smsNotifications: false
    }
  },
  {
    id: 'ADM001',
    username: 'admin',
    email: 'admin@bankportal.com',
    password: '$2a$10$rN7xqZqJZxvyVXN0Y3Jg5.xKzY7qHxWE0sZxqVXN0Y3Jg5.xKzY7q', // Banking@123
    fullName: 'System Administrator',
    phone: '+1234567899',
    profilePic: 'assets/images/admin-avatar.png',
    role: 'admin',
    isActive: true,
    mfaEnabled: true,
    createdAt: '2022-12-01T09:00:00Z',
    lastLogin: '2025-11-02T07:00:00Z',
    loginAttempts: 0,
    isLocked: false,
    preferences: {
      theme: 'light',
      emailNotifications: true,
      smsNotifications: true
    }
  }
];

// Bank accounts
const accounts = [
  {
    accountId: 'ACC1001',
    userId: 'USR001',
    accountNumber: '1234567890123456',
    accountType: 'Savings',
    balance: 125450.75,
    availableBalance: 125450.75,
    currency: 'USD',
    status: 'active',
    ifscCode: 'BANK0001234',
    branch: 'Main Street Branch',
    openedDate: '2023-01-15T10:30:00Z'
  },
  {
    accountId: 'ACC1002',
    userId: 'USR001',
    accountNumber: '1234567890123457',
    accountType: 'Current',
    balance: 45200.00,
    availableBalance: 45200.00,
    currency: 'USD',
    status: 'active',
    ifscCode: 'BANK0001234',
    branch: 'Main Street Branch',
    openedDate: '2023-06-10T11:00:00Z'
  },
  {
    accountId: 'ACC2001',
    userId: 'USR002',
    accountNumber: '2234567890123456',
    accountType: 'Savings',
    balance: 89750.50,
    availableBalance: 89750.50,
    currency: 'USD',
    status: 'active',
    ifscCode: 'BANK0001234',
    branch: 'Downtown Branch',
    openedDate: '2023-03-20T14:20:00Z'
  }
];

// Transactions
const transactions = [
  {
    transactionId: 'TXN10001',
    accountId: 'ACC1001',
    userId: 'USR001',
    type: 'credit',
    amount: 5000.00,
    balance: 125450.75,
    description: 'Salary Credit',
    category: 'Income',
    reference: 'SAL/NOV/2025',
    timestamp: '2025-11-01T09:00:00Z',
    status: 'completed'
  },
  {
    transactionId: 'TXN10002',
    accountId: 'ACC1001',
    userId: 'USR001',
    type: 'debit',
    amount: 150.00,
    balance: 120450.75,
    description: 'Grocery Store',
    category: 'Shopping',
    reference: 'VISA/****1234',
    timestamp: '2025-10-31T14:30:00Z',
    status: 'completed'
  },
  {
    transactionId: 'TXN10003',
    accountId: 'ACC1001',
    userId: 'USR001',
    type: 'debit',
    amount: 75.50,
    balance: 120375.25,
    description: 'Electric Bill Payment',
    category: 'Bills',
    reference: 'BILL/ELEC/OCT',
    timestamp: '2025-10-30T10:15:00Z',
    status: 'completed'
  },
  {
    transactionId: 'TXN10004',
    accountId: 'ACC1001',
    userId: 'USR001',
    type: 'credit',
    amount: 200.00,
    balance: 120575.25,
    description: 'Refund - Amazon',
    category: 'Refund',
    reference: 'REF/AMZ/123456',
    timestamp: '2025-10-29T16:45:00Z',
    status: 'completed'
  },
  {
    transactionId: 'TXN10005',
    accountId: 'ACC1001',
    userId: 'USR001',
    type: 'debit',
    amount: 1200.00,
    balance: 119375.25,
    description: 'Rent Payment',
    category: 'Housing',
    reference: 'RENT/OCT/2025',
    timestamp: '2025-10-28T08:00:00Z',
    status: 'completed'
  }
];

// Beneficiaries
const beneficiaries = [
  {
    beneficiaryId: 'BEN001',
    userId: 'USR001',
    name: 'Jane Smith',
    accountNumber: '2234567890123456',
    ifscCode: 'BANK0001234',
    bankName: 'Same Bank',
    nickname: 'Jane',
    verified: true,
    addedDate: '2023-02-10T10:00:00Z'
  },
  {
    beneficiaryId: 'BEN002',
    userId: 'USR001',
    name: 'Electric Company',
    accountNumber: '9876543210123456',
    ifscCode: 'BANK0009999',
    bankName: 'Utility Bank',
    nickname: 'Electric Bill',
    verified: true,
    addedDate: '2023-03-15T12:00:00Z'
  }
];

// OTP storage (temporary in-memory)
const otpStore = new Map();

// Session storage
const sessions = new Map();

// Password reset tokens
const resetTokens = new Map();

// Admin activity logs
const activityLogs = [
  {
    logId: 'LOG001',
    userId: 'USR001',
    action: 'LOGIN',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    timestamp: '2025-11-02T08:15:00Z',
    status: 'success'
  },
  {
    logId: 'LOG002',
    userId: 'USR001',
    action: 'FUND_TRANSFER',
    details: { amount: 500, to: 'BEN001' },
    ipAddress: '192.168.1.100',
    timestamp: '2025-11-01T10:30:00Z',
    status: 'success'
  }
];

module.exports = {
  users,
  accounts,
  transactions,
  beneficiaries,
  otpStore,
  sessions,
  resetTokens,
  activityLogs,

  // Helper functions
  findUserByEmail: (email) => users.find(u => u.email === email),
  findUserByUsername: (username) => users.find(u => u.username === username),
  findUserById: (id) => users.find(u => u.id === id),
  findAccountsByUserId: (userId) => accounts.filter(a => a.userId === userId),
  findAccountById: (accountId) => accounts.find(a => a.accountId === accountId),
  findTransactionsByAccountId: (accountId, limit = 10) =>
    transactions.filter(t => t.accountId === accountId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit),
  findBeneficiariesByUserId: (userId) => beneficiaries.filter(b => b.userId === userId),

  // Add new transaction
  addTransaction: (transaction) => {
    transactions.unshift(transaction);
    return transaction;
  },

  // Update account balance
  updateAccountBalance: (accountId, newBalance) => {
    const account = accounts.find(a => a.accountId === accountId);
    if (account) {
      account.balance = newBalance;
      account.availableBalance = newBalance;
    }
  },

  // Add activity log
  addActivityLog: (log) => {
    activityLogs.unshift(log);
  }
};
