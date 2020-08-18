import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiDeleteOutline } from '@mdi/js'
import { useEffectOnce } from 'react-use'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Delete({ editor }: Props) {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffectOnce(() => {
    editor.on('undoStackChanged', (length: number) =>
      setIsDisabled(length === 0)
    )
  })

  const handleDeleteActiveObject = async () => {
    editor.removeActiveObject()
  }

  return (
    <Tooltip title="Delete">
      <span>
        <IconButton
          size="small"
          disabled={isDisabled}
          onClick={handleDeleteActiveObject}
        >
          <Icon
            path={mdiDeleteOutline}
            size={1}
            color={isDisabled ? '#ccc' : '#262626'}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
