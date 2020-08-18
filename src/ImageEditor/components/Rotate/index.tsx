import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiRotateLeft } from '@mdi/js'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Rotate({ editor }: Props) {
  const handleRotate = async () => {
    editor.stopDrawingMode()
    editor.rotate(-30)
  }

  return (
    <Tooltip title="Rotate">
      <span>
        <IconButton size="small" onClick={handleRotate}>
          <Icon path={mdiRotateLeft} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
