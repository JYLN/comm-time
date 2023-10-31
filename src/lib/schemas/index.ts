import { customers, type Customers } from '$lib/mock-data';
import { z } from 'zod';

export const timeEntrySchema = z.object({
  name: z.string().min(5, { message: 'Name must be longer than 5 characters.' }),
  customer: z.enum(customers.map((f) => f.value) as [Customers, ...Customers[]], {
    errorMap: () => ({ message: 'Please select a valid customer' })
  }),
  notes: z.string().optional(),
  start_time: z
    .string()
    .datetime({ message: 'You must start the timer before attempting to submit a time entry.' }),
  end_time: z.string().datetime(),
  elapsed_time: z.number(),
  user: z.string({ required_error: 'User is required' })
});

export type TimeEntrySchema = typeof timeEntrySchema;
