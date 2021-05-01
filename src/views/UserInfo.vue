<template>
    <div class="w-100 h-100">
        <button class="btn text-3xl pa-5 "><router-link to="/">Home</router-link></button>
            <div class="w-100 h-100 flex justify-center align-center flex-col">
                <div class="shadow-md border w-80">
                    <custom-table :list="user">

                    </custom-table>
                </div>
            </div>
    </div>
</template>
<script>
import CustomTable from "../components/Table.vue"

export default {
  components: { CustomTable },
  computed: {
    user(){
      return this.$store.state.user.user
    },
    fullName(){
      return this.user.firstName + " " + this.user.lastName
    },
    businesses(){
      return this.user.businesses;
    }
  },
}
    </script>