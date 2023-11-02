<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import { humanize } from '$lib/utils';
  import moment from 'moment';
  import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  import TimeTableActions from './TimeTableActions.svelte';

  type TimeEntry = {
    id: string;
    name: string;
    customer: string;
    notes: string;
    start_time: string;
    end_time: string;
    elapsed_time: number;
  };

  export let data: TimeEntry[] = [
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

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({
      accessor: 'name',
      header: 'Name'
    }),
    table.column({
      accessor: 'customer',
      header: 'Customer'
    }),
    table.column({
      accessor: 'start_time',
      header: 'Start Time',
      cell: ({ value }) => {
        return moment(value).format('MM/DD/YY hh:mma');
      }
    }),
    table.column({
      accessor: 'end_time',
      header: 'End Time',
      cell: ({ value }) => {
        return moment(value).format('MM/DD/YY hh:mma');
      }
    }),
    table.column({
      accessor: 'elapsed_time',
      header: 'Total Time',
      cell: ({ value }) => humanize(value)
    }),
    table.column({
      accessor: (item) => item,
      header: '',
      id: 'actions',
      cell: ({ value }) => {
        return createRender(TimeTableActions, {
          id: value.id,
          name: value.name,
          customer: value.customer,
          notes: value.notes,
          elapsed_time: value.elapsed_time
        });
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  <Render of={cell.render()} />
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
