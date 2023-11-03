import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Email must be a valid email.'),
  password: z.string().min(1, 'Password is required.')
});

export const LoginFormSchema = typeof loginFormSchema;

export const timeEntrySchema = z.object({
  name: z.string().min(5, { message: 'Name must be longer than 5 characters.' }),
  customer: z.string({ required_error: 'Please select a valid customer.' }),
  notes: z.string().optional(),
  start_time: z
    .string({ required_error: 'You must start the timer before submitting a time entry.' })
    .datetime('You must start the timer before submitting a time entry.'),
  end_time: z.string().datetime().optional(),
  elapsed_time: z.number(),
  author: z.string()
});

export type TimeEntrySchema = typeof timeEntrySchema;

export const editTimeEntrySchema = timeEntrySchema.omit({
  start_time: true,
  end_time: true,
  elapsed_time: true,
  author: true
});
export type EditTimeEntrySchema = typeof editTimeEntrySchema;

export const deleteTimeEntrySchema = z.object({
  id: z.string().min(1)
});

export type DeleteTimeEntrySchema = typeof deleteTimeEntrySchema;
