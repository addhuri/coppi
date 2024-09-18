import { createAction } from "@ngrx/store";
import { Page, Workspace } from "../services/app.interface";

export enum appActionTypes {
  CREATE_WORKSPACE = '[App] CreateWorkspace',
  CREATE_PAGE = '[App] CreatePage',
  UPDATE_PAGE = '[App] UpdatePage',
  DELETE_WORKSPACE = '[App] DeleteWorkspace',
  DELETE_PAGE = '[App] DeletePage',
}

export const CreateWorkspace = createAction(appActionTypes.CREATE_WORKSPACE, (workspace: Workspace) => ({ workspace }));
export const CreatePage = createAction(appActionTypes.CREATE_PAGE, (workspaceId: number, page: Page) => ({ workspaceId, page }));
export const UpdatePage = createAction(appActionTypes.UPDATE_PAGE, (workspaceId: number, workspaceName: string, page: Page) => ({ workspaceId, workspaceName, page }));
export const DeleteWorkspace = createAction(appActionTypes.DELETE_WORKSPACE, (id: number) => ({ id }));
export const DeletePage = createAction(appActionTypes.DELETE_PAGE, (workspaceId: number, pageId: number) => ({ workspaceId, pageId }));