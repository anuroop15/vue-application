<template>
  <div v-if="isVisible" :class="renderClassName">
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
    <div/>
  </div>
</template>
<script>
export default {
    props:{
        isVisible: {
            type: Boolean,
            default: true,
        },
        size:{
            type: String,
            default: "medium",
        }
    },
    computed:{
        renderClassName(){
          return `banking-spinner banking-spinner--${this.size}`
        }
    }
}
</script>

<style scope>
.banking-spinner,
.banking-spinner > div {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2000;
  transform: translate(-50%, -50%) rotate(90deg);
}

.banking-spinner {
  display: block;
  font-size: 0;
  color: #ddd;
}

.banking-spinner > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4px;
  margin-left: -4px;
  border-radius: 100px;
  animation: ball-spin-clockwise 1s infinite ease-in-out;
}

.banking-spinner--xx-small {
  width: 1rem;
  height: 1rem;
}

.banking-spinner--xx-small > div {
  width: 0.125rem;
  height: 0.125rem;
}

.banking-spinner--x-small {
  width: 1.25rem;
  height: 1.25rem;
}

.banking-spinner--x-small > div {
  width: 0.25rem;
  height: 0.25rem;
}

.banking-spinner--small {
  width: 1.625rem;
  height: 1.625rem;
}

.banking-spinner--small > div {
  width: 0.375rem;
  height: 0.375rem;
}

.banking-spinner--medium {
  width: 2rem;
  height: 2rem;
}

.banking-spinner--medium > div {
  width: 0.4375rem;
  height: 0.4375rem;
}

.banking-spinner--large {
  width: 3rem;
  height: 3rem;
}

.banking-spinner--large > div {
  width: 0.5625rem;
  height: 0.5625rem;
}

.banking-spinner--brand > div {
  color: #01b6f5 !important;
}

.banking-spinner--inverse > div {
  color: #fff !important;
}

.banking-spinner--neutral > div {
  color: #a4a7b5 !important;
}

.banking-spinner > div:nth-child(1) {
  top: 5%;
  left: 50%;
  animation-delay: -0.875s;
  color: #fe4849;
}

.banking-spinner > div:nth-child(2) {
  top: 18.1801948466%;
  left: 81.8198051534%;
  animation-delay: -0.75s;
  color: #ff6837;
}

.banking-spinner > div:nth-child(3) {
  top: 50%;
  left: 95%;
  animation-delay: -0.625s;
  color: #f8d832;
}

.banking-spinner > div:nth-child(4) {
  top: 81.8198051534%;
  left: 81.8198051534%;
  animation-delay: -0.5s;
  color: #c7e46a;
}

.banking-spinner > div:nth-child(5) {
  top: 94.9999999966%;
  left: 50.0000000005%;
  animation-delay: -0.375s;
  color: #1de9b6;
}

.banking-spinner > div:nth-child(6) {
  top: 81.8198046966%;
  left: 18.1801949248%;
  animation-delay: -0.25s;
  color: #1ad1a3;
}

.banking-spinner > div:nth-child(7) {
  top: 49.9999750815%;
  left: 5.0000051215%;
  animation-delay: -0.125s;
  color: #01b6f5;
}

.banking-spinner > div:nth-child(8) {
  top: 18.179464974%;
  left: 18.1803700518%;
  animation-delay: 0s;
  color: #5c56b6;
}

@-webkit-keyframes ball-spin-clockwise {
  0%,
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}

@-moz-keyframes ball-spin-clockwise {
  0%,
  100% {
    opacity: 1;
    -moz-transform: scale(1);
    transform: scale(1);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    -moz-transform: scale(0);
    transform: scale(0);
  }
}

@-o-keyframes ball-spin-clockwise {
  0%,
  100% {
    opacity: 1;
    -o-transform: scale(1);
    transform: scale(1);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    -o-transform: scale(0);
    transform: scale(0);
  }
}

@keyframes ball-spin-clockwise {
  0%,
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
}
</style>
