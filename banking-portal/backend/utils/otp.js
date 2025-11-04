/**
 * OTP Utility Functions
 * Generate, send, and verify OTPs for MFA
 */

const { otpStore } = require('../data/mockData');

/**
 * Generate 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store OTP with expiry
 */
const storeOTP = (identifier, otp, expiryMinutes = 5) => {
  const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);

  otpStore.set(identifier, {
    otp,
    expiryTime,
    attempts: 0
  });

  console.log(`📱 OTP for ${identifier}: ${otp} (expires in ${expiryMinutes} minutes)`);

  return otp;
};

/**
 * Verify OTP
 */
const verifyOTP = (identifier, inputOTP) => {
  console.log(`🔍 Verifying OTP for identifier: ${identifier}`);
  console.log(`🔍 Input OTP: "${inputOTP}" (type: ${typeof inputOTP})`);

  const otpData = otpStore.get(identifier);

  if (!otpData) {
    console.log('❌ No OTP data found for this identifier');
    console.log('📋 Available identifiers:', Array.from(otpStore.keys()));
    return {
      success: false,
      message: 'No OTP found. Please request a new one.'
    };
  }

  console.log(`🔍 Stored OTP: "${otpData.otp}" (type: ${typeof otpData.otp})`);
  console.log(`🔍 Attempts so far: ${otpData.attempts}`);

  // Check expiry
  if (Date.now() > otpData.expiryTime) {
    console.log('❌ OTP has expired');
    otpStore.delete(identifier);
    return {
      success: false,
      message: 'OTP has expired. Please request a new one.'
    };
  }

  // Check attempts
  if (otpData.attempts >= 3) {
    console.log('❌ Maximum attempts exceeded');
    otpStore.delete(identifier);
    return {
      success: false,
      message: 'Maximum OTP attempts exceeded. Please request a new one.'
    };
  }

  // Verify OTP - convert both to strings and trim
  const storedOTP = String(otpData.otp).trim();
  const providedOTP = String(inputOTP).trim();

  console.log(`🔍 Comparing: "${storedOTP}" === "${providedOTP}"`);

  if (storedOTP === providedOTP) {
    console.log('✅ OTP verified successfully!');
    otpStore.delete(identifier);
    return {
      success: true,
      message: 'OTP verified successfully.'
    };
  } else {
    otpData.attempts++;
    console.log(`❌ OTP mismatch. Attempts remaining: ${3 - otpData.attempts}`);
    return {
      success: false,
      message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`
    };
  }
};

/**
 * Send OTP via SMS (Mock implementation)
 */
const sendSMS = async (phoneNumber, otp) => {
  // In production, integrate with SMS gateway (Twilio, AWS SNS, etc.)
  console.log(`📨 SMS to ${phoneNumber}: Your OTP is ${otp}`);

  return {
    success: true,
    message: 'OTP sent successfully via SMS'
  };
};

/**
 * Send OTP via Email (Mock implementation)
 */
const sendEmail = async (email, otp) => {
  // In production, integrate with email service (SendGrid, AWS SES, etc.)
  console.log(`📧 Email to ${email}: Your OTP is ${otp}`);

  return {
    success: true,
    message: 'OTP sent successfully via Email'
  };
};

/**
 * Generate and send OTP
 */
const generateAndSendOTP = async (user, type = 'sms') => {
  const otp = generateOTP();
  const identifier = `${user.id}-${Date.now()}`;

  storeOTP(identifier, otp);

  if (type === 'sms') {
    await sendSMS(user.phone, otp);
  } else {
    await sendEmail(user.email, otp);
  }

  return identifier;
};

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  sendSMS,
  sendEmail,
  generateAndSendOTP
};
