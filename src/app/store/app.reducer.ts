import { Action, createReducer, on } from '@ngrx/store';
import { CreatePage, CreateWorkspace, DeletePage, DeleteWorkspace } from './app.actions';

export interface State {
    workspaces: { [s: string]: any };
}

const initialState: State = {
    workspaces: {}
};

const _appReducer = createReducer(
    initialState,
    on(CreateWorkspace, (state: State, action: any) => ({ ...state, workspaces: updatedWorkspaces(state.workspaces, action.workspace) })),
    on(CreatePage, (state: State, action: any) => ({ ...state, workspaces: updatedPages(state.workspaces, action) })),
    on(DeleteWorkspace, (state: State, action: any) => ({ ...state, workspaces: { ...state.workspaces, [action.id]: undefined } })),
    on(DeletePage, (state: State, action: any) => ({ ...state, workspaces: onDeletePage(state.workspaces, action) })),
);

export function appReducer(state: State | undefined, action: Action) {
    return _appReducer(state, action);
}

export const appSelectors = {
    get_workspaces: (state: State) => state.workspaces
}


function updatedWorkspaces(workspaces: any, workspace: any) {
    return { ...workspaces, [workspace.id]: workspace };
}
function updatedPages(ws: any, action: any) {
    const workspaces = { ...ws };
    const pages = { ...workspaces[action.workspaceId].pages };
    pages[action.page.id] = action.page;
    return { ...workspaces, [action.workspaceId]: { ...workspaces[action.workspaceId], pages } };
}
function onDeletePage(ws: any, actions: any) {
    var workspaces = { ...ws };
    var pages = { ...workspaces[actions.workspaceId].pages };
    delete pages[actions.pageId];
    return { ...workspaces, [actions.workspaceId]: { ...workspaces[actions.workspaceId], pages } };
}
