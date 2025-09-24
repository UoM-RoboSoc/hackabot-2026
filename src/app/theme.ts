import type { MantineThemeOverride, MantineTheme } from '@mantine/core'

export const theme: MantineThemeOverride = {
  primaryColor: 'red',
  defaultRadius: 'lg',
  fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  headings: {
    fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    fontWeight: '700',
  },
  components: {
    Button: {
      defaultProps: { variant: 'filled', radius: 'md', size: 'lg' },
      styles: { root: { fontWeight: 600 } },
    },
    Anchor: {
      styles: (theme: MantineTheme) => ({ root: { color: theme.colors.red[4], textUnderlineOffset: 4 } }),
    },
    Paper: {
      styles: { root: { backgroundColor: 'var(--panel)', border: '1px solid var(--border)' } },
    },
  },
}
