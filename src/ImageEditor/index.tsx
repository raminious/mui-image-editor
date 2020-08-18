import React from 'react'

import { Box, makeStyles, Theme, Divider, useTheme } from '@material-ui/core'

import { useEditor } from './hooks/use-editor'
import { Undo } from './components/Undo'
import { Redo } from './components/Redo'
import { Reset } from './components/Reset'
import { Delete } from './components/Delete'
import { DeleteAll } from './components/DeleteAll'
import { Crop } from './components/Crop'
import { Draw } from './components/Draw'
import { Text } from './components/Text'
import { Shape } from './components/Shape'
import { Flip } from './components/Flip'
import { Rotate } from './components/Rotate'
import { Icons } from './components/Icon'
import { Mask } from './components/Mask'
import { Filter } from './components/Filter'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: '10%'
    },
    container: {
      width: '70%',
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
const height = 300

export function ImageEditor() {
  const classes = useStyles()
  const theme = useTheme<Theme>()

  const onInit = async (instance: tuiImageEditor.ImageEditor) => {
    await instance.loadImageFromURL(
      'https://pbs.twimg.com/media/Efoj1mgVoAIO5U9?format=jpg&name=900x900',
      'file'
    )

    instance.clearUndoStack()
  }

  const [ref, editor] = useEditor({
    settings: {},
    events: {},
    callbacks: {
      init: onInit
    }
  })

  // const ratio = width / height

  // useEffectOnce(() => {
  // instance.loadImageFromURL(
  //   'https://pbs.twimg.com/media/Efoj1mgVoAIO5U9?format=jpg&name=900x900',
  //   'file'
  // )
  // instance.on('objectAdded', () => console.log('OBJECT ADDED'))
  // instance.on('objectActivated', data => {

  // })
  // editorInstance.current = instance
  // })

  // const handleLoad = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null

  //   if (!file) {
  //     return
  //   }

  //   await getEditor().loadImageFromFile(file, 'Flower')
  //   getEditor().clearUndoStack()
  // }

  const handleCrop = () => {
    editor!.startDrawingMode('CROPPER')
    editor!.setCropzoneRect(width / height)
  }

  // const handleApplyCrop = async () => {
  //   await getEditor().crop(getEditor().getCropzoneRect())
  //   getEditor().stopDrawingMode()
  // }

  // const handleDraw = () => {
  //   getEditor().startDrawingMode('FREE_DRAWING', {
  //     width: 4,
  //     color: 'red'
  //   })
  // }

  return (
    <div>
      {/* <input accept="image/*" type="file" onChange={() => {}} /> */}

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
              <Crop editor={editor} width={width} height={height} />
              <Flip editor={editor} />
              <Rotate editor={editor} />
              <Mask editor={editor} />
            </div>

            <div className={classes.iconsRow}>
              <Draw editor={editor} />
              <Text editor={editor} />
              <Shape editor={editor} />
              <Icons editor={editor} />
            </div>

            <div className={classes.iconsRow}>
              <Filter editor={editor} />
            </div>
          </div>
        )}
      </Box>
    </div>
  )
}
