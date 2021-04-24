import { memo } from 'react';

// icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';

// external components
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// types
import {
  MediaNameType,
  SocialMediaConfigStructure,
  SocialMediaPropsType,
} from 'types/socialMedia.type';

// enums
import SocialMediaNameEnum from 'enums/socialMediaType.enum';

// config
const socialMediaConfig: SocialMediaConfigStructure = {
  [SocialMediaNameEnum.facebook]: {
    url: 'https://www.facebook.com/',
    icon: FacebookIcon,
  },
  [SocialMediaNameEnum.twitter]: {
    url: 'https://twitter.com/',
    icon: TwitterIcon,
  },
  [SocialMediaNameEnum.telegram]: {
    url: 'https://tlgrm.eu/channels/',
    icon: TelegramIcon,
  },
  [SocialMediaNameEnum.reddit]: {
    icon: RedditIcon,
  },
};

function SocialMedia({
  data: { url, name, mediaName, numberOfVotes },
}: SocialMediaPropsType) {
  const mediaElement = socialMediaConfig[mediaName as MediaNameType];

  function getUrl() {
    if (mediaElement.url) {
      return `${mediaElement.url}${name}`;
    }
    return url;
  }

  function getIcon() {
    const Icon = mediaElement.icon;
    return <Icon color="action" />;
  }

  return (
    <Grid container>
      <Link href={getUrl()} target="_blank">
        {getIcon()}
      </Link>
      {Boolean(numberOfVotes) && (
        <Box ml={1}>
          <Typography>{numberOfVotes}</Typography>
        </Box>
      )}
    </Grid>
  );
}

export default memo(SocialMedia);
