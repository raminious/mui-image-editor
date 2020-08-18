import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiFlipHorizontal } from '@mdi/js'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Flip({ editor }: Props) {
  const handleFlip = async () => {
    editor.stopDrawingMode()
    editor.flipX()
  }

  return (
    <Tooltip title="Flip">
      <span>
        <IconButton size="small" onClick={handleFlip}>
          <Icon path={mdiFlipHorizontal} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
