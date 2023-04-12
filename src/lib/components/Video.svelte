<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { onMount, onDestroy } from "svelte";

  let stream: MediaStream | null;
  let videoElement: HTMLMediaElement;
  let audio = false;

  let videos = [];
  let deviceId: string | undefined;

  /**
   * MediaStream
   *    - MediaStream 아래에는 여러 stream track들이 존재한다. (audio, video track 등등..)
   *    - mediaDevices.getUserMedia() 메서드로 특정 MediaStream을 가져올 수 있다. (Promise의 fulfillment로 가져오는 것)
   *       - mediaDevices.getUserMedia()에서는 video device의 id를 직접 지정하여 특정 디바이스의 MediaStream을 가져올 수 있다.
   *    - MediaStream 은 HTMLMediaElement의 srcObject에 할당할 수 있다. 이것이 영상을 트는 방식이다.
   *    - video 태그와 audio 태그는 HTMLMediaElement 노드의 메서드들을 상속받는다.
   *    - 관련 메서드
   *      - addTrack() : 새로 track 추가
   *      - getVideoTracks() : MediaStream 내의 video track 정보를 가져온다.
   * MediaDevices (navigator.mediaDevices)
   *    - 카메라나, 마이크와 같은 media input으로의 access를 가능하게 해준다.
   *    - 메서드
   *      - enumerateDevices() : device들의 정보를 나열한다.
   *      -
   * MediaDevice : deviceId, label, kind..
   * navigator.mediaDevices.getUserMedia(deviceId)
   */

  // 미디어 스트림 가져오기
  const getMedia = async (deviceId: undefined | string) => {
    try {
      // 초기 영상 스트림 정보
      const initialConstraints = {
        audio,
        video: { facingMode: "user" },
      };

      // 특정 비디오 장치 연결 위한 기능
      const cameraConstraints = {
        audio,
        video: { deviceId: { exact: deviceId } },
      };

      // 조건에 따라 미디어 스트림을 가져온다 (미디어 스트림은 track들로 이루어져있다.)
      stream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints
      );

      // 미디어 스트림을 video 태그에 넣는다.
      videoElement.srcObject = stream;

      // 초기 deviceId 값 설정
      deviceId = stream.getVideoTracks()?.id;
    } catch (error) {
      console.error(error);
    }
  };

  // 비디오 종류 불러오기
  const getVideos = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      videos = devices.filter((device) => device.kind === "videoinput");
    } catch (err) {
      console.log(err);
    }
  };

  // 비디오 변경 (Media)
  const changeDevice = async (e: Event) => {
    try {
      deviceId = e.target?.value;
      await getMedia(deviceId);
    } catch (err) {
      console.log(err);
    }
  };

  // 미디어 스트림 중지
  const stopVideoStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
  };

  // 오디오 설정
  const toggleAudio = async () => {
    audio = !audio;
    await getMedia(deviceId);
  };

  onMount(async () => {
    await getMedia(deviceId);
    await getVideos();
  });

  onDestroy(async () => await stopVideoStream());
</script>

<!-- 모바일 브라우저에서의 제약사항 -->
<!-- 
   사용자 입력 없이 자동으로 재생되는 미디어에 대한 보안 정책의 이유로 "TMLMediaElement::play() rejecting promise: FullscreenRequired" 이 존재한다.default
   사용자 입력 없이 자동으로 재생되는 미디어에서는 play() 메소드를 호출하면 보안 정책에 위배되어 오류가 발생한다. 즉, 모바일에서의 화면을 통한 미디어 송출이 안된다.

   이를 방지하고자, video 태그의 autoplay 속성을 활용하여 자동으로 영상이 재생되도록 만들어줄 수 있다. 이때 영상은 fullscreen으로 보여지게 된다.
   이때 WebRTC 기술을 활용하면 서버를 통해 스트리밍하면서 동시에 사용자 입력없이 자동 재생이 가능해진다.
 -->
<div class="relative w-96 h-96 overflow-hidden bg-gray-100">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    bind:this="{videoElement}"
    class="w-[440px] h-[330px] rounded"
    autoplay
    controls></video>
  <button
    class="absolute bottom-3 right-3 p-2 rounded-full bg-white"
    on:click|preventDefault="{toggleAudio}"
  >
    {#if audio}
      <Icon icon="mic" color="#1D4ED8" stroke_width="{2}" size="{18}" />
    {:else}
      <Icon icon="mic-off" color="#1D4ED8" stroke_width="{2}" size="{18}" />
    {/if}
  </button>
</div>

<div class="flex justify-center mt-4">
  <select on:change|preventDefault="{changeDevice}">
    {#each videos as video}
      <option
        value="{video?.deviceId}"
        selected="{video?.deviceId === deviceId}">{video?.label}</option
      >
    {/each}
  </select>
</div>
