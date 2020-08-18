import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiShape } from '@mdi/js'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Shape({ editor }: Props) {
  const handleCreateShape = async () => {}

  return (
    <Tooltip title="Shape">
      <span>
        <IconButton size="small" onClick={handleCreateShape}>
          <Icon path={mdiShape} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
