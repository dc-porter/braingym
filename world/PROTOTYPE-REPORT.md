# Aurelune world prototype: report

Nov 14, 2026 · for Dee · Phase 2 of the World Design Brief

**This is a prototype. It does not merge.** It lives only on the branch claude/world-prototype, in the new folder world/. No existing file was changed. The names Aurelune and Amaris are still proposals that need an online check.

## Update, Nov 16, 2026: two small fixes

Made after your phone test. Nothing else was touched: not the other practice items, the portal, the landscape layout, roaming or any art.

**1. Tap to arrange no longer gives away the first piece.**

- Every piece now starts with a lowercase letter, so no piece stands out by its capital. The card capitalizes whichever piece you place first.
- Each of the four arrange items has one decoy piece that does not belong. The prompt says so: "One piece does not belong."
- Each decoy is a real, tempting mistake tied to the item's rule: a semicolon where a comma belongs, a comma before "however", a comma with no joining word, and a "because" clause standing alone as a sentence.
- **One right order still holds.** With capitals no longer pinning the first piece, three of the four sentences had to be cut in different places, and two feedback lines were reworded to match. The sentences themselves are unchanged. I listed every plausible sentence each set of pieces can form and read them all: one is right in each set.
- Checked in the test browser: all four items were solved through the real card, an answer using a decoy was judged "Not yet", and no piece in the bank showed a capital (measured).

**2. The Sound control no longer pretends to work.**

- On the first screen it now reads "Sound: coming soon" and cannot be tapped. In the menu the Sound row reads "Coming soon" and cannot be tapped.
- No audio was added. Sound is forced off, so the two tones mentioned below never play. In a test that tapped both controls and played through, the page created no sound object at all (measured).
- The likely reason you heard nothing before is recorded in `docs/world/art/06-sound.md` on the branch claude/world-art-direction.

**The two promises still hold (re-checked Nov 16).** A full play-through asked for 16 files, all inside world/. A call to /api/ping from inside the page was blocked. Storage held only the two bloomworldproto_ names.

**Your phone results, for the record:** loads in a few seconds, 60 frames a second, quality 6 of 6, readable text, survives app switching, the whole loop works. The look did not reach your bar: code-built characters and buildings are ruled out. The art plan is in `docs/world/art/` on claude/world-art-direction.

## The two promises you asked me to confirm

**1. The prototype makes no server calls.** Confirmed, three ways:

- **By the code:** the prototype's own files contain no network call of any kind. I searched them for every way a page can call a server and found none.
- **By a rule the browser enforces:** the page carries an instruction (a Content Security Policy) telling the browser to refuse every network call from it. I tested it: a call to /api/ping and a call to /api/progress from inside the page were both blocked (measured).
- **By watching it run:** in a full play-through, the browser asked for exactly 16 files, all inside world/. Nothing from /api/, nothing from another site, no fonts.

**2. The prototype never writes to your real progress.** Confirmed:

- It does not load js/data.js or js/app.js, so it has no access to Bloom's questions, engine or backup code.
- It stores its data under two names only, both starting with bloomworldproto_ (measured after a full play-through). Bloom's Export, Import and backup read only names starting with bloom_v1_.
- The preview link is a different web address from your live Bloom, so the browser keeps their storage apart anyway.

No real question was read or borrowed. All 16 practice items and the one short lesson are stand-ins I wrote, each tagged as a sample on screen.

## What is built

About two minutes, start to finish:

