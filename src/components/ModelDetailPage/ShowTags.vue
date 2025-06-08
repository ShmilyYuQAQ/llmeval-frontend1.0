<template>
    <div class="group_4 flex-row justify-between">
        <img
          class="thumbnail_14"
          referrerpolicy="no-referrer"
          src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngd2b56223b4cfb55c65c26d00333ac77da1032d6766dafbd41d2eb557e367e449"
        />
        <span class="text_50">能力标签（{{ getTagCount() }}）</span>
    </div>
    <EmptyTags v-if="getTagCount() === 0" />
    <span class="text_51" v-if="filteredTags.count > 0">卓越</span>
    <div class="group_5 flex-row justify-between" v-if="filteredTags.count > 0">
        <div
          v-for="(tag, index) in filteredTags.tags"
          :key="index"
          class="text-wrapper_11 flex-col"
        >
          <span class="text_52">{{ tag.tagName }}</span>
        </div>
    </div>
    <span class="text_60" v-if="excellentTags.count > 0">优秀</span>
    <div class="group_5 flex-row justify-between" v-if="excellentTags.count > 0">
        <div
          v-for="(tag, index) in excellentTags.tags"
          :key="index"
          class="text-wrapper_47 flex-col"
        >
          <span class="text_91">{{ tag.tagName }}</span>
        </div>
    </div>
    <span class="text_72" v-if="goodTags.count > 0">良好</span>
    <div class="group_5 flex-row justify-between" v-if="goodTags.count > 0">
        <div
          v-for="(tag, index) in goodTags.tags"
          :key="index"
          class="text-wrapper_31 flex-col"
        >
          <span class="text_73">{{ tag.tagName }}</span>
        </div>
    </div>
    <span class="text_80" v-if="averageTags.count > 0">一般</span>
    <div class="group_5 flex-row justify-between" v-if="averageTags.count > 0">
        <div
          v-for="(tag, index) in averageTags.tags"
          :key="index"
          class="text-wrapper_40 flex-col"
        >
          <span class="text_83">{{ tag.tagName }}</span>
        </div>
    </div>
    <span class="text_81" v-if="weakTags.count > 0">薄弱</span>
    <div class="group_5 flex-row justify-between" v-if="weakTags.count > 0">
        <div
          v-for="(tag, index) in weakTags.tags"
          :key="index"
          class="text-wrapper_39 flex-col"
        >
          <span class="text_82">{{ tag.tagName }}</span>
        </div>
    </div>
</template>

<script>
import EmptyTags from './EmptyTags.vue';
export default {
  name: "ShowTags",
  props: {
    tags: {
      type: Array, // 接收一个数组类型的 tags
      required: true, // 确保父组件必须传递该属性
    },
  },
  components: {
    EmptyTags, // 引入 EmptyTags 组件
  },
  mounted() {
    console.log("tags:", this.tags); // 在组件挂载时打印 tags 的值
  },
  computed: {
    filteredTags() {
      // 过滤出 tagGrade 为 "能力卓越" 的标签，并返回数组和数量
      const tags = this.tags.filter((tag) => tag.tagGrade === "能力卓越");
      return { tags, count: tags.length };
    },
    excellentTags() {
      // 过滤出 tagGrade 为 "能力优秀" 的标签，并返回数组和数量
      const tags = this.tags.filter((tag) => tag.tagGrade === "能力优秀");
      return { tags, count: tags.length };
    },
    goodTags() {
      // 过滤出 tagGrade 为 "能力良好" 的标签，并返回数组和数量
      const tags = this.tags.filter((tag) => tag.tagGrade === "能力良好");
      return { tags, count: tags.length };
    },
    averageTags() {
      // 过滤出 tagGrade 为 "能力一般" 的标签，并返回数组和数量
      const tags = this.tags.filter((tag) => tag.tagGrade === "能力一般");
      return { tags, count: tags.length };
    },
    weakTags() {
      // 过滤出 tagGrade 为 "能力薄弱" 的标签，并返回数组和数量
      const tags = this.tags.filter((tag) => tag.tagGrade === "能力薄弱");
      return { tags, count: tags.length };
    },
  },
  methods: {
    getTagCount() {
        return this.tags.length; // 返回 tags 数组的长度
    },
  },
}
</script>

<style scoped>
.page {
  background-color: rgba(248, 249, 251, 1);
  position: relative;
  width: 1440px;
  height: 1861px;
  overflow: hidden;
}

.box_1 {
  width: 1440px;
  height: 1831px;
}

.section_1 {
  width: 1440px;
  height: auto;
}

