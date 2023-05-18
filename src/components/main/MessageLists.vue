<template>
  <div id="app">
      <slot>
        <v-alert
            v-model="alert"
            dismissible
            color="cyan"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-twitter"
        >
          No News!
        </v-alert>
      </slot>
      <v-row>
        <v-col v-for="card in cards" :key="card" cols="12">
          <v-card>
            <v-subheader>{{ card }}</v-subheader>
            <v-list two-line>
              <template v-for="n in 6">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-list-item :key="n" :class="`elevation-${hover ? 6 : 0}`"
                                 class="mx-auto pa-6 transition-swing">
                      <v-list-item-avatar color="grey darken-1">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Message {{ n }}</v-list-item-title>
                        <v-list-item-subtitle>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio
                          similique
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-hover>
                <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "MessageLists",
  data: () => ({
    cards: ['Today', 'Yesterday'],
  })
}
</script>

<style scoped>


</style>
