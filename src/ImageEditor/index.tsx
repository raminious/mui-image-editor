import React, { useState } from 'react'

import { Box, makeStyles, Theme, Divider, useTheme } from '@material-ui/core'

import { useEditor } from './hooks/use-editor'
import { Undo } from './plugins/Undo'
import { Redo } from './plugins/Redo'
import { Reset } from './plugins/Reset'
import { Delete } from './plugins/Delete'
import { DeleteAll } from './plugins/DeleteAll'
import { Crop } from './plugins/Crop'
import { Draw } from './plugins/Draw'
import { Text } from './plugins/Text'
import { Shape } from './plugins/Shape'
import { Flip } from './plugins/Flip'
import { Rotate } from './plugins/Rotate'
import { Icons } from './plugins/Icon'
import { Mask } from './plugins/Mask'
import { Filter } from './plugins/Filter'
import { Actions } from './types'
import { CropMenu } from './plugins/Crop/Menu'
import { FlipMenu } from './plugins/Flip/Menu'
import { RotateMenu } from './plugins/Rotate/Menu'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: '10%'
    },
    container: {
      width: '75%',
      height: '500px',
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(1, 0),
      '& .tui-image-editor-canvas-container': {
        margin: '0 auto'
      },
      '& canvas': {
        borderRadius: theme.shape.borderRadius
      }
    },
    sidebar: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(1, 2),
      borderLeft: `1px solid ${theme.palette.grey[200]}`
    },
    iconsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(1.25)
    },
    horizontalDivider: {
      margin: theme.spacing(1.5, 0)
    }
  }),
  {
    name: 'ImageEditor'
  }
)

const width = 200
const height = 200

export function ImageEditor() {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [action, setAction] = useState<Actions | null>(null)

  const onInit = async (instance: tuiImageEditor.ImageEditor) => {
    await instance.loadImageFromURL(
      'https://pbs.twimg.com/media/Efoj1mgVoAIO5U9?format=jpg&name=900x900',
      'file'
    )

    instance.clearUndoStack()
  }

  const setActiveAction = (action: Actions | null) => setAction(action)

  const [ref, editor] = useEditor(
    {},
    {
      init: onInit
    }
  )

  const sharedProps = {
    editor: editor!,
    onChangeActiveAction: setActiveAction
  }

  return (
    <div>
      <Box display="flex" className={classes.root}>
        <div ref={ref} className={classes.container} />

        {editor && (
          <div className={classes.sidebar}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              height={theme.spacing(6)}
            >
              <Undo editor={editor} />
              <Redo editor={editor} />
              <Reset editor={editor} />
              <Divider
                variant="middle"
                orientation="vertical"
                style={{
                  height: '50%'
                }}
              />
              <Delete editor={editor} />
              <DeleteAll editor={editor} />
            </Box>

            <Divider variant="middle" className={classes.horizontalDivider} />

            <div className={classes.iconsRow}>
              <Crop
                isActive={action === 'crop'}
                width={width}
                height={height}
                {...sharedProps}
              />
              <Flip isActive={action === 'flip'} {...sharedProps} />
              <Rotate isActive={action === 'rotate'} {...sharedProps} />
              <Mask isActive={action === 'mask'} {...sharedProps} />
            </div>

            <div className={classes.iconsRow}>
              <Draw isActive={action === 'draw'} {...sharedProps} />
              <Text isActive={action === 'text'} {...sharedProps} />
              <Shape isActive={action === 'shape'} {...sharedProps} />
              <Icons isActive={action === 'icon'} {...sharedProps} />
            </div>

            <div className={classes.iconsRow}>
              <Filter isActive={action === 'filter'} {...sharedProps} />
            </div>

            {action && (
              <Divider variant="middle" className={classes.horizontalDivider} />
            )}

            {action === 'crop' && <CropMenu {...sharedProps} />}
            {action === 'flip' && <FlipMenu {...sharedProps} />}
            {action === 'rotate' && <RotateMenu {...sharedProps} />}
          </div>
        )}
      </Box>
    </div>
  )
}
