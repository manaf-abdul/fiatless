import { Button, Text } from '@nextui-org/react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import React, { Fragment } from 'react'
import { useAccount } from 'wagmi'

const WalletConnectButton = ({size}:any) => {
    const { open } = useWeb3Modal()
    const { address, isConnecting, isDisconnected } = useAccount()
  return (
    <Fragment>
        <Button color='primary' size={size} onClick={() => open()}>
            {address ? address : "Connect Wallet"}
          </Button>
    </Fragment>
  )
}

export default WalletConnectButton