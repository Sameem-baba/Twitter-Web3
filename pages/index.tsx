import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/home/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { useContext } from 'react'
import { TwitterContext } from '../context/TwitterContext'
import errorImage from '../assets/error.png'
import metamaskLogo from '../assets/metamask.png'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-3/2 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold flex flex-col text-center mt-24`,
}

const Home: NextPage = () => {
  const { appStatus, connectWallet } = useContext(TwitterContext)

  const app = (status = appStatus) => {
    switch (status) {
      case 'connected':
        return userLoggedIn

      case 'notConnected':
        return noUserFound

      case 'noMetamask':
        return noMetaMaskFound

      case 'error':
        return error

      default:
        return loading
    }
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Head>
        <title>Twitter Web3 - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Sidebar */}
      <Sidebar />
      {/* <h2>Feed</h2> */}
      <Feed />
      {/* <h2>Widgets</h2> */}
      <Widgets />
    </div>
  )

  const noUserFound = (
    <div className={style.loginContainer}>
      <Head>
        <title>Twitter Web3 - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Head>
        <title>Install Metamask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          <button className="mb-4 rounded-lg bg-yellow-700 p-2">
            Download Metamask
          </button>
        </a>
        You must install Metamask, a <br /> virtual Ethereum wallet, in your
        browser.
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Head>
        <title>An error occured</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={errorImage} width={250} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  )

  const loading = (
    <div className={style.loginContainer}>
      <Head>
        <title>Loading</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.loginContent}>Loading...</div>
    </div>
  )

  return <div className={style.wrapper}>{app(appStatus)}</div>
}

export default Home
