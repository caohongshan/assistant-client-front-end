<template>
  <scroll-view
    class="custom-tabbar-page"
    scroll-y
    enable-back-to-top
    :lower-threshold="100"
    @scrolltolower="tabbarPageScrollLower"
  >
    <page-a ref="pageA" />
  </scroll-view>
</template>

<script>
import PageA from "./component/PageA.vue";

export default {
  components: { PageA },
  data() {
    return {
      currentTabbarIndex: 0,
      // 自定义底栏对应页面的加载情况
      tabberPageLoadFlag: [],
      number: 1,
    };
  },
  onLoad(options) {
    const index = Number(options.index || 0);
    // 根据底部tabbar菜单列表设置对应页面的加载情况
    for (let i = 0; i < 5; i++) {
      this.tabberPageLoadFlag.push(i === index);
    }
    this.changeTabbar(index);
  },
  methods: {
    // 导航页面滚动到底部
    tabbarPageScrollLower(e) {
      if (this.currentTabbarIndex === 0) {
        this.$refs.pageA.getRandomData && this.$refs.pageA.getRandomData();
      }
    },

    // 修改当前选中的tabbar
    changeTabbar(index) {
      if (index == 4) {
        this.number = this.number + 1;
      }
      if (this.currentTabbarIndex === index) return;
      this._switchTabbarPage(index);
      this.currentTabbarIndex = index;
    },

    // 切换导航页面
    _switchTabbarPage(index) {
      const selectPageFlag = this.tabberPageLoadFlag[index];
      if (selectPageFlag === undefined) {
        return;
      }
      if (selectPageFlag === false) {
        this.tabberPageLoadFlag[index] = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  position: relative;

  .custom-tabbar-page {
    width: 100%;
    height: calc(100vh - 110rpx);
    box-sizing: border-box;
    padding-bottom: 0rpx;
    padding-bottom: calc(0rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(0rpx + env(safe-area-inset-bottom));
  }

  /* 底部导航 statr */
  .tabbar {
    width: 100%;
    height: 110rpx;
    height: calc(110rpx + constant(safe-area-inset-bottom));
    height: calc(110rpx + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 998;
    padding-bottom: calc(constant(safe-area-inset-bottom));
    padding-bottom: calc(env(safe-area-inset-bottom));
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);

    .action {
      font-size: 22rpx;
      position: relative;
      flex: 1;
      text-align: center;
      padding: 0;
      display: block;
      height: auto;
      line-height: 1;
      margin: 0;
      overflow: initial;

      .bar-icon {
        width: 100rpx;
        position: relative;
        display: block;
        height: auto;
        margin: 0 auto 10rpx;
        text-align: center;
        font-size: 42rpx;

        image {
          width: 55rpx;
          height: 55rpx;
          display: inline-block;
        }
      }

      .bar-circle {
        position: relative;
        display: block;
        margin: 0rpx auto 0rpx;
        text-align: center;
        font-size: 52rpx;
        line-height: 90rpx;
        width: 100rpx !important;
        height: 100rpx !important;
        overflow: hidden;

        image {
          width: 100rpx;
          height: 100rpx;
          display: inline-block;
          margin: 0rpx auto 0rpx;
        }
      }
    }

    .bar-center {
      animation: suspension 3s ease-in-out infinite;

      .nav-index-button {
        animation: suspension 3s ease-in-out infinite;
        z-index: 999999;

        &__content {
          position: absolute;
          width: 100rpx;
          height: 100rpx;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          &--icon {
            width: 100rpx;
            height: 100rpx;
            font-size: 60rpx;
            border-radius: 50%;
            margin-bottom: 18rpx;
            position: relative;
            z-index: 1;
            transform: scale(0.85);

            &::after {
              content: " ";
              position: absolute;
              z-index: -1;
              width: 100%;
              height: 100%;
              left: 0;
              bottom: 0;
              border-radius: inherit;
              opacity: 1;
              transform: scale(1, 1);
              background-size: 100% 100%;
              // background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg6.png);
            }
          }
        }

        &__meteor {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100rpx;
          height: 100rpx;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);

          &__wrapper {
            width: 100rpx;
            height: 100rpx;
            transform-style: preserve-3d;
            animation: spin 20s linear infinite;
          }

          &__item {
            position: absolute;
            width: 100rpx;
            height: 100rpx;
            border-radius: 1000rpx;
            left: 0;
            top: 0;

            &--pic {
              display: block;
              width: 100%;
              height: 100%;
              background: url(https://tnuiimage.tnkjapp.com/cool_bg_image/arc2.png)
                no-repeat center center;
              background-size: 100% 100%;
              animation: arc 4s linear infinite;
            }
          }
        }
      }
    }
  }

  /* 底部导航 end */
}

@keyframes suspension {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.6rem);
  }
}

@keyframes spin {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(-360deg);
  }
}

@keyframes arc {
  to {
    transform: rotate(360deg);
  }
}
</style>
