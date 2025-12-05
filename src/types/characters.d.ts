type Character = {
  key: string;
  role: string;
  color: string;
  label: string;
  desc: string;
  pair: string;
  src: string;
};
declare module "../../data/characters.js" {
  export interface CharacterRecord {
    key?: string;
    role: string;
    color: string; // e.g. "red" | "blue" | "grey" | "green" | "purple"
    label?: string;
    desc?: string;
    pair?: string | number;
    src?: string;
  }
  export const characters: CharacterRecord[];
}

declare module "*.js";
