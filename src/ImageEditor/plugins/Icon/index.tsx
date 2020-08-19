import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiStarOutline } from '@mdi/js'

import { Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  onChangeActiveAction: (action: Actions | null) => void
}

export function Icons({ editor }: Props) {
  const handleRotate = async () => {
    editor.stopDrawingMode()
    editor.rotate(-30)
  }

  return (
    <Tooltip title="Icon">
      <span>
        <IconButton size="small" onClick={handleRotate}>
          <Icon path={mdiStarOutline} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
