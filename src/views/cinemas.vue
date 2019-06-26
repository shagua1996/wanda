<template>
  <transition :name="to_name">
    <div>
      <mt-header>
        <router-link to="/" slot="left">
          <mt-button icon="back"> 选择影院</mt-button>
        </router-link>
      </mt-header>
      <div class="cinemas">
        <div class="currCitys" @click="gotoCity">
          <span>{{ currCity }}</span>
          <span class="fa fa-angle-down"></span>
        </div>
        <template v-for="item in cinemaList">
          <div class="addressList" :key="item.id" @click="goHome(item)">
            <h4>{{ item.cinemaName }}</h4>
            <p>{{ item.trafficRoutes }}</p>
          </div>
          <!-- <mt-cell
          :title="
             item.cinemaName"
             :label="item.trafficRoutes"
             :key="item.id">
          </mt-cell> -->
        </template>
      </div>
    </div>
  </transition>
</template>
<script>
import { setTimeout } from "timers";
import Http from "../http";
import { mapGetters, mapActions } from "vuex";
import store from "store";
export default {
  name: "cinema",
  data: function() {
    return {
      cinemaList: [],
      currCity: "",
      to_name: "toMovie"
    };
  },
  computed: {
    ...mapGetters("city", ["City"])
  },
  methods: {
    ...mapActions("cinema", ["actCinema"]),
    goHome: function(cinemaInfo) {
      store.set("wanda_cinema", cinemaInfo);
      this.actCinema(cinemaInfo);
      this.$router.push({ name: "movie", params: { cinemaId: cinemaInfo.id } });
    },
    gotoCity: function() {
      this.$router.push({ name: "citys" });
    },
    location: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        alert("该浏览器不支持地理位置!!");
      }
    },

    showPosition: function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      alert("纬度" + lat + "," + "经度" + lng);
    },
    showError: function(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("用户拒绝对获取地理位置的请求。");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("位置信息是不可用的。");
          break;
        case error.TIMEOUT:
          alert("请求用户地理位置超时。");
          break;
        case error.UNKNOWN_ERROR:
          alert("未知错误。");
          break;
      }
    }
  },
  //导航守卫  判断去city 还是 去movie页
  beforeRouteLeave(to, from, next) {
    if (to.name == "citys") {
      this.to_name = "toCity";
    } else if (to.name == "movie") {
      this.to_name = "toMovie";
    }
    setTimeout(() => {
      next();
    }, 100);
  },
  mounted: function() {
    // this.currCity = this.City.city_name;
    this.currCity = store.get("wanda_city").city_name;
    Http.cinemas(result => {
      this.cinemaList = result.data.data;
    });
  }
};
</script>
<style lang="less">
.cinemas {
  position: absolute;
  top: 40px;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
}
.currCitys {
  height: 40px;
  line-height: 40px;
  background-color: #ccc;
  padding-left: 10px;
}
.addressList {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #c3c3c3;
  h4 {
    height: 30px;
    line-height: 30px;
  }
  p {
    height: 30px;
    line-height: 30px;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #8b8888;
  }
}
.toCity-enter-active,
.toCity-leave-active {
  transition: all 0.5s linear;
}
.toCity-enter,
.toCity-leave-to {
  transform: translateX(-100%);
}
.toMovie-enter-active,
.toMovie-leave-active {
  transition: all 0.5s linear;
}
.toMovie-enter,
.toMovie-leave-to {
  transform: translateX(100%);
}
</style>
