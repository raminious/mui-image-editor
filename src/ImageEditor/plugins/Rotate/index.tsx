import React from 'react'
import { IconButton, Tooltip, useTheme, Theme } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiRotateLeft } from '@mdi/js'

import { Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  onChangeActiveAction: (action: Actions | null) => void
}

export function Rotate({ editor, isActive, onChangeActiveAction }: Props) {
  const theme = useTheme<Theme>()

  const startRotating = async () => {
    editor.stopDrawingMode()
    onChangeActiveAction('rotate')
  }

  return (
    <Tooltip title="Rotate">
      <span>
        <IconButton size="small" onClick={startRotating}>
          <Icon
            path={mdiRotateLeft}
            size={1.5}
            color={isActive ? theme.palette.secondary.main : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
