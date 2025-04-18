import stylistic from "@stylistic/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
    ...tseslint.configs.recommended,
    // ...tailwind.configs["flat/recommended"],
    {
        files: ["**/*.mjs", "**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false
            }
        },
        plugins: {
            "@stylistic": stylistic,
            "@typescript-eslint": tseslint.plugin,
            import: eslintPluginImport,
            "simple-import-sort": simpleImportSort,
            unicorn: eslintPluginUnicorn,

            react,
            "react-hooks": reactHooks,
            "react-compiler": reactCompiler,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            "react/prop-types": "off",
            "react-hooks/exhaustive-deps": "off",

            "react-compiler/react-compiler": "error",

            "@stylistic/array-bracket-newline": ["error", "consistent"],
            "@stylistic/array-bracket-spacing": "error",
            "@stylistic/array-element-newline": ["error", "consistent"],
            "@stylistic/arrow-parens": ["error", "always"],
            "@stylistic/block-spacing": "error",
            "@stylistic/brace-style": "error",
            "@stylistic/comma-dangle": ["error"],
            "@stylistic/comma-spacing": "error",
            "@stylistic/comma-style": "error",
            "@stylistic/computed-property-spacing": "error",
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/eol-last": ["error", "never"],
            "@stylistic/function-call-argument-newline": ["error", "consistent"],
            "@stylistic/function-call-spacing": "error",
            "@stylistic/indent": "error",
            "@stylistic/key-spacing": "error",
            "@stylistic/keyword-spacing": "error",
            "@stylistic/member-delimiter-style": ["error", { singleline: { requireLast: true } }],
            "@stylistic/new-parens": "error",
            "@stylistic/no-extra-semi": "error",
            "@stylistic/no-floating-decimal": "error",
            "@stylistic/no-multi-spaces": "error",
            "@stylistic/no-multiple-empty-lines": ["error", { max: 2, maxBOF: 0, maxEOF: 0 }],
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/no-whitespace-before-property": "error",
            "@stylistic/object-curly-newline": "error",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/rest-spread-spacing": "error",
            "@stylistic/quote-props": ["error", "as-needed"],
            "@stylistic/quotes": "error",
            "@stylistic/semi": "error",
            "@stylistic/semi-spacing": "error",
            "@stylistic/semi-style": "error",
            "@stylistic/space-before-blocks": "error",
            "@stylistic/space-before-function-paren": ["error", { named: "never" }],
            "@stylistic/space-in-parens": "error",
            "@stylistic/space-infix-ops": "error",
            "@stylistic/space-unary-ops": "error",
            "@stylistic/spaced-comment": "error",
            "@stylistic/switch-colon-spacing": "error",
            "@stylistic/template-curly-spacing": "error",
            "@stylistic/template-tag-spacing": "error",
            "@stylistic/type-annotation-spacing": "error",
            "@stylistic/type-generic-spacing": "error",
            "@stylistic/type-named-tuple-spacing": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "@typescript-eslint/array-type": "error",
            "@typescript-eslint/ban-ts-comment": "error",
            "@typescript-eslint/no-wrapper-object-types": "error",
            "@typescript-eslint/no-empty-object-type": "error",
            "@typescript-eslint/no-unsafe-function-type": "error",
            "@typescript-eslint/class-literal-property-style": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
            "@typescript-eslint/consistent-type-imports": "error",
            // "@typescript-eslint/member-ordering": ["error", {
            //     default: {
            //         memberTypes: [
            //             "call-signature",
            //             "signature",
            //             "constructor",
            //             ["static-accessor", "static-field", "static-get", "static-method", "static-set"],
            //             ["accessor", "get", "method", "set"],
            //             "field"
            //         ],
            //         order: "alphabetically-case-insensitive"
            //     }
            // }],
            "@typescript-eslint/method-signature-style": "error",
            "@typescript-eslint/naming-convention": ["error", { selector: "typeLike", format: ["PascalCase"] }],
            "@typescript-eslint/no-duplicate-enum-values": "error",
            "@typescript-eslint/no-duplicate-type-constituents": "error",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@typescript-eslint/no-invalid-void-type": "error",
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-redundant-type-constituents": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-unnecessary-qualifier": "error",
            "@typescript-eslint/no-unnecessary-type-arguments": "error",
            "@typescript-eslint/no-unnecessary-type-constraint": "error",
            "@typescript-eslint/no-unsafe-declaration-merging": "error",
            "@typescript-eslint/no-unused-vars": ["error", {
                args: "all",
                argsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
                varsIgnorePattern: "^_"
            }],
            "@typescript-eslint/no-useless-empty-export": "error",
            "@typescript-eslint/prefer-enum-initializers": "error",
            "@typescript-eslint/prefer-function-type": "error",
            "@typescript-eslint/triple-slash-reference": "error",
            "@typescript-eslint/unified-signatures": "error",
            "@typescript-eslint/consistent-generic-constructors": "error",
            "@typescript-eslint/consistent-indexed-object-style": "error",
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/require-await": "error",
            "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
            "@/no-dupe-else-if": "error",
            "import/extensions": "error",
            "import/first": "error",
            "import/newline-after-import": ["error", { considerComments: true }],
            "import/no-absolute-path": "error",
            "import/no-duplicates": "error",
            "import/no-empty-named-blocks": "error",
            "import/no-extraneous-dependencies": "error",
            "import/no-relative-packages": "error",
            "import/no-unused-modules": "error",
            "import/no-self-import": "error",
            "import/no-useless-path-segments": "error",
            "simple-import-sort/exports": "error",
            "simple-import-sort/imports": ["error", { groups: [["^\\u0000", "^[^~./]"], ["^~"], ["^\\./", "^\\.\\./"]] }],
            "unicorn/escape-case": "error",
            "unicorn/filename-case": ["error", { cases: { pascalCase: true, snakeCase: true, kebabCase: true } }],
            "unicorn/no-hex-escape": "error",
            "unicorn/no-zero-fractions": "error",
            "unicorn/number-literal-case": "error",
            "unicorn/numeric-separators-style": ["error", { number: { minimumDigits: 0 } }],
            "unicorn/prefer-export-from": ["error"]
        }
    },
    {
        ignores: [".react-router/*", "build/*", "eslint.config.mjs"]
    },
    {
        settings: {
          tailwindcss: {
            callees: ["classnames", "cn", "cva"],
            config: "tailwind.config.ts",
            cssFiles: [
              "**/*.css",
              "!**/node_modules",
              "!**/.*",
              "!**/dist",
              "!**/build",
            ],
            cssFilesRefreshRate: 5_000,
            removeDuplicates: true,
            skipClassAttribute: false,
            whitelist: [],
            tags: [],
            classRegex: "^class(Name)?$",
          },
        },
      }
);