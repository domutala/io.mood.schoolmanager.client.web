<template>
  <div class="menu">
    <div class="body">
      <div class="item">
        <nuxt-link class="link" :to="{ name: 'dashboard' }">
          <i class="fi fi-sr-home"></i>
        </nuxt-link>
      </div>

      <div class="item">
        <a class="link" href="#">
          <i class="fi fi-sr-bell"></i>
        </a>
      </div>

      <div class="item">
        <a class="link" href="#">
          <i class="fi fi-sr-settings"></i>
        </a>
      </div>
    </div>
    <div class="foot">
      <div>
        <div class="avatar"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { ISession } from "~/models/Session";

@Component
export default class Comp extends Vue {
  @Getter("get", { namespace: "session" })
  session!: ISession;

  user: any | false = false;
  loading = false;

  mounted() {
    setTimeout(this.init, 0);
  }

  init() {}
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 69px;
  height: 100%;
  background-color: rgba(var(--light), 1);
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-right: 1px solid rgba(var(--dark), 0.07);
  // box-shadow: rgba(0, 0, 0, 0.07) 0px 3px 12px;

  > .body {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > .item {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      .link {
        text-decoration: none;

        i {
          font-size: 150%;
          opacity: 0.5;
        }

        &:hover {
          i {
            opacity: 1;
          }
        }

        &.active-link {
          i {
            opacity: 1;
            color: rgba(var(--primary), 1);
          }
        }
      }
    }
  }

  > .foot {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 1px;
      border-top: 1px solid rgba(var(--dark), 0.1);
    }

    > div {
      width: 69px;
      height: 69px;
      display: flex;
      align-items: center;
      justify-content: center;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 16em;
        background-color: rgba(var(--dark), 0.07);
        cursor: pointer;

        > img {
          width: 100%;
          height: 100%;
          border-radius: inherit;
          object-position: center;
          object-fit: cover;
        }

        &:hover {
          box-shadow: rgba(var(--dark), 0.2) 0px 10px 50px;
        }
      }
    }
  }

  @media (max-width: 772px) {
    width: 100%;
    height: 69px;
    border: 0;
    border-top: 1px solid rgba(var(--dark), 0.07);
    top: unset;
    bottom: 0;
    z-index: 500;
    flex-direction: row;

    > .body {
      flex-direction: row;
      order: 2;
    }

    > .foot {
      order: 1;

      &::before {
        top: 50%;
        right: 0;
        left: unset;
        transform: translateY(-50%);
        width: 1px;
        height: 30px;
        border-top: 0;
        border-right: 1px solid rgba(var(--dark), 0.1);
      }
    }
  }
}
</style>
