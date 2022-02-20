import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/home/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

const style = {
  wrapper: `flex justify-center w-screen h-screen select-none text-white bg-[#15202b]`,
  content: `max-w-[1400px] lg:w-2/3 flex justify-between mx-auto`,
}

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <Head>
        <title>Twitter Web3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        {/* Sidebar */}
        <Sidebar />
        {/* <h2>Feed</h2> */}
        <Feed />
        {/* <h2>Widgets</h2> */}
        <Widgets />
      </div>
    </div>
  )
}

export default Home
