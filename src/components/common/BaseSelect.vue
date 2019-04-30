<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <select class="form-control" :value="value || defaultValue" @change="updateValue" v-bind="$attrs" v-on="$listeners">
      <option
        v-for="option in options"
        :value="option[identifier]"
        :key=" option[keyI] || option[identifier]"
        :selected="option[identifier] === value"
      >{{ option[text] }}</option>
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
    },
    defaultValue:{
      type: String,
    },
    identifier:{
      type: String,
    },
    text:{
      type: String,
    },
    keyI:{
      type: String,
    }
  }
}
</script>
