export interface ObjectActivatedData {
  id: number
  type: 'cropzone'
  width: number
  height: number
}

export type Actions =
  | 'crop'
  | 'flip'
  | 'rotate'
  | 'mask'
  | 'draw'
  | 'text'
  | 'shape'
  | 'icon'
  | 'filter'
