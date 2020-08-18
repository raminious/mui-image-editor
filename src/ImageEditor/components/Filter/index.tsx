import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiImageFilterBlackWhite } from '@mdi/js'

interface Props {
  editor: tuiImageEditor.ImageEditor
}

export function Filter({ editor }: Props) {
  const handleCreateFilter = async () => {}

  return (
    <Tooltip title="Filter">
      <span>
        <IconButton size="small" onClick={handleCreateFilter}>
          <Icon path={mdiImageFilterBlackWhite} size={1.5} color="#262626" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
