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
    const formData = await request.formData();

    const timeStops = formData.get('time_stops')?.toString().split(',');
    if (timeStops) {
      const elapsed_time = timeStops.reduce((total, string, i, arr) => {
        function calculateElapsedTime(start: string, end: string): number {
          const startTime = new Date(start);
          const endTime = new Date(end);

          return endTime.getTime() - startTime.getTime();
        }

        if (i === 0) return 0;
        return total + calculateElapsedTime(arr[i - 1], string);
      }, 0);

      formData.set('elapsed_time', elapsed_time.toString());
    }

    const createTimeForm = await superValidate(formData, timeEntrySchema);

    console.log('On Submit: ', createTimeForm);

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
