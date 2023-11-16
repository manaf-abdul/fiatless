# Wallet (React, Typescript, Ethers, NextJS, Cosmos)

This example aims to demonstrate basic and advanced use cases enabled by WalletConnect's Sign SDK.

**The wallet implements Sign v1 and v2 side-by-side**, to serve as a reference for wallet developers
aiming to support both major versions for backwards compatibility. **All files containing code for the legacy
v1 implementation are prefixed with `Legacy...`.**

Please only use this for reference and development purposes, otherwise you are at risk of losing your funds.

# Useful links

🔗 Live wallet app - [https://owpc-wallet.vercel.app/] <br />
🔗 Live dapp - [https://owpc-royalty.vercel.app/] <br />

## Getting started
 is built atop of [NextJS](https://nextjs.org/) in order to abstract complexity of setting up bundlers, routing etc. So there are few steps you need to follow in order to set everything up

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in) and obtain a project id

2. Add your project details in [WalletConnectUtil.ts](https://github.com/WalletConnect/web-examples/blob/main/wallets/react-wallet-v2/src/utils/WalletConnectUtil.ts) file

3. Install dependencies `yarn install` or `npm install`

4. Setup your environment variables

```bash
cp .env.local.example .env.local
```

Your `.env.local` now contains the following environment variables:

- `NEXT_PUBLIC_PROJECT_ID` (placeholder) - You can generate your own ProjectId at https://cloud.walletconnect.com
- `NEXT_PUBLIC_RELAY_URL` (already set)

5. Run `yarn dev` or `npm run dev` to start local development


## DOM Tags
This section is a key of the DOM elements used for internal E2E testing
Accessible with `data-testid`

### Navbar
| Key | Description |
| ----------- | ----------- |
|  `accounts` | Accounts page |
| `sessions` | Sessions page |
| `wc-connect` |  WC Connect page |
| `pairings` | Pairings page |
| `settings` | Settings Page |

### WC Connect Page
url: `/walletconnect`
| Key | Description |
| ----------- | ----------- |
| `uri-input` | Uri textbox |
| `uri-connect-button` | Uri connect button |
| `qrcode-button` | Use qrcode button | 

### Sessions Page
url: `/session`
| Key | Description |
| ----------- | ----------- |
| `session-card` | Session cards can be accessed by topic |
| `session-icon` | Icon used on session card |
| `session-text` | Text listed on session card |
| `session-link` | Link listed on session card |

### Session Details Page
url: `/session?topic=`
| Key | Description |
| ----------- | ----------- |
| `session-card-${chain}` | Session chain info card |
| `session-delete-button` | Session delete button |
| `session-ping-button` | Session ping button |
| `session-emit-button` | Session emit button |
| `session-update-button` | Session update button |

### Pairing Page
url: `/pairings`
| Key | Description |
| ----------- | ----------- |
| `pairing-${topic}` | Pairing cards can be accessed by topic |
| `pairing-text-${topic}` | Pairing card text in label | 
| `pairing-url-${topic}` | Pairing card link in label| 
| `pairing-delete-${topic}` | Delete pairing by topic |


### Accounts Page
url: `/`
| Key | Description |
| ----------- | ----------- |
| `account-picker` | Account drop down selector|
| `chain-card-${chain id}` | Chain card by chain id |
| `chain-switch-button-${chain id}` | Chain switch button |
| `chain-switch-button-${chain id}` | Chain copy button |

### Settings Page
url: `/settings`
| Key | Description |
| ----------- | ----------- |
| `settings-toggle-testnets` | Toggle testnet support on/off |
| `settings-region-select` | Select relayer region |

### Session Proposal View
| Key | Description |
| ----------- | ----------- |
| `session-approve-button` | Session approve button |
| `session-reject-button` | Session reject button |
| `session-info-card-text` | Session text info in header |
| `session-info-card-url` | Session info url in header |
| `session-info-card-verify` | Session info verify api in header |
| `session-proposal-card-req-{chain}` | Session card for each required chain |
| `session-proposal-card-opt-{chain}` | Session card for each optional chain |
| `account-select-card-${req/opt}-${index}` | Account selection checkbox by account index|
| `account-select-text-${req/opt}-${index}` | Account selection text by account index |


### Sign Request View 
| Key | Description |
| ----------- | ----------- |
| `request-details-chain` | List of chains in the request |
| `request-details-relay-protocol` | Protocol used for request |
| `request-methods` | Methods requested |
| `request-button-reject` | Reject button |
| `request-button-approve` | Approve button |
