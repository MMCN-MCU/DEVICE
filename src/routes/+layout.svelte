<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";

  onMount(async () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js").then((reg) => {
        console.log("worker 등록", reg);
      });
    }
  });
</script>

<svelte:head>
  <title>MCU-DEVICE</title>
</svelte:head>

<slot />