.box_2 {
  box-shadow: inset 0px -1px 0px 0px rgba(231, 233, 241, 1);
  background-color: rgba(255, 255, 255, 1);
  height: 56px;
  width: 1440px;
}

.box_3 {
  width: 1392px;
  height: 38px;
  margin: 9px 0 0 20px;
}

.image_1 {
  width: 175px;
  height: 36px;
  margin-top: 1px;
}

.thumbnail_1 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 349px;
}

.text_1 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.thumbnail_2 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 39px;
}

.text_2 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.thumbnail_3 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 39px;
}

.text_3 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.thumbnail_4 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 39px;
}

.text_4 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.label_1 {
  width: 38px;
  height: 38px;
  margin-left: 357px;
}

.text-wrapper_1 {
  width: 112px;
  height: 37px;
  margin-left: 8px;
}

.text_5 {
  width: 112px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}

.text_6 {
  width: 48px;
  height: 17px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 17px;
}

.box_4 {
  width: 72px;
  height: 2px;
  margin: 7px 0 0 534px;
}

.box_5 {
  background-color: rgba(135, 0, 102, 1);
  width: 72px;
  height: 2px;
}

.box_6 {
  background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/d04fe58e7908474bac11499b05c126d2_mergeImage.png);
  width: 1440px;
  height: 240px;
  margin-bottom: 686px;
}

.text_7 {
  width: 128px;
  height: 45px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 45px;
  margin: 52px 0 0 120px;
}

.text-wrapper_2 {
  width: 97px;
  height: 18px;
  overflow-wrap: break-word;
  font-size: 0;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 24px 0 101px 120px;
}

.text_8 {
  width: 97px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(116, 140, 154, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.text_9 {
  width: 97px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}

.section_2 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  width: 1200px;
  height: 850px;
  justify-content: flex-center;
  margin: 981px 120px 0 -1320px;
}

.image-text_1 {
  width: 130px;
  height: 22px;
  margin: 24px 0 0 20px;
}

.thumbnail_5 {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}

.text-group_1 {
  width: 106px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.box_7 {
  width: 1160px;
  height: 83px;
  margin: 20px 0 0 20px;
}

.text-wrapper_3 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 1066px;
}

.text_10 {
  width: 112px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 16px;
}

.section_3 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  width: 82px;
  height: 83px;
}

.image-text_2 {
  width: 56px;
  height: 46px;
  margin: 19px 0 0 13px;
}

.thumbnail_6 {
  width: 20px;
  height: 20px;
  margin-left: 18px;
}

.text-group_2 {
  width: 56px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
  margin-top: 8px;
}

.box_8 {
  width: 1160px;
  height: 32px;
  margin: 20px 0 0 20px;
}

.label_2 {
  width: 32px;
  height: 32px;
}

.text_11 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 8px;
}

.thumbnail_7 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 12px;
}

.text_12 {
  width: 84px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}

.text_13 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 772px;
}

.text_14 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}

.text_15 {
  width: 400px;
  height: 40px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  line-height: 20px;
  margin: 4px 0 0 114px;
}

.box_9 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  width: 1068px;
  height: 76px;
  justify-content: flex-center;
  margin: 16px 0 0 114px;
}

.image-text_3 {
  width: 82px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.label_3 {
  width: 32px;
  height: 32px;
}

.text-group_3 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
}

.text_16 {
  width: 736px;
  height: 40px;
  overflow-wrap: break-word;
  color: rgba(102, 106, 117, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  line-height: 20px;
  margin-top: 18px;
}

.text_17 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 18px 0 0 20px;
}

.text_18 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 18px 20px 0 20px;
}

.box_10 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  width: 1068px;
  height: 57px;
  justify-content: flex-center;
  margin: 12px 0 0 114px;
}

.image-text_4 {
  width: 174px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.label_4 {
  width: 32px;
  height: 32px;
}

.text-group_4 {
  width: 134px;
  height: 20px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
}

.text_19 {
  width: 134px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}

.text_20 {
  width: 134px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}

.text_21 {
  width: 196px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(102, 106, 117, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 18px;
}

.text_22 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 18px 0 0 468px;
}

.text_23 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 18px 20px 0 20px;
}

.image_2 {
  width: 1160px;
  height: 1px;
  margin: 21px 0 0 20px;
}

.box_11 {
  width: 1160px;
  height: 32px;
  margin: 15px 0 0 20px;
}

.image-text_5 {
  width: 68px;
  height: 32px;
}

.label_5 {
  width: 32px;
  height: 32px;
}

.text-group_5 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
}

.thumbnail_8 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 26px;
}

