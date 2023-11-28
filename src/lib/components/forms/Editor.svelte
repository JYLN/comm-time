<script lang="ts">
  import { formatCommand } from '$lib/utils';
  import type { Tooltip as TooltipPrimitive } from 'bits-ui';
  import { getFormField } from 'formsnap';
  import { Bold, ClipboardCopy, Italic, Link, List, ListOrdered } from 'lucide-svelte';
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

<div class="flex flex-col gap-2">
  <textarea
    class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    rows="8"
    bind:this={textAreaRef}
    bind:value={$editorValue}
    use:actions.textarea
    {...$attrStore}
  />

  <div class="flex items-center justify-between">
    <div class="button-container">
      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" on:click={handleBold}>
            <Bold class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Bold</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" on:click={handleItalic}>
            <Italic class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Italic</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" on:click={handleLink}>
            <Link class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Link</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" on:click={handleOrderedList}>
            <ListOrdered class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Ordered List</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" on:click={handleUnorderedList}>
            <List class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Unordered List</Tooltip.Content>
      </Tooltip.Root>
    </div>

    <div class="button-container">
      <Tooltip.Root {...toolTipProps}>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" on:click={handleCopy}>
            <ClipboardCopy class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Copy to clipboard</Tooltip.Content>
      </Tooltip.Root>
    </div>
  </div>
</div>

<style lang="postcss">
  .button-container {
    @apply w-max rounded-md border px-2 py-1;
  }
</style>
