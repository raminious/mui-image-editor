import React from 'react'
import { IconButton, Tooltip, useTheme, Theme } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiFlipHorizontal } from '@mdi/js'

import { Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  onChangeActiveAction: (action: Actions | null) => void
}

export function Flip({ editor, isActive, onChangeActiveAction }: Props) {
  const theme = useTheme<Theme>()

  const startFlipping = async () => {
    editor.stopDrawingMode()
    onChangeActiveAction('flip')
  }

  return (
    <Tooltip title="Flip">
      <span>
        <IconButton size="small" onClick={startFlipping}>
          <Icon
            path={mdiFlipHorizontal}
            size={1.5}
            color={isActive ? theme.palette.secondary.main : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
