import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LeaveConfirmModal } from './LeaveConfirmModal'

type Options = {
  when: boolean
  message?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const usePageLeaveConfirm = ({
  when,
  message = 'Are you sure you want to leave this page?',
  onConfirm,
  onCancel,
}: Options) => {
  const [showModal, setShowModal] = useState(false)
  const modalContainerRef = useRef<HTMLDivElement | null>(null)
  const blockBackRef = useRef(false)

  // 1. native confirm for reload / close tab
  useEffect(() => {
    if (!when) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [when])

  // 2. custom modal for back navigation
  useEffect(() => {
    if (!when) return

    // push a dummy state to make "Back" button active
    if (!window.history.state || !window.history.state.__pageLeaveConfirm) {
      window.history.pushState({ __pageLeaveConfirm: true }, '')
    }

    const handlePopState = (e: PopStateEvent) => {
      if (!when) return
      blockBackRef.current = true
      setShowModal(true)
      // prevent actual back navigation
      window.history.pushState({ __pageLeaveConfirm: true }, '')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [when])

  // 3. render modal with portal (auto-rendered, not returned)
  useEffect(() => {
    if (!showModal) return

    const el = document.createElement('div')
    document.body.appendChild(el)
    modalContainerRef.current = el

    const cleanup = () => {
      if (modalContainerRef.current) {
        document.body.removeChild(modalContainerRef.current)
        modalContainerRef.current = null
      }
    }

    const portal = createPortal(
      <LeaveConfirmModal
        message={message}
        onConfirm={() => {
          cleanup()
          setShowModal(false)
          onConfirm?.()

          if (blockBackRef.current) {
            blockBackRef.current = false
            window.removeEventListener('popstate', () => {})
            window.history.back()
          }
        }}
        onCancel={() => {
          cleanup()
          setShowModal(false)
          onCancel?.()
        }}
      />,
      el
    )

    // Trick: force React to render this portal
    const Wrapper = () => portal
    const wrapperDiv = document.createElement('div')
    el.appendChild(wrapperDiv)

    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(wrapperDiv)
      root.render(<Wrapper />)
    })

    return cleanup
  }, [showModal, message, onConfirm, onCancel])
}
