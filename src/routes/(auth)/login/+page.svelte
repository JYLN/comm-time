<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { loginFormSchema } from '$lib/schemas/index.js';

  export let data;
</script>

<main
  class="mx-auto flex h-screen w-3/4 items-center justify-center bg-background lg:w-1/2 xl:w-1/4"
>
  <Form.Root
    form={data.form}
    schema={loginFormSchema}
    method="POST"
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
</main>
