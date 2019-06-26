<template>
  <div class="salerCell">
    <div class="salerCover">
      <img :src="salerInfo.img" alt="" />
    </div>
    <div class="salerInfo">
      <div class="salerTitle">{{ salerInfo.title }}</div>
      <div class="salerDes">{{ salerInfo.des }}</div>
      <div class="salerPrice">￥{{ salerInfo.price }}</div>
    </div>
    <div class="salerComment">
      <template v-if="salerInfo.count > 0">
        <div class="salerSub fa fa-minus-circle" @click="minus"></div>
        <div class="salerCount">{{ salerInfo.count }}</div>
      </template>
      <div class="salerAdd fa fa-plus-circle" @click="add"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["salerInfo"],
  methods: {
    minus() {
      this.$emit("minus");
    },
    add() {
      this.$emit("add");
    }
  }
};
</script>
<style lang="less">
.salerCell {
  position: relative;
  display: flex;
  height: 120px;
  padding-right: 8px;
  border-bottom: 1px solid #c3c3c3;
  .salerCover {
    width: 80px;
    padding: 5px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .salerInfo {
    flex: 1 1 auto;
    padding: 0 8px;
    position: relative;
    .salerTitle {
      position: absolute;
      top: 10px;
      font-weight: bolder;
      font-size: 1.1em;
    }
    .salerDes {
      position: absolute;
      top: 45px;
      width: 90%;
      color: gray;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }
    .salerPrice {
      position: absolute;
      top: 80px;
      color: orange;
      font-size: 1.2rem;
    }
  }
  .salerComment {
    width: 80px;
    position: relative;
    display: flex;
    position: absolute;
    right: 10px;
    bottom: 20px;
    justify-content: space-around;
    align-items: center;
    .salerSub,
    .salerAdd {
      font-size: 1.5rem;
      color: goldenrod;
    }
    .salerCount {
      font-size: 1.2rem;
    }
  }
}
</style>
