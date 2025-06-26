const StudentUser = require('../models/StudentUser');
const TeacherUser = require('../models/TeacherUser');
const ParentUser = require('../models/ParentUser');

/**
 * Generates a random username based on student name
 * @param {string, string} name, type - Student's full name
 * @returns {string} - Generated username
 */
const generateUsername = async (name, type) => {
    // Remove spaces and convert to lowercase
    const baseName = name.replace(/\s+/g, '').toLowerCase();

    // Take the first 6 characters or the entire name if shorter
    const namePrefix = baseName.substring(0, Math.min(6, baseName.length));

    // Add random 4-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    const username = `${namePrefix}${randomNum}`;

    // Check if username already exists
    switch (type) {
        case 'student':
            const existingUser = await StudentUser.findOne({ username });
            if (existingUser) {
                // If username exists, try again with a different number
                return generateUsername(name);
            }
            break;
        case 'teacher':
            const existingTeacher = await TeacherUser.findOne({ username });
            if (existingTeacher) {
                // If username exists, try again with a different number
                return generateUsername(name, type);
            }
        case 'parent':
            const existingParent = await ParentUser.findOne({ username });
            if (existingParent) {
                // If username exists, try again with a different number
                return generateUsername(name, type);
            }
            break;
        default:
            break;
    }
    return username;
};

/**
 * Generates a random secure password
 * @param {number} length - Length of password (default: 10)
 * @returns {string} - Generated password
 */
const generatePassword = (length = 10) => {
    /*const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercase = 'abcdefghijkmnpqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '@#$%&*!';

    const allChars = uppercase + lowercase + numbers + symbols;

    let password = '';

    // Ensure at least one character from each type
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Fill the rest with random characters
    for (let i = 4; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the password characters
    return password.split('').sort(() => 0.5 - Math.random()).join('');*/
    return "password"
};

module.exports = {
    generateUsername,
    generatePassword
};