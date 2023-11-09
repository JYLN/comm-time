<script lang="ts">
  import { timeEntrySchema, type TimeEntrySchema } from '$lib/schemas';
  import { timeStops } from '$lib/stores/timeStore';
  import type { SelectData } from '$lib/utils';
  import type { FormOptions } from 'formsnap';
  import type { SuperValidated } from 'sveltekit-superforms';
  import * as Form from '../ui/form';
  import CustomerSelect from './CustomerSelect.svelte';
  import TimeEntryHiddenInput from './TimeEntryHiddenInput.svelte';

  export let form: SuperValidated<TimeEntrySchema>;
  export let options: FormOptions<TimeEntrySchema>;
  export let customers: SelectData;
</script>

<Form.Root
  {form}
  {options}
  method="POST"
  enctype="multipart/form-data"
  action="?/createTime"
  schema={timeEntrySchema}
  let:config
  class="grid gap-4"
  debug={true}
>
  <Form.Field {config} name="name">
    <Form.Item class="flex flex-col">
      <Form.Label>Name</Form.Label>
      <Form.Input />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Field {config} name="customer" let:setValue let:value>
    <Form.Item class="flex flex-col">
      <Form.Label>Customer</Form.Label>
      <CustomerSelect {setValue} {value} {customers} />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Field {config} name="notes">
    <Form.Item class="flex flex-col">
      <Form.Label>Notes</Form.Label>
      <Form.Textarea class="resize-y" />
      <Form.Description>
        Markdown syntax is supported. Click
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noreferrer"
          class="underline hover:text-muted-foreground/80"
        >
          here
        </a>
        for more info.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Field {config} name="start_time">
    <TimeEntryHiddenInput />
    <Form.Validation />
  </Form.Field>
  <Form.Button class="transition-all duration-200 ease-in-out" disabled={$timeStops.length < 1}>
    Submit
  </Form.Button>
</Form.Root>
