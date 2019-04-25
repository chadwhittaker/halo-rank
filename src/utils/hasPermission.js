export default function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );

  let hasPermissionTrue = true;
  if(!matchedPermissions.length) {
    hasPermissionTrue=false;
  }

  return { hasPermissionTrue, permissionsNeeded }
}