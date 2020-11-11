<template>
  <v-container>
    <v-snackbar v-model="alertFirstQuestion" color="red darken-2">
      Il est interdit de supprimer la question de départ
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :items="questions"
      sort-by="calories"
      class="elevation-1"
      :footer-props="{
        'items-per-page-text': 'Lignes par page:'
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Vos Questions</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvelle question
              </v-btn>
            </template> -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.question"
                        label="La question"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Supprimer la question ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <a class="icon-link" :href="`/edit/${item.numQuestion}`"
          ><v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon></a
        >
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
      <v-card class="mt-3" header="Form Data resultQuestions">
        {{ this.questions }}
      </v-card>
    </v-data-table>

    <v-row>
      <v-col>
        <div>
          <v-dialog v-model="dialogAddResponse" width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Ajouter une réponse
                <v-icon right dark>
                  mdi-plus-circle-outline
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                Ajouter une réponse
              </v-card-title>

              <v-form ref="formResponse">
                <v-row no-gutters>
                  <v-col cols="5">
                    <v-list disabled>
                      <v-subheader>Réponses enregistrées</v-subheader>
                      <v-list-item v-for="(item, i) in responses" :key="i">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.response"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col :cols="5">
                    <v-text-field
                      v-model="formResponse.textResponse"
                      label="Nouvelle réponse"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col :cols="2">
                    <v-btn
                      color="success"
                      class="mr-4 mt-3 ml-2"
                      @click="validateResponse"
                    >
                      Créer
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialogAddResponse = false">
                  Fermer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
      <!-- --------------------------------------------------------------------- -->
      <v-col>
        <div>
          <v-dialog v-model="dialogAddQuestion" width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Ajouter une Question
                <v-icon right dark>
                  mdi-plus-circle-outline
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                Ajouter une question
              </v-card-title>

              <v-form ref="formQuestion">
                <v-row no-gutters>
                  <v-col cols="5">
                    <v-list disabled>
                      <v-subheader>Questions enregistrées</v-subheader>
                      <v-list-item v-for="(item, i) in questions" :key="i">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.question"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col :cols="5">
                    <v-text-field
                      v-model="formQuestion.textQuestion"
                      label="Nouvelle question"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col :cols="2">
                    <v-btn
                      color="success"
                      class="mr-4 mt-3 ml-2"
                      @click="validateQuestion"
                    >
                      Créer
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialogAddQuestion = false">
                  Fermer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestionService from "@/services/QuestionService.js";
import ResponseService from "@/services/ResponseService.js";

export default {
  mounted: function() {
    this.$nextTick(async function() {
      // Récupère toutes les questions
      let resultQuestions = await QuestionService.getAllQuestions({});

      var questionsArray = [];
      for (let i = 0; i < resultQuestions.data.length; i++) {
        var object = {
          question: resultQuestions.data[i].QUESTION,
          numQuestion: resultQuestions.data[i].NUM_QUESTION
        };

        questionsArray.push(object);
      }
      this.questions = questionsArray;

      /******************************** */
      // Récupère toutes les réponses
      let resultResponses = await ResponseService.getAllResponses({});

      var responsesArray = [];
      for (let i = 0; i < resultResponses.data.length; i++) {
        var object = {
          response: resultResponses.data[i].REPONSE,
          numResponse: resultResponses.data[i].NUM_REPONSE
        };

        responsesArray.push(object);
      }
      this.responses = responsesArray;
    });
  },

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogAddResponse: false,
      dialogAddQuestion: false,
      selectedItem: 1,
      alertFirstQuestion: false,
      headers: [
        {
          text: "Questions",
          align: "start",
          sortable: false,
          value: "question"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      questions: [],
      responses: [],
      editedIndex: -1,
      editedItem: {
        question: "",
        numQuestion: null
      },
      defaultItem: {
        question: "",
        numQuestion: null
      },
      formResponse: {
        textResponse: ""
      },
      formQuestion: {
        textQuestion: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.questions = [
        // {
        //   question: "Frozen Yogurt"
        // },
        // {
        //   question: "Ice cream sandwich"
        // }
      ];
    },

    editItem(item) {},

    deleteItem(item) {
      this.editedIndex = this.questions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        // Suprimme la question de la bdd
        let res = await QuestionService.deleteQuestion({
          questionId: this.editedItem.numQuestion
        });
        if (res.data.hasOwnProperty("error")) {
          this.alertFirstQuestion = true;
          this.closeDelete();
          return;
        }
      } catch (error) {}
      this.questions.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.questions[this.editedIndex], this.editedItem);
      } else {
        this.questions.push(this.editedItem);
      }
      this.close();
    },

    async validateResponse() {
      try {
        // Ajoute la réponse à la bdd
        let res = await ResponseService.setResponse(this.formResponse);
        if (res.data.hasOwnProperty("error")) {
          alert(res.data.error);
          return;
        }
        this.responses.push({
          response: this.formResponse.textResponse,
          numResponse: res.data.insertId
        });
        this.close();
      } catch (error) {}
    },

    async validateQuestion() {
      try {
        // Ajoute la question à la bdd
        let res = await QuestionService.setQuestion(this.formQuestion);
        if (res.data.hasOwnProperty("error")) {
          alert(res.data.error);
          return;
        }
        this.questions.push({
          question: this.formQuestion.textQuestion,
          numQuestion: res.data.insertId
        });
        this.close();
      } catch (error) {}
    }
  }
};
</script>

<style scoped>
.icon-link {
  text-decoration: none;
}
</style>
