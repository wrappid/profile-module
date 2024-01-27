module.exports = {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 "env": {
    "browser": true,
    "es2021" : true,
    "node"   : true
  },
  "extends"       : ["eslint:recommended", "plugin:react/recommended", "plugin:import/recommended", "plugin:react/jsx-runtime"],
  "ignorePatterns": ["**/node_modules/*"],
  "overrides"     : [],
  "parserOptions" : {
    "ecmaVersion": "latest",
    "sourceType" : "module",
  },
  "plugins": [
    "etc",
    "import",
    "react",
    "require-extensions",
    "sort-keys-fix",
    "unused-imports",
  ],
  "rules": {
    "array-bracket-newline": [
      "error",
      {
        "minItems" : 5,
        "multiline": true,
      },
    ],
    "array-bracket-spacing"    : ["error", "never"],
    "array-element-newline"    : ["error", { "minItems": 5, "multiline": true }],
    "comma-dangle"             : ["error", { "arrays": "only-multiline", "objects": "only-multiline" }],
    "comma-spacing"            : ["error", { "after": true, "before": false }],
    "etc/no-commented-out-code": "error",
    "id-length"                : ["error", { "exceptions": ["i", "j", "id"], "min": 3, "properties": "never" }],
    "import/order"             : [
      "error",
      {
        "alphabetize" : {
          "caseInsensitive": true,
          "order"          : "asc",
        },
        "groups"          : ["builtin", "external", "internal"],
        "newlines-between": "always",
        "pathGroups"      : [
          {
            "group"   : "builtin",
            "pattern" : "react",
            "position": "before",
          },
          {
            files: ["app/**/*.js"],
            // Extend or merge with the app-specific configuration
            ...require("./.eslint/app/.eslintrc.js"),
          },
    ]
  }],
},}