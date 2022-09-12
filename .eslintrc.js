module.exports = {
    "globals": {
        "ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION":true,
        "REACT_APP_ENV": true,
        "page": true,
        "fetch": true,
        "document": true,
        "localStorage": true,
        "window": true
    },
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/prop-types": 0 //防止在react组件定义中缺少props验证
    }
};
