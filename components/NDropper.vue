<template>
  <div class="ndropper">
    <div ref="button">
      <slot name="button" />
    </div>

    <div
      v-if="open"
      v-show="show"
      ref="back"
      class="back"
      @click="closer"
    ></div>

    <button
      v-if="open"
      v-show="show"
      :id="`popop${uid}`"
      ref="popup"
      class="popup"
    >
      <div>
        <div ref="content">
          <slot />
        </div>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import jquery from "jquery";

@Component
export default class extends Vue {
  @Prop({ type: [String, Array], default: "click" })
  events!: string | string[];

  open = false;
  show = false;
  uid = "";

  mounted() {
    this.init();
  }

  init() {
    this.uid = this.$nuxt.context.$utils.token.generate();

    const button = this.$refs.button as HTMLDivElement;
    const events = Array.isArray(this.events) ? this.events : [this.events];

    window.addEventListener("resize", this.rebuild);

    for (const event of events) {
      button.addEventListener(event, () => {
        this.opener();
      });
    }
  }

  rebuild() {
    if (this.open && this.show) this.opener();
  }

  opener() {
    this.open = true;

    setTimeout(() => {
      const body = document.querySelector("body") as HTMLElement;
      const back = this.$refs.back as HTMLDivElement;
      const popup = this.$refs.popup as HTMLDivElement;

      body.appendChild(back);
      body.appendChild(popup);

      const button = this.$refs.button as HTMLDivElement;
      const content = this.$refs.content as HTMLDivElement;

      const rect = button.getBoundingClientRect();
      let max_height = 0;

      popup.style.width = `${rect.width}px`;
      popup.style.left = `${rect.left + rect.width / 2}px`;
      popup.style.transform = `translateX(-50%)`;

      if (window.innerHeight - rect.top > rect.top) {
        popup.style.bottom = "unset";
        popup.style.top = `${button.offsetTop + button.offsetHeight + 4}px`;
        max_height = window.innerHeight - rect.bottom;
      } else {
        popup.style.top = "unset";
        popup.style.bottom = `${body.offsetHeight - button.offsetTop + 4}px`;
        max_height = rect.bottom;
      }

      content.style.maxHeight = `${max_height}px`;

      this.show = true;
      this.$emit("open");

      setTimeout(() => {
        popup.focus();
        jquery(popup).on("focusout", () => {
          console.log("dsfsdf");
        });
      }, 100);
    }, 100);
  }

  closer() {
    const body = document.querySelector("body") as HTMLBodyElement;
    const back = this.$refs.back as HTMLDivElement;
    const popup = this.$refs.popup as HTMLDivElement;

    if (popup && popup.parentElement === body) {
      body.removeChild(popup);
      this.$el.appendChild(popup);
    }

    if (back && back.parentElement === body) {
      body.removeChild(back);
      this.$el.appendChild(back);
    }

    this.show = false;
    this.open = false;
    this.$emit("close");
  }

  beforeDestroy() {
    this.closer();
  }
}
</script>

<style lang="scss" scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background-color: rgba(var(--dark), 0.000000000001);
}
.popup {
  position: absolute;
  z-index: 501;
  background-color: rgba(var(--light), 1);
  border-radius: 0.6em;
  border: 0;
  outline: none;
  padding: 0;

  > div {
    border-radius: inherit;
    overflow: hidden;

    > div {
      overflow: auto;
      border-radius: inherit;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        border-radius: inherit;
        box-shadow: rgba(var(--dark), 0.06) 0px 0px 0px 1px;
      }

      &::-webkit-scrollbar {
        width: 7px;
        margin-top: 50px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: rgba(var(--dark), 0.1);
        border-radius: inherit;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: rgba(var(--dark), 0.2);
        border-radius: inherit;

        &:hover {
          background: rgba(var(--dark), 0.5);
        }
      }
    }
  }
}
</style>
