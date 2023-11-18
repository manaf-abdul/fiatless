import PageHeader from '@/components/PageHeader'
import SettingsStore from '@/store/SettingsStore'
import { Card, Divider, Row, Switch, Text } from '@nextui-org/react'
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'
import Link from 'next/link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { COLOR } from '@/constants/style'
import { useRouter } from 'next/router'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';

export default function SettingsPage() {

  const router = useRouter()

  return (
    <Fragment>
      <PageHeader title="settings" />
      <Link href='/about-us' passHref>
        <div>
          <Text h4 css={{ marginBottom: '$5' }}>
            About Us
          </Text>
          <Row justify="space-between" align="center">
          
            <Text color="$gray400"><InfoIcon/>Privacy Policy, Terms and Conditions</Text>
            <Text color="$gray400"><ArrowForwardIosIcon sx={{ color: COLOR.yellow }} /></Text>

          </Row>
        </div>
      </Link>
      <Divider y={2} />
    </Fragment>
  )
}
