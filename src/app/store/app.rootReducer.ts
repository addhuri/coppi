import { Action, ActionReducer, ActionReducerMap, createSelector, INIT, UPDATE } from "@ngrx/store";
import { environment } from "src/environments/environment";
import * as appReducer from './app.reducer';

export interface RootState {
    app: appReducer.State
}
const getAppState = (state: RootState) => { return state.app };

export const rootReducers: ActionReducerMap<RootState, Action> = {
    app: appReducer.appReducer
}
export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
        if (!environment.production) {
            console.log("action", action);
        }
        if (action.type === INIT || action.type == UPDATE) {
            const storageValue = localStorage.getItem("state");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("state");
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem("state", JSON.stringify(nextState));
        return nextState;
    };
};

export const get_workspaces = createSelector(getAppState, appReducer.appSelectors.get_workspaces);