import React, { useState } from 'react';
import { TeamMember } from '@/App';

interface TicketFormProps {
  teamMembers: TeamMember[];
  onSubmit: (title: string, description: string, deadline: string, requiredSkills: string[]) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({teamMembers, onSubmit}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const availableSkills = Array.from(
    new Set(
      teamMembers.flatMap(member =>
        member.skills.map(skill => skill.name)
      )
    )
  ).sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !deadline) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(title, description, deadline, selectedSkills);

    setTitle('');
    setDescription('');
    setDeadline('');
    setSelectedSkills([]);
  };

  const handleSkillChange = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div>
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline *</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Required Skills</label>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
            {availableSkills.map(skill => (
              <div key={skill} style={{display: 'flex', alignItems: 'center'}}>
                <input
                  type="checkbox"
                  id={`skill-${skill}`}
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                  style={{width: 'auto', marginRight: '5px'}}
                />
                <label htmlFor={`skill-${skill}`} style={{display: 'inline', fontWeight: 'normal'}}>
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;