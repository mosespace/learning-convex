import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Star, LinkIcon } from 'lucide-react';

interface MeetDetailsProps {
  meet: {
    _id: any;
    title: string;
    description: string;
    dateTime: string;
    link: string;
    attendees?: number;
    rating?: number;
    totalRatings?: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function MeetDetails({ meet, isOpen, onClose }: MeetDetailsProps) {
  const date = new Date(meet.dateTime);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{meet.title}</DialogTitle>
          <DialogDescription>Meet Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span>{meet.attendees} Attendees</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span>
              {meet.rating} ({meet.totalRatings} ratings)
            </span>
          </div>
          <p className="text-sm text-gray-500">{meet.description}</p>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-gray-500" />
            <a
              href={meet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {meet.link}
            </a>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => window.open(meet.link, '_blank')}>
            Join Meet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
