import { useEffect, useState } from 'react'
import { usePageLeaveConfirm } from '../src/usePageLeaveConfirm'

export const App = () => {
  const [text, setText] = useState('')
  const [isSaved, setIsSaved] = useState(true)

  usePageLeaveConfirm({
    when: !isSaved,
    message: 'You have unsaved changes. Are you sure you want to leave?',
    onConfirm: () => console.log('User confirmed navigation.'),
    onCancel: () => console.log('User cancelled navigation.'),
  })

  return (
    <div style={{ padding: 20 }}>
      <h1>Leave Confirm Example</h1>
      <textarea
        rows={6}
        cols={40}
        value={text}
        onChange={e => {
          setText(e.target.value)
          setIsSaved(false)
        }}
        placeholder="Type something..."
      />
      <br />
      <button onClick={() => setIsSaved(true)}>{isSaved ? 'Saved' : 'Save'}</button>
    </div>
  )
}
