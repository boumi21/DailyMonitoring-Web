<template>
  <v-row

      justify="space-between"
    >
      <v-col
        cols="12"
        md="4"
      >
        <v-form ref="form">
          <v-text-field
            v-model="form.question"
            
            label="First name"
          ></v-text-field>
        </v-form>
      </v-col>

      
    </v-row>
</template>


<script>
import QuestionService from "@/services/QuestionService.js";

export default {
  data() {
    return {
      form: {
        question: ''
      },
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();


    }
  },

  async mounted() {
    //let resultQuestion;

    // Récupère le type de la soirée (pro ou non)
    let result = await QuestionService.getQR({
      questionId: this.$route.params.id
    });
    let question = result.data[0].question;
    // Décode l'image de la bdd
    this.form.question = question;
  }
};


</script>

<style scoped>
</style>
