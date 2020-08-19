import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiDraw } from '@mdi/js'

import { Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  onChangeActiveAction: (action: Actions | null) => void
}

export function Draw({ editor }: Props) {
  const handleDraw = async () => {
    editor.startDrawingMode('FREE_DRAWING', {
      width: 1,
      color: 'red'
    })
  }

  return (
    <Tooltip title="Draw">
      <span>
        <IconButton size="small" onClick={handleDraw}>
          <Icon path={mdiDraw} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
