import type { MantineThemeOverride } from '@mantine/core'

// Create a custom Mantine theme wired to CSS variables
export const theme: MantineThemeOverride = {
  primaryColor: 'crimson',
  primaryShade: 6,
  defaultRadius: 'lg',
  fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  headings: {
    fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    fontWeight: '700',
  },
  colors: {
    // Custom red scale mapped to coastal palette accents
    crimson: [
      '#fff1f3', // 0
      '#ffd5dc', // 1
      '#ffacb9', // 2
      '#ff8397', // 3
      '#ff5b74', // 4
      '#ff3351', // 5
      '#ef233c', // 6 (red pantone)
      '#d90429', // 7 (fire engine red)
      '#b10221', // 8
      '#7c0116', // 9
    ],
  },
  components: {
    Button: {
      defaultProps: { variant: 'filled', radius: 'md', size: 'lg' },
      styles: { root: { fontWeight: 600 } },
    },
    Anchor: { styles: { root: { color: 'var(--accent-strong)', textUnderlineOffset: 4 } } },
    Paper: { styles: { root: { backgroundColor: 'var(--panel)', border: '1px solid var(--border)' } } },
  },
}
