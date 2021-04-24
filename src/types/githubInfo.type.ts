import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

// enums
import GithubInfoEnum from 'enums/githubInfo.enum';

export type GithubInfoNameType = keyof typeof GithubInfoEnum;

export type GithubInfoContentType = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

export type GithubInfoPropsType = {
  name: GithubInfoNameType;
  votes: number;
};

export type GithubInfoConfigType = Record<
  GithubInfoNameType,
  GithubInfoContentType
>;
