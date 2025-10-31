# Nastavení repozitáře (GIT)
1. Vytvořím si projekt v GITU.
2. Otevřu si ve VS code složku, kde budu chtít projekt mít a spustím příkaz `npm create vite@latest`
3. Nastavím si React s Typescriptem a v terminálu se přesunu do složky s projektem. Spustím code . (Otevře se mi  ve VS code jen můj projekt)
4. V terminálu spustím 
 4.1 git init
 4.2 git add .
 4.3 git commit -m 'Initial commit'
 4.4 git remote add origin https://github.com/Maarrttiinn456/test.git
 4.5 git branch -M main
 4.6 git push -u origin main
Projekt mám nyní v GIT repozitáři

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

### Instalace Eslint
`npm init @eslint/config@latest`

√ What do you want to lint? · javascript
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ Which language do you want your configuration file be written in? · ts      
i Jiti is required for Node.js <24.3.0 to read TypeScript configuration files.
√ Would you like to add Jiti as a devDependency? · No / Yes
i The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals, typescript-eslint, eslint-plugin-react, jiti
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
☕️Installing...


# Nastavení projektu

1. Promazal bych složku složku src, kde bych nechal main.tsx, index.css a App.tsx
2. Instalace taiwlindu `npm install tailwindcss @tailwindcss/vite`taiwlind musím zanést do vite.configu a naimportovat do index.css
3. Instalace react-routeru

### React router
Nainstaluju react-router `npm i react-router`
Naimportuju potřebné komponenty z react routeru
 - BrowserRouter (tím obalím celou aplikaci v main.tsx)
 - Routes
 - Route

V App.tsx potom budu mít rouutovací systém, kde do Routes zabalím jednotlivé Route. 

Route má props path (na jakou URl vudu odkázaný) a element {jaká stránka se zobrazí}


# Struktura projektu

V src si vytvořím složkuy
1. components
2. pages
3. guards
4. layouts
5. hooks
6. api
7. types


# Tvorba Notes app

# Router
Budu mít vytvořené routy pro hoempage, login, register, note detail (/note/:id)

# Layout
V souboru App.tsx zabalím všechny routy do jedné nadřazené, které přiřadím element AppLayout.
AppLayout bude komponenta umístěná v layouts/AppLayout, která bude zajišťovat kontejner stránky a její pozadí atd...

Uvnitř komponenty AppLayout bude <Outlet />, který se postará o zobrazení všech podřízených rout, které této nadřazené route podléhají.

# Zobrazení homepage
V souboru App.tsx, kde mám routing aplikace, zabalím stránku Homepage do route, která se postará o to, že pokud uživatel není přihlášený, přesměruje ho na /login.
Pokud přihlášený je, pustí ho na Homepage.

Budu zde potřebovat pro přesměrování použít useNavigate z react-routeru.


# Registrace / Přihlášení


## AuthForm

AuthForm budu používat na stránce /login ((pages/LoginPage)) a /register (pages/RegsiterPage)


Vytvořím si komponentu AuthForm, která bude přijímat props mode.

mode může nabývat hodnot 'register' nebo 'login'.

Ve složce types si vytvořím typ AuthFormMode, který bude moct nabývat pouze těchto dvou hodnot ('login' | 'register').

mode bude sloužit k tomu, abych mohl použít jeden formulář jak pro registraci, tak pro přihlášení.
Počítám s tím, že oba formuláře budou mít stejná pole – username a password.

V AuthForm budu sbírat hodnoty z formuláře pomocí useState.

Na formuláři bude funkce, která se spustí při události onSubmit.
Po provedení jednoduché frontendové validace (zda jsou inputy vyplněné) vytvořím nový objekt:

{
  username,
  password
}

Objektu přiřadím type AuthUser, který si vytvořím v types.ts


Tento objekt následně pošlu do funkce pro registraci nebo přihlášení podle aktuální hodnoty mode.


# API

Podoba API

<pre>
GET	/notes
GET	/notes/1
POST	/notes
PUT	/notes/1
PATCH	/notes/1
DELETE	/notes/1
</pre>


ve slože api si vytvořím soubory
1. client.ts

Tato funkce bude sloužit pro komunikaci s backendem a bude vracet odpověď ze serveru.

Půjde o univerzální funkci, která bude přijímat parametry:

 - endpoint – adresa API endpointu,
 - method – HTTP metoda (např. GET, POST, PUT, DELETE),
 - data – tělo požadavku (volitelné).

Součástí požadavku budou hlavičky, které mohou obsahovat:
 - API klíč (pokud bude potřeba),
 - Content-Type v případě metody POST,
 - credentials, aby bylo možné pracovat s cookies.


Funkce bude také zachytávat chyby – například v situaci, kdy server neodpoví nebo vrátí chybu.

Na výstupu bude funkce vracet data získaná z backendu.



2. notesApi.ts
V tomto souboru importuji funkci client z client.ts a definuji zde funkce, které se týkají práce s poznámkami.

Tyto funkce budu následně používat v React hookách, kde z nich budu načítat data a zároveň zpracovávat stav načítání (loading) a případné chyby (error).

export const getNotes = async () => {
  return await client('/notes', 'GET');
};

export const createNote = async (data) => {
  return await client('/notes', 'POST', data);
};

export const updateNote = async (id, data) => {
  return await client(`/notes/${id}`, 'PUT', data);
};

export const deleteNote = async (id) => {
  return await client(`/notes/${id}`, 'DELETE');
};


3. authApi.tx



# Komponenty

## notes list
Tady budu mít svůj stav poznámek. 
const [notes, setNotes] = useState<Notes | null>()

Zde si budu i fetchovat poznamky z bacnkedu

Budu tady zároveň funkcí map projíždět všechny poznámky a ve funkci bduu vypisovat componetu Card, kam budu posílat potřebné props 



## card
Komponenta který bude reprezentovat jednu poznámku. Bude přijímat props jako title, text, date ...

těmto props taky vytvořím type NoteCardProps