| Step | What happens |
|---|---|
| Banner | "Prototype. Stand-in data. Your real Bloom progress is not used or changed." Sound is not built; its control reads "coming soon". |
| Arrival | The view sweeps down from the ringed planet to the Crown Isle, the castle and the dim First Gate. Skippable. |
| Queen Amaris | Drawn from code: warm golden-brown skin, long platinum hair that drifts, layered robe, calm face. She greets you in two short bubbles and offers two choices. |
| A short calm lesson | One "why" line, then the rule with one example and the key mark highlighted. This fakes "the world can start a skill" with stand-in content. |
| The task | Five lights to light on the calm card. Three activity types: a question (multiple choice), a hands-on repair (tap to find and fix) and a small building game (tap to arrange, the experiment, with a switch in the menu). |
| Feedback | After every answer. A miss shows the rule, the reason and a corrected example, then gives a fresh item on the same point. Lights you earned stay lit. No red, no fail screen, no timer. |
| Payoff | The ghost copies snap together, the Gate turns gold, the castle windows turn gold and "+10 prototype coins: you restored the First Gate" appears. The reward shows only when the set is finished. |
| Portal | Tap the lit Gate. The view folds into light and opens on a small placeholder isle with the twin gate in mirrored colors. Tap the twin to return. |
| Terrace | Tap the ground to walk. One flickering sign gives a single extra fix for +2 coins. A viewpoint stone lifts the camera for a vista. |
| Leave and return | Saved after every answer. Reopening offers "Welcome back. The inscription is right where you left it." |

Also built: reduce motion (follows the iPhone and has its own switch), automatic quality steps, a hidden performance readout, rebuilding the scene if the phone drops the 3D picture, portrait and landscape layouts and a Reset prototype button.

**The menu button** is the round button at the bottom right. **The readout** is in the menu, or tap the top-right corner three times.

## Measured numbers

"Measured" means I ran it and read the number in a test browser on a server. That browser draws 3D in software, so it cannot tell you the real frame rate on a phone.

| Budget line (design package, file 10) | Budget | Result | How I know |
|---|---|---|---|
| First visit download | under 450 KB once the library is shrunk | **237 KB** | Measured (sum of compressed files) |
| …of which the 3D library | 180 to 220 KB estimated | **195 KB** | Measured |
| …of which the prototype's own code | under 60 KB | **38 KB** | Measured |
| Separate objects drawn per frame | under 80 | **33 to 51** | Measured, in every view |
| Triangles on screen | under 100,000 | **13,500 to 29,100** | Measured |
| Moving particles | under 2,000 | **160 motes, plus 110 for one second at the payoff** | Measured |
| Lights and shadows | 2 lights, no real shadows | 3 lights, no real shadows | By design: I added one soft warm light so brown skin stays warm under blue moonlight |
| Full-screen effects | none | none | By design |
| Pixels drawn | capped at 2× | **780 × 1688** on an iPhone 14-sized screen, which is 2× | Measured |
| Processor work per frame | under 8 ms on the phone | **9.8 ms on a test processor slowed 4×**, 1 to 4 ms unslowed | Measured, but on a server chip. The phone figure is an estimate: I expect it under 8 ms. |
| Memory | under 150 MB | **19 MB** of script memory, 1 small image, 46 shapes | Measured. Graphics memory on the phone is not measurable from here. |
| Tap to scene | under 3 seconds first visit | **0.4 s** from a local disk, 1.1 s on the slowed processor | Measured without a real network. Add download time for 237 KB: about 1 to 2 seconds on normal mobile data (estimated). |
| Frame rate | 60 goal, never below 30 | **Unknown** | Cannot be measured without your phone. Estimated to hold 60, given the counts above are about half the budget. |
| Text contrast on the card | strong | **16.8 to 1** body text, 12 to 1 on buttons, 11.4 to 1 for small gray labels | Measured by calculation. The usual standard is 4.5 to 1. |
| World code size for the full realm | under 150 KB | 38 KB so far | Measured |

## Checked in the test browser

- A full play-through with no errors, including one deliberate miss.
- Leaving mid-task and reloading: same item, same lights (measured).
- Switching away and back with a task open: the card is still there (measured, by simulating the app going to the background).
- Rotating to landscape and back: the scene and the card re-fit (measured).
- Dropping and restoring the 3D picture: the scene comes back (measured, by forcing it).
- Reduce motion: the arrival sweep is skipped and shimmer, bobbing and bursts are stilled (measured).
- Real taps on the ground move the avatar (measured).

## What I could not verify

