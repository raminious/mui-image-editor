import { useRef, useState } from 'react'

import TuiImageEditor from 'tui-image-editor'
import { useEffectOnce } from 'react-use'

interface IEvents {
  [key: string]: (editor: TuiImageEditor, ...args: any[]) => void
}

type Callbacks = Partial<
  {
    [key in 'init' | 'unload']: (instance: TuiImageEditor) => void
  }
>

interface IOptions {
  settings?: tuiImageEditor.IOptions
  events?: IEvents
  callbacks?: Callbacks
}

export function useEditor({
  settings = {},
  events = {},
  callbacks = {}
}: IOptions): [typeof containerRef, typeof instance] {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [instance, setInstance] = useState<TuiImageEditor | null>(null)

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

    // bind events
    Object.entries(events).forEach(([name, fn]) =>
      editor.on(name, fn.bind(null, editor))
    )

    setInstance(editor)

    callbacks.init?.(editor)

    return () => {
      callbacks.unload?.(editor)
    }
  })

  return [containerRef, instance]
}
