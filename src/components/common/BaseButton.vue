<template>
  <div>
    <button
      v-on="$listeners"
      v-bind="$attrs"
      class="banking-button"
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

      let demo = `banking-button_${this.variant}`
      return {[demo]:true, [this.className]: this.className}
    }
  }
};
</script>

<style scoped>
.banking-button {
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
.banking-button:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.banking-button:active {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.banking-button:focus {
  outline: 0;
}
.banking-button:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.banking-button + .banking-button {
  margin-left: 1em;
}
.banking-button_primary {
  background: #576c81;
}
.banking-button_outline {
    background: none;
    color: #777777;
    border: 1px solid #BFBFBF;
}
.banking-button.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}
.banking-button.-fill-gray {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
.banking-button.-size-small {
  height: 32px;
}
.banking-button.-icon-right {
  text-align: left;
  padding: 0 20px;
}
.banking-button.-icon-right > .icon {
  margin-left: 10px;
}
.banking-button.-icon-left {
  text-align: right;
  padding: 0 20px;
}
.banking-button.-icon-left > .icon {
  margin-right: 10px;
}
.banking-button.-icon-center {
  padding: 0 20px;
}
@media (max-width: 650px){
  .banking-button {
    height: 34px;
  }
}
</style>