.text_24 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}

.text_25 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 814px;
}

.text_26 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}

.text_27 {
  width: 700px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 0 114px;
}

.text-wrapper_4 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 1066px;
  margin: 16px 0 0 114px;
}

.text_28 {
  width: 112px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 16px;
}

.box_12 {
  width: 132px;
  height: 32px;
  margin: 10px 0 0 114px;
}

.text-wrapper_5 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  height: 32px;
  width: 60px;
}

.text_29 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_6 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  width: 60px;
}

.text_30 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.image_3 {
  width: 1160px;
  height: 1px;
  margin: 21px 0 0 20px;
}

.box_13 {
  width: 1160px;
  height: 32px;
  margin: 15px 0 0 20px;
}

.image-text_6 {
  width: 68px;
  height: 32px;
}

.label_6 {
  width: 32px;
  height: 32px;
}

.text-group_6 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
}

.thumbnail_9 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 26px;
}

.text_31 {
  width: 84px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}

.text_32 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 772px;
}

.text_33 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}

.text_34 {
  width: 224px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 0 114px;
}

.image_4 {
  width: 1160px;
  height: 1px;
  margin: 20px 0 0 20px;
}

.box_14 {
  width: 1160px;
  height: 32px;
  margin: 16px 0 0 20px;
}

.label_7 {
  width: 32px;
  height: 32px;
}

.text_35 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 8px;
}

.thumbnail_10 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 12px;
}

.text_36 {
  width: 84px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}

.text_37 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 728px;
}

.text_38 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 16px;
}

.text_39 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}

.text_40 {
  width: 126px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 24px 114px;
}

.box_15 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  position: absolute;
  left: 120px;
  top: 211px;
  width: 1200px;
  height: 750px;
  justify-content: flex-center;
}

.group_1 {
  width: 1160px;
  height: 64px;
  margin: 20px 0 0 20px;
}

.box_16 {
  border-radius: 12px;
  background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/3cfd4b372e014ef6b6afd0381a2bc57c_mergeImage.png);
  width: 64px;
  height: 64px;
}

.box_17 {
  width: 415px;
  height: 62px;
  margin-left: 16px;
}

.box_18 {
  width: 415px;
  height: 33px;
}

.text_41 {
  width: 197px;
  height: 33px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 33px;
}

.label_8 {
  width: 24px;
  height: 23px;
  margin: 5px 0 0 12px;
}

.group_2 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  width: 86px;
  height: 28px;
  margin: 3px 0 0 12px;
}

.thumbnail_11 {
  width: 16px;
  height: 16px;
  margin: 6px 0 0 12px;
}

.text_42 {
  width: 42px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 5px 12px 0 0;
}

.group_3 {
  background-color: rgba(237, 240, 250, 1);
  border-radius: 8px;
  width: 72px;
  height: 28px;
  margin: 3px 0 0 12px;
}

.thumbnail_12 {
  width: 16px;
  height: 16px;
  margin: 6px 0 0 12px;
}

.text_43 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(77, 111, 208, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 5px 12px 0 0;
}

.box_19 {
  position: relative;
  width: 351px;
  height: 20px;
  margin-top: 9px;
}

.thumbnail_13 {
  width: 16px;
  height: 16px;
  margin-top: 4px;
}

.text_44 {
  position: absolute;
  left: 0;
  top: 0;
  width: 351px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
}

.text-wrapper_7 {
  width: 64px;
  height: 54px;
  margin: 5px 0 0 340px;
}

.text_45 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 22px;
}

.text_46 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 4px;
}

.text-wrapper_8 {
  width: 94px;
  height: 54px;
  margin: 5px 0 0 47px;
}

.text_47 {
  width: 94px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 22px;
}

.text_48 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 19px;
}

.text-wrapper_9 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  height: 40px;
  width: 88px;
  margin: 12px 0 0 32px;
}

.text_49 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 10px 0 0 16px;
}

.image_5 {
  width: 1160px;
  height: 1px;
  margin: 19px 0 0 20px;
}

.group_4 {
  display: flex; /* 使用 flex 布局 */
  flex-direction: row; /* 确保子元素水平排列 */  
  width: 140px;
  height: 22px;
  margin: 16px 0 0 20px;
  gap: 12px; /* 增加子元素之间的间距 */
}

.thumbnail_14 {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}

.text_50 {
  width: 116px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.text_51 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 30px 0 0 20px;
}

.text-wrapper_10 {
  width: 408px;
  height: 36px;
  margin: 19px 0 0 476px;
}

