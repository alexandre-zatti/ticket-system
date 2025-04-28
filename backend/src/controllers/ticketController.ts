import { Router, Request, Response } from 'express';
import { 
  createTicket, 
  getAllTickets, 
  getTicketById, 
  updateTicket, 
  deleteTicket,
  assignTicketToTeamMember,
  Ticket
} from '../models/ticket';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const tickets = getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const ticket = getTicketById(req.params.id);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description, deadline, requiredSkills } = req.body;

    if (!title || !description || !deadline) {
      res.status(400).json({ message: 'Title, description, and deadline are required' });
      return;
    }

    const newTicket = createTicket(title, description, deadline, requiredSkills || []);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
});

router.put('/:id', (req: Request, res: Response) => {
  try {
    const updates: Partial<Ticket> = req.body;
    const updatedTicket = updateTicket(req.params.id, updates);

    if (!updatedTicket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  try {
    const success = deleteTicket(req.params.id);

    if (!success) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error });
  }
});

router.post('/:id/assign/:memberId', (req: Request, res: Response) => {
  try {
    const ticket = getTicketById(req.params.id);

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    const updatedTicket = updateTicket(req.params.id, {
      assignedTo: req.params.memberId,
      status: 'assigned'
    });

    if (!updatedTicket) {
      res.status(500).json({ message: 'Failed to assign ticket' });
      return;
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning ticket', error });
  }
});

export const ticketRoutes = router;
