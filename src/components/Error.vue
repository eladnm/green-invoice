<template>
  <div
    class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4 mt-4 text-right"
    role="alert"
    v-if="errorMsg"
  >
    <p class="font-bold"></p>
    <p>
      {{ message }}
    </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    customMsg: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["errorMsg", "responseMsg"]),
    show() {
      return !!this.message;
    },
    message() {
      if (this.customMsg) return this.customMsg;
      if (this.errorMsg) return this.errorMsg;
      return this.responseMsg;
    },
    errorType() {
      return this.errorMsg ? "error" : "success";
    },
  },
  watch: {
    errorMsg() {
      if (this.errorMsg) {
        setTimeout(() => {
          this.$store.commit("CLEAR_ERROR");
        }, 60000);
      }
    },
    responseMsg() {
      if (this.responseMsg) {
        setTimeout(() => {
          this.$store.commit("CLEAR_RESPONSE");
        }, 3000);
      }
    },
  },
};
</script>
