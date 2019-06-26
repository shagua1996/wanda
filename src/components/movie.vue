<template>
  <div class="movie">
    <header>
      <mt-header title="万达电影"></mt-header>
      <mt-cell :title="cinemaName" @click.native="gotoCinemas" is-link>
        <span slot="icon" class="fa fa-map-marker"></span>
      </mt-cell>
    </header>
    <div class="movie_content">
      <div class="banner">
        <mt-swipe :auto="4000" :continuous="true">
          <template v-for="(item, index) in swiperList">
            <mt-swipe-item :key="index">
              <img :src="item" alt="" width="100%" height="100%" />
            </mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      <div class="movie_list">
        <template v-for="(val, key) in movieList">
          <MovieCell @buyTick="buyTick" :movieinfo="val" :key="key"></MovieCell>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import MovieCell from "./MovieCell";
import { mapGetters } from "vuex";
import Http from "../http";
import { Indicator } from "mint-ui";
import store from "store";
export default {
  name: "movie",
  data: function() {
    return {
      swiperList: [],
      movieList: [],
      cinemaName: ""
    };
  },
  computed: {
    ...mapGetters("cinema", ["Cinema"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (store.get("wanda_cinema")) {
        next();
      } else {
        vm.$router.replace({ name: "city" });
      }
    });
  },
  methods: {
    //去电影详情
    buyTick: function(movieId) {
      this.$router.push({ name: "moviedetail", params: { movieId } });
    },
    gotoCinemas: function() {
      let cityId = "123";
      this.$router.push({ name: "cinemas", params: { cityId } });
    },
    swiper: function() {
      Http.swiper(result => {
        this.swiperList = result.data.data;
      });
    },
    cinemamovies: function() {
      Http.cinemasmovie(result => {
        this.movieList = result.data.result.lists;
      });
    }
  },
  components: {
    MovieCell
  },
  mounted: function() {
    // this.cinemaName = this.Cinema.cinemaName;
    this.cinemaName = store.get("wanda_cinema").cinemaName;
    // this.swiper();
    // this.cinemamovies();
    Indicator.open("加载中");
    Http.all(params => {
      Indicator.close();
      this.swiperList = params[0].data.data;
      this.movieList = params[1].data.result.lists;
    });
  }
};
</script>
<style lang="less">
.movie {
  header {
    position: fixed;
    width: 100%;
  }
  .mint-cell {
    height: 45px;
    position: absolute;
    top: 40px;
    width: 100%;
  }
}
.movie_content {
  position: absolute;
  top: 85px;
  height: calc(100% - 135px);
  width: 100%;
  overflow-y: scroll;
  .banner {
    height: 90px;
  }
  .movie_list {
    padding-left: 10px;
  }
}
</style>
