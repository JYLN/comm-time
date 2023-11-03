export const customers = [
  { label: 'Customer 1', value: '1' },
  { label: 'Customer 2', value: '2' },
  { label: 'Customer 3', value: '3' },
  { label: 'Customer 4', value: '4' },
  { label: 'Customer 5', value: '5' },
  { label: 'Customer 6', value: '6' },
  { label: 'Customer 7', value: '7' },
  { label: 'Customer 8', value: '8' },
  { label: 'Customer 9', value: '9' }
];

export type CustomersArr = typeof customers;
export type Customers = (typeof customers)[number]['value'];

export const timeEntries = [
  {
    id: 'sadfjas',
    name: 'Job 1',
    customer: 'Customer 1',
    notes: 'Some notes...',
    start_time: '2023-11-02T04:36:32.500Z',
    end_time: '2023-11-02T04:36:32.500Z',
    elapsed_time: 1354621
  },
  {
    id: 'sadfjasasdfasd',
    name: 'Job 2',
    customer: 'Customer 2',
    notes: 'Some notes...',
    start_time: '2023-11-02T04:36:32.500Z',
    end_time: '2023-11-02T04:36:32.500Z',
    elapsed_time: 1354621
  },
  {
    id: 'saadsfdfjasdfasdfas',
    name: 'Job 3',
    customer: 'Customer 3',
    notes: 'Some notes...',
    start_time: '2023-11-02T04:36:32.500Z',
    end_time: '2023-11-02T04:36:32.500Z',
    elapsed_time: 1354621
  },
  {
    id: 'safasdfdfaasdfsdfasdjasadfasdf',
    name: 'Job 4',
    customer: 'Customer 4',
    notes: 'Some notes...',
    start_time: '2023-11-02T04:36:32.500Z',
    end_time: '2023-11-02T04:36:32.500Z',
    elapsed_time: 13546346621
  }
];

export type TimeEntries = typeof timeEntries;
