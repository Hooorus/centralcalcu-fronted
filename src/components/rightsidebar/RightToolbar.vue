<template>
  <div id="app">
    <v-navigation-drawer v-model="drawer" permanent app clipped floating class="pl-0"
                         right width="250" color="primary" style="box-shadow: -0.5px 0px 1px #b0b0b0">
      <v-divider></v-divider>
      <v-list elevation="1" class="rounded-b-lg overflow-y-auto" shaped max-height="450">
        <v-list-item v-for="item in functionLinks" :key="item" link>
          <v-list-item-icon>
            <v-icon>{{ item.avatar }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card style="margin-top: 5px; padding: 5px; align-items: center" class="pa-2" elevation="0" color="transparent">
        <v-btn large class="align-center" elevation="1" color="transparent">Day</v-btn>
        <v-btn large class="align-center" elevation="1" color="transparent">Wee</v-btn>
        <v-btn large class="align-center" elevation="1" color="transparent">Mon</v-btn>
      </v-card>
    </v-navigation-drawer>

  </div>
</template>

<script>
export default {
  name: "RightToolbar",
  data: () => ({
    drawer: true,
    miniSidebar: true,
    userInfo: {
      initialName: 'YL',
      initialEmail: '@g',
      fullName: 'Yiming Liao',
      email: 'yonmineliao@gmail.com',
      avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
      // RightSidebarBackground: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
      RightSidebarBackground: '#ffffff'
    },
    listItemIconColor: '#ffffff',
    listItemTextColor: '#ffffff',
    functionLinks: [
      {id: 1, avatar: 'mdi-account', name: 'Yiming Liao', email: 'yonmineliao@gmail.com'},
      {id: 2, avatar: 'mdi-account', name: 'EricFly', email: 'ichenef@163.com'},
      {id: 3, avatar: 'mdi-account', name: 'Bob Carl', email: 'zhangthird@gmail.com'},
      {id: 4, avatar: 'mdi-account', name: 'Immi Reyes', email: 'immigreyes@gmail.com'},
      {id: 5, avatar: 'mdi-account', name: 'Jack Lee', email: 'voidjacklee@163.com'},
      {id: 5, avatar: 'mdi-account', name: 'Lambda', email: 'lambda@lambda.com'},
      {id: 5, avatar: 'mdi-account', name: 'IT director', email: 'itdirector@outlook.com'},
      {id: 5, avatar: 'mdi-account', name: 'Why', email: 'y@qq.com'},
      {id: 5, avatar: 'mdi-account', name: 'Zaharaij', email: 'zaharaij@ucd.edu'},
      {id: 5, avatar: 'mdi-account', name: 'Freak', email: 'freak@qq.com'},
    ],
  })
}
</script>

<style scoped>

</style>
