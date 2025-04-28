import React, { useEffect, useState } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import axios from 'axios';

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

export interface TeamMember {
  id: string;
  name: string;
  skills: {
    name: string;
    level: 'beginner' | 'intermediate' | 'expert';
  }[];
  assignedTickets: string[];
}

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // @ts-ignore
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ticketsResponse, membersResponse] = await Promise.all([
          axios.get<Ticket[]>(`${API_URL}/tickets`),
          axios.get<TeamMember[]>(`${API_URL}/team-members`)
        ]);

        setTickets(ticketsResponse.data);
        setTeamMembers(membersResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateTicket = async (
    title: string,
    description: string,
    deadline: string,
    requiredSkills: string[]
  ) => {
    try {
      const response = await axios.post<Ticket>(`${API_URL}/tickets`, {
        title,
        description,
        deadline,
        requiredSkills
      });

      setTickets([...tickets, response.data]);
      setActiveTab('list'); // Switch to list view after creating a ticket
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket. Please try again.');
    }
  };

  const handleAssignTicket = async (ticketId: string, memberId: string) => {
    try {
      const response = await axios.post<Ticket>(
        `${API_URL}/tickets/${ticketId}/assign/${memberId}`
      );

      setTickets(tickets.map(ticket =>
        ticket.id === ticketId ? response.data : ticket
      ));
    } catch (err) {
      console.error('Error assigning ticket:', err);
      setError('Failed to assign ticket. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Ticket Assignment System</h1>

      {error && <div style={{color: 'red', marginBottom: '20px'}}>{error}</div>}

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Create Ticket
        </div>
        <div
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          View Tickets
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {activeTab === 'form' && (
            <TicketForm
              teamMembers={teamMembers}
              onSubmit={handleCreateTicket}
            />
          )}

          {activeTab === 'list' && (
            <TicketList
              tickets={tickets}
              teamMembers={teamMembers}
              onAssign={handleAssignTicket}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
