/*  Simplified RBAC implmentation that relies on enum to ensure strict set of roles. 
    The enum results in a string representation of the role with inherent meaning.
    
    As an example, the role string "users.read.organisation" states the following:

        - the user can read user information of other users within the same organisation
        - the meaning is effectively captured in pieces -> resource.right.scope
*/

export enum userRoles {
    RESOURCES_READ_ALL = "users.read.all",
    RESOURCES_WRITE_ALL = "users.write.all",
    USERS_READ_SELF = "users.read.self",
    USERS_WRITE_SELF = "users.write.self",
    USERS_READ_ORGANISATION = "users.read.organisation"
}

export const userRoleGroups = {
    // allows more intuitive role creation via shorthand (admin gets a set of roles etc.)
    admin: [
        userRoles.RESOURCES_READ_ALL,
        userRoles.RESOURCES_WRITE_ALL
    ],
    user: [
        userRoles.USERS_READ_SELF,
        userRoles.USERS_WRITE_SELF
    ],
}