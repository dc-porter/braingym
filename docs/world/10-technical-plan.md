# 10. Technical plan for 3D on iPhone

## The approach in one paragraph

The world is its own page in its own folder, drawn with one well-known 3D library (three.js) kept as plain files inside the project. There is no build step. All scenery is made by code at the moment it is needed, so there is almost nothing to download beyond the library. The world talks to Bloom only through the doorway in file 9. Lessons never load any of it.

## The build-step call

Decided in file 2, B4: **no build step now.** The measured facts behind it:

| Thing | Size, compressed for download | How I know |
|---|---|---|
| All of Bloom today (page, styles, logic, questions) | 119 KB | Measured |
| three.js version 0.187, as shipped (two files) | 419 KB | Measured |
| three.js after shrinking (removing spaces and long names) | 180 to 220 KB | Estimated. To be measured in Phase 2. |
| The world's own code for the prototype | under 60 KB | Estimated |

"Shrinking" a library is a one-time step done when the file is added to the project. It is not a build step: nothing has to run when you make later changes.

**What a build step would add later, and when to add it:** smaller files and the ability to drop unused parts of the library (perhaps a further third off, estimated). Worth it when the world passes about 40 code files or needs compressed 3D models. It would be added to the world folder alone.

## Where the files live

```
world/
  index.html          the world page
  world.css           panels, task card, buttons
  vendor/three/       the 3D library, never edited
  js/
    main.js           starts everything
    door.js           the only file that talks to Bloom
    standin-bloom.js  prototype only: the fake Bloom
    save.js           saving and restoring world state
    quality.js        measures frame time, steps quality up or down
    input.js          taps, drags, pinch
    camera.js         the follow camera
    sky.js  water.js  island.js  buildings.js  effects.js
    character.js      builds a character from a description
    taskcard.js       the calm card and the activity types
    scenes/           one small file per place
```

Each file has one job. A smaller model can change one without reading the rest. Modern browsers load files that refer to each other like this directly, with no packing tool.

**Nothing outside world/ changes** for the prototype. Not index.html, not js/, not sw.js.

## Performance budget

Targets for an iPhone 14 in Safari. Each has a reason. In Phase 2 I report against every line, labeled measured or estimated.

| Measure | Budget | Why this number |
|---|---|---|
| **Frame rate** | 60 a second as the goal. **Never below 30.** | 60 is what the screen shows. Below 30 reads as broken. |
| **Time to draw one frame on the phone's processor** | under 8 ms of the 16 ms available | Leaves half the time for the graphics chip and for Safari itself |
| **Pixels drawn** | capped at 2× the screen's point size | The iPhone 14 screen is 3×. Drawing at 2× means 56% fewer pixels (arithmetic: 1.3 million against 2.96 million) for a difference few people can see on stylized art. The single biggest saving available. |
| **Separate objects drawn per frame** (draw calls) | under 80 | Each one costs processor time. Repeated things like lamps and stars are drawn as one batch. |
| **Triangles on screen** | under 100,000 | Comfortable for this phone's graphics chip, estimated. Stylized shapes need far fewer. |
| **Moving particles** | under 2,000 | Enough for sparkle and mist |
| **Lights** | 2, and no real shadows | Shadows can halve the frame rate on a phone |
| **Full-screen effects** | none by default | Glow is faked with halos. A true glow pass is an optional high setting only. |
| **First visit download** | under 700 KB with the library as shipped. Under 450 KB once shrunk. | About one photo's worth of data |
| **First visit, tap to scene** | under 3 seconds on a normal phone connection | Estimated. You are easily distracted, so this matters. |
| **Return visit, tap to scene** | under 1 second, once the offline helper keeps the library (file 9, step 8) | The library is read from the phone |
| **Memory** | under 150 MB for the page | Estimated. iOS closes pages that use too much, without warning. Code-made art uses very little. |
| **Battery and heat** | Drawing stops while a task card is open or the app is hidden. An idle scene drops to 30 a second. | Most minutes in the world are spent on a task card, so most minutes cost almost nothing |
| **World code** | under 150 KB for the full writing realm | Keeps the no-build-step choice comfortable |

## Automatic quality steps

The world measures its own frame time during the first two seconds and now and then afterward. If frames run slow it steps down, in this order, and steps back up if there is room:

