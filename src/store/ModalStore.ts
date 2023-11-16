import { SessionTypes, SignClientTypes } from '@walletconnect/types'
import { proxy } from 'valtio'

/**
 * Types
 */

interface State {
  open: boolean
  view?:
    | 'AuthModal'
}

/**
 * State
 */
const state = proxy<State>({
  open: false
})

/**
 * Store / Actions
 */
const ModalStore = {
  state,

  open(view: State['view'], ) {
    state.view = view
    state.open = true
  },

  close() {
    state.open = false
  }
}

export default ModalStore
