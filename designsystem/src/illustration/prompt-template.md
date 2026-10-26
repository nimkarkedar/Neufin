<!--
Neufin illustration prompt template.
This is the single source for every illustration prompt. The Illustration page and the
/illustration-prompt skill both read it. Edit freely.

How it is assembled:
  MASTER, then one KIND block, then one FORMAT block, then one COLOURS block, then the CONCEPT.
  {{concept}} is replaced with what the user writes.
Blocks start with a line like `## FORMAT: social`. The id after the colon must stay the same.
`Label:` is the button name on the page. `Swatch:` is the chip on the page: background | inner square.
-->

## MASTER

Create a flat vector illustration for Neufin Energy, an Indian company that helps businesses buy and manage electricity.

WHAT TO DRAW
The CONCEPT at the end decides the subject. Draw what it describes, as directly and simply as possible. Do not add towers, pylons, factories, warehouses, roads, flyovers, cities or landscapes unless the CONCEPT names them. When in doubt, draw less.

THE REFERENCE IMAGES
The attached images show the style only: flat colour, how the colours are used, and how the bands are drawn. Do not copy their subjects, scenes, viewpoint or composition. If they show towers, factories or roads and the CONCEPT does not, leave those out.

THE NEUFIN BAND (the one graphic idea in every illustration)
- Thick parallel bands of equal width, like the bands of the Neufin logo.
- A band runs straight, steps down or up at exactly 32 degrees with a crisp angled corner, then runs straight again. No curves, no rounded corners, no other angles.
- The bands carry the message: converging for many sources, stepping down for a lower price, rising for growth, breaking for leakage, running steady for reliable supply.
- Bands can also build the subject itself: an object or symbol made from a few bands and flat shapes.
- One to three groups of bands at most. Calm, not a pattern.

RULES
- One clear message, one hero subject. Nothing extra.
- No people, figures, silhouettes or hands. Show the object or place instead.
- No text, letters, numbers or logos.
- Flat solid colour only. No gradients on objects, no glow, texture or 3D rendering. Simple flat faces for depth are fine.
- The background is a single solid colour, evenly filled from edge to edge, like a screen-printed poster.
- Only the colours in COLOURS, plus at most one accent on a single element: Signal Yellow #FFC83D (default), Energy Mint #00C2A8 or Electric Coral #FF5C45.
- Generous empty space. Calm and confident, not busy.

## KIND: object
Label: Stand-alone object

KIND
One stand-alone object, whole and centred on the plain background, for example a meter, a bill, a battery, a solar panel, a plug or a calendar. Simple and slightly stylised, with Neufin bands running through, around or out of it. No ground, horizon, buildings or landscape behind it.

## KIND: icon
Label: Icon-like symbol

KIND
One bold symbol, as simple as an icon drawn large: a few flat shapes and Neufin bands, still readable at 64px. Centred and seen straight on, with no perspective, no scene and no ground.

## KIND: scene
Label: Scene

KIND
A simple scene of one place, seen from a low viewpoint and cropped by the canvas edge, with the Neufin bands running through it. Only the places and things the CONCEPT names.

## FORMAT: social
Label: Social media post

FORMAT
Portrait 4:5, 1080 × 1350. The background colour fills the canvas. Keep the top 35% as clean, empty flat colour for a headline. The illustration sits in the lower 65%. A scene bleeds off at least two edges; an object or symbol sits whole, with space around it.

## FORMAT: square
Label: Square graphic

FORMAT
Square 1:1, 1024 × 1024. The background colour fills the square. The whole concept fits inside with a clear margin on every side. Nothing is cropped and nothing touches the edges.

## FORMAT: circle
Label: Circle graphic

FORMAT
Square 1:1, 1024 × 1024, filled edge to edge with the background colour. It will be cropped to a circle afterwards, so keep the whole concept inside the central circle, about 80% of the width, and leave the corners as plain background.

## FORMAT: full
Label: Full page graphic

FORMAT
Landscape 3:2, 1536 × 1024. Isolated illustration on plain solid White #FFFFFF, no transparency (it is cut out afterwards to sit on a page that has its own background). No floor and no frame: ignore the background in COLOURS and use the rest for the illustration. Keep every element inside the canvas with clear space around it.

## COLOURS: white
Label: White
Swatch: var(--white) | var(--electric-violet)

