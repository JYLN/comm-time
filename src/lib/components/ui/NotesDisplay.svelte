<script lang="ts">
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';

  export let notes: string;
</script>

<div class="prose prose-zinc dark:prose-invert">
  {@html DOMPurify.sanitize(marked(notes))}
</div>
