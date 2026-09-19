import type { ClassValue } from '@pastweb/tools';

export type IconData = {
  width?: number;
  height?: number;
  body: string;
};

export type CollectionData = {
  aliases?: { [key: string]: { parent: string } };
  prefix: string;
  lastModified: number;
  icons: Record<string, IconData>;
  width: number;
  height: number;
  not_found?: boolean;
};

export type Collection = Record<string, Record<string, string>>;

export interface IconResolvedSource {
  iconName: string;
  collectionName: string;
  iconData: IconData | string;
  src: string;
}

export interface IconState extends IconResolvedSource {
  ariaHidden: true | undefined;
  ariaLabel: string | undefined;
  role: 'img' | undefined;
}

export interface IconProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  src?: string;
  name?: string;
  collection?: Collection;
  apiUrl?: string;
}

export interface IconDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  src: string;
  name: string;
  collection: Collection;
  apiUrl: string;
}

export interface IconMediator {
  state: IconState;
}
