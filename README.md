# Nastavení repozitáře (GIT)

# Nastavení VS code

### Ve VS code bych si nainstaloval rozšíření Prettier - Code formatter

V nastavení VS code bych si otevřel settings.json a tam bych přidal tyto řádky, které sa mi budou starat o to, že kód bude v Reactu správně formátovaný.

<pre>
"[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
</pre>

### Instalace ES lint

VE VS code bych si stáhnul rozšíření ES lint a poté bych si vytvořil soubor `eslint.config.js`, kde bych provedl základní nastavení.

Nainstloval bych si balíčky:
`npm install -D ` <br>
eslint typescript-eslint </br>
@eslint/js </br>
eslint-plugin-react <br>
eslint-plugin-react-hooks <br>

<pre> 
// eslint.config.js 
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.recommended,
      reactHooks.configs['recommended-latest'],
    ],
    settings: {
      react: { version: 'detect' },
    },
  },
])
</pre>

# Nastavení projektu
