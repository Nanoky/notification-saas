
import { ReduxModule } from "./redux/redux.module";
import type { Module } from "./shared/core/module";



export const AppModule: Module = {
    register: () => {
        if (ReduxModule.register) ReduxModule.register();
    },
    initialize: () => {
        if (ReduxModule.initialize) ReduxModule.initialize();
    }
};