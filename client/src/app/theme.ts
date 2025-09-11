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
    // Derive a crimson scale from CSS variables (approximation for Mantine)
    crimson: [
      '#2e0a0f', // 0
      '#3a0d14', // 1
      '#4b0f16', // 2
      '#640d14', // 3 (rosewood)
      '#800e13', // 4 (falu-red)
      '#9a1820', // 5
      '#ad2831', // 6 (auburn)
      '#c23a44', // 7
      '#d64a55', // 8
      '#f06a74', // 9
    ],
  },
  components: {
    Button: {
      defaultProps: { variant: 'filled', radius: 'md', size: 'lg' },
      styles: { root: { fontWeight: 600 } },
    },
    Anchor: { styles: { root: { color: 'var(--auburn)', textUnderlineOffset: 4 } } },
    Paper: { styles: { root: { backgroundColor: 'var(--panel)', border: '1px solid var(--border)' } } },
  },
}
