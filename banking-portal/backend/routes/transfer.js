/**
 * Fund Transfer Routes
 * NEFT, RTGS, IMPS, UPI transfers and beneficiary management
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const {
  findAccountsByUserId,
  findAccountById,
  findBeneficiariesByUserId,
  beneficiaries,
  addTransaction,
  updateAccountBalance,
  addActivityLog
} = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');
const { generateAndSendOTP, verifyOTP } = require('../utils/otp');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/transfer/beneficiaries
 * Get all beneficiaries for user
 */
router.get('/beneficiaries', (req, res) => {
  try {
    const userBeneficiaries = findBeneficiariesByUserId(req.user.userId);

    res.json({
      success: true,
      count: userBeneficiaries.length,
      beneficiaries: userBeneficiaries
    });

  } catch (error) {
    console.error('Fetch beneficiaries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch beneficiaries.'
    });
  }
});

/**
 * POST /api/transfer/beneficiaries
 * Add new beneficiary
 */
router.post('/beneficiaries', async (req, res) => {
  try {
    const { name, accountNumber, ifscCode, bankName, nickname } = req.body;

    // Validate input
    if (!name || !accountNumber || !ifscCode || !bankName) {
      return res.status(400).json({
        success: false,
        message: 'All beneficiary details are required.'
      });
    }

    // Create new beneficiary
    const newBeneficiary = {
      beneficiaryId: `BEN${Date.now()}`,
      userId: req.user.userId,
      name,
      accountNumber,
      ifscCode,
      bankName,
      nickname: nickname || name,
      verified: false, // Requires verification in production
      addedDate: new Date().toISOString()
    };

    beneficiaries.push(newBeneficiary);

    // Log activity
    addActivityLog({
      logId: `LOG${Date.now()}`,
      userId: req.user.userId,
      action: 'ADD_BENEFICIARY',
      details: { beneficiaryName: name },
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    res.json({
      success: true,
      message: 'Beneficiary added successfully.',
      beneficiary: newBeneficiary
    });

  } catch (error) {
    console.error('Add beneficiary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add beneficiary.'
    });
  }
});

/**
 * DELETE /api/transfer/beneficiaries/:beneficiaryId
 * Delete beneficiary
 */
router.delete('/beneficiaries/:beneficiaryId', (req, res) => {
  try {
    const { beneficiaryId } = req.params;
    const index = beneficiaries.findIndex(
      b => b.beneficiaryId === beneficiaryId && b.userId === req.user.userId
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Beneficiary not found.'
      });
    }

    beneficiaries.splice(index, 1);

    res.json({
      success: true,
      message: 'Beneficiary deleted successfully.'
    });

  } catch (error) {
    console.error('Delete beneficiary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete beneficiary.'
    });
  }
});

/**
 * POST /api/transfer/initiate
 * Initiate fund transfer (sends OTP)
 */
router.post('/initiate', async (req, res) => {
  try {
    const {
      fromAccountId,
      toAccountNumber,
      amount,
      transferMode,
      remarks
    } = req.body;

    // Validate input
    if (!fromAccountId || !toAccountNumber || !amount || !transferMode) {
      return res.status(400).json({
        success: false,
        message: 'All transfer details are required.'
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero.'
      });
    }

    // Get source account
    const sourceAccount = findAccountById(fromAccountId);

    if (!sourceAccount) {
      return res.status(404).json({
        success: false,
        message: 'Source account not found.'
      });
    }

    // Verify account belongs to user
    if (sourceAccount.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    // Check sufficient balance
    if (sourceAccount.availableBalance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance.'
      });
    }

    // Validate transfer mode limits
    const limits = {
      'NEFT': 1000000,
      'RTGS': 200000,
      'IMPS': 200000,
      'UPI': 100000
    };

    if (amount > limits[transferMode]) {
      return res.status(400).json({
        success: false,
        message: `Amount exceeds ${transferMode} limit of ${limits[transferMode]}.`
      });
    }

    // Generate OTP for verification
    const { users } = require('../data/mockData');
    const user = users.find(u => u.id === req.user.userId);

    const otpIdentifier = await generateAndSendOTP(user, 'sms');

    // Store transfer details temporarily
    const { otpStore } = require('../data/mockData');
    const existingOTP = otpStore.get(otpIdentifier);

    if (existingOTP) {
      existingOTP.transferDetails = {
        fromAccountId,
        toAccountNumber,
        amount,
        transferMode,
        remarks
      };
    }

    res.json({
      success: true,
      message: 'OTP sent for transfer verification.',
      otpIdentifier,
      transferId: uuidv4()
    });

  } catch (error) {
    console.error('Initiate transfer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate transfer.'
    });
  }
});

/**
 * POST /api/transfer/execute
 * Execute fund transfer after OTP verification
 */
router.post('/execute', async (req, res) => {
  try {
    const {
      otpIdentifier,
      otp,
      fromAccountId,
      toAccountNumber,
      amount,
      transferMode,
      remarks
    } = req.body;

    // Verify OTP
    const otpResult = verifyOTP(otpIdentifier, otp);

    if (!otpResult.success) {
      return res.status(401).json(otpResult);
    }

    // Get source account
    const sourceAccount = findAccountById(fromAccountId);

    if (!sourceAccount) {
      return res.status(404).json({
        success: false,
        message: 'Source account not found.'
      });
    }

    // Verify ownership
    if (sourceAccount.userId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    // Check balance again
    if (sourceAccount.availableBalance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance.'
      });
    }

    // Execute transfer
    const transactionId = `TXN${Date.now()}`;
    const newBalance = sourceAccount.balance - amount;

    // Create debit transaction
    const transaction = {
      transactionId,
      accountId: fromAccountId,
      userId: req.user.userId,
      type: 'debit',
      amount,
      balance: newBalance,
      description: remarks || `${transferMode} Transfer`,
      category: 'Transfer',
      reference: `${transferMode}/${transactionId}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
      beneficiaryAccount: toAccountNumber,
      transferMode
    };

    addTransaction(transaction);
    updateAccountBalance(fromAccountId, newBalance);

    // Log activity
    addActivityLog({
      logId: `LOG${Date.now()}`,
      userId: req.user.userId,
      action: 'FUND_TRANSFER',
      details: { amount, mode: transferMode, to: toAccountNumber },
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    res.json({
      success: true,
      message: 'Transfer completed successfully.',
      transaction: {
        transactionId,
        amount,
        newBalance,
        status: 'completed',
        timestamp: transaction.timestamp
      }
    });

  } catch (error) {
    console.error('Execute transfer error:', error);
    res.status(500).json({
      success: false,
      message: 'Transfer failed. Please try again.'
    });
  }
});

/**
 * GET /api/transfer/history
 * Get transfer history
 */
router.get('/history', (req, res) => {
  try {
    const { transactions } = require('../data/mockData');
    const userTransactions = transactions
      .filter(t => t.userId === req.user.userId && t.type === 'debit' && t.category === 'Transfer')
      .slice(0, 20);

    res.json({
      success: true,
      count: userTransactions.length,
      transfers: userTransactions
    });

  } catch (error) {
    console.error('Fetch transfer history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transfer history.'
    });
  }
});

module.exports = router;
