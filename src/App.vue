<template>
  <div dir="rtl" id="app">
    <component :is="current">
      <slot />
    </component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Auth from "./layouts/Auth.vue";
import Dashboard from "./layouts/Dashboard.vue";

export default {
  name: "App",

  components: {
    Auth,
    Dashboard,
  },
  data: () => ({}),

  computed: {
    ...mapGetters(["current", "logoutLoadState", "getAuthState"]),
  },
  created() {
    if (!this.$store.state.auth.isSessionInit) {
      this.$store.dispatch("setupSession");
    }
  },
};
</script>
