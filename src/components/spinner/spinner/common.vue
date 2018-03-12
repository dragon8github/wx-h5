<script>
  export default {
    computed: {
      spinnerColor() {
        return this.color || this.$parent.color || '#ccc';
      },

      spinnerSize() {
        return (this.size || this.$parent.size || 28) / 75 + 'rem';  // 李钊鸿改为 /75 + 'rem'
      },

      spinnerBoderWidth () {
        return (this.borderWidth || this.$parent.borderWidth || 4) / 75 + 'rem'   // 李钊鸿改为 /75 + 'rem'
      }
    },

    props: {
      size: Number,
      color: String,
      borderWidth:Number
    }
  };
</script>
