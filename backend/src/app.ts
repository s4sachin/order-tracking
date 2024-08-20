import express from 'express';
import cors from 'cors';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running...');
});


// Export the app for use in the server
export default app;
