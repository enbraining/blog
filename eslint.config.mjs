/**
 * ESLint flat config: Next.js core-web-vitals rules; global ignores for .next, build output, and .content-collections.
 */
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
    ...nextVitals,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        '.content-collections/**',
    ]),
])

export default eslintConfig
