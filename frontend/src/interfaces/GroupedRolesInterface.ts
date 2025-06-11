import Role from './RoleInterface';

export default interface GroupedRoles {
    pair: number;
    roles: Role[];
    checked: boolean;
    required: boolean;
}
