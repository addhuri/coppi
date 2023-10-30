import { createAction } from "@ngrx/store";

export enum appActionTypes {
  CREATE_WORKSPACE = '[App] CreateWorkspace',
  CREATE_PAGE = '[App] CreatePage',
  DELETE_WORKSPACE = '[App] DeleteWorkspace',
  DELETE_PAGE = '[App] DeletePage',
}

export const CreateWorkspace = createAction(appActionTypes.CREATE_WORKSPACE, (workspace: any) => ({ workspace }));
export const CreatePage = createAction(appActionTypes.CREATE_PAGE, (workspaceId: string, page: any) => ({ workspaceId, page }));
export const DeleteWorkspace = createAction(appActionTypes.DELETE_WORKSPACE, (id: string) => ({ id }));
export const DeletePage = createAction(appActionTypes.DELETE_PAGE, (workspaceId: string, pageId: string) => ({ workspaceId, pageId }));