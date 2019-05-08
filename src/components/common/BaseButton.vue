<template>
  <div>
    <button
      v-on="$listeners"
      v-bind="$attrs"
      class="santander-button"
      :class="getCssClass"
      :style="buttonStyle"
    >
      <slot/>
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonStyle:{
      type: String,
    },
    className:{
      type:String,
    },
    variant:{
      type: String,
      default: 'base'
    }
  },
  computed:{
    getCssClass(){

      let demo = `santander-button_${this.variant}`
      return {[demo]:true, [this.className]: this.className}
    }
  }
};
</script>

<style scoped>
.santander-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  color:#ffffff;
  background: #708FFF;
  padding: 0 25px;
  float:right;
  border: none;
  border-radius: 2px;
  text-align: center;
  font-weight: 600;
  font-size: 0.75rem;
  font-family: OpenSans-SemiBold, sans-serif;
  line-height: 1.5;
  white-space: nowrap;
  transition: all 0.2s linear;
}
.santander-button:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.santander-button:active {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.santander-button:focus {
  outline: 0;
}
.santander-button:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.santander-button + .santander-button {
  margin-left: 1em;
}
.santander-button_primary {
  background: #576c81;
}
.santander-button_outline {
    background: none;
    color: #777777;
    border: 1px solid #BFBFBF;
}
.santander-button.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}
.santander-button.-fill-gray {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
.santander-button.-size-small {
  height: 32px;
}
.santander-button.-icon-right {
  text-align: left;
  padding: 0 20px;
}
.santander-button.-icon-right > .icon {
  margin-left: 10px;
}
.santander-button.-icon-left {
  text-align: right;
  padding: 0 20px;
}
.santander-button.-icon-left > .icon {
  margin-right: 10px;
}
.santander-button.-icon-center {
  padding: 0 20px;
}
@media (max-width: 650px){
  .santander-button {
    height: 34px;
  }
}
</style>
