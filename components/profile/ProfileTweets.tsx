import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'

const style = {
  wrapper: `no-scrollbar`,
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

const ProfileTweets = () => {
  const { currentUser, currentAccount } = useContext(TwitterContext)

  return (
    <div className={style.wrapper}>
      {currentUser.tweets?.map((tweet: Tweet, index: number) => (
        <Post
          key={index}
          displayName={
            currentUser.name === 'Unnamed'
              ? `${currentAccount.slice(0, 4)}...${currentAccount.slice(41)}`
              : currentUser.name
          }
          username={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
            -4
          )}`}
          avatar={currentUser.profileImage}
          text={tweet.tweet}
          isProfileImageNft={currentUser.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  )
}

export default ProfileTweets
