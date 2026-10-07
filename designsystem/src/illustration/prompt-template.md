<!--
Neufin illustration prompt template.
This is the single source for every illustration prompt. The Illustration page and the
/illustration-prompt skill both read it. Edit freely.

How it is assembled:
  MASTER, then one FORMAT block, then one COLOURS block, then the CONCEPT.
  {{concept}} is replaced with what the user writes.
Blocks start with a line like `## FORMAT: social`. The id after the colon must stay the same.
`Label:` is the button name on the page. `Swatch:` is the chip on the page: background | inner square.
-->

## MASTER

Match the style of the attached reference images exactly: the same flat shapes, band geometry, line rhythm and level of detail. Use them for style only. Do not copy their subject or composition.

Create a flat vector illustration for Neufin Energy, an Indian company that helps businesses buy and manage electricity.

DRAW
- Only what the CONCEPT needs. One clear message, one hero subject. Nothing extra.
- Real places and things as simple flat shapes (plants, warehouses, solar, turbines, pylons, meters, bills), seen from a low viewpoint, cropped by the canvas edge.
- Energy shown as thick parallel bands of equal width, horizontal or at exactly 32 degrees, bending with a small rounded corner. The bands tell the story: converging for many sources, rising for savings, breaking for leakage, running steady for reliable supply.

RULES
- No people, figures, silhouettes or hands. Show places and objects instead.
- No text, letters, numbers or logos.
- Flat solid colour only. No gradients on objects, no glow, texture or 3D.
- Only the colours in COLOURS, plus at most one accent on a single element: Signal Yellow #FFC83D (default), Energy Mint #00C2A8 or Electric Coral #FF5C45.
- Generous empty space. Calm and confident, not busy.

## FORMAT: social
Label: Social media post

FORMAT
Portrait 4:5, 1080 × 1350. The background colour fills the canvas. Keep the top 35% as clean, empty flat colour for a headline. The illustration sits in the lower 65% and bleeds off at least two edges.

## FORMAT: square
Label: Square graphic

FORMAT
Square 1:1, 1024 × 1024. The background colour fills the square. The whole concept fits inside with a clear margin on every side. Nothing is cropped and nothing touches the edges.

## FORMAT: circle
Label: Circle graphic

FORMAT
Square canvas 1:1, 1024 × 1024, with a centred filled circle 92% of the canvas width. The background colour fills the circle only. Everything outside the circle is fully transparent (PNG with alpha). The whole concept fits inside the circle with a clear margin. Nothing crosses the circle edge.

## FORMAT: full
Label: Full page graphic

FORMAT
Landscape 3:2, 1536 × 1024. Isolated illustration on a fully transparent background (PNG with alpha), to be placed on a page that already has its own background. No background colour, no floor, no frame: ignore the background in COLOURS and use the rest for the illustration. Keep every element inside the canvas with clear space around it.

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
{{concept}}

VARIATIONS
Generate 4 separate images of this concept, one after another, each as its own full-size image in the format above. Keep the style, colours and rules identical across all 4. Vary only the composition: the viewpoint, the crop and how the bands move. Do not combine them into one grid.
