# Devin Griffin — portfolio site

Static site. No build step, no dependencies to install. Open `index.html` in a browser and it runs.

## Structure

```
index.html               home
work.html                work index
work-homes-by-avi.html   case study 01
work-cmca.html           case study 02
work-archive.html        case study 03 — titled "Past Projects" on screen
info.html                about + career timeline
404.html
css/site.css             all styling
js/site.js               all behaviour
data/galleries.js        gallery contents — edit this to change any case study
assets/                  images, background videos, CV
```

## Changing a gallery

Everything about a case study's images lives in `data/galleries.js`. Each piece is one line:

```js
{ src: 'winterfest-poster-01.jpg', cap: 'Winterfest — poster' },
```

- **Reorder** — move the line up or down. File order = page order.
- **Remove** — delete the line, or put `//` in front of it.
- **Re-caption** — edit the text inside the `cap` quotes. That one string feeds the caption under the carousel, the image alt text and the lightbox.
- **Add** — copy a line, change the filename and caption. Upload the image to `assets/work/<folder>/web/` first.
- **Full-page screenshot** — add `long: true` to the line. It gets a fixed-width frame that scrolls on hover, at a constant readable pace regardless of image height.

Folders, set at the bottom of the file:

| Gallery key | Image folder |
| --- | --- |
| `hba` | `assets/work/hba/web/` |
| `cmca` | `assets/work/cmca/web/` |
| `archive` | `assets/work/current/web/` |

Filenames are case-sensitive on GitHub Pages. Keep the straight quotes and the trailing comma on every line — if a caption contains an apostrophe, wrap it in double quotes instead.

## Export sizes

- Normal pieces — 1600px on the long edge, WebP quality ~80.
- `long: true` screenshots — 1200px wide, any height.
- Multi-page PDFs — export one WebP per page.

## Updating the CV

Replace `assets/Devin-Griffin-CV.pdf`, keeping the filename. No code change needed.

## Deploying

GitHub Pages serves from this repo. Committing a file publishes it — usually live within a minute.
