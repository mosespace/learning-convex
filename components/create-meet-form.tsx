'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MeetFormData, meetSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import getUserId from '@/utils/getOrCreateuserId';

interface CreateMeetFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMeetForm({ isOpen, onClose }: CreateMeetFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMeet = useMutation(api.meets.createMeet);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MeetFormData>({
    resolver: zodResolver(meetSchema),
  });

  const userId = getUserId();

  const onSubmit = async (data: MeetFormData) => {
    try {
      setIsSubmitting(true);
      await createMeet({
        title: data.title,
        description: data.description,
        dateTime: data.dateTime,
        link: data.link,
        userId: userId as string,
      });

      toast({
        title: 'Success',
        description: 'Meet created successfully',
      });

      reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to create meet',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          aria-invalid={errors.title ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          aria-invalid={errors.description ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateTime">Date and Time</Label>
        <Input
          id="dateTime"
          type="datetime-local"
          {...register('dateTime')}
          aria-invalid={errors.dateTime ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.dateTime && (
          <p className="text-sm text-red-500">{errors.dateTime.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="link">Meet Link</Label>
        <Input
          id="link"
          type="url"
          {...register('link')}
          aria-invalid={errors.link ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.link && (
          <p className="text-sm text-red-500">{errors.link.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Meet'}
        </Button>
      </div>
    </form>
  );
}
