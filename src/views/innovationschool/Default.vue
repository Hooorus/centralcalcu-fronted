<template>
  <v-app>
      <v-app-bar-title>
        <h1 id="title">创新创业学院赛道评分系统</h1>
      </v-app-bar-title>
      <v-btn size="large" class="align-center" to="/main/innovation_school/vote_backend">管理端</v-btn>
      <v-btn size="large" class="align-center" to="/main/innovation_school/vote_fronted">评委端</v-btn>
      <router-view></router-view>
  </v-app>
</template>

<script>

import Backend from "@/views/innovationschool/Backend.vue";
import Fronted from "@/views/innovationschool/Fronted.vue";

export default {
  components: {
    Backend,
    Fronted,
  },
  name: "Default"
}
</script>

<style>

#title {
  font-size: 20px;
  font-weight: normal;
}

/*img {*/
/*  max-width: 100%;*/
/*  max-height: 100%;*/
/*  position: absolute;*/
/*  flex: content;*/
/*  opacity: 0.5;*/
/*}*/
</style>
