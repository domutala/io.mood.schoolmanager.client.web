<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, odio
    facere reiciendis deleniti consectetur, ex voluptate sunt tempore tempora
    unde nostrum qui eos. Magnam reiciendis totam dolor neque id similique!

    <div style="padding: 50px">
      <button class="btn">
        <i class="fi fi-sr-shopping-cart"></i>
        <n-loader></n-loader>
        <span>Se conecter avec google</span>
      </button>

      <button class="btn shine round" style="margin: 20px 0">
        <i class="fi fi-sr-shopping-cart"></i>
        <n-loader></n-loader>
        <span>Se conecter avec google</span>
      </button>

      <button class="btn opac">
        <i class="fi fi-sr-shopping-cart"></i>
        <n-loader></n-loader>
        <span>Se conecter avec google</span>
      </button>

      <n-input placeholder="Nom de l'établissement">
        <input type="text" />
      </n-input>
      <n-input placeholder="Abbréviation">
        <input type="text" />
      </n-input>
      <n-input placeholder="placeholder">
        <i slot="left" class="fi fi-sr-shopping-cart text-primary"></i>
        <input type="text" name="" />
      </n-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  mounted() {}
}
</script>