- **The preview link itself.** Vercel reports the build as Ready, but the address asks for your Vercel sign-in, so I could not open it from here. Everything above was measured on the same files served from a local test server.
- **Real frame rate, heat and battery on an iPhone 14.** Only you can.
- **How it feels under your thumb**, and whether tap targets in the scene are comfortable.
- **Safari itself.** My test browser is Chromium. I avoided anything Safari handles differently where I knew of it, but nothing here has run in Safari.
- **Sound.** Not built. Two soft test tones exist in the code but are switched off, and the control reads "coming soon".
- **The home-screen icon mode**, phone calls and real app switching. I simulated the last one only.
- **Download time on mobile data.**
- **Whether the names Aurelune and Amaris are free to use.**
- **The stand-in practice items.** I wrote them carefully in AP style with one right answer each, but they have had no second review and are not real content.

## Known issues

1. **The offline helper is untouched**, as planned. If you ever opened the top-level preview address, the helper may re-download the world's files on each visit. That is acceptable for a test and is step B8 for Opus.
2. **Faces are simple by design.** Amaris has calm closed eyes drawn as curved lines. Whether that reads as serene or as too plain is your call.
3. **Hands and arms are basic.** Sleeves hang straight and gestures are small.
4. **Characters glide.** There is no walk cycle, by design.
5. **The avatar walks in a straight line** to where you tap and stops at the isle's edge. There is no path-finding yet, so it will not walk around things. The Queen is the only thing it steers around.
6. **Signs have no readable words on them** in the 3D scene. The text appears on the panel when you tap.
7. **No system fonts are downloaded**, to keep the page free of outside requests. On an iPhone it uses Apple's rounded system font. The design package named Fredoka and Nunito; that would need the font files saved into the project.
8. **The stand-in "engine" is simple.** It nudges a pretend level up and down and prefers items you have not seen. It is there to make retries feel different, not to model Bloom.
9. **A third light was added** against the two-light budget. Cost is small. Listed so the number is honest.
10. **The top-level preview address shows a blank Bloom**, not yours. Use the /world/ link only.

## Phone checklist (six items)

Open this link in Safari, signed in to Vercel as you are for your other previews:

**The Preview link on pull request 51, with `/world/` added to the end.** The preview address has changed since this report was first written, so take it from the pull request each time. On Nov. 16, 2026 it was https://braingym-git-claude-world-prototype-deepo333.vercel.app/world/

1. **Speed:** from tapping Begin, does the world appear within about three seconds on mobile data?
2. **Smoothness:** open the menu, turn on Performance readout, and watch "frames/s" during the arrival, at the Gate and on the terrace. Near 60 is the goal. Tell me the lowest number you see, and the "quality" line.
3. **Reading:** is every word on the task card and in the speech bubbles easy to read at your usual text size?
4. **Real life:** in the middle of the task, switch to another app for a minute and come back. Then close the tab and reopen the link. Are you where you were, with the same lights lit?
5. **Rotation and thumbs:** turn the phone sideways and back. Can you reach every button with one thumb in portrait, and does anything hide or break?
6. **The look:** does Amaris look right to you, and does the world feel like the one you pictured? This is the character decision you set aside for the prototype.

## What is in the folder

```
world/
  index.html            the page, with the no-network rule
  world.css             panels, the calm card, buttons
  PROTOTYPE-REPORT.md   this file
  vendor/three/         the 3D library, version 0.187.0, pinned, with its license
  js/
    main.js             starts everything and runs the flow
    door.js             the only file that talks to Bloom (the stand-in, for now)
    standin-bloom.js    fake Bloom: stand-in items, lesson, fake coins, own storage
    kit.js              colors, the merged-shape builder, soft material, halos
    sky.js  water.js  island.js  gate.js  character.js  effects.js
    taskcard.js         the calm card and its three activity types
    ui.js               speech, toast, reward, fold, sound, menu
```

Loaded only by the world page. Bloom's own pages do not refer to anything in world/.

Keep everything else about the app exactly the same.
