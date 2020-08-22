import * as React from 'react'

import { ThemeProvider } from '@material-ui/core'

import { theme } from './theme'
import { Editor } from './ImageEditor'

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Editor />
      </ThemeProvider>
    </>
  )
}
