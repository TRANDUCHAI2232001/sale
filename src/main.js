import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from '@/mixin'
import { BootstrapVue3, BModal } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import '@/assets/main.css'
import { Cleave } from 'vue-cleave-component'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)

const app = createApp(App)
app.component("v-select", vSelect);
app.use(Cleave)
app.use(router)
app.use(Toast);
app.use(BootstrapVue3)
app.use(BModal)
app.mixin(mixin)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
