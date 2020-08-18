import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiCrop } from '@mdi/js'
import { useEffectOnce } from 'react-use'

import { ObjectActivatedData } from '../../types'

interface Props {
  width: number
  height: number
  editor: tuiImageEditor.ImageEditor
}

export function Crop({ editor, width, height }: Props) {
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

  const handleCrop = async () => {
    editor.startDrawingMode('CROPPER')
    editor.setCropzoneRect(width / height)
  }

  return (
    <Tooltip title="Crop">
      <span>
        <IconButton size="small" onClick={handleCrop}>
          <Icon path={mdiCrop} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
