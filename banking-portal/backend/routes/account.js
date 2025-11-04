/**
 * Account Routes
 * Account summary, transactions, balance inquiries
 */

const express = require('express');
const {
  findAccountsByUserId,
  findAccountById,
  findTransactionsByAccountId
} = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/accounts
 * Get all accounts for logged-in user
 */
router.get('/', (req, res) => {
  try {
    const accounts = findAccountsByUserId(req.user.userId);

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No accounts found.'
      });
    }

    // Mask account numbers for security
    const maskedAccounts = accounts.map(acc => ({
      ...acc,
      accountNumber: maskAccountNumber(acc.accountNumber)
    }));

    res.json({
      success: true,
      count: accounts.length,
      accounts: maskedAccounts
    });

  } catch (error) {
    console.error('Fetch accounts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accounts.'
    });
  }
});

/**
 * GET /api/accounts/:accountId
 * Get specific account details
 */
router.get('/:accountId', (req, res) => {
  try {
    const { accountId } = req.params;
    const account = findAccountById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.'
      });
    }

    // Verify account belongs to user
    if (account.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    res.json({
      success: true,
      account: {
        ...account,
        accountNumber: maskAccountNumber(account.accountNumber)
      }
    });

  } catch (error) {
    console.error('Fetch account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch account details.'
    });
  }
});

/**
 * GET /api/accounts/:accountId/transactions
 * Get transaction history for an account
 */
router.get('/:accountId/transactions', (req, res) => {
  try {
    const { accountId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const account = findAccountById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.'
      });
    }

    // Verify account belongs to user
    if (account.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    const transactions = findTransactionsByAccountId(accountId, parseInt(limit));

    res.json({
      success: true,
      count: transactions.length,
      transactions
    });

  } catch (error) {
    console.error('Fetch transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions.'
    });
  }
});

/**
 * GET /api/accounts/:accountId/balance
 * Get account balance
 */
router.get('/:accountId/balance', (req, res) => {
  try {
    const { accountId } = req.params;
    const account = findAccountById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.'
      });
    }

    // Verify account belongs to user
    if (account.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    res.json({
      success: true,
      balance: {
        accountId: account.accountId,
        accountType: account.accountType,
        balance: account.balance,
        availableBalance: account.availableBalance,
        currency: account.currency
      }
    });

  } catch (error) {
    console.error('Fetch balance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch balance.'
    });
  }
});

/**
 * GET /api/accounts/summary
 * Get account summary dashboard
 */
router.get('/dashboard/summary', (req, res) => {
  try {
    const accounts = findAccountsByUserId(req.user.userId);

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No accounts found.'
      });
    }

    // Calculate total balance
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    // Get recent transactions across all accounts
    const allTransactions = [];
    accounts.forEach(acc => {
      const txns = findTransactionsByAccountId(acc.accountId, 5);
      allTransactions.push(...txns);
    });

    // Sort by timestamp and get latest 5
    const recentTransactions = allTransactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);

    res.json({
      success: true,
      summary: {
        totalAccounts: accounts.length,
        totalBalance,
        currency: accounts[0].currency,
        accounts: accounts.map(acc => ({
          accountId: acc.accountId,
          accountType: acc.accountType,
          accountNumber: maskAccountNumber(acc.accountNumber),
          balance: acc.balance
        })),
        recentTransactions
      }
    });

  } catch (error) {
    console.error('Fetch summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch account summary.'
    });
  }
});

/**
 * Helper function to mask account number
 */
function maskAccountNumber(accountNumber) {
  if (!accountNumber || accountNumber.length < 4) return '****';
  return '****' + accountNumber.slice(-4);
}

module.exports = router;
