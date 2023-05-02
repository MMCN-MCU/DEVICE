<script lang="ts">
  import { io } from "socket.io-client";
  import { SIGNALING_SERVER } from "$lib/constants";

  const socket = io(SIGNALING_SERVER);

  let findClient = false;

  const handleFind = () => {
    findClient = !findClient;
    socket.emit("join", "hello");
  };
</script>

<div class="flex flex-col gap-4">
  <button
    class="px-20 py-3 rounded bg-blue-600 text-white font-semibold"
    on:click|preventDefault="{handleFind}"
  >
    디바이스 영상 송출
  </button>

  {#if findClient}{/if}
</div>
