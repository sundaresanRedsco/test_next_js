// types/permissions.ts

interface SubPermission {
  subModuleName: string;
  subPermissions: string[];
}

export interface ModulePermission {
  moduleName: string;
  permissions: SubPermission[];
}

export interface PermissionsState {
  permissions: ModulePermission[];
  loading: boolean;
  error: string | null;
}
