import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import pluginPrettier from 'eslint-plugin-prettier'
import boundaries from 'eslint-plugin-boundaries'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json']
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier: pluginPrettier,
      boundaries
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index']
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: 'Import from "{{element}}" to "{{type}}" is not allowed',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['shared', 'entities'] },
            { from: 'features', allow: ['shared', 'entities', 'features'] },
            {
              from: 'widgets',
              allow: ['shared', 'entities', 'features', 'widgets']
            },
            {
              from: 'views',
              allow: ['shared', 'entities', 'features', 'widgets', 'views']
            },
            { from: 'application', allow: ['*'] }
          ]
        }
      ]
    },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'views', pattern: 'src/views/*' },
        { type: 'application', pattern: 'src/application/*' }
      ],
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  },
  prettier
]
