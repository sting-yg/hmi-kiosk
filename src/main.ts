import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from './router'
// Pinia
import { createPinia } from 'pinia'
// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount('#app')


