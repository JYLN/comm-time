<script lang="ts">
  import { page } from '$app/stores';
  import { cn, convertSelectData } from '$lib/utils';
  import { getFormField } from 'formsnap';
  import { Check, ChevronsUpDown } from 'lucide-svelte';
  import { tick } from 'svelte';
  import { Button } from '../ui/button';
  import * as Command from '../ui/command';
  import * as Form from '../ui/form';
  import * as Popover from '../ui/popover';

  const { value } = getFormField();
  const customers = convertSelectData($page.data.fullCustomersList) as Custom.SelectData[];
  let open = false;

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Form.Control id={ids.trigger} let:attrs>
      <Button
        builders={[builder]}
        {...attrs}
        variant="outline"
        role="combobox"
        type="button"
        class={cn('justify-between', !$value && 'text-muted-foreground')}
      >
        {customers?.find((f) => f.value === $value)?.label ?? 'Select customer'}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Form.Control>
  </Popover.Trigger>
  <Popover.Content class="w-[325px] p-0" side="bottom" align="start" sideOffset={8}>
    <Command.Root>
      <Command.Input autofocus placeholder="Search customer..." />
      <Command.Empty>No customer found.</Command.Empty>
      <Command.Group>
        {#if customers}
          {#each customers as customer}
            <Command.Item
              value={customer.label}
              onSelect={() => {
                $value = customer.value;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <Check class={cn('mr-2 h-4 w-4', customer.value !== $value && 'text-transparent')} />
              {customer.label}
            </Command.Item>
          {/each}
        {/if}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
