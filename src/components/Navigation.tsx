import { COLOR } from '@/constants/style'
import { Avatar, Row } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function Navigation() {
  return (

    <Row justify="space-between" align="center">
      <Link href="/transactionhistory" passHref>
        <a className="navLink" data-testid="accounts">
          <Image alt="accounts icon" src="/icons/accounts-icon.svg" width={27} height={27} />
        </a>
      </Link>

      <Link href="/buy" passHref>
        <a className="navLink" data-testid="pairings">
          <DownloadIcon />
        </a>
      </Link>

      <Link href="/sell" passHref>
        <a className="navLink" data-testid="wc-connect">
          <FileUploadIcon />
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
