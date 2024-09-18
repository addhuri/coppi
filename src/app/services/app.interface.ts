export interface PageData extends Array<Array<Array<string>>> { }
export interface Page {
  id: number;
  name: string;
  data: PageData;
}
export interface WorkspacePages {
  [s: string]: Page;
}
export interface Workspace {
  id: number;
  name: string;
  pages: WorkspacePages
}
export interface Workspaces {
  [s: string]: Workspace;
}
export interface Leaf {
  id: number;
  name: string;
  data: PageData;
}
export interface TreeNode {
  id: number;
  name: string;
  children: Page[];
}
export enum PageMode { NEW, VIEW, EDIT, DUPLICATE, DELETE }

export const INIT_NEW_PAGE: Page = {
  id: 0,
  name: '',
  data: []
}
export const INIT_WORKSPACE: Workspace = {
  id: 0,
  name: '',
  pages: {
    0: INIT_NEW_PAGE
  }
}