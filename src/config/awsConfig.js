const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();





class S3Service {
    constructor() {

    }

    /**
     * Generate a pre-signed URL for uploading an object to S3
     * @param {string} folderName - The name of the folder in the S3 bucket
     * @param {string} fileName - The name of the file to upload
     * @returns {Promise<object>} - A promise that resolves with the pre-signed URL and object key
     */
    async generatePresignedUrl(folderName, fileName) {

        // Initialize the AWS S3 client with credentials and configuration
        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            signatureVersion: process.env.SIGNATURE_VERSION,
        });


        console.log('AWS_REGION=====>>>', process.env.AWS_REGION);
        console.log('AWS_ACCESS_KEY=====>>>', process.env.AWS_ACCESS_KEY);
        console.log('AWS_SECRET_KEY=====>>>', process.env.AWS_SECRET_KEY);
        console.log('SIGNATURE_VERSION=====>>>', process.env.SIGNATURE_VERSION);

        try {
            const expireTime = 120; // URL expiration time in seconds

            // Define the parameters for the pre-signed URL
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: `${folderName}/${fileName}`,
            };

            // Create the command for the S3 client
            const command = new PutObjectCommand(params);

            // Generate the pre-signed URL
            const url = await getSignedUrl(s3Client, command, { expiresIn: expireTime });


            console.log('URL===>>', url);
            console.log('Key===>>', params.Key);
            // Return the URL and object key
            return { url, key: params.Key };
        } catch (error) {
            console.error('Error generating pre-signed URL:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    }
}









module.exports = new S3Service();