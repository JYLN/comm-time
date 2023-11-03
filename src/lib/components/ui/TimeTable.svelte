<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import type { TimeEntries } from '$lib/mock-data';
  import type { DeleteTimeEntrySchema } from '$lib/schemas';
  import { humanize } from '$lib/utils';
  import moment from 'moment';
  import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  import type { SuperValidated } from 'sveltekit-superforms';
  import TimeTableActions from './TimeTableActions.svelte';

  export let data: TimeEntries;
  export let form: SuperValidated<DeleteTimeEntrySchema>;

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
          elapsed_time: value.elapsed_time,
          form
        });
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border bg-background">
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
