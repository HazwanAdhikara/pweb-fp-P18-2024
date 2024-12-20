import { createApp } from "vue";
import App from "./app.vue";
import { createPinia } from "pinia"; // Import Pinia

const app = createApp(App);

// Create and use Pinia instance before mounting
const pinia = createPinia();
app.use(pinia);

// Mount the app
app.mount("#app");
