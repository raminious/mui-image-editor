import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiRestart } from '@mdi/js'
import { useEffectOnce } from 'react-use'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Reset({ editor }: Props) {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffectOnce(() => {
    editor.on('undoStackChanged', (length: number) =>
      setIsDisabled(length === 0)
    )
  })

  const handleReset = async () => {
    editor.stopDrawingMode()
    editor.clearUndoStack()
  }

  return (
    <Tooltip title="Reset">
      <span>
        <IconButton size="small" disabled={isDisabled} onClick={handleReset}>
          <Icon
            path={mdiRestart}
            size={1}
            color={isDisabled ? '#ccc' : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
