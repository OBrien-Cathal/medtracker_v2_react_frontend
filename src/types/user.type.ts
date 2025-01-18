export interface IUserModel {
    id: bigint
    username: string
    role: string
    roleChange: IRoleChange[]
}

export interface IRoleChangeStatus {
    practitionerRoleChange: IRoleChange
    adminRoleChange: IRoleChange

}

export interface IRoleChange {
    id: bigint
    status: string
    userRole: string
    userModelId: bigint
    description: string

}