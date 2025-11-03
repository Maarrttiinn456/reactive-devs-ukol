# Nastavení repozitáře (GIT)

1. Vytvořím si projekt v GITU.
2. Otevřu si ve VS code složku, kde budu chtít projekt mít a spustím příkaz `npm create vite@latest`
3. Nastavím si React s Typescriptem a v terminálu se přesunu do složky s projektem. Spustím code . (Otevře se mi ve VS code jen můj projekt)
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

# Nastavení projektu

1. Promazal bych složku složku src, kde bych nechal main.tsx, index.css a App.tsx
2. Instalace taiwlindu `npm install tailwindcss @tailwindcss/vite`taiwlind musím zanést do vite.configu a naimportovat do index.css
3. Instalace react-routeru

### Vite

Vytvořím si proxy abych se mohl na backend odkazovat jako /api

### React router

Nainstaluju react-router `npm i react-router`
Naimportuju potřebné komponenty z react routeru

-   BrowserRouter (tím obalím celou aplikaci v main.tsx)
-   Routes
-   Route

V App.tsx potom budu mít rouutovací systém, kde do Routes zabalím jednotlivé Route.

Route má props path (na jakou URl vudu odkázaný) a element {jaká stránka se zobrazí}

# Struktura projektu

V src si vytvořím složky
1. components
2. pages
3. guards
4. layouts
5. hooks
6. api
7. types


# Router

Budu mít vytvořené routy pro
-   hoempage
-   login
-   register
-   add-note
-   update-note

# Layout

V souboru App.tsx zabalím všechny routy do jedné nadřazené, které přiřadím element AppLayout.
AppLayout bude komponenta umístěná v layouts/AppLayout, která bude zajišťovat kontejner stránky a její pozadí atd...

Uvnitř komponenty AppLayout bude <Outlet />, který se postará o zobrazení všech podřízených rout, které této nadřazené route podléhají.

# Zobrazení homepage

V souboru App.tsx, kde mám routing aplikace, zabalím stránku Homepage, AddNote, UpdateNote do routy, která se postará o to, že pokud uživatel není přihlášený, přesměruje ho na /login.
Pokud přihlášený je, pustí ho na Homepage.

Budu zde potřebovat pro přesměrování použít useNavigate z react-routeru.

# Registrace / Přihlášení

## AuthForm

AuthForm budu používat na stránce /login ((pages/LoginPage)) a /register (pages/RegsiterPage)

Vytvořím si komponentu AuthForm, která bude přijímat props mode.

mode může nabývat hodnot 'register' nebo 'login'.

Mode bude sloužit k tomu, abych mohl použít jeden formulář jak pro registraci, tak pro přihlášení.
Počítám s tím, že oba formuláře budou mít stejná pole – username a password.

V AuthForm budu sbírat hodnoty z formuláře pomocí useState.

Na formuláři bude funkce, která se spustí při události onSubmit.
Po provedení jednoduché frontendové validace (zda jsou inputy vyplněné) vytvořím nový objekt:

{
username,
password
}

Tento objekt následně pošlu do funkce pro registraci nebo přihlášení podle aktuální hodnoty mode.

#### <b>Typescript</b>

Ve složce types si vytvořím typ AuthFormMode, který bude moct nabývat pouze těchto dvou hodnot ('login' | 'register').
Nová objekt bude mít typ type AuthUser.




# API
Podoba API. Použil jsem json-server.
<pre>
  GET    /posts
  GET    /posts/:id
  POST   /posts
  PUT    /posts/:id
  DELETE /posts/:id
</pre>

# Přípojení k bacnekdu

### Obecně
Ve složce api si vytvořím soubor client.ts, kde budu mít základní připojení k backendu a budu zde také odchytávat chyby v případě, že se spojení nepodaří.

Poté si vytvořím další soubor notesApi.ts, ve kterém budu importovat a používat svou funkci client, která mě připojí k backendu. V tomto souboru budu mít funkce pro získání všech poznámek, vytvoření poznámky, smazání poznámky podle ID a úpravu poznámky podle ID. Do funkce client budu posílat různé parametry podle toho, jakou operaci budu potřebovat provést.


### client.ts
Tato funkce bude sloužit pro komunikaci s backendem a bude vracet odpověď ze serveru.

Půjde o univerzální funkci, která bude přijímat parametry:

-   endpoint – adresa API endpointu,
-   method – HTTP metoda (např. GET, POST, PUT, DELETE),
-   data – tělo požadavku (volitelné).

Součástí požadavku budou hlavičky, které mohou obsahovat:
-   API klíč (pokud bude potřeba),
-   Content-Type v případě metody POST,
-   credentials, aby bylo možné pracovat s cookies.

Body posílám jen v případě, že data nejsou undefnined

Funkce bude také zachytávat chyby – například v situaci, kdy server neodpoví nebo vrátí chybu.

Na výstupu bude funkce vracet data získaná z backendu.


### notesApi.ts
V tomto souboru budou definovány funkce pro konkrétní operace s backendem, jak už bylo popsáno výše. Každá funkce vrátí odpověď serveru.

Nebudu zde řešit žádné React stavy – půjde čistě o funkce určené pro komunikaci s backendem. Tyto funkce budu následně používat v hooku useNotes, kde už budu pracovat se stavy jako loading a error.


# useNotes (hook)
(alternativně by šlo jít cestou Contextu)

V tomto hooku se bude odehrávat veškerá logika spojená s poznámkami. Hook bude mít tři vlastní stavy: notes, loading a error.

Budu zde mít i funkce pro CRUD operace. Nejprve provedu změnu na serveru a pokud proběhne úspěšně, promítnu ji i lokálně do notes.

Všechny funkce a stavy potom vrátím v returnu hooku abych je mohl používat na příslušných místech


# Výpis poznámek

vytvořím si komponenty NotesList a NoteCard, kde v listu budu foreachem projíždět 



