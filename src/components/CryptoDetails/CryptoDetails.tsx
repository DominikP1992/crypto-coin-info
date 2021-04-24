import { Fragment, useEffect, useState } from 'react';

// external components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// icons
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GitHubIcon from '@material-ui/icons/GitHub';
import UnableToGetData from 'components/UnableToGetData';

// components
import OverlaySpinner from 'components/OverlaySpinner';
import PriceChange from 'components/PriceChange';
import SocialMedia from 'components/SocialMedia';
import GithubInfo from 'components/GithubInfo';

// constants
import {
  API_URL,
  CRYPTO_DETAILS,
  CRYPTO_MARKET_CHART,
} from 'constants/api.constants';

// services
import requestService from 'services/requestService';

// types
import { CryptoDetailsResponseDataType } from 'types/cryptoDetails.type';
import { ShareUrlType } from 'types/socialMedia.type';
import { GithubInfoNameType } from 'types/githubInfo.type';

// enums
import SocialMediaNameEnum from 'enums/socialMediaType.enum';
import CurrencyEnum from 'enums/currency.enum';
import LanguageEnum from 'enums/language.enum';

// styles
import useCryptoDetailsStyles from './cryptoDetails.style';

function CryptoDetails({ id }: { id: string }) {
  const classes = useCryptoDetailsStyles();

  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);
  const [isUnableToGetData, setIsUnableToGetData] = useState<boolean>(false);
  const [
    cryptoDetails,
    setCryptoDetails,
  ] = useState<CryptoDetailsResponseDataType | null>(null);

  function getCryptoDetails() {
    const params = {
      localization: 'false',
      tickers: 'false',
      market_data: 'true',
      community_data: 'true',
      developer_data: 'true',
      sparkline: 'false',
    };

    const queryParams = new URLSearchParams(params).toString();

    setIsSpinnerOpen(true);
    requestService<CryptoDetailsResponseDataType>(
      `${API_URL}${CRYPTO_DETAILS}/${id}?${queryParams}${CRYPTO_MARKET_CHART}`,
      {
        headers: new Headers(),
      },
    )
      .then((res) => {
        setIsSpinnerOpen(false);
        setIsUnableToGetData(false);
        setCryptoDetails(res);
      })
      .catch(() => {
        setIsSpinnerOpen(false);
        setIsUnableToGetData(true);
      });
  }

  useEffect(() => {
    getCryptoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getPriceInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      market_data: { current_price: currentPrice },
      image: { small },
      name,
      symbol,
    } = cryptoDetails;

    const price = currentPrice[CurrencyEnum.usd];

    return (
      <Grid item>
        <Grid container>
          <Avatar
            variant="square"
            src={small}
            aria-hidden
            className={classes.avatar}
          />
          <Grid item>
            <Grid container direction="column" item>
              <Typography>{`${name} | ${symbol}`}</Typography>
              <Typography variant="h4" component="h3" paragraph>
                {`${price} ${CurrencyEnum.usd}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function getLast24hInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      market_data: { high_24h: high24h, low_24h: low24h },
    } = cryptoDetails;

    const ath24h = high24h[CurrencyEnum.usd];
    const atl24h = low24h[CurrencyEnum.usd];

    return (
      <Grid item>
        <Grid container direction="column" alignItems="flex-start">
          <Typography>Last 24h</Typography>
          <Typography variant="caption">{`ATH: ${ath24h} ${CurrencyEnum.usd}`}</Typography>
          <Typography variant="caption" paragraph>
            {`ATL: ${atl24h} ${CurrencyEnum.usd}`}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function getHistoricalAtInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      market_data: { ath, atl, ath_date: athDate, atl_date: atlDate },
    } = cryptoDetails;

    return (
      <Grid item>
        <Grid container item direction="column" alignItems="flex-start">
          <Typography>Historical ATH and ATL</Typography>
          <Typography variant="caption">
            {`ATH: ${ath[CurrencyEnum.usd]} ${
              CurrencyEnum.usd
            }, date: ${athDate[CurrencyEnum.usd].substr(0, 10)}`}
          </Typography>
          <Typography variant="caption" paragraph>
            {`ATL: ${atl[CurrencyEnum.usd]} ${
              CurrencyEnum.usd
            }, date: ${atlDate[CurrencyEnum.usd].substr(0, 10)}`}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function getReputationInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      sentiment_votes_up_percentage: sentimentVoteUp,
      sentiment_votes_down_percentage: sentimentVoteDown,
    } = cryptoDetails;

    return (
      <Grid item>
        <Grid container direction="column" alignItems="flex-start">
          <Typography>Reputation</Typography>
          <Grid container item alignItems="center" className={classes.upVote}>
            <Box mr={1}>
              <ThumbUpAltIcon fontSize="small" />
            </Box>
            <Typography>{`${sentimentVoteUp}%`}</Typography>
          </Grid>
          <Grid container item alignItems="center" className={classes.downVote}>
            <Box mr={1}>
              <ThumbDownIcon fontSize="small" />
            </Box>
            <Typography>{`${sentimentVoteDown}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function getPriceChangeInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      market_data: {
        price_change_percentage_24h: priceChange24h,
        price_change_percentage_7d: priceChange7d,
        price_change_percentage_14d: priceChange14d,
        price_change_percentage_30d: priceChange30d,
        price_change_percentage_60d: priceChange60d,
        price_change_percentage_200d: priceChange200d,
        price_change_percentage_1y: priceChange1y,
      },
    } = cryptoDetails;

    // price changes
    const piceChangeArray = [
      {
        range: '24 hours',
        value: priceChange24h,
      },
      {
        range: '7 days',
        value: priceChange7d,
      },
      {
        range: '14 days',
        value: priceChange14d,
      },
      {
        range: '30 days',
        value: priceChange30d,
      },
      {
        range: '60 days',
        value: priceChange60d,
      },
      {
        range: '200 days',
        value: priceChange200d,
      },
      {
        range: '1 year',
        value: priceChange1y,
      },
    ];

    return (
      <Grid container direction="row" item xs={12}>
        <Grid item xs={12}>
          <Typography>Price change rate (%)</Typography>
        </Grid>
        {piceChangeArray.map(({ value, range }) => (
          <Grid item key={range}>
            <Box mr={3}>
              <Typography variant="caption">{range}</Typography>
              <PriceChange value={value} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  function getSocialMediaInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      links: {
        facebook_username: facebookUsername,
        twitter_screen_name: twitterName,
        telegram_channel_identifier: telegramName,
        subreddit_url: redditUrl,
      },
      community_data: {
        facebook_likes: facebookLikes,
        twitter_followers: twitterFollowers,
        telegram_channel_user_count: telegramChannelUserCount,
        reddit_subscribers: redditSubscribers,
      },
    } = cryptoDetails;

    // social media
    const socialMediaObj: ShareUrlType[] = [
      {
        name: facebookUsername,
        numberOfVotes: facebookLikes,
        mediaName: SocialMediaNameEnum.facebook,
      },
      {
        name: twitterName,
        numberOfVotes: twitterFollowers,
        mediaName: SocialMediaNameEnum.twitter,
      },
      {
        name: telegramName,
        numberOfVotes: telegramChannelUserCount,
        mediaName: SocialMediaNameEnum.telegram,
      },
      {
        url: redditUrl,
        numberOfVotes: redditSubscribers,
        mediaName: SocialMediaNameEnum.reddit,
      },
    ].filter((el) => el.name || el.url);

    return (
      <Box mb={2}>
        <Grid container>
          {socialMediaObj.map((socialMediaElement) => (
            <Grid item key={socialMediaElement.mediaName}>
              <Box mr={2}>
                <SocialMedia data={socialMediaElement} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  function getGithubInfo() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      developer_data: { forks, stars, subscribers, total_issues: issues },
      links: {
        repos_url: { github },
      },
    } = cryptoDetails;
    const githubUrl = github[0];

    if (!githubUrl) {
      return null;
    }

    const githubInfoObj: Record<GithubInfoNameType, number> = {
      fork: forks,
      star: stars,
      subscribers,
      issue: issues,
    };

    const githubInfos = Object.keys(githubInfoObj).map((key) => {
      const votes = githubInfoObj[key as GithubInfoNameType];

      return (
        <Grid item key={key}>
          <Box mr={2} mb={1}>
            <GithubInfo name={key as GithubInfoNameType} votes={votes} />
          </Box>
        </Grid>
      );
    });

    return (
      <Grid container>
        <Grid item xs={12}>
          <Link
            display="block"
            href={github[0]}
            className={classes.githubLink}
            target="_blank"
          >
            <Box mr={1}>Github</Box>
            <GitHubIcon color="action" />
          </Link>
        </Grid>

        {githubInfos}
      </Grid>
    );
  }

  function getHeaderSection() {
    if (cryptoDetails === null) {
      return null;
    }

    return (
      <Paper>
        <Box p={2}>
          <Grid container justify="space-between">
            <Grid>
              <Box mr={2}>
                <Typography variant="h4" component="h2" paragraph>
                  Coin info
                </Typography>
              </Box>
            </Grid>
            <Grid item>{getSocialMediaInfo()}</Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Grid container spacing={3}>
                {getPriceInfo()}
                {getLast24hInfo()}
                {getHistoricalAtInfo()}
                {getReputationInfo()}
              </Grid>
            </Grid>
          </Grid>
          <Box mt={3}>{getPriceChangeInfo()}</Box>
          <Box mt={3}>{getGithubInfo()}</Box>
        </Box>
      </Paper>
    );
  }

  function getInfoSection() {
    if (cryptoDetails === null) {
      return null;
    }

    const { description } = cryptoDetails;

    return (
      <Box mt={2}>
        <Paper>
          <Box p={2} overflow="hidden">
            <Typography variant="h4" component="h2" paragraph>
              Description
            </Typography>
            <Typography>{description[LanguageEnum.en]}</Typography>
          </Box>
        </Paper>
      </Box>
    );
  }

  const getLinks = ({ links, name }: { links: string[]; name: string }) => {
    if (links.length) {
      return (
        <Box mb={2} key={name}>
          <Grid container direction="column">
            <Typography variant="h5">{name}</Typography>
            {links.map((link) => (
              <Link key={link} href={link}>
                {link}
              </Link>
            ))}
          </Grid>
        </Box>
      );
    }
    return null;
  };

  function getLinksSection() {
    if (cryptoDetails === null) {
      return null;
    }

    const {
      links: {
        homepage,
        blockchain_site: blockchainSite,
        official_forum_url: forum,
        chat_url: chats,
        announcement_url: announcement,
      },
    } = cryptoDetails;

    const linkArray = [
      {
        name: 'Home link(s)',
        links: homepage.filter((e: string) => e),
      },
      {
        name: 'Blockchain site link(s)',
        links: blockchainSite.filter((e: string) => e),
      },
      {
        name: 'Forum link(s)',
        links: forum.filter((e: string) => e),
      },
      {
        name: 'Chat link(s)',
        links: chats.filter((e: string) => e),
      },
      {
        name: 'Announcement link(s)',
        links: announcement.filter((e: string) => e),
      },
    ];

    return (
      <Box mt={2} mb={2}>
        <Paper>
          <Box p={2} overflow="hidden">
            <Typography variant="h4" component="h2" paragraph>
              Links
            </Typography>
            {linkArray.map(({ name, links }) => getLinks({ name, links }))}
          </Box>
        </Paper>
      </Box>
    );
  }

  function getContent() {
    if (isUnableToGetData) {
      return (
        <Paper>
          <Box mt={2} p={2}>
            <UnableToGetData />
          </Box>
        </Paper>
      );
    }

    return (
      <Fragment>
        {getHeaderSection()}
        {getInfoSection()}
        {getLinksSection()}
      </Fragment>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {getContent()}
      </Grid>
      <OverlaySpinner isOpen={isSpinnerOpen} />
    </Grid>
  );
}

export default CryptoDetails;
