<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container grid-list-lg>
            <v-layout align-start justify-center row wrap>
              <v-flex xs12 lg6>
                <v-card flat>
                  <h4 class="display-1">All Questions</h4>
                </v-card>
              </v-flex>
              <v-flex xs12 lg6>
                <v-layout align-center justify-end row>
                  <v-card flat>
                    <v-btn color="blue white--text mt-2">Add Question</v-btn>
                  </v-card>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 lg12>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs12 v-for="i in 10" :key="i">
              
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods : {
    
  },
  mounted () {
    console.log('sebetulnya masuke ke home')
  }
}

</script>
