<template>
  <v-app>
    <v-btn size="large" class="align-center" to="/main/innovation_school/vote_backend">管理端</v-btn>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Word from "@/components/main/Word.vue";

export default {
  name: "FriendsView",
  components: {
    Word
  },
}
</script>

<style scoped>

</style>
