import { useRef, useState } from 'react'

import TuiImageEditor from 'tui-image-editor'
import { useEffectOnce } from 'react-use'

import { ImageEditor } from '../../types'

type Callbacks = Partial<
  {
    [key in 'init' | 'unload']: (instance: ImageEditor) => void
  }
>

export function useEditor(
  settings: tuiImageEditor.IOptions = {},
  callbacks: Callbacks = {}
): [typeof containerRef, typeof instance] {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [instance, setInstance] = useState<ImageEditor | null>(null)

  useEffectOnce(() => {
    if (!containerRef.current) {
      return
    }

    const editor = new TuiImageEditor(containerRef.current, {
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
      },
      ...settings
    })

    setInstance(editor)

    callbacks.init?.(editor)

    return () => {
      callbacks.unload?.(editor)
    }
  })

  return [containerRef, instance]
}
