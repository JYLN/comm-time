<script lang="ts">
  import { page } from '$app/stores';
  import { editTimeEntrySchema, type EditTimeEntrySchema } from '$lib/schemas';
  import type { SuperValidated } from 'sveltekit-superforms';
  import * as Form from '../ui/form';
  import { addToast } from '../ui/Toaster.svelte';
  import CustomerSelect from './CustomerSelect.svelte';

  export let form: SuperValidated<EditTimeEntrySchema> = $page.data.form;
</script>

<Form.Root
  {form}
  schema={editTimeEntrySchema}
  options={{
    validators: editTimeEntrySchema,
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          addToast({
            data: {
              title: 'Success!',
              description: 'Time entry edited successfully!'
            }
          });
          break;
      }
    },
    onError: ({ result }) => {
      console.log(result);
      addToast({ data: { title: 'Error!', description: result.error.message } });
    }
  }}
  method="POST"
  enctype="multipart/form-data"
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
  <Form.Field {config} name="customer">
    <Form.Item class="flex flex-col">
      <Form.Label>Customer</Form.Label>
      <CustomerSelect />
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
