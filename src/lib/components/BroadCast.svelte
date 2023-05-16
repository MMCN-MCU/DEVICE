<script lang="ts">
  // import { io } from "socket.io-client";
  // import { SIGNALING_SERVER } from "$lib/constants";
  // const socket = io(SIGNALING_SERVER);

  import Icon from "$lib/Icon.svelte";

  let findClient = false;
  let clientIP: string;
  let clientPort: string;

  const handleFind = () => {
    findClient = !findClient;
  };
</script>

<div class="flex flex-col gap-4">
  <button
    class="px-20 py-3 rounded bg-blue-600 text-white font-semibold hover:opacity-80"
    on:click|preventDefault="{handleFind}"
  >
    디바이스 영상 송출
  </button>

  {#if findClient}
    <!-- 배경 처리 -->
    <div
      class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black opacity-80"
    ></div>
    <!-- Client 정보 입력 -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-10"
      on:click="{handleFind}"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="relative flex flex-col justify-center items-center lg:w-1/3 w-96 h-80 p-4 bg-white rounded-lg"
        on:click|stopPropagation
      >
        <!-- 끄기 버튼 -->
        <button
          class="absolute top-4 right-4"
          on:click|preventDefault="{handleFind}"><Icon icon="x" /></button
        >
        <!-- 제목 -->
        <h1 class="text-2xl font-bold mt-4">클라이언트 연결</h1>
        <!-- 입력 -->
        <div class="flex flex-col items-center gap-4 w-full mt-8 px-4">
          <!-- 클라이언트 IP 주소 입력 -->
          <div class="flex items-center gap-4 w-full">
            <label for="clientIP" class="w-32 text-lg font-semibold"
              >IP 주소</label
            >
            <input
              type="text"
              id="clientIP"
              bind:value="{clientIP}"
              placeholder="xxx.xxx.xxx.xxx"
              class="border rounded w-full h-10 px-3"
            />
          </div>
          <!-- 클라이언트 Port 입력 -->
          <div class="flex items-center gap-4 w-full text-lg">
            <label for="clientPort" class="w-32 text-lg font-semibold"
              >포트 번호</label
            >
            <input
              type="text"
              id="clientPort"
              bind:value="{clientPort}"
              placeholder="80"
              class="border rounded w-full h-10 px-3"
            />
          </div>
          <!-- 입력 완료 -->
          <button
            class="mt-4 mx-4 w-full py-3 bg-blue-600 rounded text-white font-semibold hover:opacity-80"
            >연결하기</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>
