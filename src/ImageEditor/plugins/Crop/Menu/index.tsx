import React from 'react'
import { Box } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiCheckOutline, mdiCancel } from '@mdi/js'

import { Actions } from '../../types'
import { TextIconButton } from '../../../components/TextIconButton'

interface Props {
  editor: tuiImageEditor.ImageEditor
  onChangeActiveAction: (action: Actions | null) => void
}

export function CropMenu({ editor, onChangeActiveAction }: Props) {
  const crop = () => {
    editor.crop(editor.getCropzoneRect())
    onChangeActiveAction(null)
  }

  const cancel = () => {
    editor.stopDrawingMode()
    onChangeActiveAction(null)
  }

  return (
    <Box display="flex" justifyContent="space-around">
      <TextIconButton
        icon={<Icon path={mdiCheckOutline} size={1} />}
        text="Crop"
        onClick={crop}
      />

      <TextIconButton
        icon={<Icon path={mdiCancel} size={1} />}
        text="Cancel"
        onClick={cancel}
      />
    </Box>
  )
}
