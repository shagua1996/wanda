<template>
  <div>
    <mt-header :title="detaileData.title">
      <mt-button icon="back" @click="goBack" slot="left"> </mt-button>
    </mt-header>
    <div class="movie_detaile">
      <div class="movie_header">
        <div class="movie_detaile_bg">
          <img :src="detaileData.poster" alt="" />
        </div>
        <div class="movie_detaile_des">
          <div class="movie_avatar">
            <img :src="detaileData.poster" alt="" />
          </div>
          <div class="movie_introduce">
            <div class="movie_first_name">{{ detaileData.title }}</div>
            <div class="movie_second_name">{{ detaileData.also_known_as }}</div>
            <p>{{ detaileData.runtime }}</p>
            <p>{{ detaileData.genres }}</p>
            <p>{{ detaileData.year }}</p>
            <span class="locations">{{ detaileData.film_locations }}</span>
            <span>:</span>
            <span class="writers">{{ detaileData.writers }}</span>
          </div>
        </div>
      </div>
      <div class="movie_decripe">
        <div class="discripe_text" @click="toggleText">
          {{ detaileData.plot_simple }}
        </div>
        <div class="descripe_arrow">
          <span
            class="fa"
            :class="{ 'fa-angle-down': !isDown, 'fa-angle-up': isDown }"
          ></span>
        </div>
      </div>
      <!-- 演员和导演列表 -->
      <div class="actors_banner">
        <div class="actors_banner_box">
          <div class="banner_title">
            <span class="directors">导演</span>
            <span class="actors">演员</span>
          </div>
          <div class="banner_scroll">
            <template v-for="(item, index) in this.actors">
              <div class="actor" :key="index">
                <div class="avatars">
                  <img :src="item.avatar" alt="" />
                </div>
                <div class="nameZH">{{ item.name_zh }}</div>
                <div class="nameEN">{{ item.name_en }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="takeTick" @click="takeTick">购票</div>
  </div>
</template>
<script>
import Http from "../http";
export default {
  data: function() {
    return {
      detaileData: {},
      isDown: false,
      actors: []
    };
  },
  methods: {
    //购票
    takeTick: function() {
      this.$router.push({ name: "taketick" });
    },
    goBack: function() {
      this.$router.go(-1);
    },
    //隐藏显示简介
    toggleText: function() {
      var up = document.getElementsByClassName("discripe_text")[0];
      if (this.isDown) {
        up.style.height = "40px";
      } else {
        up.style.height = "auto";
      }
      this.isDown = !this.isDown;
    },
    //处理演员列表数据
    dealAactor() {
      this.actors.push({
        name_zh: this.detaileData.directors,
        name_en: "GQJ",
        avatar: this.detaileData.poster
      });
      let name_mix = this.detaileData.actors.split(",");
      name_mix.forEach(val => {
        let name_arr = val.split(" ");
        let obj = { name_zh: "", name_en: "", avatar: this.detaileData.poster };
        for (let i = 0; i < name_arr.length; i++) {
          if (i == 0) {
            obj.name_zh = name_arr[0];
          } else {
            obj.name_en += name_arr[i] + " ";
          }
        }
        this.actors.push(obj);
      });
      let actors = document.getElementsByClassName("banner_scroll")[0];
      actors.style.width = 110 * this.actors.length + "px";
    }
  },
  mounted: function() {
    Http.movieDetaile(result => {
      this.detaileData = result.data.result;

      this.dealAactor();
    });
  }
};
</script>
<style lang="less" scoped>
.movie_detaile {
  position: absolute;
  width: 100%;
  height: calc(100% - 80px;);
  background: lightgray;
  overflow: hidden;
  overflow-y: scroll;
  .movie_header {
    width: 100%;
    height: 240px;
    background: white;
    .movie_detaile_bg {
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        filter: blur(5px);
      }
    }
    .movie_detaile_des {
      position: absolute;
      left: 10px;
      top: 18px;
      width: 100%;
      .movie_avatar {
        width: 35%;
        height: auto;
        img {
          width: 100%;
        }
      }
      .movie_introduce {
        position: absolute;
        top: 10px;
        left: 40%;
        .movie_first_name {
          font-size: 1.2rem;
          font-weight: bolder;
          line-height: 30px;
          color: white;
        }
        .movie_second_name {
          font-size: 0.9rem;
          color: white;
        }
        p {
          font-size: 0.9rem;
          line-height: 30px;
        }
        span {
          font-size: 0.8rem;
          color: rgb(182, 176, 176);
        }
      }
    }
  }
  .movie_decripe {
    margin-top: 10px;
    background: white;
    .discripe_text {
      padding: 10px;
      height: 40px;
      overflow: hidden;
      padding-bottom: 0;
    }
    .descripe_arrow {
      text-align: center;
    }
  }
  .actors_banner {
    margin-top: 10px;
    background: white;
    height: 150px;
    .banner_title {
      height: 40px;
      line-height: 40px;
      position: relative;
      .directors {
        position: absolute;
        left: 50px;
        transform: translateX(-50%);
      }
      .actors {
        position: absolute;
        left: 160px;
        transform: translateX(-50%);
      }
    }
    .actors_banner_box {
      overflow-x: scroll;
      .banner_scroll {
        .actor {
          width: 90px;
          padding: 0 5px;
          float: left;
          .avatars {
            height: 70px;
            width: 70px;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .nameEN,
          .nameZH {
            text-align: center;
            font-size: 0.7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .actors_banner_box::-webkit-scrollbar {
      display: none;
    }
  }
}
.takeTick {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: goldenrod;
  color: white;
}
// "日高法子 Noriko Hidaka,坂本千夏 Chika Sakamoto,糸井重里 Shigesato Itoi,岛本须美 Sumi Shimamoto"
</style>
