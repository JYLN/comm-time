<script lang="ts">
  import TimeEntryForm from '$lib/components/forms/time-entry-form.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { timeEntrySchema, type TimeEntrySchema } from '$lib/schemas';
  import {
    elaspedTime,
    time,
    timeDisplay,
    TIMERSTATE,
    timerState,
    timeStops
  } from '$lib/stores/timeStore.js';
  import type { FormOptions } from 'formsnap';

  export let data;

  let timerInterval: ReturnType<typeof setInterval>;

  function startTimer() {
    if ($timerState === TIMERSTATE.PAUSED || $timerState === TIMERSTATE.STOPPED) {
      $timerState = TIMERSTATE.RUNNING;
      timeStops.updateStops(new Date().toISOString());
      timerInterval = setInterval(time.updateTime, 1000);
    }
  }

  function pauseTimer() {
    if ($timerState === TIMERSTATE.RUNNING) {
      $timerState = TIMERSTATE.PAUSED;
      timeStops.updateStops(new Date().toISOString());
      clearInterval(timerInterval);
    }
  }

  function resetTimer() {
    if ($timerState === TIMERSTATE.RUNNING || $timerState === TIMERSTATE.PAUSED)
      $timerState = TIMERSTATE.STOPPED;
    clearInterval(timerInterval);
    timeStops.clearStops();
    time.reset();
  }

  const options: FormOptions<TimeEntrySchema> = {
    validators: timeEntrySchema,
    onSubmit: ({ formData }) => {
      if ($timerState === TIMERSTATE.RUNNING) {
        pauseTimer();
        console.log($timeStops);
      }

      formData.set('end_time', $timeStops[$timeStops.length - 1]);
      formData.set('elapsed_time', $elaspedTime.toString());
    },
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
          console.log('SUCCESS');
          resetTimer();
          break;
      }
    }
  };
</script>

<main>
  <div class="timer">
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-center text-6xl font-bold">{$timeDisplay}</Card.Title>
        <Separator />
      </Card.Header>
      <Card.Content class="grid gap-1">
        <Button variant="success" on:click={startTimer}>Start</Button>
        <Button on:click={pauseTimer}>Pause</Button>
        <Button variant="destructive" on:click={resetTimer}>Reset</Button>
      </Card.Content>
    </Card.Root>
  </div>
  <div class="time-data-form">
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-3xl font-bold">New Time Entry</Card.Title>
        <Separator />
      </Card.Header>
      <Card.Content>
        <TimeEntryForm form={data.form} {options} />
      </Card.Content>
    </Card.Root>
  </div>
</main>

<style lang="postcss">
  main {
    @apply grid grid-cols-[30%_1fr] grid-rows-1 gap-5 px-5;
  }
</style>
