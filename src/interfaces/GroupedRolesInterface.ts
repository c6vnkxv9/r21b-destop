import Role from '@/interfaces/RoleInterface';
export default interface GroupedRoles {
    pair: Number;
    required: Boolean;
    checked: Boolean;
    roles: Role[]
}
