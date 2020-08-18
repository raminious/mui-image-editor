import * as React from 'react'

import { ThemeProvider } from '@material-ui/core'

import { theme } from './theme'
import { ImageEditor } from './ImageEditor'

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ImageEditor />
      </ThemeProvider>
    </div>
  )
}
