require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const devicesRouter = require('./routes/devices');
const intakeRouter = require('./routes/intake');
const repairsRouter = require('./routes/repairs');
const assignmentsRouter = require('./routes/assignments');
const importRouter = require('./routes/import');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/devices', devicesRouter);
app.use('/api/intake', intakeRouter);
app.use('/api/repairs', repairsRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/import', importRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 ITAPS API Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
