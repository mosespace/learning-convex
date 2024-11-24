'use client';

import { MeetDetails } from '@/components/meet-details';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from 'convex/react';
import { FilePenLine, Minus, Star, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { CreateMeetForm } from './create-meet-form';

interface Meet {
  _id: any;
  title: string;
  description: string;
  dateTime: string;
  link: string;
  attendees?: number;
  rating?: number;
  totalRatings?: number;
  userId: string;
}

interface MeetCardProps {
  meet: Meet;
  userId: any;
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

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function getRandomBgColor(id: string): string {
  const hash = hashString(id);
  return bgColors[hash % bgColors.length];
}

export function MeetCard({ meet, userId }: MeetCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const deleteMeet = useMutation(api.meets.deleteMeet);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(meet.dateTime);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const meetId = meet._id;

  const handleDelete = async () => {
    try {
      await deleteMeet({ meetId, userId });

      toast({
        title: 'Meet deleted',
        description: 'The meet has been successfully deleted.',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Failed to delete the meet. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <div
        className={`${getRandomBgColor(
          meet._id,
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
              {meet.rating && (
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(meet?.rating as any)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
              {meet.totalRatings && (
                <span className="text-gray-400">({meet.totalRatings})</span>
              )}
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
          {userId && userId === meet.userId && (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    aria-label="Delete meet"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this meet?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the meet and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">
                    <FilePenLine className="size-4" />
                    {/* Update Meet */}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto py-8 w-full max-w-sm">
                    <CreateMeetForm
                      isOpen={isCreateFormOpen}
                      initialData={meet}
                      onClose={() => setIsCreateFormOpen(false)}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </>
          )}
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
