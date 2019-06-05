// Type definitions for redux-localstorage persistState, until a better solution becomes available
import * as Redux from "redux";

export interface ConfigRS {
  key: string;
  merge?: any;
  slicer?: any;
  serialize?: (value: any, replacer?: (key: string, value: any) => any, space?: string | number) => string,
  deserialize?: (text: string, reviver?: (key: any, value: any) => any) => any
}


declare module "redux-localstorage" {
  export default function persistState(paths: string | string[] | undefined, config: ConfigRS): Redux.StoreEnhancer;
}

