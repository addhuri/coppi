import { Action, createReducer, on } from '@ngrx/store';
import { CreatePage, CreateWorkspace, DeletePage, DeleteWorkspace, ToggleSidebar, UpdatePage } from './app.actions';
import { Page, Workspace, Workspaces } from '../services/app.interface';

export interface State {
    workspaces: { [s: string]: Workspace };
    isVisibleSidebar: boolean;
}

const initialState: State = {
    workspaces: {},
    isVisibleSidebar: true
};

const _appReducer = createReducer(
    initialState,
    on(CreateWorkspace, (state: State, action) => ({ ...state, workspaces: updatedWorkspaces(state.workspaces, action.workspace) })),
    on(CreatePage, (state: State, action) => ({ ...state, workspaces: updatePage(state.workspaces, action.workspaceId, action.page) })),
    on(UpdatePage, (state: State, action) => ({ ...state, workspaces: updatePage(state.workspaces, action.workspaceId, action.page, action.workspaceName) })),
    on(DeleteWorkspace, (state: State, action) => ({ ...state, workspaces: onDeleteWorkspace(state.workspaces, action.id) })),
    on(DeletePage, (state: State, action) => ({ ...state, workspaces: onDeletePage(state.workspaces, action.workspaceId, action.pageId) })),
    on(ToggleSidebar, (state: State) => ({ ...state, isVisibleSidebar: !state.isVisibleSidebar }))
);

export function appReducer(state: State | undefined, action: Action) {
    return _appReducer(state, action);
}

export const appSelectors = {
    get_workspaces: (state: State) => state.workspaces,
    get_isVisibleSidebar: (state: State) => state.isVisibleSidebar
}


function updatedWorkspaces(ws: Workspaces, workspace: Workspace) {
    return { ...ws, [workspace.id]: workspace };
}
function updatePage(ws: Workspaces, workspaceId: number, page: Page, workspaceName: string = '') {
    const workspaces = { ...ws };
    const pages = { ...workspaces[workspaceId].pages };
    pages[page.id] = page;
    return { ...workspaces, [workspaceId]: { ...workspaces[workspaceId], pages, name: workspaceName } };
}
function onDeleteWorkspace(ws: Workspaces, id: number) {
    const workspaces = { ...ws };
    delete workspaces[id];
    return workspaces;
}
function onDeletePage(ws: Workspaces, workspaceId: number, pageId: number) {
    var workspaces = { ...ws };
    var pages = { ...workspaces[workspaceId].pages };
    delete pages[pageId];
    return { ...workspaces, [workspaceId]: { ...workspaces[workspaceId], pages } };
}
