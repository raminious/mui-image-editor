import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiUndoVariant } from '@mdi/js'
import { useEffectOnce } from 'react-use'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Undo({ editor }: Props) {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffectOnce(() => {
    editor.on('undoStackChanged', (length: number) =>
      setIsDisabled(length === 0)
    )
  })

  const handleUndo = () => editor.undo()

  return (
    <Tooltip title="Undo">
      <span>
        <IconButton size="small" disabled={isDisabled} onClick={handleUndo}>
          <Icon
            path={mdiUndoVariant}
            size={1}
            color={isDisabled ? '#ccc' : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
