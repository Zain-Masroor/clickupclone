require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http'); // Import HTTP
const { Server } = require('socket.io'); // Import Socket.IO

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/aiRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const historyRoutes = require('./routes/historyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express();
const server = http.createServer(app); // Create server instance
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this in production for security
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(helmet());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/payments', paymentRoutes);


// Handle socket connections
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  // Join room based on task/project ID
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle sending comments
  socket.on('sendComment', (data) => {
    io.to(data.roomId).emit('receiveComment', data);
    console.log(`Comment sent to room ${data.roomId}:`, data);
  });

  // Handle notifications for mentions
  socket.on('mentionUser', (data) => {
    io.emit('receiveMention', data); // In production, send to specific user
    console.log(`User mentioned:`, data);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
