import LanguageEnum from 'enums/language.enum';
import { CurrencyType } from 'types/currency.type';

export type CryptoDetailsResponseDataType = {
  name: string;
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: Record<CurrencyType, number>; // currency, value
    ath: Record<CurrencyType, number>; // currency, value
    atl: Record<CurrencyType, number>; // currency, date
    ath_date: Record<CurrencyType, string>; // currency, date
    atl_date: Record<CurrencyType, string>; // currency, date
    price_change_24h: number; // usd
    price_change_percentage_24h: number; // usd
    price_change_percentage_7d: number; // usd
    price_change_percentage_14d: number; // usd
    price_change_percentage_30d: number; // usd
    price_change_percentage_60d: number; // usd
    price_change_percentage_200d: number; // usd
    price_change_percentage_1y: number; // usd
    low_24h: Record<CurrencyType, number>; // currency, value
    high_24h: Record<CurrencyType, number>; // currency, value
  };
  description: Record<LanguageEnum.en, string>; // lang, description
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
    // social media
    subreddit_url?: string;
    twitter_screen_name?: string;
    facebook_username?: string;
    telegram_channel_identifier?: string;
  };
  community_data: {
    facebook_likes?: number;
    twitter_followers?: number;
    reddit_subscribers?: number;
    telegram_channel_user_count?: number;
  };
  sentiment_votes_up_percentage: number; // reputation score
  sentiment_votes_down_percentage: number; // reputation score
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
  };
};
