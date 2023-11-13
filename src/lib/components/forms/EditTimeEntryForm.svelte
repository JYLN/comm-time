<script lang="ts">
  import { editTimeEntrySchema, type EditTimeEntrySchema } from '$lib/schemas';
  import type { SelectData } from '$lib/utils';
  import type { FormOptions } from 'formsnap';
  import type { SuperValidated } from 'sveltekit-superforms';
  import * as Form from '../ui/form';
  import CustomerSelect from './CustomerSelect.svelte';

  export let form: SuperValidated<EditTimeEntrySchema>;
  export let customers: SelectData | undefined;
  export let options: FormOptions<EditTimeEntrySchema>;
</script>

<Form.Root
  {form}
  {options}
  schema={editTimeEntrySchema}
  method="POST"
  action="?/editTime"
  class="grid gap-4 rounded-md border bg-background p-8"
  let:config
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
  <Form.Button class="transition-all duration-200 ease-in-out">Submit</Form.Button>
</Form.Root>
