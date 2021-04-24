import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

// enums
import SocialMediaNameEnum from 'enums/socialMediaType.enum';

export type MediaNameType = keyof typeof SocialMediaNameEnum;

export type ShareUrlType = {
  url?: string;
  name?: string;
  mediaName: MediaNameType,
  numberOfVotes?: number;
};

export type SocialMediaPropsType = {
  data: ShareUrlType;
};

export type ShareUrlComponentType = {
  url?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

export type SocialMediaConfigStructure = {
  facebook: ShareUrlComponentType;
  twitter: ShareUrlComponentType;
  telegram: ShareUrlComponentType;
  reddit: ShareUrlComponentType;
};
