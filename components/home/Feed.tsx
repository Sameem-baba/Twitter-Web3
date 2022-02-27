import { useContext } from 'react'
import { BsStars } from 'react-icons/bs'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'
import TweetBox from './TweetBox'

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll scrollbar-hide`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

interface TweetAuthor {
  name: string
  walletAddress: string
  profileImage: string
  isProfileImageNft: boolean
}
interface Tweet {
  author: TweetAuthor
  tweet: string
  timestamp: string
}

const Feed = () => {
  const { tweets } = useContext(TwitterContext)

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.map((tweet: Tweet, i: number) => (
        // <div>{tweet.displayName}</div>
        <Post
          key={i}
          displayName={
            tweet.author.name === 'Unnamed'
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
          }
          username={`${tweet.author.walletAddress.slice(
            0,
            4
          )}...${tweet.author.walletAddress.slice(-4)}`}
          avatar={tweet.author.profileImage}
          text={tweet.tweet}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  )
}

export default Feed
