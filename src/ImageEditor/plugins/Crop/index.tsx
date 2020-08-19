import React from 'react'
import { IconButton, Tooltip, useTheme, Theme } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiCrop } from '@mdi/js'
import { useEffectOnce } from 'react-use'

import { ObjectActivatedData, Actions } from '../../types'

interface Props {
  editor: tuiImageEditor.ImageEditor
  isActive: boolean
  width: number
  height: number
  onChangeActiveAction: (action: Actions | null) => void
}

export function Crop({
  editor,
  isActive,
  width,
  height,
  onChangeActiveAction
}: Props) {
  const theme = useTheme<Theme>()

  useEffectOnce(() => {
    const onObjectActivated = (data: ObjectActivatedData) => {
      if (
        data.type === 'cropzone' &&
        (data.width / data.height).toFixed(2) !== (width / height).toFixed(2)
      ) {
        editor.setCropzoneRect(width / height)
      }
    }

    editor.on('objectActivated', onObjectActivated)

    return () => {}
  })

  const startCropping = async () => {
    editor.startDrawingMode('CROPPER')
    editor.setCropzoneRect(width / height)

    onChangeActiveAction('crop')
  }

  return (
    <>
      <Tooltip title="Crop">
        <span>
          <IconButton size="small" onClick={startCropping}>
            <Icon
              path={mdiCrop}
              size={1.5}
              color={isActive ? theme.palette.secondary.main : '#262626'}
            />
          </IconButton>
        </span>
      </Tooltip>
    </>
  )
}
