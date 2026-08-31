# Pippi Dimonte — sito / portfolio

Sito statico (HTML, CSS, JavaScript vanilla, senza build) per **Pippi Dimonte**,
contrabbassista e compositore. Pronto per **GitHub Pages** sul dominio `pippidimonte.it`.

## Struttura

```
.
├── index.html          # Home (hero, intro, ascolta/segui, gallery, contatti)
├── progetti.html       # Progetti / formazioni
├── discografia.html    # Album, singoli, partecipazioni
├── biografia.html      # Biografia / curriculum
├── 404.html            # Pagina di errore
├── css/style.css       # Tutto lo stile (design tokens in :root)
├── js/main.js          # Menu mobile, reveal allo scroll, invio form
├── assets/img/         # Logo e foto
├── CNAME               # Dominio custom (pippidimonte.it)
└── .nojekyll           # Disattiva Jekyll su GitHub Pages
```

## Cosa personalizzare (checklist rapida)

1. **Link social** — cerca e sostituisci questi URL segnaposto con i profili reali,
   in **tutte** le pagine `.html`:
   - `https://open.spotify.com/` → profilo Spotify
   - `https://www.youtube.com/` → canale YouTube
   - `https://www.instagram.com/` → profilo Instagram
   - `https://www.facebook.com/` → pagina Facebook

   > Suggerimento: nell'editor usa "Trova e sostituisci in tutti i file".

2. **Email** — sostituisci `pippidimonte@email.it` (in `index.html`) con l'indirizzo vero.

3. **Testi** — biografia, progetti e descrizioni dei dischi sono contenuti di esempio:
   sono già in italiano e ben marcati, basta sovrascriverli.

4. **Immagini** — le foto sono in `assets/img/`. Per cambiarle, sostituisci i file
   mantenendo lo stesso nome, oppure aggiungine di nuove e aggiorna i percorsi nell'HTML.
   Per le **copertine dei dischi** aggiungi le immagini in `assets/img/` e collegale in `discografia.html`.

5. **Form contatti** (vedi sotto).

## Form contatti (Formspree)

GitHub Pages è hosting statico: non può inviare email da solo. Il modo più semplice è **Formspree** (piano gratuito):

1. Vai su https://formspree.io e crea un account.
2. Crea un nuovo form e collega l'email di destinazione.
3. Copia l'ID del form (una stringa tipo `xxxxbbbb`).
4. In `index.html` trova:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   e sostituisci `YOUR_FORM_ID` con l'ID reale.

Finché l'ID non è configurato, il form mostra un avviso e invita a usare l'email.
Una volta configurato, invia il messaggio senza ricaricare la pagina e mostra la conferma.

> In alternativa esistono altri servizi (Getform, Web3Forms, Basin): la logica è la stessa,
> cambia solo l'URL in `action`.

## Player Spotify (facoltativo)

In `discografia.html` c'è un blocco commentato per **incorporare** un player Spotify.
Da Spotify: brano/album → **Condividi › Incorpora** → copia l'`<iframe>` e incollalo lì.

## Pubblicare su GitHub Pages

1. Crea un repository su GitHub (es. `pippidimonte-sito`) e carica **tutti** questi file
   nella radice del repo.

   Da terminale:
   ```bash
   cd pippidimonte
   git init
   git add .
   git commit -m "Sito Pippi Dimonte"
   git branch -M main
   git remote add origin https://github.com/<tuo-utente>/<repo>.git
   git push -u origin main
   ```

2. Sul repo: **Settings › Pages** → *Build and deployment* → *Source*: **Deploy from a branch**,
   Branch **main** / cartella **/ (root)** → **Save**.

3. Dopo qualche minuto il sito è online.

### Dominio personalizzato `pippidimonte.it`

Il file **CNAME** è già incluso. Per collegare il dominio:

1. In **Settings › Pages › Custom domain** inserisci `pippidimonte.it` e salva.
2. Dal pannello del provider dove hai registrato il dominio, imposta il DNS:
   - un record **CNAME** per `www` → `<tuo-utente>.github.io`
   - quattro record **A** per il dominio radice (`@`) verso gli IP di GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Torna su GitHub e attiva **Enforce HTTPS** (può richiedere qualche ora).

> Nota: se il dominio è **solo** su GitHub Pages, tieni il file `CNAME`.
> Se pubblichi prima su un sottodominio `github.io` senza dominio custom, puoi rimuoverlo.

## Sviluppo in locale

Nessun build. Apri `index.html` nel browser, oppure avvia un piccolo server locale:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Design

Palette "palco di notte" (blu profondo + legno caldo del contrabbasso), display
*Cormorant Garamond*, testo *Inter*. Tutti i colori sono variabili CSS in cima a
`css/style.css` (`:root`): cambiando lì i valori si aggiorna l'intero sito.
