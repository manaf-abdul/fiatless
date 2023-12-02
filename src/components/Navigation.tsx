import { COLOR } from '@/constants/style'
import { DollarTwoTone, DownCircleTwoTone } from '@ant-design/icons'
import { Avatar, Row } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  return (

    <Row justify="space-between" align="center">
      <Link href="/home" passHref>
        <a className="navLink" data-testid="accounts">
          <Image alt="accounts icon" src="/icons/accounts-icon.svg" width={27} height={27} />
        </a>
      </Link>

      <Link href="/buy" passHref>
        <a className="navLink" data-testid="pairings">
          <DollarTwoTone rev={""} style={{fontSize:"2.2rem",paddingBottom:"0.2rem"}}/>
        </a>
      </Link>

      <Link href="/sell" passHref>
        <a className="navLink" data-testid="wc-connect">
        <DownCircleTwoTone rev={""} style={{fontSize:"2.2rem",paddingBottom:"0.2rem"}}/>
        </a>
      </Link>

      <Link href="/settings" passHref>
        <a className="navLink" data-testid="settings">
          <Image alt="settings icon" src="/icons/settings-icon.svg" width={27} height={27} />
        </a>
      </Link>
    </Row>
  )
}
