<script lang="ts">
  import { humanize } from '$lib/utils';
  import type { RecordModel } from 'pocketbase';
  import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
  import { addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
  import { writable } from 'svelte/store';
  import type {
    CustomersResponse,
    TimeEntriesResponse,
    UsersResponse
  } from '../../../backend-types';
  import TimeTableActions from './TimeTableActions.svelte';
  import UserAvatarStack from './UserAvatarStack.svelte';
  import { Input } from './input';
  import * as Table from './table';

  export let data:
    | TimeEntriesResponse<{
        customer: CustomersResponse;
        shared_users: UsersResponse[];
        author: UsersResponse;
      }>[]
    | RecordModel[];

  const tableData = writable(data);

  const table = createTable(tableData, {
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
    }),
    sort: addSortBy()
  });

  const excludeFromFilter = {
    filter: {
      exclude: true
    }
  };

  const excludeFromSort = {
    sort: {
      disable: true
    }
  };

  const convertFilterValue = {
    filter: {
      getFilterValue: (result: any) => {
        return humanize(result);
      }
    }
  };

  const columns = table.createColumns([
    table.column({
      accessor: 'name',
      header: 'Name'
    }),
    table.column({
      accessor: ({ expand }) => expand?.customer.name,
      header: 'Customer'
    }),
    table.column({
      accessor: 'start_time',
      header: 'Start Time',
      cell: ({ value }) => {
        return humanize(value);
      },
      plugins: { ...convertFilterValue }
    }),
    table.column({
      accessor: 'end_time',
      header: 'End Time',
      cell: ({ value }) => {
        return humanize(value);
      },
      plugins: { ...convertFilterValue }
    }),
    table.column({
      accessor: 'elapsed_time',
      header: 'Total Time',
      cell: ({ value }) => humanize(value),
      ...excludeFromFilter
    }),
    table.column({
      accessor: ({ expand }) => expand?.shared_users,
      header: '',
      cell: ({ value }) => {
        return createRender(UserAvatarStack, {
          users: value
        });
      },
      plugins: { ...excludeFromFilter }
    }),
    table.column({
      accessor: (item) => item,
      header: '',
      id: 'actions',
      cell: ({ value }) => {
        return createRender(TimeTableActions, {
          id: value.id,
          name: value.name,
          customer: value.expand?.customer.name,
          notes: value.notes,
          elapsed_time: value.elapsed_time,
          shared_users: value.expand?.shared_users,
          author: value.expand?.author,
          start_time: value.start_time,
          end_time: value.end_time
        });
      },
      plugins: { ...excludeFromFilter, ...excludeFromSort }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { filterValue } = pluginStates.filter;
</script>

<div class="mb-6">
  <Input
    class="max-w-md bg-background"
    placeholder="Search by job name, customer, start date, or end date..."
    type="text"
    bind:value={$filterValue}
  />
</div>
<div class="grid gap-6 rounded-md border bg-background">
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
