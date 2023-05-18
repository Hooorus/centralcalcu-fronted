<template>
  <div id="app">
    <v-app-bar app elevation="3" clipped-right color="primary" v-if="`/main/home`===this.$route.path">
      <v-btn v-for="link in toolbarLinks_home" :key="link" text rounded>{{ link }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon rounded class="ma-2" @click="toggleTheme">
        <v-icon>{{ icons.mdiThemeLightDark }}</v-icon>
      </v-btn>
      <v-responsive max-width="250">
        <v-text-field rounded dense flat hide-details solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>
    <v-app-bar app elevation="3" clipped-right color="primary" v-if="`/main/zongce_cal`===this.$route.path">
      <v-btn v-for="link in toolbarLinks_zongce_cal" :key="link" text rounded>{{ link }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon rounded class="ma-2" @click="toggleTheme">
        <v-icon>{{ icons.mdiThemeLightDark }}</v-icon>
      </v-btn>
      <v-responsive max-width="250">
        <v-text-field rounded dense flat hide-details solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>
    <v-app-bar app elevation="3" clipped-right color="primary" v-if="`/main/classmate_cal`===this.$route.path">
      <v-btn v-for="link in toolbarLinks_classmate_cal" :key="link" text rounded>{{ link }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon rounded class="ma-2" @click="toggleTheme">
        <v-icon>{{ icons.mdiThemeLightDark }}</v-icon>
      </v-btn>
      <v-responsive max-width="250">
        <v-text-field rounded dense flat hide-details solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>
  </div>
</template>

<script>
import {mdiThemeLightDark} from '@mdi/js'

export default {
  name: "Navbar",
  data: () => ({
    icons: {
      mdiThemeLightDark,
    },
    themeIcon: "",
    toolbarLinks_home: [
      '主旨',
      '功能',
      '关于',
    ],
    toolbarLinks_zongce_cal: [
      '综测统计',
    ],
    toolbarLinks_classmate_cal: [
      '同学互评',
    ],
  }),
  computed: {
    count() {
      return this.$store.state.count
    },
    navURLListen() {
      this.$store.commit('navURLListen', this.$route.path)
    }
  },
  mounted() {
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped>
#specialActivity {
  text-transform: capitalize;
  font-family: 'ZCOOL Addict Italic 02';
  font-size: 20px;
  font-weight: bolder;
}
</style>
