<template>
<v-container>
  <!-- <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
    </v-col>
  </v-row> -->
  <v-row justify="center" align="center" class="mb-10">
      <p class="text-h2">Espace Médecin</p>
  </v-row>
  <v-row>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      src="/images/question-mark-new.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Créez un nouvel arbre de questions
    </v-card-title>

    <!-- <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle> -->

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Création +
      </v-btn>

      <v-spacer></v-spacer>

    </v-card-actions>

      <v-divider></v-divider>

        <v-card-text>
          Créez un nouveau formulaire composé de questions / réponses complet pour un nouveau patient ou une nouvelle pathologie.
        </v-card-text>
  </v-card>
<!---------------------------------------------------------->
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      src="/images/question-mark-manage.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Gérez vos arbres de questions
    </v-card-title>

    <!-- <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle> -->

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Gérer +
      </v-btn>
    </v-card-actions>

        <v-divider></v-divider>

        <v-card-text>
          Gérez vos formulaires déjà créés. Vous pouvez les vérifier, les modifier ou les supprimer.
        </v-card-text>
  </v-card>
  </v-row>

</v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
