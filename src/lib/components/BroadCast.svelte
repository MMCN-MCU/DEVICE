<script>
  import pingus from "pingus";

  const BROADCAST_IP = "255.255.255.255";
  const BROADCAST_PORT = "12345";
  const message = "hello!";

  let findClient = false;

  const handleFind = () => {
    findClient = !findClient;
  };
</script>

<button
  class="px-20 py-3 rounded bg-blue-600 text-white font-semibold"
  on:click|preventDefault="{handleFind}"
>
  디바이스 영상 송출
</button>
