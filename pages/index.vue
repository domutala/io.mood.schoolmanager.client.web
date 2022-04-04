<template>
  <div>loading</div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import { Params } from "@/models/Params";

@Component
export default class extends Vue {
  foo = "foo";

  @Getter("get", { namespace: "params" })
  params!: Params;

  mounted() {
    this.reload();
  }

  reload() {
    this.$nuxt.context.$server
      .request({
        url: "/session/login/step_1",
        method: "post",
      })
      .then(async (data: any) => {
        await this.$nuxt.$store.dispatch("session/setId", data.session_id);
        await this.$nuxt.$store.dispatch("session/setServerKeys", {
          public: data.public_key,
        });

        this.get_my_user();
      });
  }

  get_my_user() {
    this.$nuxt.context.$server
      .request({ url: "/user/get_my" })
      .then(async (data) => {
        if (data) {
          await this.$nuxt.context.store.dispatch("session/setUser", data);
          this.$nuxt.context.redirect({ name: "dashboard", replace: true });
        } else {
          this.$nuxt.context.redirect({ name: "login", replace: true });
        }
      });
  }

  setTheme() {
    let theme = this.params.theme;

    if (theme === "dark") theme = "light";
    else if (theme === "light") theme = undefined;
    else theme = "light";

    this.$nuxt.context.$style.set(theme);
  }
}
</script>
