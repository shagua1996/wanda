<template>
  <div class="movieCell" @click="buyTick">
    <div class="movieCover">
      <img :src="movieinfo.pic_url" alt="" />
    </div>
    <div class="movieInfo">
      <div class="movieTitle">{{ movieinfo.movieName }}</div>
      <div class="movieDes">不止比赛，更是意识形态的战争</div>
      <div class="movieDes1">6月13日 后天上映</div>
    </div>
    <div class="movieComment">
      <div class="movieStar">8.1分</div>
      <div class="movieTick">购票</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["movieinfo"],
  methods: {
    buyTick: function() {
      this.$emit("buyTick");
    }
  }
};
</script>
<style lang="less">
.movieCell {
  display: flex;
  height: 120px;
  padding-right: 8px;
  border-bottom: 1px solid #c3c3c3;
  .movieCover {
    width: 80px;
    padding: 5px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .movieInfo {
    flex: 1 1 auto;
    padding: 0 8px;
    position: relative;
    .movieTitle {
      position: absolute;
      top: 10px;
      font-weight: bolder;
      font-size: 1.1em;
    }
    .movieDes {
      position: absolute;
      top: 45px;
      color: gray;
      font-size: 0.8rem;
    }
    .movieDes1 {
      position: absolute;
      top: 72px;
      color: gray;
      font-size: 0.8rem;
    }
  }
  .movieComment {
    width: 60px;
    position: relative;
    .movieStar {
      position: absolute;
      top: 15px;
      text-align: right;
      width: 100%;
    }
    .movieTick {
      height: 30px;
      line-height: 30px;
      background-color: rgb(233, 182, 115);
      border-radius: 30px;
      text-align: center;
      color: white;
      position: absolute;
      bottom: 25px;
      width: 60px;
    }
  }
}
</style>