.paragraph_1 {
  width: 182px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.paragraph_2 {
  width: 182px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.group_5 {
  display: flex; /* 使用 flex 布局 */
  flex-direction: row; /* 确保子元素水平排列 */
  flex-wrap: wrap; /* 允许子元素换行 */
  width: auto;
  height: auto;
  margin: 10px 0 0 16px;
  gap: 10px; /* 子元素之间的间距 */
}

.text-wrapper_11 {
  background-color: rgba(135, 0, 102, 0.1); /* 背景色 */
  border-radius: 8px; /* 圆角 */
  padding: 8px; /* 添加内边距 */
  display: inline-flex; /* 使用 inline-flex 让宽度根据内容自动调整 */
  align-items: center; /* 垂直居中对齐 */
  height: auto; /* 高度根据内容自动调整 */
  width: auto; /* 宽度根据内容自动调整 */
  max-width: 100%; /* 防止超出父容器 */
}

.text_52 {
  width: auto; /* 让宽度根据内容自动调整 */
  height: auto; /* 高度根据内容自动调整 */
  overflow-wrap: break-word; /* 自动换行 */
  word-break: break-word; /* 防止长单词溢出 */
  color: rgba(135, 0, 102, 1); /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-family: OPPOSans-R; /* 字体 */
  font-weight: normal; /* 字体粗细 */
  text-align: left; /* 左对齐 */
  white-space: normal; /* 允许换行 */
  line-height: 18px; /* 行高 */
  margin: 0; /* 移除多余的外边距 */
}

.text-wrapper_12 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 242px;
}

.text_53 {
  width: 210px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_13 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 214px;
}

.text_54 {
  width: 182px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_14 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 130px;
}

.text_55 {
  width: 98px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_15 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_56 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_16 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 186px;
}

.text_57 {
  width: 154px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.group_6 {
  width: 456px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.box_20 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  width: 130px;
  height: 32px;
}

.text-wrapper_17 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_58 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_18 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_59 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_3 {
  width: 98px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 36px;
}

.text_60 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 30px 0 0 20px;
}

.text-wrapper_19 {
  width: 424px;
  height: 36px;
  margin: 19px 0 0 674px;
}

.paragraph_4 {
  width: 112px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.paragraph_5 {
  width: 112px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.group_7 {
  width: 1136px;
  height: 32px;
  margin: 1px 0 0 20px;
}

.box_21 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 186px;
  height: 32px;
}

.box_22 {
  width: 938px;
  height: 32px;
}

.text-wrapper_20 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_61 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_21 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_62 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_22 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_63 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_23 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_64 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_24 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 172px;
}

.text_65 {
  width: 140px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_25 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_66 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_6 {
  width: 154px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 36px;
}

.group_8 {
  width: 1050px;
  height: 32px;
  margin: 1px 0 0 20px;
}

.text-wrapper_26 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 214px;
}

.text_67 {
  width: 182px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.section_4 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 214px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_27 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_68 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_28 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_69 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_29 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_70 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_30 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_71 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_7 {
  width: 182px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 262px;
}

.text_72 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 30px 0 0 20px;
}

.group_9 {
  width: 1124px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.text-wrapper_31 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px; /* 圆角 */
  padding: 8px; /* 添加内边距 */
  display: inline-flex; /* 使用 inline-flex 让宽度根据内容自动调整 */
  align-items: center; /* 垂直居中对齐 */
  height: auto; /* 高度根据内容自动调整 */
  width: auto; /* 宽度根据内容自动调整 */
  max-width: 100%; /* 防止超出父容器 */
}

.text_73 {
    width: auto; /* 让宽度根据内容自动调整 */
  height: auto; /* 高度根据内容自动调整 */
  overflow-wrap: break-word; /* 自动换行 */
  word-break: break-word; /* 防止长单词溢出 */
  color: rgba(255, 112, 9, 1); /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-family: OPPOSans-R; /* 字体 */
  font-weight: normal; /* 字体粗细 */
  text-align: left; /* 左对齐 */
  white-space: normal; /* 允许换行 */
  line-height: 18px; /* 行高 */
  margin: 0; /* 移除多余的外边距 */
}

.text-wrapper_32 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_74 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.block_1 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  width: 144px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_33 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_75 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_34 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_76 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_35 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_77 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_36 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_78 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_37 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_79 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_8 {
  width: 112px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 320px;
}

.text_80 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 30px 0 0 20px;
}

