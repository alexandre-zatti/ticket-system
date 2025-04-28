import { Router, Request, Response } from 'express';
import { getAllTeamMembers, getTeamMemberById } from '../models/teamMember';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const members = getAllTeamMembers();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const member = getTeamMemberById(req.params.id);
    if (!member) {
      res.status(404).json({ message: 'Team member not found' });
      return;
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error });
  }
});

export const teamMemberRoutes = router;
