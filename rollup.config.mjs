import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ['src/background/contextMenu.ts', 'src/views/options.ts'],
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [typescript(), terser()],
}

export default config
