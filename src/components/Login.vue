<template>
  <div class="flex h-screen sm:d-block sm:container">
    <div class="pa-5 relative form_wrapper sm:w-100 sm:h-100">
      <img src="../assets/img/green_logo.svg" width="180" />

      <div class="form">
        <div class="login-form">
          <error custom-msg="שגיאה בכתובת המייל או בסיסמא"></error>

          <h2
            class="font-bold text-3xl text-right text-color-primary"
            style="font-family:almoni-tzar-bold;"
          >
            היי טוב לראות אותך
          </h2>
          <form @submit.prevent="handleSubmit">
            <div class="text-right">
              <input
                type="email"
                name="email"
                placeholder="מייל"
                required
                v-model="email"
              />
              <label for="email">כתובת המייל איתה נרשמת לחשבונית ירוקה</label>
            </div>

            <div class="forgot-part text-right">
              <input
                type="password"
                name="password"
                placeholder="סיסמה"
                aria-label="סיסמה"
                required
                minlength="5"
                v-model="password"
              />
              <a href="#" class="forgot-password">שכחת סיסמה?</a>
            </div>
            <div class="social mt-16">
              <submit-buton
                :loading="loading"
                class="btn btn-green"
                type="submit"
              >
                כניסה
              </submit-buton>
              <button
                class="btn btn-blue btn-rounded bg-transparent shadow-md font-bold text-2xl py-4 mr-4"
              >
                כניסה עם גוגל
                <i>
                  <svg
                    version="1.1"
                    style="height: 15px;"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    enable-background="new 0 0 18 18"
                    xml:space="preserve"
                  >
                    <title>Google_G</title>
                    <desc>Created with Sketch.</desc>
                    <g id="Google_G">
                      <g id="Group" transform="translate(0.000000, -0.000000)">
                        <path
                          id="Shape"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          fill="#4285F4"
                          d="M17.64,9.205c0-0.638-0.057-1.252-0.164-1.841H9
                                            v3.481h4.844c-0.209,1.125-0.843,2.078-1.796,2.716v2.258h2.909C16.658,14.253,17.64,11.945,17.64,9.205L17.64,9.205z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          fill="#34A853"
                          d="M9,18c2.43,0,4.467-0.806,5.956-2.18l-2.909-2.258
                                            C11.242,14.101,10.211,14.42,9,14.42c-2.344,0-4.328-1.583-5.036-3.71H0.957v2.332C2.438,15.983,5.482,18,9,18L9,18z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          fill="#FBBC05"
                          d="M3.964,10.71C3.784,10.17,3.682,9.593,3.682,9
                                            s0.102-1.17,0.282-1.71V4.958H0.957C0.348,6.173,0,7.548,0,9s0.348,2.827,0.957,4.042L3.964,10.71L3.964,10.71z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          fill="#EA4335"
                          d="M9,3.58c1.321,0,2.508,0.454,3.44,1.346l2.581-2.581
                                            C13.463,0.892,11.426,0,9,0C5.482,0,2.438,2.017,0.957,4.958L3.964,7.29C4.672,5.163,6.656,3.58,9,3.58L9,3.58z"
                        />
                      </g>
                    </g>
                  </svg>
                </i>
              </button>
            </div>
          </form>
        </div>

        <a href="#" class="text-right sm:mr-2"
          >עוד לא הצטרפת? ל-30 יום נסיון חינם</a
        >
      </div>
    </div>
    <div class="bg-image"></div>
  </div>
</template>

<script>
import Error from "./Error.vue";
import SubmitButon from "./SubmitButon.vue";

export default {
  components: { Error, SubmitButon },
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: "",
    };
  },
  created() {
    // reset login status
    //userService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { email, password } = this;

      // stop here if form is invalid
      if (!(email && password)) {
        return;
      }

      this.loading = true;
      this.$store
        .dispatch("loginUser", { email, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.error = error.errorMessage;
          this.loading = false;
        });
    },
  },
};
</script>
