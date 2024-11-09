import { ModulePermission } from "../../../interface/permissionInterface";

export const hasPermission = (
  permissions: ModulePermission[],
  moduleName: string,
  subModuleName: string,
  permission: string
): boolean => {
  if (!Array.isArray(permissions)) return false;

  const module = permissions?.find((mod) => mod.moduleName === moduleName);
  if (!module) return false;

  const subModule = module.permissions.find(
    (sub) => sub.subModuleName === subModuleName
  );
  if (!subModule) return false;

  return subModule.subPermissions.includes(permission);
};
