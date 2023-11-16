import { Verify } from '@walletconnect/types'
import { proxy } from 'valtio'

/**
 * Types
 */
interface State {
  account: number
  isLoading?: boolean
  chain: any | undefined | boolean
  isAuth: boolean
}

/**
 * State
 */
const state = proxy<State>({
  account: 0,
  isLoading: false,
  chain: {},
  isAuth: false
})

/**
 * Store / Actions
 */
const SettingsStore = {
  state,


  setLoading(value: boolean) {
    state.isLoading = value
  },

  setChain(value: boolean) {
    state.chain = value
  },

  setAuth(value: boolean) {
    state.isAuth = value
  },
}

export default SettingsStore
