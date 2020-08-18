import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiFormatTextbox } from '@mdi/js'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Text({ editor }: Props) {
  const handleCreateText = async () => {
    editor.startDrawingMode('Text')
  }

  return (
    <Tooltip title="Text">
      <span>
        <IconButton size="small" onClick={handleCreateText}>
          <Icon path={mdiFormatTextbox} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
