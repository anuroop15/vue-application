<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <select class="form-control" :value="value" @change="updateValue" v-bind="$attrs" v-on="$listeners">
      <option
        v-for="option in options"
        :value="option.id"
        :key="option.id"
        :selected="option === value"
      >{{ option.text }}</option>
    </select>
  </div>
</template>
<script>
import { formFieldMixin } from '../../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
