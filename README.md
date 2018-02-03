# Verkefni 1

Útfæra skal Express vefþjón sem birtir yfirlit yfir greinar úr möppu á disk og möguleika á að lesa hverja grein.

## Greinar

Gefin er mappa með fjórum greinum ásamt myndum sem þær vísa í. Hver grein hefur skilgreind lýsigögn fremst í skjali skilgreint með _frontmatter_, t.d.

```
---
title: Lorem ipsum
slug: lorem-ipsum
date: Wed Jan 17 2018 12:30:00 GMT+0000 (GMT)
image: ./img/lorem-ipsum.jpg
---
```

Finna þarf NPM einingu sem þáttar þessi gögn ásamt rest af skjali og skilar sem gögnum. `title` er titill greinar, `slug` er slóðin sem á að vera á grein (að ofan ætti greinin slóðina `/lorem-ipsum`), `date` er dagsetning greinar, `image` er mynd fyrir grein sem þarf ekki að skilgreina.

Rest af grein er skilgreind í Markdown og þarf sömuleiðis að finna NPM pakka til að þátta það.

## Greinalisti

Forsíða á vef birtir lista af öllum greinum með mynd (ef skilgreind, annars `#666` bakgrunnur), titli og dagsetningu á formi `dd.mm.yyyy`. Greinum skal raða í öfuga tímaröð, þ.a. nýjasta greinin er fyrst.

Titill síðu (`<title>`) og fyrirsögn skal vera „Greinasafnið“.

## Verkefni

Þetta var verkefnið mitt, rao13.
