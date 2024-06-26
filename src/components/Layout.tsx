import Navigation from '@/components/Navigation'
import RouteTransition from '@/components/RouteTransition'
import { Card, Container, Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { Fragment, ReactNode } from 'react'

/**
 * Types
 */
interface Props {
  initialized: boolean
  children: ReactNode | ReactNode[]
}
import { Web3Modal } from "../context/Web3Modal";

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

/**
 * Container
 */
export default function Layout({ children, initialized = true }: Props) {

  const router = useRouter();
  const { asPath } = router;
  const noNav = ['/login', '/register'];

  return (
    <Web3Modal>
      <Container
        display="flex"
        justify="center"
        alignItems="center"
        css={{
          width: '100vw',
          height: '100vh',
          paddingLeft: 0,
          paddingRight: 0,
          // backgroundImage:`url(/assets/mobile-background.png)`

        }}
      >
        <Card
          bordered={{ '@initial': false, '@xs': true }}
          borderWeight={{ '@initial': 'light', '@xs': 'light' }}
          css={{
            height: '100%',
            width: '100%',
            justifyContent: initialized ? 'normal' : 'center',
            alignItems: initialized ? 'normal' : 'center',
            borderRadius: 0,
            paddingBottom: 5,
            '@xs': {
              borderRadius: '$lg',
              height: '95vh',
              maxWidth: '450px'
            },
            background: "inherit"
          }}
        >
          {initialized ? (
            <Fragment>
              <RouteTransition>
                <Card.Body
                  css={{
                    display: 'block',
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingBottom: '40px',
                    '@xs': {
                      padding: '20px',
                      paddingBottom: '40px'
                    }
                  }}
                >
                  {children}
                </Card.Body>
              </RouteTransition>

              <Card.Footer
                css={{
                  height: '67px',
                  minHeight: '67px',
                  position: 'sticky',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  // boxShadow: '0 -20px 10px #111111',
                  backgroundColor: '#111111',
                  zIndex: 100,
                  bottom: 0,
                  left: 0
                }}
              >
                {noNav.includes(asPath) ? <></> : <Navigation />}
              </Card.Footer>
            </Fragment>
          ) : (
            <Loading />
          )}
        </Card>
      </Container>
    </Web3Modal>
  )
}
