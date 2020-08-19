import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiSquareCircle } from '@mdi/js'

import { Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  onChangeActiveAction: (action: Actions | null) => void
}

export function Mask({ editor }: Props) {
  const handleMask = async () => {}

  return (
    <Tooltip title="Mask">
      <span>
        <IconButton size="small" onClick={handleMask}>
          <Icon path={mdiSquareCircle} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
