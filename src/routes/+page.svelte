<script lang="ts">
  import Layout from "$lib/components/Layout.svelte";
  import Video from "$lib/components/Video.svelte";
  import Icon from "$lib/Icon.svelte";

  let hasVideo = false;

  const startVideo = () => {
    hasVideo = true;
  };

  const stopVideo = () => {
    hasVideo = false;
  };
</script>

<Layout>
  <div class="flex flex-col justify-center items-center">
    <!-- 비디오 부분 -->
    <div class="mt-24">
      {#if hasVideo}
        <Video />
      {:else}
        <div
          class="flex justify-center items-center w-96 h-96 rounded bg-gray-300 text-lg lg:text-xl font-bold text-white"
        >
          영상 정보가 없습니다
        </div>
      {/if}
    </div>
    <!-- 비디오 시작 종료 버튼 -->
    <div class="flex gap-8 mt-12">
      <button
        class="flex gap-2 p-3 bg-blue-600 text-white rounded font-semibold"
        on:click|preventDefault="{startVideo}"
      >
        <span>영상 시작</span>
        <Icon icon="video" color="white" />
      </button>
      <button
        class="flex gap-2 p-3 text-blue-600 bg-white border border-blue-600 rounded font-semibold"
        on:click|preventDefault="{stopVideo}"
      >
        <span>영상 종료</span>
        <Icon icon="video-off" color="#1D4ED8" />
      </button>
    </div>
  </div>
</Layout>
