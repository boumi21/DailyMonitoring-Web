<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;Page d'edit.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>


<script>

export default {
  data() {
    return {

    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();


    }
  },

  async mounted() {

  }
};


</script>

<style scoped>
</style>
