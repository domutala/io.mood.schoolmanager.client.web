<template>
  <div class="view">
    <div class="content">
      <n-input
        v-model="data.name"
        class="inp"
        placeholder="Nom de l'établissement *"
      >
        <input v-model="data.name" type="text" />
      </n-input>
      <n-input
        v-model="data.abbreviation"
        class="inp"
        placeholder="Abbréviation"
      >
        <input v-model="data.abbreviation" type="text" />
      </n-input>
      <n-input
        v-model="data.devise"
        class="inp"
        placeholder="Dévise (e.g. Travail, Discipine, Réussite)"
      >
        <i slot="left" class="fi fi-brands-hotjar"></i>
        <input v-model="data.devise" type="text" />
      </n-input>
      <n-date-select
        v-model="data.created_date"
        class="inp"
        placeholder="Date de création"
      >
        <i slot="left" class="fi fi-sr-calendar"></i>
      </n-date-select>
      <n-input
        v-model="data.description"
        class="inp"
        placeholder="Présentation"
      >
        <i slot="left" class="fi fi-sr-paper-plane"></i>
        <n-text v-model="data.description" />
      </n-input>

      <div class="divider"></div>

      <n-input
        v-model="data.academic_informations.ministere"
        class="inp"
        placeholder="Ministère de tutelle"
      >
        <i slot="left" class="fi fi-brands-hotjar"></i>
        <input v-model="data.academic_informations.ministere" type="text" />
      </n-input>
      <div class="inp">
        <n-input
          v-model="data.academic_informations.ia"
          placeholder="Inspection académique (IA)"
        >
          <i slot="left" class="fi fi-brands-hotjar"></i>
          <input v-model="data.academic_informations.ia" type="text" />
        </n-input>
      </div>
      <div class="inp">
        <n-input
          v-model="data.academic_informations.iden"
          placeholder="Inspection académique (IDEN)"
        >
          <i slot="left" class="fi fi-brands-hotjar"></i>
          <input v-model="data.academic_informations.iden" type="text" />
        </n-input>
      </div>
      <div class="inp">
        <n-input
          v-model="data.academic_informations.ief"
          placeholder="Inspection académique (IEF)"
        >
          <i slot="left" class="fi fi-brands-hotjar"></i>
          <input v-model="data.academic_informations.ief" type="text" />
        </n-input>
      </div>
      <div class="inp">
        <n-select
          v-model="data.academic_informations.type"
          placeholder="Type d'établissement *"
          :options="school_types"
        >
          <i slot="left" class="fi fi-sr-paper-plane"></i>
        </n-select>
      </div>
      <div class="inp">
        <n-select
          v-model="data.academic_informations.language.main"
          placeholder="Principale langue d'enseignement"
          :options="languages"
        >
          <i slot="left" class="fi fi-sr-paper-plane"></i>
        </n-select>
      </div>
      <div class="inp">
        <n-select
          v-model="data.academic_informations.language.others"
          placeholder="Autres langues enseignées"
          :options="languages"
        >
          <i slot="left" class="fi fi-sr-paper-plane"></i>
        </n-select>
      </div>

      <div class="divider"></div>

      <n-input
        v-model="data.contacts.address"
        class="inp"
        placeholder="Adresse"
      >
        <i slot="left" class="fi fi-sr-marker"></i>
        <input type="text" />
      </n-input>
      <n-input
        v-model="data.contacts.phone"
        class="inp"
        placeholder="Téléphone"
      >
        <i slot="left" class="fi fi-sr-call-history"></i>
        <input type="text" />
      </n-input>
      <n-input v-model="data.contacts.email" class="inp" placeholder="E-mail">
        <i slot="left" class="fi fi-sr-envelope"></i>
        <input type="text" />
      </n-input>
      <n-input
        v-model="data.contacts.web_site"
        class="inp"
        placeholder="Site internet"
      >
        <i slot="left" class="fi fi-brands-hotjar"></i>
        <input type="text" />
      </n-input>
      <n-input
        v-model="data.contacts.linkedin"
        class="inp"
        placeholder="LinkedIn"
      >
        <i slot="left" class="fi fi-brands-linkedin"></i>
        <input type="text" />
      </n-input>
      <n-input
        v-model="data.contacts.facebook"
        class="inp"
        placeholder="Facebook"
      >
        <i slot="left" class="fi fi-brands-facebook"></i>
        <input type="text" />
      </n-input>
      <n-input
        v-model="data.contacts.twitter"
        class="inp"
        placeholder="Twitter"
      >
        <i slot="left" class="fi fi-brands-twitter"></i>
        <input type="text" />
      </n-input>
    </div>

    <div style="margin-top: 10px">
      <button class="btn opac" style="margin-left: auto" @click="submit">
        <span>Enregistrer</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { School } from "~/models/School";
@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false })
  saving!: boolean;

  data: School = {
    id: "",
    name: "",
    type: "",
    created_date: new Date(),
    academic_informations: {
      language: { main: "", others: [] },
      type: "",
    },
    contacts: {},
    created_at: new Date(),
    updated_at: new Date(),
  };

  languages = [
    { text: "Français", value: "français" },
    { text: "Anglais", value: "anglais" },
    { text: "Arabe", value: "arabe" },
    { text: "Espagnol", value: "espagnol" },
    { text: "Russe", value: "russe" },
    { text: "Italien", value: "italien" },
    { text: "Autres", value: "autres" },
  ];

  school_types = [
    { text: "Enseignement Général", value: "enseignement général" },
    { text: "Enseignement Technique", value: "enseignement technique" },
    { text: "Franco-arabe", value: "Franco-arabe" },
    { text: "Bilingue", value: "bilingue" },
    { text: "Autres", value: "autres" },
  ];

  mounted() {}

  submit() {
    this.$emit("submit", this.data);
  }
}
</script>

<style lang="scss" scoped>
.view {
  // padding: 20px;
  width: 90%;
  max-width: 992px;
  margin: 50px auto;

  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .divider {
      width: 100%;
      margin-bottom: 30px;
    }

    .inp {
      margin: 5px;
      width: 320px;
      max-width: 100%;
    }
  }
}
</style>
