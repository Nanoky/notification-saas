import { container } from "../di/container";
import { listenerMiddleware } from "./listener";
import type { Module } from "../shared/core/module";
import { ListenerActionHandler } from "./app/actions-handler";



const TOKENS = {
    ListenerMiddleware: Symbol('ListenerMiddleware'),
    ActionHandler: Symbol('ActionHandler')
}

export const ReduxModule: Module = {
    tokens: TOKENS,
    register: () => {
        container.register(TOKENS.ListenerMiddleware, () => listenerMiddleware);
        container.register(TOKENS.ActionHandler, () => new ListenerActionHandler(container.resolve(TOKENS.ListenerMiddleware)));
    }
}