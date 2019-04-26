<template>
<transition name="modal">
    <div class="modal-mask" >
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </template>

<script src="./Modal.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Modal.css"></style>
