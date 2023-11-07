<script lang="ts">
  import SharedUserForm from '$lib/components/forms/SharedUserForm.svelte';

  export let data;
</script>

<main class="container mx-auto">
  <h2 class="heading-1">Share Time Entry</h2>
  <p class="mb-4 text-sm text-muted-foreground">
    Select users below to share this time entry. Click 'Submit' when finished.
  </p>
  {#if data.form}
    <SharedUserForm formData={data.form} users={data.timeEntry?.shared_users} />
  {/if}
</main>
