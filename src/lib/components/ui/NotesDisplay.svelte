<script lang="ts">
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';

  export let notes: string;

  const markedNotes = marked(notes) as string | Node;
</script>

<div class="prose prose-zinc dark:prose-invert">
  {@html DOMPurify.sanitize(markedNotes)}
</div>
