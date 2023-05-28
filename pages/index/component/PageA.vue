<template>
  <view
    class="basic tn-safe-area-inset-bottom"
    style="padding-top: 400rpx; position: relative"
  >
    <view
      style="
        position: absolute;
        width: 100%;
        height: 800rpx;
        top: 0;
        z-index: 0;
      "
    >
      <view class="wrapper">
        <view class="candles">
          <view class="light__wave"></view>
          <view class="candle1">
            <view class="candle1__body">
              <view class="candle1__eyes">
                <view class="candle1__eyes-one"></view>
                <view class="candle1__eyes-two"></view>
              </view>
              <view class="candle1__mouth"></view>
            </view>
            <view class="candle1__stick"></view>
          </view>
          <view class="candle2">
            <view class="candle2__body">
              <view class="candle2__eyes">
                <view class="candle2__eyes-one"></view>
                <view class="candle2__eyes-two"></view>
              </view>
            </view>
            <view class="candle2__stick"></view>
          </view>
          <view class="candle2__fire"></view>
          <view class="sparkles-one"></view>
          <view class="sparkles-two"></view>
          <view class="candle__smoke-one"> </view>
          <view class="candle__smoke-two"> </view>
        </view>
        <view class="floor"></view>
      </view>
    </view>
    <block v-for="(item, index) in navList" :key="index">
      <view class="nav_title--wrap tn-margin-bottom-sm">
        <view class="nav_title tn-cool-bg-color-15">{{
          item.title | titleFilter
        }}</view>
      </view>

      <view class="nav-list">
        <block
          v-for="(content_item, content_index) in item.list"
          :key="content_index"
        >
			<view  class="nav-list-item tn-shadow-blur tn-cool-bg-image tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-between">
<!--          <navigator
            open-type="navigate"
            hover-class="none"
            :url="content_item.url"
            class="nav-list-item tn-shadow-blur tn-cool-bg-image tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-between"
          > -->
<!--            <view class="icon">
              <view :class="['tn-icon-' + content_item.icon]"></view>
            </view> -->
				<view class="nav-link">
				  <view class="title">{{ content_item.title }}</view>
				</view>
				<view>{{content_item.desc}}</view>
				<button @click="transform(content_item)">
					{{index ? '立即变身' : '开启AI之旅'}}
				</button>
          <!-- </navigator> -->
		  </view>
        </block>
      </view>
    </block>

    <view class="tn-padding-bottom-xs"></view>
  </view>
</template>

<script>
import basicListData from "@/mock/basic_page.js";

export default {
  name: "Basic",
  filters: {
    titleFilter(value) {
      if (value.length === 0) {
        return "";
      }
      let newString = "";
      for (let i = 0; i < value.length; i++) {
        if (i !== 0) {
          newString += " / ";
        }
        newString += value[i];
      }
      return newString;
    },
  },
  data() {
    return {
      navList: basicListData.data,
    };
  },
  methods: {
	transform(item) {
		uni.navigateTo({
			url: `/pages/im/chat/chat?desc=${item.desc}`
		})
	}
  }
};
</script>

<style lang="scss" scoped>
@import "@/static/css/demo.scss";

/* 顶部背景图 start */
.top-backgroup {
  height: 450rpx;
  z-index: -1;

  .backgroud-image {
    width: 100%;
    height: 667rpx;
  }
}

/* 顶部背景图 end */

/* 标题start */
.nav_title {

  &--wrap {
    position: relative;
    display: flex;
    height: 120rpx;
    font-size: 46rpx;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background: yellow;
    background-size: cover;
  }
}

/* 标题end */

/* 组件导航列表 start*/
.nav-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  /* 列表元素 start */
  .nav-list-item {
    border-radius: 12rpx;
    width: 45%;
    margin: 0 18rpx 40rpx;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 99;

    /* 元素标题 start */
    .nav-link {
      font-size: 32rpx;
      text-transform: capitalize;
      padding: 0 0 10rpx 0;
      position: relative;

      .title {
        margin-top: 20rpx;
        text-align: center;
      }
    }

    /* 元素图标 start */
    .icon {
      font-variant: small-caps;
      width: 90rpx;
      height: 90rpx;
      display: inline-flex;
      text-align: center;
      justify-content: center;
      vertical-align: middle;
      font-size: 50rpx;
      background-color: rgba(0, 0, 0, 0.05);
      background-position: 50%;
      border-radius: 5000rpx;
      margin-left: 36%;
    }

  }
}
</style>
