<script lang="ts">
  import { formatCommand } from '$lib/utils';
  import type { Tooltip as TooltipPrimitive } from 'bits-ui';
  import { getFormField } from 'formsnap';
  import { Bold, ClipboardCopy, Heading, Italic, Link, List, ListOrdered } from 'lucide-svelte';
  import { addToast } from '../ui/Toaster.svelte';
  import { Button } from '../ui/button';
  import * as Tooltip from '../ui/tooltip';

  const { attrStore, actions, value: editorValue } = getFormField();

  let textAreaRef: HTMLTextAreaElement;
  const toolTipProps: TooltipPrimitive.Props = {
    positioning: { placement: 'bottom' },
    openDelay: 200,
    closeDelay: 100,
    group: 'actions'
  };

  function handleHeader() {
    formatCommand(textAreaRef, 'heading');
  }

  function handleBold() {
    formatCommand(textAreaRef, 'bold');
  }

  function handleItalic() {
    formatCommand(textAreaRef, 'italic');
  }

  function handleLink() {
    formatCommand(textAreaRef, 'link');
  }

  function handleOrderedList() {
    formatCommand(textAreaRef, 'list-number');
  }

  function handleUnorderedList() {
    formatCommand(textAreaRef, 'list');
  }

  async function handleCopy() {
    try {
      navigator.clipboard.writeText($editorValue as string);
    } catch (err) {
      console.error(err);
      addToast({ data: { title: 'Error!', description: 'Something went wrong. Try again!' } });
    } finally {
      addToast({
        data: {
          title: 'Success!',
          description: 'Note contents have successfully been copied to your clipboard!'
        }
      });
    }
  }
</script>

<div class="relative">
  <textarea
    class="shadcn-textarea"
    rows="12"
    bind:this={textAreaRef}
    bind:value={$editorValue}
    use:actions.textarea
    {...$attrStore}
  />

  <div class="button-container">
    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="px-2 py-0" on:click={handleHeader}>
          <Heading class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Bold</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="px-2 py-0" on:click={handleBold}>
          <Bold class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Bold</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="px-2 py-0" on:click={handleItalic}>
          <Italic class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Italic</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="px-2 py-0" on:click={handleLink}>
          <Link class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Link</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          class="px-2 py-0"
          on:click={handleOrderedList}
        >
          <ListOrdered class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Ordered List</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          class="px-2 py-0"
          on:click={handleUnorderedList}
        >
          <List class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Unordered List</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root {...toolTipProps}>
      <Tooltip.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="px-2 py-0" on:click={handleCopy}>
          <ClipboardCopy class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Copy to clipboard</Tooltip.Content>
    </Tooltip.Root>
  </div>
</div>

<style lang="postcss">
  .button-container {
    @apply absolute bottom-0 w-max px-3 py-2;
  }

  .shadcn-textarea {
    @apply flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
  }
</style>
