// testBcrypt.js
import bcrypt from 'bcryptjs';

const plainPassword = '123456';

// Step 1: Hash the password
const hashed = await bcrypt.hash(plainPassword, 10);
console.log('🔐 Hashed Password:', hashed);

// Step 2: Compare it back
const isMatch = await bcrypt.compare(plainPassword, hashed);
console.log('✅ Match result:', isMatch);
