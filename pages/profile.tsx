import Head from 'next/head'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTweets from '../components/profile/ProfileTweets'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll scrollbar-hide`,
}

const Profile = () => {
  return (
    <div className={style.wrapper}>
      <Head>
        <title>Twitter Web3 - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        <Sidebar />
        <div className={style.mainContent}>
          {/* Profile Header */}
          <ProfileHeader />
          {/* Profile tweets */}
          <ProfileTweets />
        </div>
        <Widgets />
      </div>
    </div>
  )
}

export default Profile