COLOURS
Background: White #FFFFFF. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: Warm White #F7F5FA. Nothing else apart from the one accent.

## COLOURS: warm
Label: Warm White
Swatch: var(--warm-white) | var(--electric-violet)

COLOURS
Background: Warm White #F7F5FA. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: White #FFFFFF. Nothing else apart from the one accent.

## COLOURS: mist
Label: Violet 100
Swatch: var(--violet-100) | var(--electric-violet)

COLOURS
Background: Violet 100 #F0E6FF. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: White #FFFFFF. Nothing else apart from the one accent.

## COLOURS: violet
Label: Electric Violet
Swatch: var(--electric-violet) | var(--violet-400)

COLOURS
Background: Electric Violet #7E22FF. Bands and top faces: Warm White #F7F5FA. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: Violet 400 #B27FFF. Nothing else apart from the one accent.

## COLOURS: dark
Label: Violet 900
Swatch: var(--violet-900) | var(--electric-violet)

COLOURS
Background: Violet 900 #390080. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Warm White #F7F5FA. Light faces and inverted bands: Warm White #F7F5FA. Nothing else apart from the one accent.

## COLOURS: black
Label: Near Black
Swatch: var(--near-black) | var(--electric-violet)

COLOURS
Background: Near Black #19161F. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Warm White #F7F5FA. Light faces and inverted bands: Warm White #F7F5FA. Nothing else apart from the one accent.

## COLOURS: yellow
Label: Signal Yellow
Swatch: var(--signal-yellow) | var(--electric-violet)

COLOURS
Background: Signal Yellow #FFC83D. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: Warm White #F7F5FA. No accent: the background is already the accent colour. Nothing else.

## COLOURS: coral
Label: Electric Coral
Swatch: var(--electric-coral) | var(--violet-900)

COLOURS
Background: Electric Coral #FF5C45. Bands and top faces: Violet 900 #390080. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: Warm White #F7F5FA. No accent: the background is already the accent colour. Nothing else.

## COLOURS: mint
Label: Energy Mint
Swatch: var(--energy-mint) | var(--violet-900)

COLOURS
Background: Energy Mint #00C2A8. Bands and top faces: Violet 900 #390080. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: Warm White #F7F5FA. No accent: the background is already the accent colour. Nothing else.

## COLOURS: blue
Label: Clear Blue
Swatch: var(--clear-blue) | var(--violet-900)

COLOURS
Background: Clear Blue #2D7FF9. Bands and top faces: Violet 900 #390080. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: Warm White #F7F5FA. No accent: the background is already the accent colour. Nothing else.

## COLOURS: g-violet
Label: Violet gradient
Swatch: linear-gradient(#BDAEF7, #DACEF8, #F3EEFC) | var(--electric-violet)

COLOURS
Background: a soft vertical gradient, #BDAEF7 at the top, #DACEF8 in the middle, #F3EEFC at the bottom. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: White #FFFFFF. The gradient is on the background only. Every form is flat colour. Nothing else apart from the one accent.

## COLOURS: g-dawn
Label: Dawn gradient
Swatch: linear-gradient(#C4B6F5, #E3D9EC, #FBEBCB) | var(--electric-violet)

COLOURS
Background: a soft vertical gradient, #C4B6F5 at the top, #E3D9EC in the middle, #FBEBCB at the bottom. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: White #FFFFFF. The gradient is on the background only. Every form is flat colour. Nothing else apart from the one accent.

## COLOURS: g-daylight
Label: Daylight gradient
Swatch: linear-gradient(#B2CAF5, #CADEEA, #CFF0E5) | var(--electric-violet)

COLOURS
Background: a soft vertical gradient, #B2CAF5 at the top, #CADEEA in the middle, #CFF0E5 at the bottom. Bands and top faces: Electric Violet #7E22FF. Side faces: Deep Violet #5A00C8. Silhouettes, ground and shadows: Violet 900 #390080. Light faces and inverted bands: White #FFFFFF. The gradient is on the background only. Every form is flat colour. Nothing else apart from the one accent.

## CONCEPT

CONCEPT
Draw this, and nothing the CONCEPT does not ask for:
{{concept}}

VARIATIONS
Generate 4 separate images of this concept, one after another, each as its own full-size image in the format above. Keep the subject, style, colours and rules identical across all 4. Vary only the composition: the viewpoint, the crop and how the bands move. Do not combine them into one grid.
