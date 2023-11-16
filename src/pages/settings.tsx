import PageHeader from '@/components/PageHeader'
import RelayRegionPicker from '@/components/RelayRegionPicker'
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

  const {
    testNets,
  } = useSnapshot(SettingsStore.state)

  return (
    <Fragment>
      <PageHeader title="settings" />
      <Link href='/networks' passHref>
        <div>
          <Text h4 css={{ marginBottom: '$5' }}>
            Networks
          </Text>
          <Row justify="space-between" align="center">
            <Text color="$gray400"><SettingsInputAntennaIcon/>Available networks</Text>
            <Text color="$gray400"><ArrowForwardIosIcon sx={{ color: COLOR.yellow }} /></Text>
          </Row>
        </div>
      </Link>
      <Divider y={2} />

      <Link href='/security' passHref>
        <div>
          <Text h4 css={{ marginBottom: '$5' }}>
            Security
          </Text>
          <Row justify="space-between" align="center">
            <Text color="$gray400"><SecurityIcon/>Accounts,Mnemonics</Text>
            <Text color="$gray400"><ArrowForwardIosIcon sx={{ color: COLOR.yellow }} /></Text>

          </Row>
        </div>
      </Link>
      {/* <Divider y={2} />
      <Text h4 css={{ marginBottom: '$5' }}>
        Testnets
      </Text>
      <Row justify="space-between" align="center">
        <Switch
          checked={testNets}
          onChange={SettingsStore.toggleTestNets}
          data-testid="settings-toggle-testnets"
        />
        <Text>{testNets ? 'Enabled' : 'Disabled'}</Text>
      </Row> */}

      {/* <Divider y={2} />

      <Row justify="space-between" align="center">
        <Text h4 css={{ marginBottom: '$5' }}>
          Relayer Region
        </Text>
        <RelayRegionPicker />
      </Row> */}

      <Divider y={2} />


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

      <Row onClick={() => {
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("access_token")
        router.push('/login')

      }} justify="space-between" align="center">
        <Text h4 css={{ marginBottom: '$5', color: "Red" }}>
          Logout {" "}
          {/* <LogoutIcon/> */}
        </Text>
        {/* <RelayRegionPicker /> */}
      </Row>


    </Fragment>
  )
}
