type Props = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * LeaveConfirmModal
 *
 * Simple confirmation dialog for navigation.
 */
export const LeaveConfirmModal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <div style={overlay}>
      <div style={modal}>
        <p>{message}</p>
        <div style={actions}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Leave</button>
        </div>
      </div>
    </div>
  )
}

const overlay: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
}

const modal: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
}

const actions: React.CSSProperties = {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
}
