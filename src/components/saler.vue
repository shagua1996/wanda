<template>
  <div class="saler">
    <header>
      <mt-header title="万达电影"></mt-header>
      <mt-cell :title="cinameName" @click.native="gotoCinemas" is-link>
        <span slot="icon" class="fa fa-map-marker"></span>
      </mt-cell>
    </header>
    <div class="saler_content">
      <div class="curtains"></div>
      <div class="content_box">
        <div class="list_left">
          <ul>
            <template v-for="(item, index) in titles">
              <li
                :key="item.id"
                @click="changeItem(item.id)"
                :class="{ active: index == currentIndex }"
              >
                {{ item.title }}
              </li>
            </template>
          </ul>
        </div>
        <div class="list_right">
          <div class="changeTitle">{{ currentTitle }}</div>
          <div class="saler_show">
            <template v-for="item in data">
              <saler-cell
                :salerInfo="item"
                :key="item.id"
                @minus="minus(item.id)"
                @add="add(item.id)"
              ></saler-cell>
            </template>
          </div>
        </div>
      </div>
      <template v-if="isShowCart">
        <div class="shopping_cart">
          <div class="shopping_cart_mask"></div>
          <div class="shopping_cart_list">
            <div class="shopping_cart_title">
              <span style="float:left">已选卖品</span>
              <span style="float:right" @click="clearCart">清空购物车</span>
            </div>
            <div class="shopping_cart_content">
              <template v-for="item in filerCarts(salerList)">
                <cart-cell
                  :key="item.id"
                  :cartInfo="item"
                  @minus="minus(item.id)"
                  @add="add(item.id)"
                ></cart-cell>
              </template>
            </div>
          </div>
        </div>
      </template>

      <div class="sum_botton">
        <div class="total_sum">
          ￥{{ totalprice }}
          <div class="shop_car fa fa-shopping-cart" @click="toggleCart"></div>
          <template v-if="totalCount > 0">
            <mt-badge class="badge" size="small">{{ totalCount }}</mt-badge>
          </template>
        </div>
        <div class="sum_btn" @click="toOrder(filerCarts(salerList))">结算</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Indicator } from "mint-ui";
import salerCell from "./salerCell";
import Http from "../http";
import CartCell from "./CartCell";
import store from "store";
export default {
  name: "saler",
  data: function() {
    return {
      cinameName: "",
      salerList: [],
      titles: [],
      data: [],
      currentTitle: "",
      currentIndex: 0,
      totalprice: 0,
      totalCount: 0,
      isShowCart: false,
      temp_saler: {}
    };
  },
  components: {
    salerCell,
    CartCell
  },
  computed: {
    ...mapGetters("cinema", ["Cinema"])
  },
  methods: {
    toOrder: function(salerIfos) {
      this.$router.push({ name: "order", params: { salerIfos } });
    },
    minus: function(itemId) {
      this.salerOperate(itemId, -1);
      this.salerCalcPrice();
    },
    add: function(itemId) {
      this.salerOperate(itemId, 1);
      this.salerCalcPrice();
    },
    //显示隐藏购物车
    toggleCart() {
      if (this.totalprice == 0) return;
      this.isShowCart = !this.isShowCart;
    },
    //清空购物车
    clearCart: function() {
      this.salerList.forEach(val => {
        val.data.forEach(item => {
          item.count = 0;
        });
      });
      this.salerCalcPrice();
    },
    //添加的商品数量
    salerOperate(itemId, count) {
      this.salerList.forEach(val => {
        val.data.forEach(item => {
          if (item.id == itemId) {
            item.count += count;
          }
        });
      });
    },
    //过滤总数据，将count为0的数据排除
    filerCarts: function(val) {
      let cartlist = [];
      val.forEach(res => {
        res.data.forEach(item => {
          if (item.count > 0) {
            cartlist.push(item);
          }
        });
      });
      return cartlist;
    },
    //计算总价和数量
    salerCalcPrice() {
      let sum = 0;
      let count = 0;
      this.salerList.forEach(val => {
        val.data.forEach(item => {
          count += item.count;
          sum += item.count * item.price;
        });
      });
      this.totalprice = sum;
      this.totalCount = count;
      if (this.totalprice == 0) {
        this.isShowCart = false;
      }
    },
    changeItem: function(itemId) {
      this.salerList.forEach((val, index) => {
        if (val.id == itemId) {
          this.data = val.data;
          this.currentTitle = val.title;
          this.currentIndex = index;
        }
      });
    },
    gotoCinemas: function() {
      let cityId = "123";
      this.$router.push({ name: "cinemas", params: { cityId } });
    },
    salerProduct: function() {
      Indicator.open("加载中");
      Http.product(result => {
        Indicator.close();
        this.salerList = result.data.result;
        this.salerList.forEach((val, index) => {
          let id = val.id;
          let title = val.title;
          this.titles.push({ id, title });
          if (index == 0) {
            this.currentTitle = val.title;
            this.data = val.data;
          }
        });
      });
    }
  },
  mounted: function() {
    // this.cinameName = this.Cinema.cinemaName;
    this.cinameName = store.get("wanda_cinema").cinemaName;
    this.salerProduct();
  }
};
</script>
<style lang="less">
.saler {
  header {
    position: fixed;
    width: 100%;
  }
  .mint-cell {
    height: 45px;
    position: absolute;
    top: 40px;
    width: 100%;
    border-bottom: none !important;
    .mint-cell-wrapper {
      border-bottom: none !important;
    }
  }
  .saler_content {
    position: absolute;
    top: 85px;
    height: calc(100% - 134px);
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .curtains {
      width: 100%;
      height: 25px;
      background-image: url("../assets/image/border.png");
    }
    .content_box {
      position: relative;
      height: calc(100% - 85px);
      display: flex;
      .list_left {
        flex: 1 0 auto;
        background: rgb(241, 213, 141);
        li {
          height: 50px;
          border-bottom: 1px solid #666;
          text-align: center;
          line-height: 50px;
          color: #333;
        }
        .active {
          background-color: white;
        }
      }
      .list_right {
        flex: 3 0 auto;
        .changeTitle {
          width: 100%;
          height: 50px;
          border-bottom: 1px solid #666;
          text-align: center;
          line-height: 50px;
          color: #000;
          font-size: 1.2rem;
        }
      }
    }
    .shopping_cart {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .shopping_cart_mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
      }
      .shopping_cart_list {
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 59px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .shopping_cart_title {
          height: 40px;
          background: aliceblue;
          line-height: 40px;
          padding: 0 10px;
        }
        .shopping_cart_content {
          background: white;
          max-height: calc(100% - 150px);
          overflow-y: scroll;
        }
      }
    }
  }
  .sum_botton {
    position: relative;
    height: 59px;
    display: flex;
    .total_sum {
      flex: 3 0 auto;
      text-align: center;
      line-height: 59px;
      font-size: 1.5rem;
      color: orange;
      background: white;
      .shop_car {
        position: absolute;
        left: 30px;
        top: -10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        color: white;
        background: gray;
      }
    }
    .sum_btn {
      flex: 2 1 auto;
      background: orange;
      text-align: center;
      line-height: 59px;
      font-size: 1.3rem;
      color: white;
    }
  }
  .badge {
    position: absolute;
    left: 55px;
    top: -15px;
    height: 15px;
    width: 10px;
    line-height: 15px;
  }
}
</style>
