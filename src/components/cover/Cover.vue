<template>
  <div id="app">
    <transition name="fade">
      <v-btn id="scroll-btn" class="mx-2" elevation="10" v-show="showBackToTop"
             fab dark large :color="btnColor" @click="backToTop()">
        <v-icon aria-hidden="false" class="v-icon notranslate" :color="iconColor">
          {{ backToTopIcon }}
        </v-icon>
      </v-btn>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Cover",

  data: () => ({
    backToTopIcon: 'mdi-chevron-double-up',
    btnColor: "#ffffff",
    iconColor: "#0848a8",

    showBackToTop: false,
  }),
  mounted() {
    window.addEventListener("scroll", () => {// 滚动事件
      let html = document.documentElement
      if (html.scrollTop >= 100) {//当滚动高度大于等于100返回顶部出现
        this.showBackToTop = true
      } else {
        this.showBackToTop = false
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    backToTop(scrollTimer) {
      //获取当前毫秒数
      let startTime = +new Date();
      //获取当前页面的滚动高度
      let b = document.body.scrollTop || document.documentElement.scrollTop;
      let d = 300;
      let c = b;
      scrollTimer = requestAnimationFrame(function func() {
        let t = d - Math.max(0, startTime - (+new Date()) + d);
        document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
        scrollTimer = requestAnimationFrame(func);
        if (t === d) {
          cancelAnimationFrame(scrollTimer);
        }
      });
    }
  }
}
</script>

<style scoped>
#app {
  margin-bottom: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
