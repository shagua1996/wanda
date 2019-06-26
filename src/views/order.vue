<template>
  <div>
    <mt-header>
      <mt-button icon="back" slot="left" @click="goBack"> 确认订单</mt-button>
    </mt-header>
    <div class="order_content">
      <div class="order_cinema">{{ temp_cinema }}</div>
      <div class="order_cell_content">
        <template v-for="(item, index) in orderIfos">
          <div class="order_cells" :key="index">
            <div class="goods_des">
              <div class="goods_pic">
                <img :src="item.img" width="100%" height="100%" alt="" />
              </div>
              <div class="goods_des_fles">
                <div class="goods_title">{{ item.title }}</div>
                <div class="goods_detaile" style="color:grey">
                  {{ item.des }}
                </div>
                <div class="goods_price">￥{{ item.price }}</div>
              </div>
            </div>
            <div class="goods_count">
              x <span>{{ item.count }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="other_content">
        <div class="look_more" @click="toggleOrder">
          查看更多<span
            class="fa"
            :class="{ 'fa-angle-down': !isDown, 'fa-angle-up': isDown }"
          ></span>
        </div>
        <div class="total_price">
          <div>总价</div>
          <div>￥{{ totalprice }}</div>
        </div>
      </div>
    </div>
    <div class="pey_now">
      <div class="pey_price">
        还需支付：<span>￥{{ totalprice }} </span>
      </div>
      <div class="pey_btn">立即支付</div>
    </div>
  </div>
</template>
<script>
import store from "store";

export default {
  data: function() {
    return {
      temp_cinema: "",
      orderIfos: {},
      isDown: false,
      totalprice: ""
    };
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    toggleOrder: function() {
      var up = document.getElementsByClassName("order_cell_content")[0];
      if (this.isDown) {
        up.style.height = "210px";
      } else {
        up.style.height = "auto";
      }
      this.isDown = !this.isDown;
    },
    //计算总价和数量
    salerCalcPrice() {
      let sum = 0;
      this.orderIfos.forEach(item => {
        sum += item.count * item.price;
      });
      this.totalprice = sum;
    }
  },

  mounted: function() {
    this.temp_cinema = store.get("wanda_cinema").cinemaName;
    this.orderIfos = this.$route.params.salerIfos;
    this.salerCalcPrice();
  }
};
</script>
<style lang="less">
.order_content {
  position: absolute;
  top: 40px;
  height: calc(100% - 90px);
  width: calc(100%);
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  .order_cinema {
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 1.2rem;
  }
  .order_cell_content {
    padding-left: 10px;
    width: 100%;
    height: 210px;
    overflow: hidden;
    .order_cells {
      width: 100%;
      height: 100px;
      border-bottom: 1px dotted grey;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods_des {
        flex: 2 1 auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .goods_pic {
          height: 60px;
          width: 60px;
          border: 1px solid #333;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        .goods_des_fles {
          padding: 5px;
          box-sizing: border-box;
          .goods_price {
            color: goldenrod;
          }
        }
      }
      .goods_count {
        flex: 1 0 30px;
        padding-right: 10px;
      }
    }
  }
}
.other_content {
  position: absolute;
  width: 100%;
  height: 100px;
  .look_more {
    text-align: center;
    color: grey;
  }
  .total_price {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin: 20px 0;
    color: grey;
  }
}
.pey_now {
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% - 10px);
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  .pey_price span {
    color: goldenrod;
  }
  .pey_btn {
    width: 150px;
    height: 100%;
    text-align: center;
    color: white;
    background: burlywood;
  }
}
</style>
