<template>
  <div>
    <w-menu />

    <div class="body">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component({
  middleware: [
    ({ store, redirect }) => {
      const session = store.getters["session/get"];
      if (!session.user) {
        return redirect({ name: "index", replace: true });
      }
    },
  ],
})
export default class extends Vue {
  mounted() {
    this.on_route();
  }

  @Watch("$route.name", { deep: true })
  on_route() {
    if (this.$nuxt.context.route.name === "dashboard") {
      this.$nuxt.context.redirect({ name: "dashboard-school" });
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin-left: 70px;

  @media (max-width: 772px) {
    margin-left: 0;
    margin-bottom: 70px;
  }
}
</style>
