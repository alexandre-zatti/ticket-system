import React from 'react';
import { TeamMember, Ticket } from '@/App';

interface TicketListProps {
  tickets: Ticket[];
  teamMembers: TeamMember[];
  onAssign?: (ticketId: string, memberId: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({tickets, teamMembers, onAssign}) => {
  const getTeamMemberName = (memberId?: string): string => {
    if (!memberId) return 'Unassigned';
    const member = teamMembers.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'assigned':
        return 'status-assigned';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (tickets.length === 0) {
    return (
      <div className="ticket-list">
        <h2>Tickets</h2>
        <p>No tickets found. Create a new ticket to get started.</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>

      {tickets.map(ticket => (
        <div key={ticket.id} className="ticket-card">
          <div className="ticket-header">
            <div className="ticket-title">{ticket.title}</div>
            <div className={`ticket-status ${getStatusClass(ticket.status)}`}>
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </div>
          </div>

          <div className="ticket-details">
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Deadline:</strong> {formatDate(ticket.deadline)}</p>

            <div className="ticket-assignment">
              <strong>Assigned to:</strong> {getTeamMemberName(ticket.assignedTo)}

              {onAssign && (
                <div className="assign-controls">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        onAssign(ticket.id, e.target.value);
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select team member</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {ticket.requiredSkills.length > 0 && (
              <div>
                <strong>Required Skills:</strong>
                <div className="ticket-skills">
                  {ticket.requiredSkills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            <p><strong>Created:</strong> {formatDate(ticket.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
