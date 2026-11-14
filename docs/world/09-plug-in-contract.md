# 9. The plug-in contract

This is the agreement between the world and Bloom: what the world may ask, what it sends back and who owns what. It is written so the world can be built, replaced or switched off without ever touching how Bloom teaches or scores.

## The one rule

**Bloom decides everything about learning. The world decides everything about the scene.**

The world never picks a difficulty, never marks an answer right or wrong, never changes a skill record, never adds a coin and never reads or writes saved data directly. It asks Bloom through the doorway. If the world's code vanished tomorrow, every lesson, score and coin would still be correct.

## Today's facts (from the audit, treated as true)

| Fact | What it means for the world |
|---|---|
| There is no doorway. All logic is sealed inside js/app.js. | The world cannot ask for a level or report a result yet. |
| There are no coins or rewards in the code. | The wallet has to be built in Bloom first. |
| Skill records are filed under display names and tied to four writing categories. | The world cannot safely name a skill until the skill map with permanent IDs exists. |
| Lessons and the placement test share the same questions. | The world must never serve an item the placement test can serve. |
| There is no log of which question was answered. | "Fresh item" and coin reasons such as "right after missing it yesterday" cannot work yet. |
| The offline helper re-downloads every file on each open. | A 3D library would be downloaded again on every visit. |
| Bloom's Export, Import and backup carry every saved entry whose name starts with bloom_v1_. | World data saved under that name travels automatically. Anything else is invisible to backup, which is exactly what the prototype wants. |

## What the world asks Bloom (seven questions)

The doorway is one small object named `BloomDoor`. Each entry below is one function. Programmers will recognize the shape. For you, read the middle column.

| Entry | In plain words | Sends back |
|---|---|---|
| `BloomDoor.version` | Which version of the contract is this? | A number. The world refuses to start on a version it does not know, and says so plainly. |
| `getLearner()` | Who is playing? | Display name and avatar choice. Never age, education or the device ID. |
| `getSkills(skillIds)` | How is this learner doing on these sub-skills? | For each: started or not, level 1 to 10, whether a review is due. No raw history. |
| `getPlan(placeId, skillIds)` | I am at this place, which teaches these sub-skills. What should happen next? | Two to four choices, already ordered by Bloom: weakest first, due reviews included, a strong skill sampled now and then. Each choice names a sub-skill and whether a short lesson must come first. |
| `startTask(placeId, skillId, count, formats)` | Give me a set of practice items for this sub-skill, in formats this activity can show. | A task ID and the items: prompt, options and format. **No answer key.** Items are fresh where possible, at a difficulty Bloom chose. |
| `checkAnswer(taskId, itemId, pick)` | The learner picked this. | Right or wrong, the correct answer, and the feedback: rule, reason and corrected example. Bloom records the answer and updates the skill record at this moment, so closing the app loses nothing. |
| `finishTask(taskId)` | Every light is lit. | The coins earned, each with its one-line reason, and the new balance. Bloom decides the amount. |

## What the world tells Bloom (three messages)

| Entry | In plain words | Rule |
|---|---|---|
| `spend(amount, itemId)` | The learner chose to buy this world item. | Bloom checks the balance and takes the coins, or refuses. Nothing else can lower a balance. |
| `saveWorld(state)` | Here is the world as it stands. | One small bundle, kept by Bloom under bloom_v1_world with its own version number. Capped at 50 KB (estimated need: under 10 KB). |
| `loadWorld()` | What did the world look like last time? | The same bundle back, or nothing for a new learner. |

There is also one notice the other way: `onChange(callback)`, so the world hears when progress changed somewhere else, for example after an Import.

## Who owns what

| Thing | Owner | Why |
|---|---|---|
| Skill levels, review dates, answer log | Bloom | One source of truth. The audit warns against a second copy that drifts. |
| Practice items and their answers | Bloom | The world never sees an answer before the learner commits. |
| Coins: balance and ledger | Bloom | Guarantees coins come only from finished learning. |
| Coin amounts and reasons | Bloom | So lessons outside the world pay by the same rules. |
| What is built, lit and placed | World (saved through Bloom) | Scene state only. |
| Where the avatar is standing, which task is open | World (saved through Bloom) | So returning puts you where you were. |
| Crystals and cosmetics | World (saved through Bloom) | Cosmetic only, and they never touch learning. |
| Sound and reduce-motion choices | World (saved through Bloom) | Preferences. |

## Rules both sides keep

1. **Every activity names its sub-skill.** `startTask` will not run without a skill ID from the skill map. An activity with no skill cannot exist. This enforces your Test 1 in code.
2. **The world only ever gets practice items marked for the world.** Placement items are never served. Bloom enforces this, not the world.
3. **The world passes the pick, never the verdict.** There is no way to tell Bloom "they got it right".
4. **Saved after every answer.** `checkAnswer` writes at once. The world also saves its own state at each answer and each purchase.
5. **Missing is safe.** If the world page fails to load, Bloom is untouched. If Bloom's doorway is missing or too old, the world shows a plain message and a button back to Bloom.
6. **Offline works.** Items, checking and saving all happen on the phone. Only the backup upload waits for a connection, as it does today.
7. **The placement test is not in this contract.** When stops move into the world (Roadmap Stage 9), the test keeps its own code and the world only supplies the scenery around it. Break-game results go through `startTask` with a marker that says "never counts toward placement".

