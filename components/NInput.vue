<template>
  <div class="m-input" :class="{ error, success, labeled: val }">
    <div class="__the_content">
      <div class="__left_icon">
        <slot name="left" />
      </div>

      <div class="__include">
        <div v-if="placeholder" class="__placeholder">
          <span>{{ placeholder }}</span>
        </div>
        <slot />
      </div>

      <div class="__right_icon">
        <slot name="right" />
      </div>
    </div>

    <div v-if="error && error !== true" class="__error">
      {{ error }}
    </div>
    <div v-if="success && success !== true" class="__success">
      {{ success }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Comp extends Vue {
  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: [String, Boolean], default: false })
  error!: string | boolean;

  @Prop({ type: [String, Boolean], default: false })
  success!: string | boolean;

  val = "";

  mounted() {
    this.init();
  }

  init() {
    let input: any = this.$el.querySelector("input");
    if (!input) input = this.$el.querySelector("select");

    if (input) {
      input.addEventListener("input", () => {
        this.val = input.value;
      });
    }
  }
}
</script>

<style lang="scss">
.m-input {
  width: 100%;

  .__the_content {
    height: 50px;
    border-radius: 0.6em;
    border: 1px solid rgba(var(--dark), 0.5);
    position: relative;

    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;

    .__left_icon {
      > * {
        margin-right: 10px;
      }
    }

    .__right_icon {
      > * {
        margin-left: 10px;
      }
    }

    .__include {
      width: 100%;
      height: 100%;
      position: relative;

      select,
      input {
        border: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        background-color: transparent;
        outline: none;
        font: inherit;
        color: inherit;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 1;
      }

      .__placeholder {
        user-select: none;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        color: rgba(var(--dark), 1);
        transition: all 0.25s ease;
        line-height: 1;

        span {
          transition: all 0.25s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          opacity: 0.7;
        }
      }
    }
  }

  .__success,
  .__error {
    font-size: 80%;
    color: rgba(var(--danger), 1);
    padding-left: 7px;
    padding-right: 7px;
    margin-top: 2px;

    &.__success {
      color: rgba(var(--success), 1);
    }
  }

  &:focus-within,
  &.labeled {
    .__the_content {
      .__include {
        position: unset;

        select,
        input {
          position: relative;
        }

        .__placeholder {
          position: absolute;
          bottom: calc(100% - 15px);
          left: 10px;
          right: 10px;
          font-size: 70%;
          height: unset;
          width: unset;

          span {
            margin: 0;
          }
        }
      }
    }
  }

  &:focus-within {
    .__the_content {
      border-color: rgba(var(--dark), 1);
    }
  }

  &.error {
    .__the_content {
      border-color: rgba(var(--danger), 1);
    }
  }

  &.success {
    .__the_content {
      border-color: rgba(var(--success), 1);
    }
  }

  + .m-input {
    margin-top: 10px;
  }
}
</style>
