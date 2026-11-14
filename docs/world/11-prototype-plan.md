# 11. Prototype plan (Phase 2)

Not started. This is what I would build if you say go.

## What it is for

Three questions only a prototype can answer:

1. **Does the look work for you?** The sky, the castle, the gate and above all the anchor character.
2. **Does it run smoothly on your iPhone 14?**
3. **Does the loop feel good?** Arrive, repair, light, step through, stroll.

It is not a first version of the world. It is a test piece. Parts of it are built to be reused, and file "handoff-for-opus" says which.

## What you would experience

About two minutes, start to finish:

1. **A banner:** "Prototype. Stand-in data. Your real Bloom progress is not used or changed." Sound is off, with a switch.
2. **Arrival.** Streaks of starlight fold into an archway. The camera rises over the Crown Isle: waterfalls, far isles, a ringed planet.
3. **The castle and the dim First Gate,** with ghost copies shimmering.
4. **Queen Amaris** drifts forward and speaks two short bubbles.
5. **The task.** The scene dims and pauses. A calm card rises with five stand-in items, mixing tap-to-fix and multiple choice. Each right answer lights one glyph on a small strip at the top of the card. A miss shows the rule, the reason and a corrected example, then a fresh item on the same point.
6. **The payoff.** The card slides away. The ghost copies snap into one, the Gate floods gold and "+10 prototype coins: you restored the First Gate" appears.
7. **The portal.** Tap the Gate. The scene folds into light and unfolds on a small placeholder isle with its twin gate. A sign says "More to come". Tap the twin to return.
8. **The path.** A short terrace walk outside the castle. Tap to move. One flickering sign to tap for a single extra fix, and a viewpoint stone that lifts the camera.
9. **Leave and come back** at any point: you return to the same spot, with the same lights lit.

## In

| Item from your brief | How it is met |
|---|---|
| The arrival moment, with the castle and the dim portal gate in view | Steps 2 and 3 |
| One finished anchor character | Amaris, built from shapes, with idle, greeting and speaking motion |
| One task restoring the gate with real writing practice | Five-light set on punctuation and sentence boundaries. **Stand-in items written by me, clearly tagged.** No real question is read or borrowed. |
| A coin reward and the gate lighting up | Fake coins with a one-line reason, clearly labeled, stored apart from real progress |
| One portal moment | The fold-through to a placeholder isle and back |
| A short path outside the castle | The terrace, tap to move |
| A 3D foundation that can grow | The folder layout, recipes, doorway file, save file and quality steps from file 10 |

Also in, because they are cheap now and expensive to add later:

- Saving after every answer, and restoring on return.
- Rebuilding the scene if iOS drops it.
- Reduce motion and the sound switch.
- The automatic quality steps.
- A hidden readout (tap the corner three times) showing frame rate, objects drawn and triangles, so you can read real numbers off your own phone.
- A "Reset prototype" button.

## Out

As your brief says: crystals and the second currency, avatar choices beyond one default, any subject but writing and more than one host.

I would also leave out: sound beyond two soft tones, the overview map, swimming and rides, tap-to-arrange (it waits for your decision), drift isles and any change to Bloom itself.

## Stand-in practice items

- About 12 items, so retries are always fresh: 6 tap-to-fix and 6 multiple choice.
- All on two stand-in skills: punctuation and sentence boundaries (fragments and run-ons).
- Written new for this purpose, as short formal notices and inscriptions. AP style. One defensible answer each. Feedback gives the rule, the reason and a corrected example.
- Each carries `standIn: true` and shows a small "practice sample" tag.
- **You should read them before treating them as real content.** They have had no second review pass. They exist to test the feel of a task, not to teach.

## How it stays apart from real Bloom

| Protection | Detail |
|---|---|
| Its own branch | claude/world-prototype, started from main. Nothing merges. |
| Its own folder | Everything is under world/. No existing file is edited. |
| Its own page | It does not load js/data.js or js/app.js, so it cannot read a question or trigger a backup. |
| Its own storage name | bloomworldproto_. Bloom's Export, Import and backup only read bloom_v1_. |
| No server calls | It never contacts /api/. |
| Its own link | The branch's Vercel preview address, with /world/ on the end. A preview address also has separate browser storage from the live site. |

**One thing to confirm when we get there:** Vercel normally makes a preview link for any pushed branch. If your project only makes them for pull requests, I would need your go-ahead to open a draft pull request, marked "do not merge", purely to get the link.

**One thing to know:** the preview address also serves the normal Bloom app at its top level, starting empty. Opening that is harmless, but it is not your Bloom. Use the /world/ link only.

## What I would report when done

As your brief asks: what is built, numbers labeled measured or estimated against every line of the budget in file 10, what I could not verify, known issues, the preview link and a phone checklist of at most six items. A draft of that checklist:

1. Does it open in under about three seconds on mobile data?
2. Turn on the readout: does the frame rate stay near 60, and never under 30, during the arrival and on the terrace?
3. Is every word on the task card easy to read, at your usual text size?
4. Mid-task, switch to another app for a minute, then return. Are you where you were?
5. Rotate the phone and back. Does anything break or hide?
6. Does Amaris look right to you?

## Size

**Medium to large. Plan for large.**

| Part | Size | Uncertainty |
|---|---|---|
| Page, folder layout, quality steps, save and restore | Small | Low |
| Sky, isle, castle, water | Medium | Low. This is what code does well. |
| The Gate with shimmer, lighting up and the portal fold | Medium | Medium |
| **Amaris** | Medium | **High. May need two or three passes.** |
| Task card with two activity types, feedback and retries | Medium | Low |
| Tap-to-move terrace | Small | Low |
| Measuring and the report | Small | Low |

If I run short, the order is: one polished area (arrival, castle, gate and Amaris) first, then the task and payoff, then the portal, then the terrace.

## What the prototype will not tell you

- Whether the learning works. Only Stages 4 and 5 can.
- Whether the economy is paced right. The coins are fake.
- Whether you will still enjoy it in week 6. Only real use can.