1. Fewer particles.
2. Pixels drawn drops from 2× to 1.5×.
3. Water becomes a simple still gradient with sparkles.
4. Far isles become flat shapes.
5. A steady 30 a second.

You never see a settings screen. If the lowest step still cannot hold 30 on your iPhone 14, I stop and tell you, as you asked, and propose the lighter option below.

## If it cannot run smoothly

The fallback, in order of how much it gives up:

1. **Smaller view distance:** one isle at a time with the rest as a painted-looking backdrop.
2. **Still camera per place:** each place becomes a fixed 3D picture you tap on. Still real 3D, still able to grow.
3. **Flat layered scenes:** the option I rejected in file 2. Only if 3D proves impossible on the phone, which I do not expect.

## Asset approach

- **Made by code, when needed:** islands, towers, sky, water, characters and effects are built from short recipes. A tower is a few numbers: height, rings, roof type, color.
- **Recipes are reusable.** One tower recipe draws every tower. This is what makes drift isles possible and what lets a smaller model add a place by writing a recipe, not a scene.
- **Batches:** every repeated thing is drawn in one go.
- **No image files by default.** Two tiny generated ones at most: a soft dot for halos and a gradient for the sky.
- **A swap point for models.** `character.js` hands back "a character". Today that is shapes. Later it can be a commissioned model, and nothing else needs to know.
- **Sound:** short files, loaded only after you turn sound on.

## Fit with the phone

| Concern | Plan |
|---|---|
| Safari's sliding bars | Layout uses the visible height only, and respects the notch and home bar |
| Rotation | The view re-fits on change. Portrait is the designed layout. |
| Background and return | Drawing stops when hidden. State was already saved. |
| iOS drops the 3D picture | The world listens for this and rebuilds the scene from its recipes |
| Touch | Taps and drags only. Page scrolling and pinch-zoom of the page are switched off inside the world so gestures go to the scene. |
| Text size | Panels are ordinary page text, so they follow the iPhone's setting. Only the scene is 3D. |
| Offline | After step 8 in file 9, the world opens with no connection |
| Home-screen icon | Works the same as in Safari. It keeps separate storage, as the Log already notes. |

**An important detail for readability and access:** the task card, speech panels and buttons are normal web page elements laid over the 3D picture, not drawn inside it. That is why text stays sharp, follows your text-size setting and works with the iPhone's screen reader.

## What I can and cannot measure

| I can measure here | I cannot |
|---|---|
| Download size, exactly | Real frame rate on an iPhone 14 |
| Number of objects and triangles drawn | Heat and battery use |
| Processor time per frame, on a slowed test processor | Safari's own memory limit behavior |
| Whether the scene survives rotation, hiding and picture loss, in a test browser | How it feels under your thumb |
| Text contrast | Whether the anchor looks right to you |

My test browser draws 3D with software, not a graphics chip, so its frame rate says nothing about your phone. I will report processor time and counts, call the phone frame rate an estimate and give you a small on-screen readout you can switch on to see the real number yourself.

## How the world loads without slowing lessons

- Bloom's home screen gets one link to the world. Nothing else from the world is loaded until you tap it.
- The offline helper keeps the big, rarely changing library on the phone and keeps today's always-fresh rule for everything else. That change is its own run, alone, because a mistake there can leave a phone stuck on an old version.
- **For the prototype, the offline helper is not touched.** The prototype will re-download the library on each open. That is acceptable for a test and I will say so in the report.

## Risks, plainly

| Risk | How likely | What I would do |
|---|---|---|
| The anchor's face does not satisfy you | Real | The swap point, and the artist request in file 3 |
| Frame rate dips on the phone when many things glow at once | Possible | Quality steps, fewer see-through layers |
| The phone warms up during long roaming | Possible | The 30-a-second idle mode, stopping when hidden |
| Safari changes how it handles 3D in a future iOS | Low | three.js is widely used and tracks such changes. The library version is pinned and updated on purpose, never by accident. |
| The world grows past what plain files handle comfortably | Later | Add a build step to the world folder only |
| Vercel preview pages share the live database | Unknown, flagged by the audit | The prototype makes no server calls at all, so it does not matter for Phase 2. Check before the real world page ships. |
