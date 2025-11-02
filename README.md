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

Budu mít vytvořené routy pro

-   hoempage
-   login
-   register
-   note detail (/note/:id)
-   createNote

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

## client.ts

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

#### <b>Typescript</b>

otypuji si fuknci

<pre>
  const client = async <TData,TBody> (url:string, mehod: ApiMethod, data?: TBody) : Promise<TData> {...}
</pre>

return server data otypuji jako TData

Při použitá funkce client potom musím typovat, co očekývým a posílám za data

## notesApi.ts

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

## authApi.tx

# Komponenty

## NoteList.tsx

Bude naimportovaná v Homepage.tsx

Zde budu také načítat poznámky z backendu pomocí vlastního hooku.

Pomocí funkce map projdu všechny poznámky a pro každou z nich zobrazím komponentu NoteCard, kam předám potřebné props.

### Fetch dat (useNotes)

Vytvořím si vlastní hook useNotes, který bude mít vůj stav notes, loading, error a funkce které se budou starat o mazání, úpravu, přidání, odebrání.

Alternativou by bylo vytvořit k tomu místo hooku Context, ale vydám se cestou hooku protože aplikace není složitá.

Hook bude exportovat:
notes – samotná data,
loading – načítání,
error – hláška.
fetchNotes - funkce
createNote - funkce
deleteNote - funkce
updateNote - funkce

Pomocí asynchronní funkce fetchNotes se pokusím získat data z backendu.
Funkce obsahuje blok try...catch, kde v části try nastavím loading na true a pokusím se získat data pomocí funkce getNotes.

Pokud se vyskytne nějaká chyba, její text uložím do stavu error pomocí setError(response.status/message).
Pokud vše proběhne v pořádku, uloží se získaná data do stavu notes.

V bloku catch se snažím zachytit případný error a ve finally nastavuji loading zpět na false.

Funkci fetchNotes volám v useEffectu, aby mi spustila jen jednou při cačtení componenty.

#### <b>Typescript</b>

stav notes si nastavím jako type Notes[] | null, vše ostatní(loading,error) si přiřadí správný typ samo.

## NoteCard.tsx

Komponenta která bude reprezentovat jednu poznámku. Bude přijímat props jako id, title, text, date.

Bude také přijímat funkci on

#### <b>Typescript</b>

těmto props taky vytvořím type NoteCardProps
