/**
 * Bill Payment Routes
 * Electricity, Mobile, DTH, Credit Card, Gas, Broadband payments
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const {
  findAccountById,
  addTransaction,
  updateAccountBalance,
  addActivityLog
} = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Bill categories and providers
const billCategories = {
  electricity: ['State Power Corp', 'City Electric', 'Green Energy Ltd'],
  mobile: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'],
  dth: ['DirecTV', 'Dish Network', 'Sky TV'],
  creditcard: ['Visa', 'Mastercard', 'Amex', 'Discover'],
  gas: ['City Gas', 'Natural Gas Corp', 'Home Energy'],
  broadband: ['Comcast', 'AT&T Internet', 'Spectrum', 'Verizon Fios']
};

/**
 * GET /api/billpay/categories
 * Get bill payment categories and providers
 */
router.get('/categories', (req, res) => {
  try {
    res.json({
      success: true,
      categories: Object.keys(billCategories).map(key => ({
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        providers: billCategories[key]
      }))
    });
  } catch (error) {
    console.error('Fetch categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories.'
    });
  }
});

/**
 * POST /api/billpay/fetch-bill
 * Fetch bill details (Mock implementation)
 */
router.post('/fetch-bill', async (req, res) => {
  try {
    const { category, provider, accountNumber } = req.body;

    if (!category || !provider || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Category, provider, and account number are required.'
      });
    }

    // Mock bill data
    const mockBills = {
      electricity: {
        billNumber: `ELE${Date.now()}`,
        accountNumber,
        provider,
        amount: Math.floor(Math.random() * 200) + 50,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        billPeriod: 'October 2025',
        units: Math.floor(Math.random() * 500) + 100
      },
      mobile: {
        billNumber: `MOB${Date.now()}`,
        accountNumber,
        provider,
        amount: Math.floor(Math.random() * 100) + 30,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        billPeriod: 'November 2025',
        plan: 'Unlimited Premium'
      },
      dth: {
        billNumber: `DTH${Date.now()}`,
        accountNumber,
        provider,
        amount: Math.floor(Math.random() * 80) + 20,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        billPeriod: 'November 2025',
        package: 'Sports + Entertainment'
      },
      creditcard: {
        billNumber: `CC${Date.now()}`,
        accountNumber,
        provider,
        amount: Math.floor(Math.random() * 2000) + 500,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        billPeriod: 'October 2025',
        minimumDue: Math.floor(Math.random() * 200) + 50
      },
      gas: {
        billNumber: `GAS${Date.now()}`,
        accountNumber,
        provider,
        amount: Math.floor(Math.random() * 150) + 40,
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        billPeriod: 'October 2025',
        consumption: Math.floor(Math.random() * 100) + 20
      },
      broadband: {
        billNumber: `BB${Date.now()}`,
        accountNumber,
        provider,
        amount: Math.floor(Math.random() * 120) + 40,
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        billPeriod: 'November 2025',
        plan: '1 Gbps Unlimited'
      }
    };

    const billData = mockBills[category];

    if (!billData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category.'
      });
    }

    res.json({
      success: true,
      message: 'Bill fetched successfully.',
      bill: billData
    });

  } catch (error) {
    console.error('Fetch bill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bill details.'
    });
  }
});

/**
 * POST /api/billpay/pay
 * Pay bill
 */
router.post('/pay', async (req, res) => {
  try {
    const {
      accountId,
      category,
      provider,
      billNumber,
      accountNumber,
      amount
    } = req.body;

    // Validate input
    if (!accountId || !category || !provider || !amount) {
      return res.status(400).json({
        success: false,
        message: 'All payment details are required.'
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero.'
      });
    }

    // Get account
    const account = findAccountById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.'
      });
    }

    // Verify ownership
    if (account.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    // Check balance
    if (account.availableBalance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance.'
      });
    }

    // Process payment
    const transactionId = `TXN${Date.now()}`;
    const newBalance = account.balance - amount;

    const transaction = {
      transactionId,
      accountId,
      userId: req.user.userId,
      type: 'debit',
      amount,
      balance: newBalance,
      description: `${category.toUpperCase()} - ${provider}`,
      category: 'Bills',
      reference: billNumber || `BILL/${category.toUpperCase()}/${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
      billCategory: category,
      provider,
      billAccountNumber: accountNumber
    };

    addTransaction(transaction);
    updateAccountBalance(accountId, newBalance);

    // Log activity
    addActivityLog({
      logId: `LOG${Date.now()}`,
      userId: req.user.userId,
      action: 'BILL_PAYMENT',
      details: { category, provider, amount },
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    res.json({
      success: true,
      message: 'Bill payment successful.',
      transaction: {
        transactionId,
        amount,
        newBalance,
        status: 'completed',
        timestamp: transaction.timestamp
      }
    });

  } catch (error) {
    console.error('Bill payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Bill payment failed. Please try again.'
    });
  }
});

/**
 * GET /api/billpay/history
 * Get bill payment history
 */
router.get('/history', (req, res) => {
  try {
    const { transactions } = require('../data/mockData');
    const billPayments = transactions
      .filter(t => t.userId === req.user.userId && t.category === 'Bills')
      .slice(0, 20);

    res.json({
      success: true,
      count: billPayments.length,
      payments: billPayments
    });

  } catch (error) {
    console.error('Fetch payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history.'
    });
  }
});

/**
 * POST /api/billpay/recharge
 * Mobile/DTH recharge
 */
router.post('/recharge', async (req, res) => {
  try {
    const { accountId, type, mobileNumber, operator, amount } = req.body;

    // Validate input
    if (!accountId || !type || !mobileNumber || !operator || !amount) {
      return res.status(400).json({
        success: false,
        message: 'All recharge details are required.'
      });
    }

    // Get account
    const account = findAccountById(accountId);

    if (!account || account.userId !== req.user.userId) {
      return res.status(404).json({
        success: false,
        message: 'Account not found or access denied.'
      });
    }

    // Check balance
    if (account.availableBalance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance.'
      });
    }

    // Process recharge
    const transactionId = `TXN${Date.now()}`;
    const newBalance = account.balance - amount;

    const transaction = {
      transactionId,
      accountId,
      userId: req.user.userId,
      type: 'debit',
      amount,
      balance: newBalance,
      description: `${type.toUpperCase()} Recharge - ${operator}`,
      category: 'Recharge',
      reference: `RECH/${type.toUpperCase()}/${mobileNumber}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
      rechargeType: type,
      operator,
      mobileNumber
    };

    addTransaction(transaction);
    updateAccountBalance(accountId, newBalance);

    res.json({
      success: true,
      message: 'Recharge successful.',
      transaction: {
        transactionId,
        amount,
        newBalance,
        status: 'completed'
      }
    });

  } catch (error) {
    console.error('Recharge error:', error);
    res.status(500).json({
      success: false,
      message: 'Recharge failed. Please try again.'
    });
  }
});

module.exports = router;
