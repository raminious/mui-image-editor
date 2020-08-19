import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiFormatTextbox } from '@mdi/js'

import { Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  onChangeActiveAction: (action: Actions | null) => void
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
