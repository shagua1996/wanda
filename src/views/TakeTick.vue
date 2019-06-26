<template>
  <div class="tick">
    <mt-header title="影院">
      <mt-button icon="back" slot="left" @click="gotoBack"></mt-button>
    </mt-header>
    <div class="tick_content">
      <div class="tick_info_out">
        <div class="tick_infobox">
          <div class="cinema_name">{{ this.temp_address.cinemaName }}</div>
          <div class="cinema_address">{{ this.temp_address.address }}</div>
        </div>
        <div class="cinema_map" @click="goMap">
          <div class="mapicon fa fa-map-marker"></div>
          <div class="maptip">地图</div>
        </div>
      </div>
      <div class="tip">
        一名成人限带一名1.3米以下的儿童免费观影，儿童不提供座位；3D影片免费提供眼镜
      </div>
      <div class="tick_swiper">
        <div class="swipwer_bg" v-if="movieList.length > 0">
          <img
            :src="movieList[currentIndex].pic_url"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <!-- 轮播图 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in movieList"
              :key="index"
            >
              <img :src="item.pic_url" alt="" width="100%" height="100%" />
            </div>
          </div>
        </div>
        <div class="currentTitle">{{ currentTitle }}</div>
      </div>
      <!-- 放映厅 -->
      <div class="hall">
        <div class="hall_title">{{ currentTime }}</div>
        <div class="hall_list" v-if="movieList.length > 0">
          <template v-for="(item, index) in movieList[currentIndex].broadcast">
            <div class="hall_item" :key="index">
              <div class="hall_time">{{ item.time }}</div>
              <div class="hall_num">{{ item.hall }}</div>
              <div class="hall_price">￥{{ item.price }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import Http from "../http";
import moment from "moment";
import store from "store";
export default {
  data: function() {
    return {
      imgList: [],
      movieList: [],
      currentIndex: 0,
      currentTitle: "",
      currentTime: "",
      temp_address: ""
    };
  },
  computed: {
    ...mapGetters("cinema", ["Cinema"])
  },
  methods: {
    goMap: function() {
      this.$router.push({ name: "map" });
    },
    gotoBack: function() {
      this.$router.go(-1);
    },
    cinemamovies: function() {
      Http.cinemasmovie(result => {
        this.movieList = result.data.result.lists;
        this.currentTitle = this.movieList[this.currentIndex].movieName;
      });
    },
    calcDate() {
      let week = moment().format("e");
      let week_zh = "";
      switch (week) {
        case "0":
          week_zh = "周日";
          break;
        case "1":
          week_zh = "周一";
          break;
        case "2":
          week_zh = "周二";
          break;
        case "3":
          week_zh = "周三";
          break;
        case "4":
          week_zh = "周四";
          break;
        case "5":
          week_zh = "周五";
          break;
        case "6":
          week_zh = "周六";
          break;
        default:
          break;
      }
      this.currentTime = week_zh + " " + moment().format("MM-DD");
    },
    swipers() {
      var that = this;
      new Swiper(".swiper-container", {
        effect: "coverflow",
        observer: true,
        observerParents: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 4,
        coverflowEffect: {
          rotate: 0,
          stretch: -10,
          depth: 120,
          modifier: 1,
          slideShadows: true
        },
        on: {
          slideChange: function() {
            that.currentIndex = this.activeIndex;
            that.currentTitle = that.movieList[this.activeIndex].movieName;
          }
        }
      });
    }
  },
  mounted: function() {
    this.cinemamovies();
    this.calcDate();
    this.temp_address = store.get("wanda_cinema");
    this.swipers();
  }
};
</script>
<style lang="less">
.tick_content {
  position: absolute;
  top: 40px;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
  .tick_info_out {
    height: 80px;
    display: flex;
    .tick_infobox {
      flex: 1 1 auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .cinema_name {
        font-size: 1.2rem;
      }
      .cinema_address {
        font-size: 0.8rem;
        color: rgb(202, 195, 195);
      }
    }
    .cinema_map {
      flex: 0 0 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: grey;
      .mapicon {
        font-size: 1.5rem;
      }
      .maptip {
        font-size: 0.8rem;
      }
    }
  }
  .tip {
    height: 40px;
    font-size: 0.8rem;
    background: lightgoldenrodyellow;
    padding: 5px 10px;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tick_swiper {
    height: 160px;
    position: relative;
    .currentTitle {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
    }
    .swipwer_bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 130px;
      img {
        filter: blur(5px);
      }
    }
    .swiper-container {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 10px;
      width: 100%;
      height: 120px;
    }
    .swiper-slide {
      height: 100%;
    }
  }
  .hall {
    .hall_title {
      height: 30px;
      line-height: 30px;
      font-size: 0.8rem;
      color: gray;
      margin-top: 15px;
      padding-left: 20px;
      background: linen;
    }
    .hall_item {
      padding: 0 15px;
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
