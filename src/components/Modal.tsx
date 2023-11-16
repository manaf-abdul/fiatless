import ModalStore from '@/store/ModalStore'
import { Modal as NextModal } from '@nextui-org/react'
import { useSnapshot } from 'valtio'
import { useCallback } from 'react'

export default function Modal() {
  const { open, view } = useSnapshot(ModalStore.state)
  // handle the modal being closed by click outside
  const onClose = useCallback(() => {
    if (open) {
      ModalStore.close()
    }
  }, [open])

  return (
    <NextModal
      blur
      onClose={onClose}
      open={open}
      style={{ border: '1px solid rgba(139, 139, 139, 0.4)' }}
    >
    </NextModal>
  )
}
