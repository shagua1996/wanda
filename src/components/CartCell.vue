<template>
  <div class="cartCell">
    <div class="cartCell_title">{{ cartInfo.title }}</div>
    <div class="cartCell_price">￥{{ cartInfo.price }}</div>
    <div class="cartCell_calc">
      <div class="cartCell_minus fa fa-minus-circle" @click="minus"></div>
      <div class="cartCell_Count">{{ cartInfo.count }}</div>
      <div class="cartCell_add fa fa-plus-circle" @click="add"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cartInfo"],
  methods: {
    minus() {
      this.$emit("minus");
    },
    add() {
      this.$emit("add");
    }
  },
  mounted: function() {}
};
</script>
<style lang="less">
.cartCell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  .cartCell_title {
    flex: 0 0 50%;
    padding-left: 10px;
  }
  .cartCell_price {
    flex: 3 0 auto;
    font-size: 1.2rem;
  }
  .cartCell_calc {
    padding-right: 10px;
    flex: 2 0 auto;
    display: flex;
    justify-content: space-around;
    .cartCell_minus,
    .cartCell_add {
      color: goldenrod;
      font-size: 1.5rem;
    }
    .cartCell_Count {
      font-size: 1.2rem;
    }
  }
}
</style>
