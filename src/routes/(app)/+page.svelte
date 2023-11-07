<script lang="ts">
  import TimeEntryForm from '$lib/components/forms/TimeEntryForm.svelte';
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
  import { cn, convertSelectData } from '$lib/utils.js';
  import type { FormOptions } from 'formsnap';
  import { Pause, Play, TimerReset } from 'lucide-svelte';

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
      }

      formData.set('end_time', $timeStops[$timeStops.length - 1]);
      formData.set('elapsed_time', $elaspedTime.toString());
    },
    onResult: ({ result }) => {
      switch (result.type) {
        case 'success':
        case 'redirect':
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
        <Card.Title
          class={cn(
            'text-center text-5xl font-bold transition-colors duration-300 ease-out sm:text-8xl md:text-4xl xl:text-6xl 2xl:text-7xl',
            $timerState === TIMERSTATE.RUNNING && 'text-success',
            $timerState === TIMERSTATE.PAUSED && 'text-muted-foreground'
          )}
        >
          {$timeDisplay}
        </Card.Title>
        <Separator />
      </Card.Header>
      <Card.Content class="grid grid-cols-2 grid-rows-2 gap-3">
        <Button variant="success" on:click={startTimer}><Play class="h-5 w-5" /></Button>
        <Button on:click={pauseTimer}><Pause class="h-5 w-5" /></Button>
        <Button variant="destructive" on:click={resetTimer} class="col-span-2">
          <TimerReset class="h-5 w-5" />
        </Button>
      </Card.Content>
    </Card.Root>
  </div>
  <div class="time-data-form">
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-xl font-bold md:text-3xl">New Time Entry</Card.Title>
        <Separator />
      </Card.Header>
      <Card.Content>
        <TimeEntryForm
          form={data.form}
          {options}
          customers={convertSelectData(data.customerData)}
        />
      </Card.Content>
    </Card.Root>
  </div>
</main>

<style lang="postcss">
  main {
    @apply mb-10 grid grid-cols-1 grid-rows-1 gap-5 px-5 md:grid-cols-[30%_1fr];
  }
</style>
