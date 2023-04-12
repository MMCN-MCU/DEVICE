<script lang="ts">
  import feather from "feather-icons";

  export let icon = "home";
  export let size = 24;
  export let stroke_width = 2;
  export let className = "";
  export let color = "black";
</script>

{@html feather.icons[icon]
  ? feather.icons[icon].toSvg({
      width: size,
      height: size,
      "stroke-width": stroke_width,
      class: className,
      color,
    })
  : "-"}
