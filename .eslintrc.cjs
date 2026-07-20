module.exports = {
  root: true,
  env: {browser: true, node: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', 'coverage', 'node_modules', '**/dist/**', '*.d.ts', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {jsx: true}
  },
  plugins: ['react-refresh'],
  // react lives in client/, not the root, so pin the version rather than
  // 'detect' (which warns when the package isn't resolvable from here).
  settings: {react: {version: '18.3'}},
  rules: {
    'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    // Readability: multi-property object literals fully expand, one per line.
    // Destructuring and imports/exports are left as authored.
    'object-property-newline': ['error', {allowAllPropertiesOnSameLine: false}],
    'object-curly-newline': ['error', {ObjectExpression: {multiline: true, minProperties: 2, consistent: true}}],
    // Ignore only JSX *structural* nodes (left to react/jsx-indent) so object
    // literals nested inside JSX are still indented by the base rule.
    'indent': ['error', 4, {'SwitchCase': 1, 'ignoredNodes': [
      'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXMemberExpression',
      'JSXNamespacedName', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment',
      'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild',
    ]}],
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'double'],
    // Packages are side-effect-free libraries: no console at all. The apps/web
    // override below relaxes this to warn/error at the app boundary.
    'no-console': 'error',
    'curly': 'warn',
    'arrow-parens': ['error', 'always'],
    'react/no-unescaped-entities': ['error', {'forbid': ['>', '}']}],
    'react/prop-types': 0,
    'react/jsx-no-target-blank': 0,
    'no-empty': ['error', {'allowEmptyCatch': true}],
    'object-curly-spacing': ['error', 'never'],
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'padded-blocks': ['error', 'never'],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-infix-ops': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      }
    }],
    'no-trailing-spaces': 'error'
  },
  overrides: [
    {
      // apps/web is an application, not a library: allow surfacing problems to
      // the console via warn/error (but not stray console.log debugging).
      files: ['apps/web/**/*.ts', 'apps/web/**/*.tsx'],
      rules: {'no-console': ['error', {allow: ['warn', 'error']}]}
    },
    {
      // Jest test files: provide the test-runner globals (without pulling in
      // eslint-plugin-jest just for its env).
      files: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly'
      }
    }
  ]
}
