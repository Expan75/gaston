/*  Simplified RBAC implmentation that relies on enum to ensure strict set of roles_ 
    The enum results in a string representation of the role with inherent meaning_
    
    As an example, the role string "USERS.READ.ORGANISATION" states the following:

        - the user can READ user information of other users within the same organisation
        - the meaning is effectively captured in pieces -> resource.right.scope
*/

export enum UserRoles {
  RESOURCES_READ_ALL = 'RESOURCES_READ_ALL',
  RESOURCES_WRITE_ALL = 'RESOURCES_WRITE_ALL',
  USERS_READ_SELF = 'USERS_READ_SELF',
  USERS_WRITE_SELF = 'USERS_WRITE_SELF',
  USERS_READ_ORGANISATION = 'USERS_READ_ORGANISATION',
}

// allow more intuitive role creation via shorthand
export const userRoleGroups = {
  admin: [UserRoles.RESOURCES_READ_ALL, UserRoles.RESOURCES_WRITE_ALL],
  user: [UserRoles.USERS_READ_SELF, UserRoles.USERS_WRITE_SELF],
};
