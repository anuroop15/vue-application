<template>
  <div class="input-group">
  <div class="input-group-prepend" v-if="label">
    <span class="input-group-text" id="inputGroup-sizing-default">{{ label }}</span>
  </div>
    <input class="form-control" :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners">
  </div>
</template>

<script>
import { formFieldMixin } from '../../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>
