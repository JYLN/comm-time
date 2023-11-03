import { customers, type Customers } from '$lib/mock-data';
import { z } from 'zod';

export const timeEntrySchema = z.object({
  name: z.string().min(5, { message: 'Name must be longer than 5 characters.' }),
  customer: z.enum(customers.map((f) => f.value) as [Customers, ...Customers[]], {
    errorMap: () => ({ message: 'Please select a valid customer' })
  }),
  notes: z.string().optional(),
  start_time: z
    .string({ required_error: 'You must start the timer before submitting a time entry.' })
    .datetime('You must start the timer before submitting a time entry.'),
  end_time: z.string().datetime().optional(),
  elapsed_time: z.number(),
  user: z.string({ required_error: 'User is required' })
});

export type TimeEntrySchema = typeof timeEntrySchema;

export const deleteTimeEntrySchema = z.object({
  id: z.string().min(1)
});

export type DeleteTimeEntrySchema = typeof deleteTimeEntrySchema;
