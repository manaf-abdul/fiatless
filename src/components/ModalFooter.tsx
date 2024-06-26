import SettingsStore from '@/store/SettingsStore'
import { Button, Modal, Row } from '@nextui-org/react'
import { useMemo } from 'react'
import { useSnapshot } from 'valtio'

interface Props {
  onApprove: () => void
  onReject: () => void
  infoBoxCondition?: boolean
  infoBoxText?: string
  disabledApprove?: boolean
}

export default function ModalFooter({
  onApprove,
  onReject,
  infoBoxCondition,
  infoBoxText,
  disabledApprove,
}: Props) {
  const { isLoading } = useSnapshot(SettingsStore.state)
  // const validation = 

  // const "primary": any = useMemo(() => {
  //   switch (validation) {
  //     case 'INVALID':
  //       return 'error'
  //     case 'UNKNOWN':
  //       return 'warning'
  //     default:
  //       return 'success'
  //   }
  // }, [validation])

  return (
    <Modal.Footer>
      {infoBoxCondition && (
        <Row style={{ textAlign: 'initial' }}>
          <span>{infoBoxText || ''}</span>
        </Row>
      )}
      <Row justify="space-between">
        <Button
          auto
          flat
          style={{ color: 'white', backgroundColor: 'grey' }}
          onPress={onReject}
          data-testid="session-reject-button"
        >
          Reject
        </Button>
        <Button
          auto
          flat
          color={"primary"}
          disabled={disabledApprove || isLoading}
          onPress={onApprove}
          data-testid="session-approve-button"
        >
          {isLoading ? "Loading..." : "Approve" }
        </Button>
      </Row>
    </Modal.Footer>
  )
}
