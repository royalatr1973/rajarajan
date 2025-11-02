/**
 * Admin Routes
 * User management, transaction monitoring, security logs
 */

const express = require('express');
const {
  users,
  accounts,
  transactions,
  activityLogs
} = require('../data/mockData');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(isAdmin);

/**
 * GET /api/admin/dashboard
 * Get admin dashboard statistics
 */
router.get('/dashboard', (req, res) => {
  try {
    const totalUsers = users.filter(u => u.role === 'customer').length;
    const activeUsers = users.filter(u => u.role === 'customer' && u.isActive).length;
    const totalAccounts = accounts.length;

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const todayTransactions = transactions.filter(t => {
      const txnDate = new Date(t.timestamp);
      const today = new Date();
      return txnDate.toDateString() === today.toDateString();
    });

    const todayVolume = todayTransactions.reduce((sum, t) => sum + t.amount, 0);

    res.json({
      success: true,
      dashboard: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: totalUsers - activeUsers
        },
        accounts: {
          total: totalAccounts,
          totalBalance
        },
        transactions: {
          today: todayTransactions.length,
          todayVolume,
          total: transactions.length
        }
      }
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data.'
    });
  }
});

/**
 * GET /api/admin/users
 * Get all users
 */
router.get('/users', (req, res) => {
  try {
    const customerUsers = users
      .filter(u => u.role === 'customer')
      .map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        fullName: u.fullName,
        phone: u.phone,
        isActive: u.isActive,
        isLocked: u.isLocked,
        createdAt: u.createdAt,
        lastLogin: u.lastLogin
      }));

    res.json({
      success: true,
      count: customerUsers.length,
      users: customerUsers
    });

  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users.'
    });
  }
});

/**
 * GET /api/admin/users/:userId
 * Get specific user details
 */
router.get('/users/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const userAccounts = accounts.filter(a => a.userId === userId);
    const userTransactions = transactions
      .filter(t => t.userId === userId)
      .slice(0, 10);
    const userLogs = activityLogs
      .filter(l => l.userId === userId)
      .slice(0, 20);

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        isActive: user.isActive,
        isLocked: user.isLocked,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        mfaEnabled: user.mfaEnabled
      },
      accounts: userAccounts,
      recentTransactions: userTransactions,
      recentActivity: userLogs
    });

  } catch (error) {
    console.error('Fetch user details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user details.'
    });
  }
});

/**
 * PUT /api/admin/users/:userId/status
 * Update user status (activate/deactivate/unlock)
 */
router.put('/users/:userId/status', (req, res) => {
  try {
    const { userId } = req.params;
    const { action } = req.body;

    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    switch (action) {
      case 'activate':
        user.isActive = true;
        break;
      case 'deactivate':
        user.isActive = false;
        break;
      case 'unlock':
        user.isLocked = false;
        user.loginAttempts = 0;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action.'
        });
    }

    res.json({
      success: true,
      message: `User ${action}d successfully.`,
      user: {
        id: user.id,
        username: user.username,
        isActive: user.isActive,
        isLocked: user.isLocked
      }
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status.'
    });
  }
});

/**
 * GET /api/admin/transactions
 * Get all transactions with filters
 */
router.get('/transactions', (req, res) => {
  try {
    const { type, status, limit = 50 } = req.query;

    let filteredTransactions = [...transactions];

    if (type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === type);
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter(t => t.status === status);
    }

    filteredTransactions = filteredTransactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      count: filteredTransactions.length,
      transactions: filteredTransactions
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
 * GET /api/admin/activity-logs
 * Get security activity logs
 */
router.get('/activity-logs', (req, res) => {
  try {
    const { action, userId, limit = 100 } = req.query;

    let filteredLogs = [...activityLogs];

    if (action) {
      filteredLogs = filteredLogs.filter(l => l.action === action);
    }

    if (userId) {
      filteredLogs = filteredLogs.filter(l => l.userId === userId);
    }

    filteredLogs = filteredLogs
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      count: filteredLogs.length,
      logs: filteredLogs
    });

  } catch (error) {
    console.error('Fetch activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs.'
    });
  }
});

/**
 * GET /api/admin/reports/transactions
 * Generate transaction report
 */
router.get('/reports/transactions', (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let reportTransactions = [...transactions];

    if (startDate) {
      reportTransactions = reportTransactions.filter(
        t => new Date(t.timestamp) >= new Date(startDate)
      );
    }

    if (endDate) {
      reportTransactions = reportTransactions.filter(
        t => new Date(t.timestamp) <= new Date(endDate)
      );
    }

    const summary = {
      totalTransactions: reportTransactions.length,
      totalVolume: reportTransactions.reduce((sum, t) => sum + t.amount, 0),
      credits: reportTransactions.filter(t => t.type === 'credit').length,
      debits: reportTransactions.filter(t => t.type === 'debit').length,
      byCategory: {}
    };

    // Group by category
    reportTransactions.forEach(t => {
      if (!summary.byCategory[t.category]) {
        summary.byCategory[t.category] = {
          count: 0,
          volume: 0
        };
      }
      summary.byCategory[t.category].count++;
      summary.byCategory[t.category].volume += t.amount;
    });

    res.json({
      success: true,
      report: summary,
      transactions: reportTransactions
    });

  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report.'
    });
  }
});

module.exports = router;
