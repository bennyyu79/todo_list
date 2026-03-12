const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Routes
app.use('/api/todos', todoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Todo List Backend running on port ${PORT}`);
  console.log(`📝 API: http://0.0.0.0:${PORT}/api/todos`);
  console.log(`🏥 Health: http://0.0.0.0:${PORT}/health`);
  console.log(`🌐 Access from any network interface!`);
});

module.exports = app;
