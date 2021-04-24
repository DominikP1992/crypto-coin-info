import { memo } from 'react';

// icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CallSplit from '@material-ui/icons/CallSplit';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// external components
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

// types
import {
  GithubInfoConfigType,
  GithubInfoPropsType,
} from 'types/githubInfo.type';

// style
import GithubInfoEnum from 'enums/githubInfo.enum';
import useGithubInfoStyles from './githubInfo.style';

// config
const githubInfoConfig: GithubInfoConfigType = {
  [GithubInfoEnum.subscribers]: {
    icon: VisibilityIcon,
  },
  [GithubInfoEnum.star]: {
    icon: StarBorderIcon,
  },
  [GithubInfoEnum.fork]: {
    icon: CallSplit,
  },
  [GithubInfoEnum.issue]: {
    icon: ErrorOutlineIcon,
  },
};

function GithubInfo({ name, votes }: GithubInfoPropsType) {
  const classes = useGithubInfoStyles();

  function getIcon() {
    const Icon = githubInfoConfig[name].icon;
    return <Icon className={classes.icon} />;
  }

  return (
    <Paper>
      <Box p={1}>
        <Typography className={classes.text}>
          {getIcon()}
          {`${name} | ${votes}`}
        </Typography>
      </Box>
    </Paper>
  );
}

export default memo(GithubInfo);
