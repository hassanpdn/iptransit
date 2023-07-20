import { getCurrentInstance } from 'vue'

export default function useEmitter() {
    const internalInstance = getCurrentInstance();
    const emitter = internalInstance.appContext.config.globalProperties.emitter;

    return emitter;
}

// import { ref } from "vue";
// const bus = ref(new Map());

// export default function useEventsBus(){

//     function emit(event, ...args) {
//         bus.value.set(event, args);
//     }

//     return {
//         emit,
//         bus
//     }
// }
