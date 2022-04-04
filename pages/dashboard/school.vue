<template>
  <div>
    <div class="header"></div>
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  mounted() {
    this.on_route();
  }

  @Watch("$route.name", { deep: true })
  on_route() {
    if (this.$nuxt.context.route.name === "dashboard-school") {
      this.$nuxt.context.redirect({ name: "dashboard-school-list" });
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 30px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: rgba(var(--light), 1);
  box-shadow: rgba(var(--dark), 0.07) 0px 10px 10px -10px;
}
</style>
