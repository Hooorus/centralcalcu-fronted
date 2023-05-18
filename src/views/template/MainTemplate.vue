<template>
  <div id="app">
    <v-app id="inspire">
      <transition name="fade">
        <SystemBar v-if="viewNeedSystemActivity"></SystemBar>
      </transition>
      <transition name="fade">
        <Navbar v-if="viewNeedHeader"></Navbar>
      </transition>
      <transition name="fade">
        <LeftSidebar v-if="viewNeedLeftSidebar"></LeftSidebar>
      </transition>
      <transition name="fade">
        <RightSidebar id="right-sidebar" v-if="viewNeedRightSidebar"></RightSidebar>
      </transition>
      <v-main>
        <v-container class="py-8 px-6" fluid>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-container>
      </v-main>
      <transition name="cover">
        <Cover id="cover" v-if="viewNeedCover"></Cover>
      </transition>
      <transition name="fade">
        <TailBar id="footer" v-if="viewNeedFooter"></TailBar>
      </transition>
    </v-app>
  </div>
</template>

<script>
import SystemBar from "@/components/systembar/SystemBar.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import LeftSidebar from "@/components/leftsidebar/LeftSidebar.vue";
import TailBar from "@/components/tailbar/TailBar.vue";
import MessageLists from "@/components/main/MessageLists.vue";
import Cover from "@/components/cover/Cover.vue";
import RightSidebar from "@/components/rightsidebar/RightSidebar.vue";

export default {
  name: "MainTemplate",
  components: {RightSidebar, Cover, MessageLists, TailBar, LeftSidebar, Navbar, SystemBar},
  data: () => ({
    viewNeedSystemActivity: false,
    viewNeedHeader: true,
    viewNeedLeftSidebar: true,
    viewNeedRightSidebar: true,
    viewNeedFooter: false,
    viewNeedCover: true,
  }),
  created() {

  },
  mounted() {

  },
  watch: {},
  methods: {}
}
</script>
<style scoped>
#app {

}

#app ::-webkit-scrollbar {
  display: none;
}

#system-bar {

}

#header {

}

#left-sidebar {

}

.right-sidebar {
  z-index: 950;
}

#main-body {

}

#footer {
  z-index: 900
}

#cover {
  position: fixed;
  bottom: 2vh;
  right: 1vw;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
