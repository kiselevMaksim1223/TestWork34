export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [],
    'scss/at-import-partial-extension': 'never',
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'no-descending-specificity': null
  }
}
