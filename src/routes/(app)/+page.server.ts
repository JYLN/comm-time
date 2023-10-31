import { timeEntrySchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load() {
	return {
		form: superValidate(timeEntrySchema)
	};
}

export const actions: Actions = {
	createTime: async ({ request }) => {
		const createTimeForm = await superValidate(request, timeEntrySchema);

		if (!createTimeForm.valid) {
			return fail(400, {
				form: createTimeForm
			});
		}

		return {
			form: createTimeForm
		};
	}
};
