import { Col, Divider, Progress, Row, Text } from '@nextui-org/react'
import { Fragment, ReactNode, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getNetwork } from '@wagmi/core';
import SettingsStore from '@/store/SettingsStore'
import { useSnapshot } from 'valtio';
import WalletConnectButton from './WalletConnectButton';
/**
 * Types
 */
interface Props {
  children?: ReactNode | ReactNode[]
  title: string
}

/**
 * Component
 */
export default function PageHeader({ title, children }: Props) {
  // const { account } = useSnapshot(SettingsStore.state)
  const { address, isConnecting, isDisconnected } = useAccount()
  // const { chain } = getNetwork();

  // useEffect(()=>{
  //   if(chain) SettingsStore.setChain(chain)
  // },[chain])

  // console.log("pageheader render","selectedNetworkId",chain)
  return (
    <Fragment>
      <Row css={{ marginBottom: '$5', width: '100%' }} justify="space-between" align="center">
        <Col span={8}>
          <Text
            h3
            weight="bold"
            css={{
              // textGradient: '90deg, $secondary, $primary 30%'
              color: "#0070f0"
              // color:COLOR.yellow
            }}
          >
            {title}
          </Text>
        </Col>
        <Col span={2} css={{ flex: 1 }}>
            <WalletConnectButton size="xs"/>
        </Col>
      </Row>
      <Divider css={{ marginBottom: '$10' }} />
    </Fragment>
  )
}
