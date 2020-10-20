<template>
<v-container>
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
            
            label="Question"
          ></v-text-field>
        </v-form>
      </v-col>     
    </v-row>

    <v-simple-table v-if="form.test">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Réponse
          </th>
          <th class="text-left">
            Liaison
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in form.responses"
          :key="item.label"
        >
            <td><v-autocomplete
              auto-select-first
              clearable
              v-bind:value="form.allResponses[item.numResponse-1].numResponse"
              :items="form.allResponses"
              item-text="libResponse"
              item-value="numResponse"
            ></v-autocomplete></td>
            <td><v-autocomplete
              auto-select-first
              clearable
              v-bind:value="form.allQuestions[item.numQuestionSuivante-1].numQuestion"
              :items="form.allQuestions"
              item-text="libQuestion"
              item-value="numQuestion"
              ></v-autocomplete>
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</template>


<script>
import QuestionService from "@/services/QuestionService.js";
import ResponseService from "@/services/ResponseService.js";

export default {
  data() {
    return {
      form: {
        question: '',
        responses: [],
        allResponses: [],
        allQuestions: [],
        test: false
      },
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();


    }
  },

  async mounted() {

    // Récupère la question et les différentes réponses
    let result = await QuestionService.getQRNQ({
      questionId: this.$route.params.id
    });
    let question = result.data[0].question;
    var responsesArray = []
    for(let i=0; i<result.data.length; i++){
      var object = {numResponse:  result.data[i].num_reponse, label: result.data[i].reponse, liaison: result.data[i].question_suivante, numQuestionSuivante: result.data[i].num_question_suivante}
      responsesArray.push(object)
    }
    this.form.responses = responsesArray
    this.form.question = question

      //Récupère toutes les réponses
  let resultGetAllResponses = await ResponseService.getAllResponses({
  })
  var allResponsesArray = []
    for(let i=0; i<resultGetAllResponses.data.length; i++){
      var object = {numResponse: resultGetAllResponses.data[i].NUM_REPONSE, libResponse: resultGetAllResponses.data[i].REPONSE}
      allResponsesArray.push(object)
    }
    this.form.allResponses = allResponsesArray


    //Récupère toutes les questions
  let resultGetAllQuestions = await QuestionService.getAllQuestions({
  })
  var allQuestionsArray = []
  console.log(resultGetAllQuestions.data)
    for(let i=0; i<resultGetAllQuestions.data.length; i++){
      var object = {numQuestion: resultGetAllQuestions.data[i].NUM_QUESTION, libQuestion: resultGetAllQuestions.data[i].QUESTION}
      allQuestionsArray.push(object)
    }
    this.form.allQuestions = allQuestionsArray


    this.form.test = true
  }
};


</script>

<style scoped>
</style>
