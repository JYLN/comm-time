<script lang="ts">
  import { customers } from '$lib/mock-data';
  import { timeEntrySchema, type TimeEntrySchema } from '$lib/schemas';
  import { timeStops } from '$lib/stores/timeStore';
  import { cn } from '$lib/utils';
  import type { FormOptions } from 'formsnap';
  import { Check, ChevronsUpDown } from 'lucide-svelte';
  import { tick } from 'svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { Button } from '../ui/button';
  import * as Command from '../ui/command';
  import * as Form from '../ui/form';
  import * as Popover from '../ui/popover';
  import TimeEntryHiddenInput from './TimeEntryHiddenInput.svelte';

  export let form: SuperValidated<TimeEntrySchema>;
  export let options: FormOptions<TimeEntrySchema>;

  let open = false;

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Form.Root
  {form}
  {options}
  method="POST"
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
      <Popover.Root bind:open let:ids positioning={{ placement: 'bottom-start' }}>
        <Popover.Trigger asChild let:builder>
          <Form.Control id={ids.trigger} let:attrs>
            <Button
              builders={[builder]}
              {...attrs}
              variant="outline"
              role="combobox"
              type="button"
              class={cn('justify-between', !value && 'text-muted-foreground')}
            >
              {customers.find((f) => f.value === value)?.label ?? 'Select customer'}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Form.Control>
        </Popover.Trigger>
        <Popover.Content class="w-[325px] p-0">
          <Command.Root>
            <Command.Input autofocus placeholder="Search customer..." />
            <Command.Empty>No customer found.</Command.Empty>
            <Command.Group>
              {#each customers as customer}
                <Command.Item
                  value={customer.value}
                  onSelect={() => {
                    setValue(customer.value);
                    closeAndFocusTrigger(ids.trigger);
                  }}
                >
                  <Check
                    class={cn('mr-2 h-4 w-4', customer.value !== value && 'text-transparent')}
                  />
                  {customer.label}
                </Command.Item>
              {/each}
            </Command.Group>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Field {config} name="notes">
    <Form.Item class="flex flex-col">
      <Form.Label>Notes</Form.Label>
      <Form.Textarea class="resize-y" />
      <Form.Description>Markdown support coming soon...</Form.Description>
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
