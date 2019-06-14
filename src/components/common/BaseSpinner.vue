<template>
  <div v-if="isVisible" :class="renderClassName">
    <div
      class="santander-spinner_wrapper-loader flex-column align-items-center h-100 d-flex justify-content-center"
    >
      <div class="santander-spinner_loader"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  computed: {
    renderClassName() {
      return `santander-spinner_s`;
    }
  }
};
</script>

<style scope>
@keyframes santander-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.santander-spinner_s {
  width: 100%;
  padding: 37px 0 0;
  flex-shrink: 0;
}
.santander-spinner_wrapper-loader {
  width: 100%;
  text-align: center;
}
.santander-spinner_wrapper-loader .santander-spinner_loader {
  margin: 0 auto;
}
.santander-spinner_loader {
  -webkit-animation: santander-spin 2s linear infinite;
  animation: santander-spin 2s linear infinite;
  border: 16px solid #e7e7e7;
  border-top-color: #7f7f7f;
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
</style>
