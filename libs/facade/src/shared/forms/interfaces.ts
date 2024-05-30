export interface ScriptLoadInterface {
  status: EnumTypeGenerator<typeof ScriptLoadStatusEnum>;
  loaded: boolean;
  script: string;
}

export const ScriptLoadStatusEnum = {
  Loaded: 'Loaded',
  NotLoaded: 'Not Loaded',
  AlreadyLoaded: 'Already Loaded',
} as const;
type EnumTypeGenerator<T> = T[keyof T];
