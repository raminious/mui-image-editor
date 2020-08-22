import React, { useState } from 'react'

import { Box, makeStyles, Theme, ButtonGroup } from '@material-ui/core'

import { useEditor } from './hooks/use-editor'
import { Undo } from './plugins/Undo'
import { Redo } from './plugins/Redo'
import { Delete } from './plugins/Delete'
import { Crop } from './plugins/Crop'
import { Draw } from './plugins/Draw'
import { Text } from './plugins/Text'
import { Rotate } from './plugins/Rotate'
import { CropActions } from './plugins/Crop/CropActions'
import { DrawActions } from './plugins/Draw/DrawActions'
import { TextActions } from './plugins/Text/TextActions'
import type { Actions, ImageEditor } from './types'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      maxHeight: '90vh',
      overflow: 'auto'
    },
    canvas: {
      maxHeight: '100vh',
      padding: theme.spacing(1, 0),
      '& .tui-image-editor-canvas-container': {
        margin: '0 auto'
      },
      '& canvas': {
        borderRadius: theme.shape.borderRadius
      },
      backgroundColor: theme.palette.grey[50]
    },
    menu: {
      padding: theme.spacing(1),
      borderTop: `1px solid ${theme.palette.divider}`
    },
    menuContainer: {
      position: 'sticky',
      bottom: 0,
      background: '#fff'
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

const imageWidth = 200
const imageHeight = 200

export function Editor() {
  const classes = useStyles()
  const [height, setHeight] = useState('0px')
  const [action, setAction] = useState<Actions | null>(null)

  const onInit = async (instance: ImageEditor) => {
    await instance.loadImageFromURL(
      'https://pbs.twimg.com/media/Ef-X_GkX0AE91LM?format=jpg&name=medium',
      'file'
    )

    resizeEditor()
    instance.clearUndoStack()
  }

  const setActiveAction = (action: Actions | null) => setAction(action)

  const [ref, editor] = useEditor(
    {},
    {
      init: onInit
    }
  )

  const resizeEditor = () => {
    if (!ref.current) {
      return
    }

    const height = getComputedStyle(ref.current, null).getPropertyValue(
      'max-height'
    )

    setHeight(height)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      className={classes.root}
    >
      <div
        ref={ref}
        className={classes.canvas}
        style={{
          height
        }}
      />

      {editor && (
        <div className={classes.menuContainer}>
          {action && (
            <Box
              display="flex"
              justifyContent="space-between"
              className={classes.menu}
            >
              {action === 'crop' && (
                <CropActions
                  editor={editor}
                  onChangeActiveAction={setActiveAction}
                  onCrop={resizeEditor}
                />
              )}

              {action === 'draw' && (
                <DrawActions
                  editor={editor}
                  onChangeActiveAction={setActiveAction}
                />
              )}

              {action === 'text' && (
                <TextActions
                  editor={editor}
                  onChangeActiveAction={setActiveAction}
                />
              )}
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.menu}
          >
            <Box display="flex">
              <ButtonGroup size="small">
                <Crop
                  editor={editor}
                  isActive={action === 'crop'}
                  width={imageWidth}
                  height={imageHeight}
                  onChangeActiveAction={setActiveAction}
                />

                <Rotate
                  editor={editor}
                  isActive={action === 'rotate'}
                  onChangeActiveAction={setActiveAction}
                  onRotate={resizeEditor}
                />

                <Draw
                  editor={editor}
                  isActive={action === 'draw'}
                  onChangeActiveAction={setActiveAction}
                />

                <Text
                  editor={editor}
                  isActive={action === 'text'}
                  onChangeActiveAction={setActiveAction}
                />
              </ButtonGroup>
            </Box>

            <Box display="flex">
              <ButtonGroup size="small">
                <Redo editor={editor} onRedo={resizeEditor} />
                <Undo editor={editor} onUndo={resizeEditor} />
                <Delete editor={editor} />
              </ButtonGroup>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  )
}
