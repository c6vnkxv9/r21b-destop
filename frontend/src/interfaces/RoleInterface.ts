export default interface Role {
    key: string;
    name: string;
    color: string;
    pair: number;
    description?: string;
    ability?: string;
    faction?: string;
    special?: boolean;
    src?: string;
    label?: string;
    desc?: string;
}