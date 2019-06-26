<template>
  <transition name="movie_home">
    <div>
      <router-view></router-view>
      <mt-tabbar v-model="selected">
        <mt-tab-item id="movie">
          <span slot="icon" class="fa fa-bank"></span>
          电影
        </mt-tab-item>
        <mt-tab-item id="saler">
          <span slot="icon" class="fa fa-gift"></span>
          卖品
        </mt-tab-item>
        <mt-tab-item id="person">
          <span slot="icon" class="fa fa-smile-o"></span>
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </transition>
</template>
<script>
export default {
  name: "home",
  data: function() {
    return {
      selected: "movie"
    };
  },
  methods: {
    gotoCinemas: function() {}
  },
  watch: {
    selected: function(newval) {
      this.$router.replace({ name: newval });
    }
  }
};
</script>

<style lang="less">
.mint-tabbar {
  height: 49px;
  .mint-tab-item {
    padding: 4px;
    .mint-tab-item-icon {
      margin-bottom: 3px;
    }
  }
}
.movie_home-enter-active,
.movie_home-leave-active {
  transition: all 0.5s linear;
}
.movie_home-enter,
.movie_home-leave-to {
  transform: translateX(-100%);
}
</style>
