<template>
  <div id="app">
    <v-navigation-drawer v-model="drawer" :mini-variant-width="56"
                          :mini-variant.sync="miniSidebar" absolute
                         permanent dark app :src="userInfo.background">
      <v-list>
        <v-list-item class="pa-3">
          <v-btn icon @click.stop="miniSidebar = !miniSidebar">
            <v-icon v-if="!miniSidebar">mdi-chevron-left</v-icon>
            <v-icon v-else-if="miniSidebar">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-list nav>
        <v-list-item v-for="[icon, text, url] in functionLinks" :key="icon" link :to="url">
          <v-list-item-icon>
            <v-icon :color="listItemIconColor">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "LeftSidebar",
  data: () => ({
    drawer: true,
    miniSidebar: true,
    userInfo: {
      background: 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg',
    },
    listItemIconColor: '#eeeeee',
    functionLinks: [
      ['mdi-home', '主页', '/main/home'],
      ['mdi-table-account', '综测加分', '/main/zongce_cal'],
      ['mdi-account-supervisor-circle', '同学互评', '/main/classmate_cal'],
      ['mdi-compass-rose', '创新创业', '/main/innovation_school'],
    ],
  })
}
</script>

<style scoped>
</style>
