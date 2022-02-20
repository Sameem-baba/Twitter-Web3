import { BsStars } from 'react-icons/bs'
import Post from '../Post'
import TweetBox from './TweetBox'

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll scrollbar-hide`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const tweets = [
  {
    displayName: 'sameem.eth',
    userName: '0x1279eEB25eEc3C63a903BD30AbD6Cc51450A8069',
    avatar:
      'https://pbs.twimg.com/profile_images/1488910999537451008/mZ0U2W3W_400x400.png',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2021-06-01T00:00:00.000Z',
  },
  {
    displayName: 'sameem.eth',
    userName: '0x1279eEB25eEc3C63a903BD30AbD6Cc51450A8069',
    avatar:
      'https://pbs.twimg.com/profile_images/1488910999537451008/mZ0U2W3W_400x400.png',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2021-06-01T00:00:00.000Z',
  },
  {
    displayName: 'sameem.eth',
    userName: '0x1279eEB25eEc3C63a903BD30AbD6Cc51450A8069',
    avatar:
      'https://pbs.twimg.com/profile_images/1488910999537451008/mZ0U2W3W_400x400.png',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2021-06-01T00:00:00.000Z',
  },
  {
    displayName: 'sameem.eth',
    userName: '0x1279eEB25eEc3C63a903BD30AbD6Cc51450A8069',
    avatar:
      'https://pbs.twimg.com/profile_images/1488910999537451008/mZ0U2W3W_400x400.png',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2021-06-01T00:00:00.000Z',
  },
  {
    displayName: 'sameem.eth',
    userName: '0x1279eEB25eEc3C63a903BD30AbD6Cc51450A8069',
    avatar:
      'https://pbs.twimg.com/profile_images/1488910999537451008/mZ0U2W3W_400x400.png',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2021-06-01T00:00:00.000Z',
  },
]

const Feed = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.map((tweet, i) => (
        // <div>{tweet.displayName}</div>
        <Post
          key={i}
          displayName={tweet.displayName}
          username={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice(
            -4
          )}`}
          avatar={tweet.avatar}
          text={tweet.text}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  )
}

export default Feed
