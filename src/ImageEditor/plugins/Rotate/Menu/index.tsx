import React, { useState } from 'react'
import {
  Box,
  Slider,
  makeStyles,
  Theme,
  useTheme,
  Typography
} from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiRotateLeft, mdiRotateRight } from '@mdi/js'

import { Actions } from '../../types'
import { TextIconButton } from '../../../components/TextIconButton'

interface Props {
  editor: tuiImageEditor.ImageEditor
  onChangeActiveAction: (action: Actions | null) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  slider: {
    marginTop: theme.spacing(5)
  }
}))

export function RotateMenu({ editor, onChangeActiveAction }: Props) {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [rotateValue, setRotateValue] = useState(0)

  const rotate90Left = () => {
    const value = rotateValue - 90 < -360 ? rotateValue : rotateValue - 90

    setRotateValue(value)
    editor.setAngle(value)
  }

  const rotate90Right = () => {
    const value = rotateValue + 90 > 360 ? rotateValue : rotateValue + 90

    setRotateValue(value)
    editor.setAngle(value)
  }

  const handleRotate = (_: React.ChangeEvent<{}>, value: number | number[]) => {
    setRotateValue(value as number)
    editor.setAngle(value as number)
  }

  return (
    <>
      <Box display="flex">
        <TextIconButton
          icon={<Icon path={mdiRotateLeft} size={1.2} />}
          text="-90"
          style={{
            marginRight: theme.spacing(2)
          }}
          onClick={rotate90Left}
        />

        <TextIconButton
          icon={<Icon path={mdiRotateRight} size={1.2} />}
          text="+90"
          onClick={rotate90Right}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.slider}
      >
        <Typography variant="body2">-360</Typography>
        <Slider
          min={-360}
          max={360}
          value={rotateValue}
          color="secondary"
          valueLabelDisplay="on"
          style={{
            margin: theme.spacing(0, 2)
          }}
          onChange={handleRotate}
        />
        <Typography variant="body2">+360</Typography>
      </Box>
    </>
  )
}
