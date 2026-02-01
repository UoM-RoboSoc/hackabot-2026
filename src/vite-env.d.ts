/// <reference types="vite/client" />
import type React from 'react'

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string
      poster?: string
      alt?: string
      'camera-controls'?: boolean
      'auto-rotate'?: boolean
      'rotation-per-second'?: string
      'environment-image'?: string
      'tone-mapping'?: string
      'interaction-prompt'?: string
      'shadow-intensity'?: string
      'shadow-softness'?: string
      exposure?: string
    }
  }
}
