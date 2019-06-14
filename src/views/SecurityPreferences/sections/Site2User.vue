<template>
  <section class="santander-security-pre_section">
    <div class="santander-security-pre_section-name">
      <h3>{{$t('site2userAuthentication')}}</h3>
    </div>
    <div v-if="siteToUserInfo" class="santander-security-pre_section-content p-3">
      <div class="row mb-2 santander-security-pre_image-phrase">
        <div class="col-sm-4 pr-5">
          <p>{{$t('imageLabel')}}</p>
          <div class="row">
            <div class="col-12 mb-3 text-sm-center">
              <img
                class="img-thumbnail float-md-right"
                v-if="siteToUserInfo.imagesURL"
                :src="siteToUserInfo.imagesURL"
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <p>{{$t('captionLabel')}}</p>
            </div>
            <div class="col-sm-6">
              <BaseInput required v-model="siteToUserInfo.phrase"/>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <p>{{$t('imageTitle')}}</p>
          <div class="row">
            <template v-for="image in imagesInfo">
              <div class="col-6 col-sm-3 mb-3 text-sm-center" :key="image.fakeName">
                <img
                  :class="{'img-thumbnail':true, selectedImages:selectedImages ===image.fakeName}"
                  @click="selectImages(image.fakeName)"
                  :src="image.imagesURL"
                  :title="image.altText"
                  :alt="image.altText"
                >
              </div>
            </template>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <BaseButton variant="primary" @click="fetchMoreImages">{{$t('moreImages')}}</BaseButton>
            <BaseButton variant="primary" @click="siteUpdate">{{$t('save')}}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapActions} from "vuex";
import { en, es, pt } from "../i18n";
export default {
  name: "Site2User",
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  data() {
    return {
      siteToUserInfo: null,
      selectedImages: null,
      imagesInfo: []
    };
  },
  methods: {
    selectImages(fakeName){
      this.selectedImages = fakeName;
    },
    siteUpdate(){
      this.updateSiteAuthentication({
        caption: this.siteToUserInfo.phrase,
        imageSelected: this.selectedImages
      });
      this.selectedImages = null;
    },
    fetchSiteToUserInfo() {
      let { siteToUserInfo } = this.$store.getters[
        "securityPreference/getStateProp"
      ]("securityInfo");
      let imagesURL = null;
      siteToUserInfo.image && siteToUserInfo.image.fakeName
        ? (imagesURL = this.getImagesUrl(siteToUserInfo.image.fakeName))
        : null;
      this.siteToUserInfo = {
        imagesURL,
        ...siteToUserInfo
      };
    },
    fetchImagesInfo() {
      let imagesInfo = this.$store.getters["securityPreference/getStateProp"](
        "imagesInfo"
      );
      let tempImages = [];
      imagesInfo.forEach(images => {
        tempImages.push({
          imagesURL: this.getImagesUrl(images.fakeName),
          ...images
        });
      });
      this.imagesInfo = tempImages;
    },
    getImagesUrl(fakeName) {
      return `${
        process.env.VUE_APP_API_URL
      }en/security/GetImage?imageName=${fakeName}`;
    },
       ...mapActions("securityPreference", [
           "updateSiteAuthentication",
           "fetchMoreImages"
       ])
  },
  watch: {
    "$store.state.securityPreference.imagesInfo": "fetchImagesInfo",
    "$store.state.securityPreference.securityInfo.siteToUserInfo":"fetchSiteToUserInfo"
  }
};
</script>