export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface TeamMember {
  id: string;
  name: string;
  skills: Skill[];
  assignedTickets: string[];
}

// Hardcoded team members with skills
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    skills: [
      { name: 'JavaScript', level: 'expert' },
      { name: 'React', level: 'expert' },
      { name: 'Node.js', level: 'intermediate' }
    ],
    assignedTickets: []
  },
  {
    id: '2',
    name: 'Jane Smith',
    skills: [
      { name: 'Python', level: 'expert' },
      { name: 'Data Analysis', level: 'expert' },
      { name: 'JavaScript', level: 'beginner' }
    ],
    assignedTickets: []
  },
  {
    id: '3',
    name: 'Bob Johnson',
    skills: [
      { name: 'Java', level: 'expert' },
      { name: 'Spring', level: 'intermediate' },
      { name: 'Database', level: 'expert' }
    ],
    assignedTickets: []
  },
  {
    id: '4',
    name: 'Alice Williams',
    skills: [
      { name: 'UI/UX', level: 'expert' },
      { name: 'React', level: 'intermediate' },
      { name: 'CSS', level: 'expert' }
    ],
    assignedTickets: []
  },
  {
    id: '5',
    name: 'Charlie Brown',
    skills: [
      { name: 'DevOps', level: 'expert' },
      { name: 'Cloud', level: 'expert' },
      { name: 'Node.js', level: 'intermediate' }
    ],
    assignedTickets: []
  }
];

export const getAllTeamMembers = (): TeamMember[] => {
  return teamMembers;
};

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const assignTicketToMember = (memberId: string, ticketId: string): boolean => {
  const member = getTeamMemberById(memberId);
  if (member) {
    member.assignedTickets.push(ticketId);
    return true;
  }
  return false;
};