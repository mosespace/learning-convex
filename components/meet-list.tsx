'use client';

import { useState } from 'react';
import { MeetCard } from '@/components/meet-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock data for demonstration
const mockMeets = [
  {
    id: 1,
    title: 'Weekly Standup',
    description:
      'Join our weekly team sync to discuss progress and upcoming tasks.',
    dateTime: '2023-05-15T10:00:00Z',
    link: 'https://meet.google.com/abc-defg-hij',
    attendees: 32,
    rating: 4.8,
    totalRatings: 127,
  },
  {
    id: 2,
    title: 'Product Demo',
    description: 'Live demonstration of our latest features and improvements.',
    dateTime: '2023-05-16T14:00:00Z',
    link: 'https://meet.google.com/klm-nopq-rst',
    attendees: 15,
    rating: 4.5,
    totalRatings: 89,
  },
  {
    id: 3,
    title: 'Tech Talk',
    description: 'Learn about the latest developments in web technologies.',
    dateTime: '2023-05-17T11:00:00Z',
    link: 'https://meet.google.com/uvw-xyza-bcd',
    attendees: 50,
    rating: 4.9,
    totalRatings: 203,
  },
];

export function MeetList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeets = mockMeets.filter(
    (meet) =>
      meet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meet.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search meets..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3s">
        {filteredMeets.map((meet) => (
          <MeetCard key={meet.id} meet={meet} />
        ))}
      </div>
    </div>
  );
}
