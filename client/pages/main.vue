<template>
  <v-data-table
      :headers="headers"
      :items="questions"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Vos Questions</v-toolbar-title>
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
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.question"
                        label="La question"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col> -->
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
        <a class="icon-link" :href="`/edit/${item.numquestion}`"><v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon></a>
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
      <v-card class="mt-3" header="Form Data Result">
        {{ this.questions }}
      </v-card>
    </v-data-table>

     
</template>


<script>
import QuestionService from "@/services/QuestionService.js";

export default {

    mounted: function() {
    this.$nextTick(async function() {
      // Récupère toutes les soirées
      let result = await QuestionService.getAllQuestions({
      });
      
      var questionsArray = []
      for(let i=0; i<result.data.length; i++){
          var object = {question: result.data[i].QUESTION, numquestion: result.data[i].NUM_QUESTION}
          console.log(result.data[0])
          //object = result.data[i].QUESTION
          questionsArray.push(object)
      }
      console.log(questionsArray)
      // Décode l'image de la bdd
      this.questions = questionsArray;
    });
  },

  data() {
    return {
      dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Questions',
        align: 'start',
        sortable: false,
        value: 'question',
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    questions: [],
    editedIndex: -1,
    editedItem: {
      question: '',
      numquestion: null,
    },
    defaultItem: {
      question: '',
      numquestion: null,
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
    initialize () {
      this.questions = [
        {
          question: 'Frozen Yogurt',
        },
        {
          question: 'Ice cream sandwich',
        },
      ]
    },

    editItem (item) {
        this.$router.push("./book/${item.id_party}");
    //   this.editedIndex = this.questions.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.questions.splice(this.editedIndex, 1)
      this.closeDelete()
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

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.questions[this.editedIndex], this.editedItem)
      } else {
        this.questions.push(this.editedItem)
      }
      this.close()
    },
  },
};
</script>


<style scoped>
    .icon-link{
        text-decoration: none;
    }
</style>
