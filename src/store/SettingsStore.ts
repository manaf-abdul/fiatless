import { Verify } from '@walletconnect/types'
import { proxy } from 'valtio'

/**
 * Types
 */
interface State {
  account: number
  isLoading?:boolean
  chain:any | undefined | boolean
}

/**
 * State
 */
const state = proxy<State>({
  account: 0,
  isLoading:false,
  chain:{} 
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
}

export default SettingsStore
