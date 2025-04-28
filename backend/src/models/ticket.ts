import { v4 as uuidv4 } from 'uuid';
import { teamMembers, TeamMember } from './teamMember';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'open' | 'assigned' | 'in-progress' | 'completed';
  requiredSkills: string[];
  assignedTo?: string;
  createdAt: string;
}

export const tickets: Ticket[] = [];

export const createTicket = (
  title: string,
  description: string,
  deadline: string,
  requiredSkills: string[]
): Ticket => {
  const newTicket: Ticket = {
    id: uuidv4(),
    title,
    description,
    deadline,
    status: 'open',
    requiredSkills,
    createdAt: new Date().toISOString()
  };
  
  tickets.push(newTicket);
  
  assignTicketToTeamMember(newTicket);
  
  return newTicket;
};

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find(ticket => ticket.id === id);
};

export const updateTicket = (id: string, updates: Partial<Ticket>): Ticket | null => {
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
  if (ticketIndex === -1) return null;
  
  tickets[ticketIndex] = { ...tickets[ticketIndex], ...updates };
  return tickets[ticketIndex];
};

export const deleteTicket = (id: string): boolean => {
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
  if (ticketIndex === -1) return false;
  
  tickets.splice(ticketIndex, 1);
  return true;
};

const findBestTeamMemberForTicket = (ticket: Ticket): TeamMember | null => {
  // Calculate a score for each team member based on matching skills
  const memberScores = teamMembers.map(member => {
    let score = 0;
    
    // Check if the member has the required skills
    for (const requiredSkill of ticket.requiredSkills) {
      const memberSkill = member.skills.find(skill => 
        skill.name.toLowerCase() === requiredSkill.toLowerCase()
      );
      
      if (memberSkill) {
        // Add points based on skill level
        if (memberSkill.level === 'expert') score += 3;
        else if (memberSkill.level === 'intermediate') score += 2;
        else score += 1;
      }
    }
    
    // Consider workload (number of assigned tickets)
    score -= member.assignedTickets.length * 0.5;
    
    return { member, score };
  });
  
  // Sort by score (highest first)
  memberScores.sort((a, b) => b.score - a.score);
  
  // Return the member with the highest score if any have a positive score
  return memberScores.length > 0 && memberScores[0].score > 0 
    ? memberScores[0].member 
    : null;
};

export const assignTicketToTeamMember = (ticket: Ticket): boolean => {
  const bestMember = findBestTeamMemberForTicket(ticket);
  
  if (bestMember) {
    updateTicket(ticket.id, {
      assignedTo: bestMember.id,
      status: 'assigned'
    });
    
    bestMember.assignedTickets.push(ticket.id);
    
    return true;
  }
  
  return false;
};