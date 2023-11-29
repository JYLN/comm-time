<script lang="ts">
  import { page } from '$app/stores';
  import { loginFormSchema } from '$lib/schemas';
  import { addToast } from '../ui/Toaster.svelte';
  import * as Form from '../ui/form';
</script>

<Form.Root
  form={$page.data.form}
  schema={loginFormSchema}
  options={{
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          addToast({ data: { title: 'Success!', description: 'Successfully logged in.' } });
          break;
      }
    },
    onError: ({ result }) => {
      addToast({ data: { title: 'Error!', description: result.error.message } });
    }
  }}
  method="POST"
  enctype="multipart/form-data"
  action="?/login"
  let:config
  class="grid w-full gap-4 rounded-md border p-10"
>
  <Form.Field {config} name="email">
    <Form.Item class="flex flex-col">
      <Form.Label>Email</Form.Label>
      <Form.Input type="email" />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Field {config} name="password">
    <Form.Item class="flex flex-col">
      <Form.Label>Password</Form.Label>
      <Form.Input type="password" />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Button>Login</Form.Button>
</Form.Root>
