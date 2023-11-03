import { timeEntries } from '$lib/mock-data';
import { deleteTimeEntrySchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load() {
  return {
    tableData: timeEntries,
    form: superValidate(deleteTimeEntrySchema)
  };
}

export const actions: Actions = {
  deleteTimeEntry: async ({ request }) => {
    const deleteTimeForm = await superValidate(request, deleteTimeEntrySchema);

    if (!deleteTimeForm.valid) {
      return fail(400, {
        form: deleteTimeForm
      });
    }

    return { form: deleteTimeForm };
  }
};
