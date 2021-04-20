import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const version = process.env.RELEASE_VERSION

const devBanner = `/**
* TimrJS React Hook v${version}
* https://github.com/joe-castle/timrjs-react-hook
* https://www.npmjs.com/package/timrjs-react-hook
*
* Compatible with Browsers, Node.js (CommonJS) and RequireJS.
*
* Copyright (c) ${new Date().getFullYear()} Joe Castle
* Released under the MIT license
* https://github.com/joe-castle/timrjs/blob/master/LICENSE.md
*/`

const prodBanner = `/* TimrJS React Hook v${version} | (c) ${new Date().getFullYear()} Joe Castle | https://github.com/joe-castle/timrjs-react-hook */`

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/timrjs-react-hook.js',
      format: 'cjs',
      banner: devBanner
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'es/timrjs-react-hook.js',
      format: 'es',
      banner: devBanner
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'es/timrjs-react-hook.mjs',
      format: 'es',
      banner: prodBanner
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      terser({
        format: {
          comments: /TimrJS v\d+\.\d+\.\d+/g
        },
        compress: {
          unsafe: true,
          unsafe_comps: true
        }
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/timrjs-react-hook.js',
      format: 'umd',
      name: 'Timr',
      banner: devBanner
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/timrjs-react-hook.min.js',
      format: 'umd',
      name: 'Timr',
      banner: prodBanner,
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      terser({
        format: {
          comments: /TimrJS v\d+\.\d+\.\d+/g
        },
        compress: {
          unsafe: true,
          unsafe_comps: true
        }
      })
    ]
  }
]