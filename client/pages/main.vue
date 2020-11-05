<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="questions"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Vos Questions</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvelle question
              </v-btn>
            </template>
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
                >Sûr de suprimmer la question ?</v-card-title
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

    <div>
      <v-dialog v-model="dialogAddResponse" width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Ajouter une réponse
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Ajouter une réponse
          </v-card-title>

          <v-form ref="form">
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
                <v-btn color="success" class="mr-4" @click="validateResponse">
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
      selectedItem: 1,
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
        {
          question: "Frozen Yogurt"
        },
        {
          question: "Ice cream sandwich"
        }
      ];
    },

    editItem(item) {},

    deleteItem(item) {
      this.editedIndex = this.questions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
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
        let res = await ResponseService.addResponse(this.formResponse);

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
