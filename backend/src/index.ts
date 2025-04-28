import express from 'express';
import cors from 'cors';
import { ticketRoutes } from './controllers/ticketController';
import { teamMemberRoutes } from './controllers/teamMemberController';

const app = express();
const PORT = process.env.PORT ?? 5001;

// Middleware
app.use(cors({origin: '*'}));
app.use(express.json());

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/team-members', teamMemberRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK', message: 'Server is running'});
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({error: 'Something broke!'});
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err: Error) => {
  console.error('Server failed to start:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export { app, server };