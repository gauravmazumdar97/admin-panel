const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto');



class JWTHelper {

    constructor() {

    }


    async generateToken(data, refreshToken = false) {
        try {
            const accessToken = jwt.sign({ id: data }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ id: data }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '240h' });

            return {    accessToken: accessToken, refreshToken: refreshToken };
        } catch (err) {
            console.error('Jwt Token Error =>', err);
        }
    }


    // Verify token
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('DECODED value = ',decoded);

            return decoded;
        } catch (err) {
            console.error('Invalid token', err);
        }
    }

    // AES_SECRETIV_KEY=6551471292106907
    // AES_SECRET_KEY=Q3C2TWXNDHASFKEJOYZ5IU1MBG6RL4PV
    // async aesEncrypt(textToEncrypt) {
    //     try {
    //         // Convert IV and secretKey from hex strings to Buffer objects
    //         const ivBuffer = Buffer.from(process.env.AES_SECRETIV_KEY, 'utf8');
    //         const secretKeyBuffer = Buffer.from(process.env.AES_SECRET_KEY, 'utf8');

    //         console.log('IVBUFFER =>', ivBuffer);
    //         console.log('SecretKeyBuffer =>', secretKeyBuffer);

    //         // Create cipher object with AES-256-CBC algorithm
    //         const cipher = crypto.createCipheriv('aes-256-cbc', secretKeyBuffer, ivBuffer);
    //         console.log('Cipher =>', cipher);

    //         // Disable automatic padding if NoPadding is required
    //         cipher.setAutoPadding(false);

    //         // Manually pad the text to be a multiple of 16 bytes (AES block size)
    //         const blockSize = 16;
    //         const padLength = blockSize - ("Gaurav".length % blockSize);
    //         const paddedText = "Gaurav" + '\0'.repeat(padLength); // Using '\0' for padding

    //         // Encrypt the text
    //         let encryptedData = cipher.update(paddedText, 'utf8', 'hex');
    //         encryptedData += cipher.final('hex');
    //         console.log('EncryptedData =>', encryptedData);

    //         return encryptedData;
    //     } catch (error) {
    //         console.error('Encryption Error =>', error);
    //         return '';
    //     }
    // }



    // async aesDecrypt(encryptedText) {
    //     try {
    //         // Convert IV and secretKey from hex strings to Buffer objects
    //         const ivBuffer = Buffer.from(process.env.AES_SECRETIV_KEY);
    //         const secretKeyBuffer = Buffer.from(process.env.AES_SECRET_KEY);

    //         // Create decipher object with AES-256-CBC algorithm
    //         const decipher = crypto.createDecipheriv('aes-256-cbc', secretKeyBuffer, ivBuffer);

    //         // Decrypt the text
    //         let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
    //         decryptedData += decipher.final('utf8');

    //         return decryptedData;
    //     } catch (error) {
    //         console.error('Decryption Error  =>', error);
    //         return '';
    //     }
    // }



    async aesEncrypt(textToEncrypt) {
        try {
            const ivBuffer = Buffer.from(process.env.AES_SECRETIV_KEY, 'utf8');
            const secretKeyBuffer = Buffer.from(process.env.AES_SECRET_KEY, 'utf8');

            const cipher = crypto.createCipheriv('aes-256-cbc', secretKeyBuffer, ivBuffer);
            cipher.setAutoPadding(false);

            const blockSize = 16;
            const padLength = blockSize - (textToEncrypt.length % blockSize);
            const paddedText = textToEncrypt + '\0'.repeat(padLength);

            let encryptedData = cipher.update(paddedText, 'utf8', 'hex');
            encryptedData += cipher.final('hex');

            return encryptedData;
        } catch (error) {
            console.error('Encryption Error =>', error);
            return '';
        }
    }

    async aesDecrypt(encryptedText) {
        try {
            const ivBuffer = Buffer.from(process.env.AES_SECRETIV_KEY, 'utf8');
            const secretKeyBuffer = Buffer.from(process.env.AES_SECRET_KEY, 'utf8');

            const decipher = crypto.createDecipheriv('aes-256-cbc', secretKeyBuffer, ivBuffer);
            decipher.setAutoPadding(false);

            let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
            decryptedData += decipher.final('utf8');

            // Remove padding
            decryptedData = decryptedData.replace(/\0+$/, '');

            return decryptedData;
        } catch (error) {
            console.error('Decryption Error =>', error);
            return '';
        }
    }

}


module.exports = new JWTHelper();