## What the world state bundle holds

Kept deliberately small and boring:

- Contract and bundle version numbers.
- Which places are lit, their upgrade level and what the learner has placed.
- Which portals are open.
- Where the avatar is: place and position.
- The task in progress, if any: task ID and which lights are lit.
- Crystals held, hidden crystals found and cosmetics owned.
- Story beats already seen, so nothing replays.
- Preferences: sound and reduce motion.

It holds **no** coins, levels, answers or question text.

## What must change in Bloom first

Eight steps. Each is one purpose, ends in a pull request and starts from main. None mixes question content, app behavior and saved-data shape. Steps 1 to 4 are things the audit says lessons need regardless of any world, so none of this is wasted if the world changes.

**Before these: your own three decisions from the audit.** Settle the unmerged question branch, take the real retake and approve one documents-only pass. These are not world work and I have not touched them.

| # | Step | Kind | Why the world needs it | Undo point |
|---|---|---|---|---|
| 1 | **Answer log.** Save one small record per answer: item ID, skill, right or wrong, date, where it was asked. Add the item ID to lesson history. | Adds saved data only | Fresh items, coin reasons, retries on the missed point | Its pull request. Old data is untouched. |
| 2 | **Skill map.** One list of sub-skills with permanent IDs and a subject, a version number on saved progress and a one-time conversion that also runs on Import. | Saved-data shape. Goes alone. Export before, Import test after. | Places must point at skills that cannot be renamed out from under them. Second subjects need the subject field. | Its pull request, plus your Export. |
| 3 | **Item pools.** Mark every item as test, lesson or world. No item text changes. | Question data only | The world must never show an item the placement test can serve | Its pull request |
| 4 | **The doorway, read-only half.** Move the skill engine into its own file with `version`, `getLearner`, `getSkills` and `getPlan`. No behavior change, proven by running the same simulation before and after. | App structure only | The world can ask questions | Its pull request |
| 5 | **The doorway, task half.** `startTask`, `checkAnswer` and `finishTask` (paying zero coins for now). | App behavior | The world can run practice | Its pull request |
| 6 | **Coins in Bloom.** The wallet, the ledger and the exact-task pay rules, shown with one-line reasons. `finishTask` now pays. `spend` exists. | Saved-data shape. Goes alone. | Coins must exist before anything can be bought | Its pull request, plus your Export |
| 7 | **World slot in saving.** `saveWorld` and `loadWorld`, carried by Export, Import and backup. Reset clears it. | Saved-data shape. Goes alone. | Returning puts you where you were, and your world survives a new phone | Its pull request, plus your Export |
| 8 | **Offline helper.** Keep the saved copy of big, rarely changing world files (the 3D library, sounds). Keep today's always-fresh rule for everything else. | sw.js only. Goes alone. | Otherwise the 3D library downloads again on every open | Its pull request. A mistake here can leave a phone on an old version, so it gets its own phone check. |

After step 8, the real world page can be added as a ninth run that only adds files and one link.

**Where these sit in the Roadmap.** Steps 1 and 2 belong at the start of Stage 4, as the audit says. Step 3 belongs with them or just after. Steps 4 to 8 can wait until Stage 8, or be done earlier whenever convenient, because none changes what lessons do.

## The prototype's stand-in

The prototype needs none of the eight steps. It ships with its own tiny fake Bloom:

- **A file named standin-bloom.js** that offers the same ten entries with the same shapes, so the world code written for the prototype is the world code that later talks to real Bloom. Swapping the stand-in for the real doorway is a one-line change.
- **Stand-in practice items written by me,** about a dozen, each marked `standIn: true` and shown with a small "practice sample" tag. They are new sentences on gate-inscription themes. None is copied, adapted or derived from js/data.js, and the prototype page does not load that file.
- **Fake coins,** shown with a small "prototype coins" label and kept only in the prototype's own storage.
- **Its own storage name,** bloomworldproto_. Bloom's Export, Import and backup only read names starting with bloom_v1_, so they cannot see it. A "Reset prototype" button wipes it.
- **Fixed stand-in skills:** two invented IDs, `standin.punctuation` and `standin.sentence-boundaries`, with a pretend starting level of 5 that moves up and down as you answer, so you can feel a retry get easier.
- **A visible banner on first load:** "Prototype. Stand-in data. Your real Bloom progress is not used or changed."

## How I would prove the contract holds

- **Before and after simulation** for step 4: run the audit's three simulated learners, compare every number, expect no difference.
- **A contract test page** (plain file, no tools) that calls each entry against both the stand-in and real Bloom and shows a green or red line for each.
- **A leak check** for step 3: ask for 1,000 world items and confirm none carries a placement ID.
- **Your phone check** after each step, from the pull request's preview link.
