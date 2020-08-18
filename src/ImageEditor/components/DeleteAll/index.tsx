import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiDeleteEmptyOutline } from '@mdi/js'
import { useEffectOnce } from 'react-use'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function DeleteAll({ editor }: Props) {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffectOnce(() => {
    editor.on('undoStackChanged', (length: number) =>
      setIsDisabled(length === 0)
    )
  })

  const handleDeleteAll = async () => {
    editor.stopDrawingMode()
    editor.clearObjects()
  }

  return (
    <Tooltip title="Delete All">
      <span>
        <IconButton
          size="small"
          disabled={isDisabled}
          onClick={handleDeleteAll}
        >
          <Icon
            path={mdiDeleteEmptyOutline}
            size={1}
            color={isDisabled ? '#ccc' : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
