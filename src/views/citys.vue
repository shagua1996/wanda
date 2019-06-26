<template>
  <transition name="selectCity">
    <div class="home">
      <mt-header>
        <router-link to="/movie" slot="left">
          <mt-button icon="back"> 选择城市</mt-button>
        </router-link>
      </mt-header>
      <div class="citys">
        <div class="currCity">
          <p>
            <span>当前城市</span>
            <span>{{ currCity }}</span>
          </p>
        </div>
        <div class="city_list">
          <template v-for="(val, key) in list">
            <div v-if="val.length > 0" :key="key">
              <div class="city_pre">{{ key }}</div>
              <div class="city_names">
                <div class="city_name" v-for="item in val" :key="item.id">
                  <div @click="gotoCinemas(item)">{{ item.city_name }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Http from "../http";
import { mapActions } from "vuex";
import store from "store";
export default {
  name: "city",
  data: function() {
    return {
      list: {},
      currCity: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == "cinemas") {
        next();
      } else {
        if (store.get("wanda_cinema")) {
          vm.$router.replace({ name: "movie" });
        } else {
          next();
        }
      }
    });
  },
  methods: {
    ...mapActions("city", ["actCity"]),

    gotoCinemas: function(cityInfo) {
      // console.log(cityInfo);
      this.actCity(cityInfo); //将当前选中的城市信息存储到store中
      store.set("wanda_city", cityInfo);
      this.$router.push({ name: "cinemas", params: { cityId: cityInfo.id } });
    },
    //反向地理解析
    reverseGeocoder: function(lat, lng) {
      this.axios
        .get("https://www.bestqingshan.top/demo/Juhe.php", {
          params: {
            url: "https://apis.map.qq.com/ws/geocoder/v1",
            param: {
              key: "CYQBZ-22PW3-4DK3R-YZ75E-OFFCO-J5F33",
              location: `${lat},${lng}`
            }
          }
        })
        .then(res => {
          var obj = JSON.parse(res.data.data);
          let city = obj.result.address_component.city;
          this.currCity = city.subString(0, city.length - 1);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getMyLocation() {
      var geolocation = new qq.maps.Geolocation(
        "CYQBZ-22PW3-4DK3R-YZ75E-OFFCO-J5F33",
        "wanda"
      );
      geolocation.getLocation(this.showPosition, this.showErr);
      // // PC端定位
      // geolocation.getIpLocation(this.showPosition, this.showErr);
    },
    showPosition(position) {
      // this.latitude = position.lat;
      // this.longitute = position.lng;
      // this.reverseGeocoder(position.lat, position.lng);
      this.currCity = position.city.substring(0, position.city.length - 1);
    },
    showErr() {
      this.getMyLocation();
    }
  },
  mounted: function() {
    this.getMyLocation(); //启动定位
    var obj = {};
    for (let i = 0; i < 26; i++) {
      var char = String.fromCharCode(65 + i); //ASCII码转字符
      obj[char] = [];
    }
    Http.citys(result => {
      result.data.citys.forEach(val => {
        let pre = val.city_pre.toUpperCase();
        obj[pre].push(val);
      });
      this.list = obj;
    });
  }
};
</script>
<style lang="less">
.citys {
  position: absolute;
  top: 40px;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .currCity {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    span:nth-of-type(1) {
      color: #c3c3c3;
    }
    span:nth-of-type(2) {
      margin-left: 10px;
    }
  }
}
.city_list {
  height: calc(100% - 40px);
  .city_pre {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    background-color: lightblue;
  }
  .city_names {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    .city_name {
      padding: 10px 0;
      min-width: 25%;
    }
  }
}
.selectCity-enter-active,
.selectCity-leave-active {
  transition: all 0.5s linear;
}
.selectCity-enter {
  transform: translateX(100%);
}

.selectCity-leave-to {
  transform: translateX(-100%);
}
</style>
