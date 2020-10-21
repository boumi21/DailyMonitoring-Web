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

    <!-- <v-simple-table v-if="form.test">
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
              v-model="item.numResponse"
              :items="form.allResponses"
              item-text="libResponse"
              item-value="numResponse"
            ></v-autocomplete></td>
            <td><v-autocomplete
              auto-select-first
              clearable
              v-model="item.numQuestionSuivante"
              :items="form.allQuestions"
              item-text="libQuestion"
              item-value="numQuestion"
              ></v-autocomplete>
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table> -->



<!--  -->

<v-data-table
      v-if="form.test"
      :headers="headers"
      :items="form.responses"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Tableau récapitulatif</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nouvelle réponse
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-autocomplete
              auto-select-first
              clearable
              label="Sélectionnez une réponse"
              :items="form.allResponses"
              item-text="label"
              item-value="numResponse"
              v-model="editedItem.response"
              return-object
            ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-autocomplete
              auto-select-first
              clearable
              label="Sélectionnez une question"
              :items="form.allQuestions"
              item-text="libQuestion"
              item-value="libQuestion"
              v-model="editedItem.question"
              return-object
            ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Sûr de suprimmer la question ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>

<!--  -->




  <v-row>
      <v-spacer></v-spacer>

      <v-form
    ref="form"
    v-model="form.valid"
    lazy-validation
  >
      <v-btn
      :disabled="!form.valid"
      color="primary"
      elevation="2"
      class="mr-5 mt-5"
      @click="onValidate"
    >Enregistrer</v-btn>

      </v-form>
  </v-row>
</v-container>
</template>


<script>
import QuestionService from "@/services/QuestionService.js";
import ResponseService from "@/services/ResponseService.js";

export default {
  data() {
    return {
      form: {
        valid: true,
        question: '',
        responses: [],
        allResponses: [],
        allQuestions: [],
        test: false
      },
      sendForm: [{numResponse: null, numLiaison: null}, {numResponse: null, numLiaison: null}],
      headers: [
      {text: 'Réponse', align: 'start', sortable: false, value:'label'},
      { text: 'Question suivante', sortable: false, value: 'liaison'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      question: {
        liaison: '',
        numQuestionSuivante: null,
      },
      response: {
        label: '',
        numResponse: null,
      },    
    },
    };
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created () {
    this.initialize()
  },
  
  methods: {
    async onValidate() {
      console.log(this.form.responses)
      try {
        // Enregistre les modifications dans la BDD
        let res = await QuestionService.updateQuestion(this.form.responses);
        this.$router.push("/main");
      } catch (error) {}
    },

    initialize () {
      console.log('yoooo les boys')
      this.responses = [
        {
          numQuestion: 1, numResponse: 1
        },
      ]
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem (item) {
        this.editedIndex = this.form.responses.indexOf(item)
        console.log(this.responses.indexOf(item))
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.form.responses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
    save () {
      if (this.editedIndex > -1) {
        let itemToEdit = {numResponse: this.editedItem.response.numResponse, label: this.editedItem.response.label, liaison: this.editedItem.question.libQuestion, numQuestionSuivante: this.editedItem.question.numQuestion}
                console.log(itemToEdit)
        Object.assign(this.form.responses[this.editedIndex], itemToEdit)
        this.close()
      } else {
          let itemToEdit = {numResponse: this.editedItem.response.numResponse, label: this.editedItem.response.label, liaison: this.editedItem.question.libQuestion, numQuestionSuivante: this.editedItem.question.numQuestion}
          console.log(itemToEdit)
          this.form.responses.push(itemToEdit)
          this.close()
      }
      
    },
    deleteItemConfirm () {
      this.form.responses.splice(this.editedIndex, 1)
      this.closeDelete()
    },
  },

  mounted: function() {
    this.$nextTick(async function() {

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
      var object = {numResponse: resultGetAllResponses.data[i].NUM_REPONSE, label: resultGetAllResponses.data[i].REPONSE}
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
  });
  },
};


</script>

<style scoped>
</style>
