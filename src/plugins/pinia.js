import {createPinia} from "pinia";
import {markRaw} from "vue";
import router from "@/router/router";
import {Router} from "vue-router";

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router
    }
}

export const install = (app: any) => {
    const pinia = createPinia()
    pinia.use(({ store }) => {
        store.router = markRaw(router)
    });
    app.use(pinia)
}
