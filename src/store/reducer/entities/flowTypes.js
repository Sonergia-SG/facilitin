// @flow
export type CheckPoint = {
  controle_valide: number,
};

export type CheckPoints = {
  [string]: CheckPoint,
};

export type File = {};

export type Files = {
  [string]: File,
};

export type Folder = {};

export type Folders = {
  [string]: Folder,
};

export type Entities = {
  checkPoints: CheckPoints,
  files: Files,
  folders: Folders,
};

export type Normalized = {
  entities: Entities,
};
