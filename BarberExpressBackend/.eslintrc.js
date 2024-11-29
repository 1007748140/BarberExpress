module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    sourceType: 'module'
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'no-console': 'off',
    'no-shadow': 'off',
    'complexity': ['warn', 5],
    'no-lonely-if': 'error',
    'no-magic-numbers': ['warn', { ignore: [0, 1] }],
    'eqeqeq': 'error',
    'max-classes-per-file': ['error', 4],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        'parameter': true,
        'propertyDeclaration': true,
        'variableDeclaration': true,
        'memberVariableDeclaration': true,
        'functionDeclaration': true,
        'typeParameter': true
      }
    ]
  }
};
