import React from 'react'
import { Box, Divider } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiCancel, mdiFlipHorizontal, mdiFlipVertical } from '@mdi/js'

import { Actions } from '../../types'
import { TextIconButton } from '../../../components/TextIconButton'

interface Props {
  editor: tuiImageEditor.ImageEditor
  onChangeActiveAction: (action: Actions | null) => void
}

export function FlipMenu({ editor }: Props) {
  const flipX = () => {
    editor.flipX()
  }

  const flipY = () => {
    editor.flipY()
  }

  const reset = () => {
    editor.resetFlip()
  }

  return (
    <Box display="flex" justifyContent="space-around">
      <TextIconButton
        icon={<Icon path={mdiFlipHorizontal} size={1} />}
        text="Flip X"
        onClick={flipX}
      />

      <TextIconButton
        icon={<Icon path={mdiFlipVertical} size={1} />}
        text="Flip Y"
        onClick={flipY}
      />

      <Divider orientation="vertical" light />

      <TextIconButton
        icon={<Icon path={mdiCancel} size={1} />}
        text="Cancel"
        onClick={reset}
      />
    </Box>
  )
}
