import { createApp } from "vue"
import { ModuleRegistry } from "ag-grid-community"
import { AllEnterpriseModule } from "ag-grid-enterprise"

import App from "./App.vue"

ModuleRegistry.registerModules([
    AllEnterpriseModule,
])

createApp(App).mount("#app")