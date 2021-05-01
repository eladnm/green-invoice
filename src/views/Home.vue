<template>
  <div class="flex justify-center text-center">
    <div class="card shadow-md">
      <header>
        <a href="">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/Official.png" alt="Earth News">
        </a>
      </header>
      <nav>
        <router-link to="/">בית</router-link>
        <router-link to="/user" class="mr-4">פרופיל אישי</router-link>

        <button class="btn" @click="logout">יציאה</button>
      </nav>
      <main>
        <h1>שלום, {{user ? user.firstName : ""}}</h1>
        <p>ברוכה הבאה {{businessName}}</p>
      </main>
</div>
  </div>
</template>

<script>
//import { userService } from "../services";

export default {
  data() {
    return {};
  },
  computed: {
    user(){
      return this.$store.state.user.user
    },
    fullName(){
      if (!this.user) return "";
      return this.user.firstName + " " + this.user.lastName
    },
    businessName(){
      if (!this.user) return "";
      return this.user.businesses && this.user.businesses[0] ? this.user.businesses[0].name : "";
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout').then(() => {
        this.$router.push("/login");
      })
    }
  }
};
</script>
<style lang="scss">
:root {
  --var-padding: 1em;
  --highlight: hsl(230, 38%, 46%);
  --highlight-dark: hsl(230, 38%, 36%);
  --logo-width: 6em;
  --logo-offset: 1em;
  --main-column-width: 25em;
}
.card {
  position: relative;
  padding-left: .5em;
  min-width: 60em;
  background: hsl(220, 35%, 76%) 100% linear-gradient(hsl(252, 2%, 42%) 0%, hsl(0, 5%, 30%) 50%, hsl(220, 35%, 76%) 50%, hsl(220, 35%, 76%) 100%);
  background-size: auto 10em ;
  background-repeat: repeat-x;
  background-position: center top;
}

header {
  position: relative;
  height: 8em;
  grid-row: 1 / 3;
  grid-column: 2;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg");
  background-size: cover;
  background-position: right center;

  a {
    position: absolute;
    top: var(--logo-offset);
    left: var(--logo-offset);
    display: block;
    width: var(--logo-width);
  }
  
  img {
    display: block;
    max-width: 100%;
  }
}

nav {
  display: flex;
  padding: 1.5em var(--var-padding);
  grid-row: 1;
  grid-column: 1;
  background: #fff;
  
  a {
    display: block;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #333;
  }
  
  a + a {
    margin-left: 2em;
  }
  
  a:hover,
  a:focus {
    border-color: var(--highlight);
    border-width: 2px;
  }
  
  a[aria-current] {
    border-bottom: 2px solid var(--highlight);
  }
}

main {
  padding: var(--var-padding);
  grid-row: 2;
  grid-column: 1;
  background: #fff;
  
  h1 {
    margin-top: 0;
    font-weight: normal;

    span {
      display: block;
      color: var(--highlight);
      font-weight: bolder;
    }
    
    sub {
      font-size: .5em;
    }
  }
  
  a {
    color: var(--highlight);
    text-decoration: none;
    
    &::after {
      margin-left: 1.5em;
      content: '→';
      vertical-align: baseline;
    }
    
    &:hover,
    &:focus {
      color: var(--highlight-dark);
    }
    
    &:hover::after,
    &:focus::after {
      margin-left: 2em;
    }
  }
}
</style>