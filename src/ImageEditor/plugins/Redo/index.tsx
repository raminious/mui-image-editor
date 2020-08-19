import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiRedoVariant } from '@mdi/js'
import { useEffectOnce } from 'react-use'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Redo({ editor }: Props) {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffectOnce(() => {
    editor.on('redoStackChanged', (length: number) =>
      setIsDisabled(length === 0)
    )
  })

  const handleRedo = () => editor.redo()

  return (
    <Tooltip title="Redo">
      <span>
        <IconButton size="small" disabled={isDisabled} onClick={handleRedo}>
          <Icon
            path={mdiRedoVariant}
            size={1}
            color={isDisabled ? '#ccc' : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
