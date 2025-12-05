declare module 'react-nice-avatar-vite-prod-fork' {
  import * as React from 'react';

  export type AvatarConfig = Record<string, unknown>;

  export function genConfig(seed?: string | number): AvatarConfig;

  export interface AvatarProps {
    config?: AvatarConfig;
    className?: string;
    style?: React.CSSProperties;
  }

  const Avatar: React.FC<AvatarProps>;
  export default Avatar;
}


