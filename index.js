require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const chats = require('./dummyData');
const app = express();
const port = 7000;
const route = require('./src/route/route')
const connectDB = require('./src/config/db');
const socket = require('socket.io');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Use cors middleware


app.use('/api/v1', route)



// -------------------------DUMMY DATA TESTING API---------------------------------------------------------------------------------------------------------
// Route to get all chat data
app.get('/api/chats', (req, res) => {
    try {
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Route to get chat data by ID
app.get('/api/chats/:id', (req, res) => {
    try {
        console.log('Found chat:');
        const dataByID = chats.find((user) => user._id === req.params.id);
        if (dataByID) {
            res.status(200).json(dataByID);
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        console.error('Error fetching chat by ID:', error);
        res.status(500).json({ message: error });
    }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------













// ----------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/', function (req, res) {
    var options = { root: path.join(__dirname) }
    var fileName = 'index.html';
    res.sendFile(fileName, options)

})


// ----------------------------------------------------------------------------------------------------------------------------------------------------





const startServer =
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });


connectDB().then(() => {
    console.log(`MongoDB is Connected: ${process.env.DB_URL}`);
    startServer;
}).catch((error) => {
    console.error(`Backend Connection Error: ${error}`);
});



// =========================SOCKET-----------------------------------------------------------------


// var io = socket(listening);

// Connect and Disconnect the Socket IO

// io.on('connection', function (socket) {
//     console.log(`User Connected: ${socket.id}`);

//     setTimeout(function () {
//         socket.emit(`myCustomerEvent`,{descrption:`A custom message froms server side!`})
//     },3000)


//     socket.on('disconnect',function (params) {
//         console.log(`User Disconnected: ${socket.id}`);  
//     })
// }) 






// var userCount = 0;
// io.on('connection', function (socket) {
//     console.log(`User Connected: ${socket.id}`);
//     userCount++

//     io.sockets.emit('broadcast',{message:userCount+'users connected'})

//     socket.on('disconnect',function (params) {
//         console.log(`User Disconnected: ${socket.id}`);  

//         userCount--
//         io.sockets.emit('broadcast',{message:userCount+'users connected'})

//     })
// }) 


// Socket IO namespace endpoint
// var namespace = io.of('/socket-namespace');
// namespace.on('connection', function (socket) {
//     console.log(`User Connected: ${socket.id}`);
    
//     namespace.emit('mynamespaceEvent','CUSTOM NAMESPACE MESSAGE');

//     socket.on('disconnect',function (params) {
//         console.log(`User Disconnected: ${socket.id}`);  
//     })
// }) 



// Socket IO ROOM (Channel) endpoint
// var socketroom = io.of('/socket-room');
// socketroom.on('connection', function (socket) {
//     console.log(`User Connected: ${socket.id}`);
    
//     socket.join(''+roomno)

//     socketroom.in().emit('mynamespaceEvent','CUSTOM NAMESPACE MESSAGE');


// }) 


// =========================SOCKET-----------------------------------------------------------------

