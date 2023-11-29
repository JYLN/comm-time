<script lang="ts">
  import { page } from '$app/stores';
  import { timeEntrySchema } from '$lib/schemas';
  import { elaspedTime, TIMERSTATE, timerState, timeStops } from '$lib/stores/timeStore';
  import { createEventDispatcher } from 'svelte';
  import * as Form from '../ui/form';
  import { addToast } from '../ui/Toaster.svelte';
  import CustomerSelect from './CustomerSelect.svelte';
  import Editor from './Editor.svelte';
  import TimeEntryHiddenInput from './TimeEntryHiddenInput.svelte';

  const dispatch = createEventDispatcher();
</script>

<Form.Root
  form={$page.data.form}
  schema={timeEntrySchema}
  options={{
    validators: timeEntrySchema,
    onSubmit: ({ formData }) => {
      if ($timerState === TIMERSTATE.RUNNING) {
        dispatch('pause');
      }

      formData.set('end_time', $timeStops[$timeStops.length - 1]);
      formData.set('elapsed_time', $elaspedTime.toString());
    },
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          dispatch('reset');
          addToast({
            data: { title: 'Success!', description: 'Time entry created successfully!' }
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
  action="?/createTime"
  let:config
  class="grid gap-4"
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
      <Editor />
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
