require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const connection = require('../config/db');
const Controller = require('../controller/controller');
const { errorHandler, notFound } = require('../middleware/errorHandler');
const Authorization = require('../middleware/authHandler')


// Middleware
app.use(express.json()); // Use JSON middleware
app.use(express.urlencoded({ extended: true })); // Use FORMDATA middleware
app.use(cors()); // Use CORS middleware

// Custom Middlewares
app.use(notFound)
app.use(errorHandler)







// Route to add customer
router.post('/customer', Controller.addCustomer);
// Route to get customer
router.get('/customer', Controller.getCustomer);
// Route to update customer
router.put('/customer', Controller.updateCustomer);
// Route to delete customer
router.delete('/customer', Controller.deleteCustomer);




// Route to add product
router.post('/customerProducts', Controller.addCustomerProducts);
// Route to get product
router.get('/customerProducts', Controller.getCustomerProducts);
// Route to update product
router.put('/customerProducts', Controller.updateCustomerProducts);
// Route to delete product
router.delete('/customerProducts', Controller.deleteCustomerProducts);





// Route to add purchases
router.post('/addPurchases', Controller.addPurchases);
// Route to get purchases
router.get('/getPurchases', Controller.getPurchases);
// Route to update purchases
router.put('/updatePurchases', Controller.updatePurchases);
// Route to delete purchases
router.delete('/deletePurchases', Controller.deletePurchases);








// Route to Register User
router.post('/register', Controller.registerUser);


// Route to Login User
router.post('/login', Controller.loginUser);


// Route to Upload Media
router.put('/signed-url', Controller.preSignedUrl);


// Route to search of all users
router.post('/searchUser', Authorization.authToken ,Controller.searchUser);


router.post('/accessChat',Controller.accessChat)


router.post('/group',Authorization.authToken,Controller.createGroupAt)



router.put('/rename',Authorization.authToken,Controller.renameGroup)



router.put('/groupremove',Authorization.authToken,Controller.removeFromGroup)



router.put('/groupadd',Authorization.authToken,Controller.addToGroup)





// Route to get chat data by ID
router.get('/api/chats/:id', (req, res) => {
    try {
        res.status(404).json({ message: 'Chat not found' });
    } catch (error) {
        console.error('Error fetching chat by ID:', error);
        res.status(500).json({ message: error });
    }
});





module.exports = router;