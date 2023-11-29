<script lang="ts">
  import LoginForm from '$lib/components/forms/LoginForm.svelte';
</script>

<svelte:head>
  <title>Login - CommTime</title>
</svelte:head>

<main>
  <LoginForm />
</main>

<style lang="postcss">
  main {
    @apply mx-auto flex h-screen w-3/4 items-center justify-center bg-background lg:w-1/2 xl:w-1/4;
  }
</style>
