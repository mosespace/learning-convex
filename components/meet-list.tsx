'use client';

import { useState } from 'react';
import { MeetCard } from '@/components/meet-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';
import getUserId from '@/utils/getOrCreateuserId';

function MeetListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function MeetList() {
  const [searchTerm, setSearchTerm] = useState('');
  const meets = useQuery(api.meets.getMeets);

  if (meets === undefined) {
    return <MeetListSkeleton />;
  }

  if (meets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No meetings scheduled yet.</p>
      </div>
    );
  }

  const userId = getUserId();

  const filteredMeets = meets.filter(
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
          <MeetCard key={meet._id} meet={meet as any} userId={userId} />
        ))}
      </div>
    </div>
  );
}