.group_10 {
  width: 498px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.text-wrapper_38 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_81 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(234, 75, 75, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_39 {
  background-color: rgba(234,75,75,0.1);
  border-radius: 8px; /* 圆角 */
  padding: 8px; /* 添加内边距 */
  display: inline-flex; /* 使用 inline-flex 让宽度根据内容自动调整 */
  align-items: center; /* 垂直居中对齐 */
  height: auto; /* 高度根据内容自动调整 */
  width: auto; /* 宽度根据内容自动调整 */
  max-width: 100%; /* 防止超出父容器 */
}

.text_82 {
    width: auto; /* 让宽度根据内容自动调整 */
  height: auto; /* 高度根据内容自动调整 */
  overflow-wrap: break-word; /* 自动换行 */
  word-break: break-word; /* 防止长单词溢出 */
  color: rgba(234, 75, 75, 1); /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-family: OPPOSans-R; /* 字体 */
  font-weight: normal; /* 字体粗细 */
  text-align: left; /* 左对齐 */
  white-space: normal; /* 允许换行 */
  line-height: 18px; /* 行高 */
  margin: 0; /* 移除多余的外边距 */
}

.text-wrapper_40 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px; /* 圆角 */
  padding: 8px; /* 添加内边距 */
  display: inline-flex; /* 使用 inline-flex 让宽度根据内容自动调整 */
  align-items: center; /* 垂直居中对齐 */
  height: auto; /* 高度根据内容自动调整 */
  width: auto; /* 宽度根据内容自动调整 */
  max-width: 100%; /* 防止超出父容器 */
}

.text_83 {
    width: auto; /* 让宽度根据内容自动调整 */
  height: auto; /* 高度根据内容自动调整 */
  overflow-wrap: break-word; /* 自动换行 */
  word-break: break-word; /* 防止长单词溢出 */
  color: rgba(30, 36, 55, 1);; /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-family: OPPOSans-R; /* 字体 */
  font-weight: normal; /* 字体粗细 */
  text-align: left; /* 左对齐 */
  white-space: normal; /* 允许换行 */
  line-height: 18px; /* 行高 */
  margin: 0; /* 移除多余的外边距 */
}

.text_84 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 20px 0 0 20px;
}

.group_11 {
  width: 342px;
  height: 32px;
  margin: 12px 0 20px 20px;
}

.text-wrapper_41 {
  background-color: rgba(234, 75, 75, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_85 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(234, 75, 75, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_42 {
  background-color: rgba(234, 75, 75, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 186px;
}

.text_86 {
  width: 154px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(234, 75, 75, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.group_12 {
  position: absolute;
  left: 20px;
  top: 186px;
  width: 1134px;
  height: 32px;
}

.text-wrapper_43 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 116px;
}

.text_87 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_44 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 130px;
}

.text_88 {
  width: 98px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_45 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_89 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.box_23 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  width: 214px;
  height: 32px;
  margin-left: 12px;
}

.box_24 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  width: 214px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_46 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 242px;
}

.text_90 {
  width: 210px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.group_13 {
  position: absolute;
  left: 20px;
  top: 358px;
  width: 1094px;
  height: 32px;
}

.text-wrapper_47 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px; /* 圆角 */
  padding: 8px; /* 添加内边距 */
  display: inline-flex; /* 使用 inline-flex 让宽度根据内容自动调整 */
  align-items: center; /* 垂直居中对齐 */
  height: auto; /* 高度根据内容自动调整 */
  width: auto; /* 宽度根据内容自动调整 */
  max-width: 100%; /* 防止超出父容器 */
}

.text_91 {
  width: auto; /* 让宽度根据内容自动调整 */
  height: auto; /* 高度根据内容自动调整 */
  overflow-wrap: break-word; /* 自动换行 */
  word-break: break-word; /* 防止长单词溢出 */
  color: rgba(23, 177, 13, 1); /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-family: OPPOSans-R; /* 字体 */
  font-weight: normal; /* 字体粗细 */
  text-align: left; /* 左对齐 */
  white-space: normal; /* 允许换行 */
  line-height: 18px; /* 行高 */
  margin: 0; /* 移除多余的外边距 */
}

.text-wrapper_48 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 186px;
}

.text_92 {
  width: 154px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_49 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_93 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_50 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_94 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.box_25 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 144px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_51 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_95 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.box_26 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 144px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_52 {
  height: 37px;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/SketchPnge6219e007b728b8e85b31c701e1c57a584415aaccfc9eb67906efbe87a37f511) -36px -27px
    no-repeat;
  background-size: 144px 108px;
  width: 72px;
  position: absolute;
  left: 285px;
  top: -16px;
}

.text_96 {
  width: 56px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 22px;
  margin: 5px 0 0 8px;
}

</style>