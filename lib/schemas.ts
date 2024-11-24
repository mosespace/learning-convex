import * as z from 'zod';

export const meetSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be 500 characters or less'),
  dateTime: z.string().min(1, 'Date and time is required'),
  link: z.string().url('Must be a valid URL').min(1, 'Meet link is required'),
});

export type MeetFormData = z.infer<typeof meetSchema>;
