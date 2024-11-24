import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Star, Users } from 'lucide-react';
import { MeetDetails } from '@/components/meet-details';

interface Meet {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  link: string;
  attendees: number;
  rating: number;
  totalRatings: number;
}

interface MeetCardProps {
  meet: Meet;
}

const bgColors = [
  'bg-red-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
  'bg-teal-100',
];

function getRandomBgColor(id: number): string {
  return bgColors[id % bgColors.length];
}

export function MeetCard({ meet }: MeetCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const date = new Date(meet.dateTime);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="overflow-hidden">
      <div
        className={`${getRandomBgColor(
          meet.id,
        )} p-8 flex items-center justify-center`}
      >
        <h3 className="text-xl text-center font-bold uppercase">
          {meet.title}
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex flex-col items-start">
          <div className="flex items-center w-full justify-between">
            <div className="flex justify-center gap-3">
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 hover:bg-gray-100"
              >
                <Users className="w-4 h-4 mr-1" />
                {meet.attendees} Attendees
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 hover:bg-gray-100"
              >
                {formattedDate} • {formattedTime}
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-600">
              <span className="text-lg font-semibold">{meet.rating}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(meet.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">({meet.totalRatings})</span>
            </div>
          </div>
          <p className="text-gray-600 line-clamp-3 mt-4">{meet.description}</p>
        </div>
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
            onClick={() => window.open(meet.link, '_blank')}
          >
            Join Meet
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setIsDetailsOpen(true)}
          >
            View Details
          </Button>
        </div>
      </div>
      <MeetDetails
        meet={meet}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </Card>
  );
}
