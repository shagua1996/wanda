<template>
  <div>
    <div class="person">
      <div class="person_head">
        <div class="person_title">我的</div>
        <div class="avatar_box">
          <div class="avatar_pic fa fa-user-circle-o"></div>
          <div class="avatar_name">
            <b>万达影迷</b>
            <p>155****7320</p>
          </div>
        </div>
      </div>
      <div class="person_cell">
        <mt-cell title="彩票订单" is-link>
          <div slot="icon" class="awefonts fa fa-film"></div>
        </mt-cell>
        <mt-cell title="卖品订单" is-link>
          <div slot="icon" class="awefonts fa fa-gift"></div>
        </mt-cell>
        <mt-cell title="我的影单" is-link>
          <div slot="icon" class="awefonts fa fa-file-text"></div>
        </mt-cell>
        <mt-cell title="我的钱包" is-link>
          <div slot="icon" class="awefonts fa fa-credit-card"></div>
        </mt-cell>
      </div>
      <div class="islogin">退出登录</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.person {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(241, 248, 248);
  .person_head {
    position: absolute;
    width: 100%;
    height: 200px;
    background: burlywood;
    .person_title {
      position: absolute;
      top: 30px;
      color: white;
      padding-left: 20px;
    }
    .avatar_box {
      position: absolute;
      top: 100px;
      left: 20px;
      width: 50%;
      display: flex;
      justify-content: space-around;
      .avatar_pic {
        // width: 60px;
        // height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 60px;
        color: white;
        // border: 1px solid white;
        // border-radius: 50%;
      }
      .avatar_name {
        color: white;
        b {
          font-size: 1.2rem;
        }
        p {
          font-size: 0.9rem;
        }
      }
    }
  }
  .person_cell {
    position: absolute;
    top: 210px;
    width: 100%;
    .awefonts {
      color: burlywood;
      padding: 0 10px;
    }
  }
  .islogin {
    position: absolute;
    top: 410px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: burlywood;
    background: white;
  }
}
</style>
