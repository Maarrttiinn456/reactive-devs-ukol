# Spuštění aplikace

Ve složce notes-app je potřeba spustit npm install, potom npm run dev a nakonec npm run server.
Pro přihlášení stačí ve formuláři vyplnit libovolné údaje. Přihlášení je jen naznačené, ale není funkční.

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

-   homepage
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

# API

Podoba API. Použil jsem json-server.

<pre>
  GET    /posts
  GET    /posts/:id
  POST   /posts
  PUT    /posts/:id
  DELETE /posts/:id
</pre>

## Připojení k backendu

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

### authApi.ts

to samé ajako notesApi akorát pro auth operace (isUserAuthorized, regsiter, login, logout)

# Registrace / Přihlášení

Vytvořím si context, ve kterém budu mít useState proměnnou status.
Ta bude uchovávat hodnoty 'loading' | 'authorized' | 'unauthorized'.
Tyto hodnoty budu měnit na základě odpovědi, kterou dostanu z backendu.

Po načtení stránky se spustí funkce, která zkontroluje, zda je uživatel přihlášen nebo ne, a podle toho nastaví status.
Tato funkce bude volat na backendu endpoint /me.
Pokud dostanu kladnou odpověď, nastavím setStatus('authorized').

V komponentě ProtectedRoutes si zavolám tento context a získám z něj hodnotu status.
Pokud je uživatel přihlášený, zobrazím <Outlet />.
Pokud ne, přesměruji ho na /login.

V contextu budu mít také funkce pro přihlášení a registraci, kam budu posílat formData (data z inputů formuláře).
Tyto funkce budou volat funkce pro komunikaci s backendem, které budou umístěné v souboru api/authApi, kde se připojím k backendu pomocí potřebné URL a metody.

Tyto funkce budu používat v komponentě AuthForm, kde budu pomocí mode rozlišovat, zda se jedná o registraci nebo přihlášení.

## AuthForm

Komponenta, která se stará o sběr dat z formuláře a má prop mode, bude použita na stránkách Login a Register.
Na základě hodnoty mode se bude lišit její funkcionalita po odeslání dat z formuláře.

Inputy budou napojené na useState, abych mohl provádět validaci (např. kontrolu hesla nebo uživatelského jména).
Poté, co inputy projdou validací, se vytvoří objekt s daty, která budu posílat do příslušné funkce.

Pokud se bude jednat o login, po úspěšném zavolání funkce loginUser (z Contextu) přesměruji uživatele na homepage.

Pokud půjde o registraci, po úspěšném zavolání funkce registerUser (z Contextu) přesměruji uživatele na login page.

# useNotes (hook)

(alternativně by šlo jít cestou Contextu)

V tomto hooku se bude odehrávat veškerá logika spojená s poznámkami. Hook bude mít tři vlastní stavy: notes, loading a error.

Budu zde mít i funkce pro CRUD operace. Nejprve provedu změnu na serveru a pokud proběhne úspěšně, promítnu ji i lokálně do notes.

Všechny funkce a stavy potom vrátím v returnu hooku abych je mohl používat na příslušných místech

# Výpis poznámek

Vytvořím si komponenty NotesList a NoteCard, kde v NotesList budu foreachem projíždět všechny notes.
Notes budu mít z hooku useNotes.

Budu zde z useNotes importovat ještě loading a error stavy. taktéž funkci pro mazání poznámky.

### NotesCard

Tato komponenta bude přijímat jako props id, title, text a funkci pro smazání poznámky.
Do funkce pro smazání budu předávat id poznámky.

Na tlačítko pro úpravu poznámky aplikuji useNavigate a přesměruji uživatele na stránku /note-update/:id, kde importuji komponentu NoteForm v režimu update.
Díky id budu vědět, o kterou poznámku se jedná, a díky mode poznám, že budu používat funkci pro aktualizaci poznámky místo vytvoření.

# NoteFrom

Kompoenenta který bude jako props přijímat 2 stavy a to update a create, dle toho použiju příslušnou funkci.

## Obecně

Komponenta má v sobě formulář a sběr dat z fomruláře probíhá pomocí useRef, rozhodl jswem se, že nepotřebuj mít žádnou validaci nad inputama které uživatel vyplňuje.

Na fomru je na onSubmit nasazená funkce handleForm, které se bude start o veškerou logiku na základě mode.

Jednibé co uýivateli nepovolím jsou prázdné inputy, kde pokud se tak stane tak na uživatele vykočí alert a funkce se ukončí

Pokud uživatel vyplní inputy, tak z toho vytvořím objekt (formData) se kterám pak budu dále pracovat.

## handleForm

### create mode

V tomto režimu po úspěšném vytvoření objektu volám funkci handleCreate(formData), která je importovaná z hooku useNotes.

Pokud funkce nevyhodí chybu (throw error), po vytvoření poznámky přesměruji uživatele na homepage s výpisem poznámek.

### update mod

Pomocí useParams získám id poznámky, kterou upravuji.

Pomocí funkce getNote(id) (ze stejného hooku) si načtu konkrétní poznámku.

Jakmile mám poznámku načtenou, přiřadím inputům defaultValue, abych mohl přímo upravovat existující text:

defaultValue={isUpdatedMode ? note?.title : ''}

Ve funkci handleForm pak volám handleUpdate(id, formData) — také importovanou z hooku useNotes.
Po úspěšném updatu přesměruji uživatele zpět na homepage s výpisem poznámek.
