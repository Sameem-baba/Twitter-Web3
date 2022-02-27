import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('loading')
  const [currentAccount, setCurrentAccount] = useState('')
  const [tweets, setTweets] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount || appStatus !== 'connected') return
    getCurrentAccountDetails(currentAccount)
    fetchTweets()
  }, [currentAccount, appStatus])

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetamask')

    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetamask')

    try {
      setAppStatus('loading')
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray > 0) {
        await setCurrentAccount(addressArray[0])
        setAppStatus('connected')
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }

  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetamask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:
          'https://pbs.twimg.com/profile_images/1488910999537451008/mZ0U2W3W_400x400.png',
        walletAddress: userWalletAddress,
      }
      await client.createIfNotExists(userDoc)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTweets = async () => {
    const query = `
      *[_type == "tweets"]{
        "author": author->{name, profileImage, walletAddress, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)
    `

    const sanityResponse = await client.fetch(query)

    setTweets([])

    sanityResponse.forEach(async (item) => {
      const profileImageUrl = await getProfileImageUrl(
        item.author.profileImage,
        item.author.isProfileImageNft
      )

      if (item.author.isProfileImageNft) {
        const newItem = {
          tweet: item.tweet,
          timestamp: item.timestamp,
          author: {
            name: item.author.name,
            walletAddress: item.author.walletAddress,
            profileImage: profileImageUrl,
            isProfileImageNft: item.author.isProfileImageNft,
          },
        }

        setTweets((prevState) => [...prevState, newItem])
      } else {
        setTweets((prevState) => [...prevState, item])
      }
    })
  }

  /**
   * Gets the current user details from Sanity DB.
   * @param {String} userAccount Wallet address of the currently logged in user
   * @returns null
   */
  const getCurrentAccountDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `

    const response = await client.fetch(query)
    const profileImageUri = await getProfileImageUrl(
      response[0].profileImage,
      response[0].isProfileImageNft
    )

    setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
      profileImage: profileImageUri,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
  }

  const getProfileImageUrl = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else {
      return imageUri
    }
  }

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        fetchTweets,
        tweets,
        currentUser,
        getCurrentAccountDetails,
      }}
    >
      {children}
    </TwitterContext.Provider>
  )
}
