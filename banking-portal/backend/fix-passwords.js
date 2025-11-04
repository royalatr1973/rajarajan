/**
 * Password Hash Generator
 * Run this to generate correct password hashes for demo accounts
 */

const bcrypt = require('bcryptjs');

const password = 'Banking@123';

console.log('🔐 Generating password hashes for: Banking@123\n');

// Generate 3 hashes (one for each user)
Promise.all([
  bcrypt.hash(password, 10),
  bcrypt.hash(password, 10),
  bcrypt.hash(password, 10)
]).then(hashes => {
  console.log('Copy these hashes into your mockData.js file:\n');
  console.log('User 1 (john.doe):');
  console.log(hashes[0]);
  console.log('\nUser 2 (jane.smith):');
  console.log(hashes[1]);
  console.log('\nUser 3 (admin):');
  console.log(hashes[2]);
  console.log('\n✅ Done! Update the password fields in backend/data/mockData.js');
}).catch(err => {
  console.error('Error:', err);
});
