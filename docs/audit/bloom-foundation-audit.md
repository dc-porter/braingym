# Bloom Foundation Audit

Nov 14, 2026 · for Dee · read-only audit of dc-porter/braingym, main branch at pull request 50

Nothing in the app, its data, its settings or the three reference documents was changed. This file is the only thing created.

**Words used in this report**

- **Branch:** a separate working copy of the code. Main is the live one.
- **Merge:** copying a branch's changes into main.
- **Pull request (PR):** a request to merge, which gives you a preview link and an undo point.
- **Verified:** I read the code or ran it. **Inferred:** I am reasoning from clues.
- **Pile 1:** code that breaks the documents. **Pile 2:** documents that contradict each other or are out of date. **Pile 3:** a document rule that looks weaker than a better approach.

---

## 1. One-page summary

**The foundation is sound enough to build lessons on, after a short list of fixes. It is not ready to carry a game world yet.**

What is solid:

- Saving on the phone, Export, Import and the quiet server backup all work as the documents describe. The server code is careful.
- No password or key is stored anywhere in the code or its history.
- The placement scoring behaves sensibly for low, middle and fairly strong learners.
- The app is small and fast. Nothing is slow today.

What needs attention before more is built, hardest to undo first:

1. **Bloom does not keep a log of which question you answered.** Lesson history stores the question text but not the question's ID. Fresh-question reviews, retention checks and coin reasons all need that log. Answers given before the log exists can never be recovered.
2. **Skill records are filed under display names**, such as "Parallel Structure". Renaming a skill orphans its record. You already plan a skill map with permanent IDs. It also needs a version number on saved data and a one-time conversion step.
3. **Lessons and the placement test draw from the same questions.** Lessons show the right answer and the explanation. A later retake then partly measures memory of those questions.
4. **There is no doorway.** All logic is sealed inside one file, so a world page cannot ask for a skill level or send back a result.
5. **The server copy cannot be found again after browser data is cleared**, because the only key to it is erased along with the progress. Download alone will not fix that. Sign-in will.

Two things to decide right away:

- **The branch claude/placement-quality-pass is unmerged and has no pull request.** It rewrites 154 questions. It is technically safe but should not be merged blind. Decide before your retake.
- **The documents have drifted.** They are wrong about the hidden difficulty step (it is 2, not 1) and about lesson saving (lessons already save after every answer). The world brief also describes a different world from the one in the Decisions Log.

Your two questions, in short:

- **Step size of 2:** outdated documents, not a bug. Change the documents.
- **85% target:** the code is behind the documents. Change the code, but as part of Stage 4, not as an urgent fix.

Every recommendation below was challenged twice before it was kept: once as a skeptic who thinks it is wrong, and once by asking what a better alternative would be. Recommendations that did not survive are listed in section 11.

---

## 2. The unmerged branch: claude/placement-quality-pass

**What goes wrong if this is ignored:** your retake is the only real check on the question ratings. If you retake on main and merge this branch afterward, the retake checked questions that no longer exist.

**What it is.** Three commits from Nov 12, built on top of pull request 50. No pull request was opened. Only `js/data.js` changes. No app logic changes.

| Commit | What it does | Size |
|---|---|---|
| b8fc09c | The small cleanup the Decisions Log lists: sx32 retagged, xanthosis replaced with entrepreneur, sp10, sp42 and sx5 re-rated, vx9 origin line removed | 6 questions |
| 42d2339 | A "quality pass": removes context clues, strengthens wrong options | 143 questions |
| 52eb492 | Follow-up: evens out answer lengths, re-rates more spellings | included in the totals below |

**Totals against main (Verified by script):**

- 154 of 385 questions changed. No question was added or removed, and no ID changed.
- 139 had options changed, 102 had the question text changed, 144 had the explanation changed.
- 41 have a different correct answer text. 40 are Vocabulary. The other is the xanthosis swap.
- 76 were re-rated. Vocabulary moved up broadly, by 1 to 3 levels. Eleven Spelling words moved down to 6 or 7.
- One tag changed (sx32).
- Correct answer positions are now exactly even: A 83, B 83, C 83, D 83.
- The file loads without errors. Every question still has four different options, one valid answer and an explanation.

**What looks risky:**

1. **It changes what Vocabulary measures.** Most Vocabulary questions lost their context sentence. Example, vc5: the old sentence described a man slipping out a side door. The new one says only "The senator was criticized for a pusillanimous response to the crisis." These questions are still tagged "Word Meaning in Context", but they now test whether you already know the word. That is a design decision, and it is not in the Decisions Log.
2. **Twelve antonym questions changed format.** They were fill-in-the-blank. They now ask "What is the opposite of X?" with two-word phrases as options. The samples I read follow the one-opposite rule.
3. **Vocabulary gets harder overall.** Questions at levels 1 to 3 drop from 25 to 10. A weak Vocabulary learner will see harder questions than the test intends.
4. **Spelling loses its top.** Spelling questions at level 7 or above drop from 14 to 4. In simulation a perfect Spelling test scores 8 on the branch, against 9 on main. This follows your Spelling cap rule, so it is expected, but you should know it.
5. **It is far bigger than what was approved.** The Log calls for a small cleanup. This is the largest single question change in the project, and nobody has reviewed it on a preview.
6. **I read 13 of the 154 changed questions.** Those 13 were clean. That is a spot-check, not a review.

**Is it safe to merge?**

- **Technically, yes.** It cannot break the app, saved progress, Export or Import. Saved placement records keep their own copy of each question, so old results stay readable.
- **As content, not yet.** My recommendation: open a pull request for it, read it on the Vercel preview and decide the Vocabulary context question on purpose. If you are unsure, the first commit alone (6 questions) is exactly the approved cleanup and could be merged by itself through a new small branch.
- **Either way, decide before the retake.**

**What would change my mind:** a second reviewer or a dictionary check passing all 41 changed answers, and your saying that bare-definition Vocabulary questions are what you want.

---

## 3. Your two questions: bug or outdated document?

### The hidden difficulty step

**What I found (Verified).** The real target moves 2 levels per answer (`js/app.js` line 254, `PLACEMENT_ACTUAL_STEP = 2`). The number shown on screen moves 1 (line 255). This was done on purpose on Sept. 20 (commit 79fac59), and the comment above the code explains it. The scoring formula at line 431 was later designed around a step of 2.

**Where the documents say 1:** Decisions Log section 1 ("±1 per answer") and Roadmap Stage 3 checklist ("Difficulty moves one step per answer").

**Verdict: outdated documents, not a code bug. Change the documents.**

Why not change the code instead:

- With only 8 to 12 questions per category, a step of 2 reaches a strong or weak learner's level in three answers. A step of 1 needs five.
- I simulated both. A step of 1 was slightly more accurate for a middle learner (within one level about 85% of the time, against 80%). At the top and bottom the two were the same. The simulated learner is my own assumption, so treat that as a hint only.
- Changing the step would also mean retuning the scoring formula, right before the retake that is meant to check it.

One follow-on: you have settled that the placement screen drops its difficulty number. Once it is gone, the separate 1-step display counter is dead code and can be removed in the same change.

**What would change my mind:** retake data showing the target bouncing between two levels instead of settling.

### The 85% target

**What I found (Verified).** Lessons aim for a fixed 85% success rate (`js/app.js` line 617, `SKILL_TARGET_ACCURACY = 0.85`). It was added Sept. 21 (commit ace943a) and works exactly as its comment describes.

**What the documents say:** the Decisions Log replaced the fixed 85% with a flexible 70 to 90% range: about 80 to 85% for new material and 60 to 75% for spaced reviews. The Design Guide says the same.

**Verdict: neither a bug nor an outdated document. The code is behind the documents. Change the code.**

But it is not urgent:

- 85% sits inside the allowed range and at the top of the "new material" band. Lessons today are all new-material practice. So the app is not misbehaving.
- What is missing is the ability to use a different target for a different situation, such as reviews. That belongs with the Stage 4 and Stage 7 engine work.
- The fix is to turn the one fixed number into a setting chosen by situation, with the Guide's defaults. That is a small change.

**What would change my mind:** nothing about the direction. The Log is clear.

---

## 4. Simulation results

Three simulated learners on main, no data written (Verified by running the app's own selection and scoring rules):

| Learner | Hidden target, first answers | Final scores (Grammar, Word Choice, Vocabulary, Spelling) |
|---|---|---|
| All right | 5, 7, 9, 10, 10 … | 8, 8, 9, 9 |
| All wrong | 5, 3, 1, 1, 1 … | 1, 1, 1, 1 |
| Right, wrong, right … | 5, 7, 5, 7 … | 5, 6, 6, 6 |

- **Top of the scale.** No category can score 10. A perfect test scores 8 or 9. The target reaches 10 by the fourth question, but the test rotates through skills, and many skills have nothing rated above 6. A perfect Grammar test was served questions rated 5, 8, 8, 6, 9, 5, 8, 5, 7, 7, 8, 5.
- **Bottom of the scale.** The target reaches 1 by the third question and the score reaches 1. Someone guessing at random scores about 2.
- **In between (Inferred, my learner model).** Scores land within one level of the truth about 60 to 99% of the time, best around level 7. A true level 9 or 10 in Grammar reads as about 7.5.

This fits your working assumption in the Log: treat 8 or above as an advanced start.

---

## 5. Top 10, ranked by how hard each gets to fix later

### 1. No answer log, and lesson history has no question IDs

- **Pile:** 3 (and it blocks rules in the Guide)
- **Where:** `js/app.js` lines 871 to 895. Each finished lesson saves the question text, options and your pick, but not the question's ID.
- **What goes wrong:** Bloom cannot tell which questions you have seen. Your settled review rule (fresh question first, otherwise the one seen longest ago) cannot work. Retention checks, "in-lesson" against "retained" scores and coin reasons such as "right after missing it yesterday" all need the same record. Inside one lesson no question repeats, but across lessons the picker has no memory.
- **How sure:** Verified.
- **Hard to undo:** yes, the hardest in this report. Answers given before the log exists are gone for good. Every lesson done before the fix is lost evidence.
- **Fix size:** small. Add one small record per answer: question ID, skill ID, right or wrong, date and where it was asked. Add the ID to lesson history too.
- **Checked twice:** Skeptic: history already stores everything. Answer: it stores text, and matching text back to questions breaks whenever a question is edited. Alternative: store IDs only and drop the text. That would also fix storage growth (item 9), but it is a bigger change, so it comes later.
- **What would change my mind:** nothing I can think of. It only adds data.

### 2. Skill records are filed under display names, with no version number on saved data

- **Pile:** 3 (you have settled the skill map; this confirms it and adds two parts)
- **Where:** `js/app.js` line 645 (`skillKey` joins category and skill name). The same names are used in placement results, lesson history and the lesson picker.
- **What goes wrong:** renaming or merging a skill silently starts a new, empty record and strands the old one. Pull request 45 relabeled 35 tags. Any lesson records under the old names were stranded then (Inferred; I cannot see your saved data).
- **Also found:** the 75-question grammar bank uses 19 skill names of its own. Seventeen do not exist in the placement test, such as "Pronoun Case" and "Comma Usage". The skill map has to reconcile two naming systems.
- **Also found:** saved progress has no version number. The backup file has one and placement records have one, but skill records and history do not. Without one, the app cannot tell old-shape data from new-shape data after the skill map lands, including in old Export files.
- **How sure:** Verified.
- **Hard to undo:** yes. Each new feature that stores a skill name adds another place to convert.
- **Fix size:** medium. The skill map, a version number and a one-time conversion that also runs on Import.
- **Checked twice:** Skeptic: just never rename skills. Answer: Stage 4 will rename and split them, and a second subject makes clashes likely. Alternative: keep names as IDs and add an alias list. That is cheaper now but leaves two systems forever.
- **What would change my mind:** a decision to freeze today's skill names permanently.

### 3. Lessons and the placement test use the same questions

- **Pile:** 1 (against "the placement test stays pure measurement")
- **Where:** `js/app.js` line 157. The lesson pool is the active placement questions plus the grammar bank.
- **What goes wrong:** a lesson shows you a placement question, tells you the answer and explains it. A retake, or the future check-in test, can then serve the same question. The score partly measures memory of the item. Every lesson you do "uses up" more of the pool.
- **How sure:** Verified. How much it distorts a score is Inferred.
- **Hard to undo:** medium to hard. Used-up questions cannot be un-seen. It also gets harder once break games and world tasks draw on the same pool.
- **Fix size:** small in code (mark each question as test, lesson or both). Medium to large in content, because it needs more questions.
- **Checked twice:** Skeptic: the placement test is a one-time introduction, so this does not matter. Answer: the Log also plans a retake, a check-in test and retention checks with fresh questions. Alternative: with the answer log from item 1, a test can simply skip questions you have already seen in lessons. That is cheaper and I would start there.
- **What would change my mind:** dropping retakes and check-in tests for good.

### 4. No doorway into the skill engine, and writing is wired in

- **Pile:** 3
- **Where:** all of `js/app.js` is one sealed block of 2,176 lines. Nothing is exposed to other files. The engine itself is about five functions (lines 645 to 830).
- **What goes wrong:** a world page cannot ask "what is this learner's level in this skill?" or report "they got it right". The only workarounds are copying the logic or reading saved data directly. Both would create a second copy of the rules that drifts.
- **Second subject:** the four writing categories are named in code and data, there is one question pool, and skill records carry no subject. The wording also assumes writing (for example the retake message at line 1436).
- **How sure:** Verified.
- **Hard to undo:** medium now, hard after the world is built on a workaround.
- **Fix size:** small to medium. Move the engine into its own file with three entry points: get a level, get a question and report a result. No behavior change.
- **Checked twice:** Skeptic: this is tidying for its own sake. Answer: the world brief requires a "plug-in contract", and this is that contract. Alternative: rebuild with a framework. That was rejected in the Log and nothing here calls for it.
- **What would change my mind:** deciding the world lives inside the same file. I would advise against that for loading reasons (item 10).

### 5. The server copy cannot be found after a wipe, and Stage 2b is ordered so its first step proves nothing

- **Pile:** 2 and 3
- **Where:** `js/app.js` lines 52 to 79. Roadmap Stage 2 and Stage 2b.
- **What goes wrong:** the device ID is the only key to your server copy. It lives in the same browser storage as your progress. Clearing browser data erases both. The copy stays on the server, but no phone can ask for it.
- **Three document problems follow:**
  - Roadmap Stage 2b step 1 is "download progress when the app opens", before sign-in. A phone that still has its device ID still has its progress. So download before sign-in restores nothing in any real case.
  - Stage 2b's checklist item "a phone with no progress gets its saved copy back" cannot pass until sign-in exists.
  - Stage 2's checklist has an item that needs Stage 2b, and Stage 2b's "before you start" needs Stage 2 passed. Neither can ever pass as written.
- **Realistic losses today (Verified by reading; not tested on a phone):**

| Event | What is lost |
|---|---|
| Clearing browser data | Everything since your last Export |
| Closing mid-lesson | Nothing. Each answer is saved at once and the home screen offers Resume. |
| Going offline | Nothing. Uploads retry when the connection returns. |
| Using the icon and Safari | Nothing is lost, but they are two separate learners with two server copies |
| New phone | Everything not in an Export file |

- **Later risk:** when both copies have new work, the conflict rule makes you pick one whole copy. Once coins exist, that throws away earned coins, which collides with "nothing earned is ever taken away".
- **Hard to undo:** medium. Sign-in gets harder as more kinds of saved data pile up.
- **Fix size:** large (it is Stage 2b itself). The document fix is small.
- **Checked twice:** Skeptic: weekly Export covers this. Answer: it does for now, and I am not asking to move Stage 2b earlier. The order inside 2b and the two checklists are what need fixing. Alternative: put a recovery code in the Export file. You rejected the link code, and sign-in is the better long-term answer.
- **What would change my mind:** nothing on the ordering. It follows from where the ID is stored.

### 6. The unmerged question branch

- **Pile:** 2 (the Log says the cleanup is still to do; it was done, and much more, on a branch)
- See section 2.
- **Hard to undo:** easy today, harder after the retake.
- **Fix size:** small. It is a decision plus one merge.

### 7. The documents have drifted from the code and from each other

- **Pile:** 2
- **What goes wrong:** every future prompt is checked against these documents. A wrong line produces a wrong prompt.
- The full list is in section 7.
- **Hard to undo:** easy now. It gets harder with every prompt written from a wrong line.
- **Fix size:** small, as one documents-only pass that you approve.

### 8. Review timing in the code does not match the documents, and it is already writing data

- **Pile:** 1
- **Where:** `js/app.js` lines 625 to 629.
- **What I found (Verified):** the code brings a skill back after 0 hours, 20 hours, 3 days, 7 days, 16 days and 35 days. The documents say about 2, 7, 16, 35 and 75 days, with the first review at least a day later. Confidence in the code halves after a fixed 30 days. The documents say 7 days, doubling after each successful review.
- **What goes wrong:** this is early Stage 7 logic that arrived before Stage 7. Every answer already stamps each skill record with a due date and a success count under the old ladder. Stage 7 will inherit those values.
- **Hard to undo:** medium. The stored values can be recalculated, and far more easily if the answer log from item 1 exists.
- **Fix size:** small (numbers), done with Stage 7. Until then, note in the Log that this early version exists.
- **Checked twice:** Skeptic: the numbers are only defaults. Answer: agreed, so I would not fix them now. The finding is that the documents describe this as not built. Alternative: remove the early logic. That would change how lessons pick skills today, so leave it.

### 9. Saved progress grows without limit, and a full phone fails silently

- **Pile:** 3 (the Log's later list already has two of the three parts)
- **Where:** `js/app.js` lines 17 to 23 and 871 to 897.
- **What I found:** each lesson question saved to history takes about 600 bytes, so a 10-minute lesson adds about 8 KB (Verified by measurement). About 500 such lessons reach the 4 MB upload limit.
- **What goes wrong, in three parts:**
  - The browser has its own storage limit. On Safari it is about 5 MB (Inferred; not tested on your iPhone). It arrives at about the same time as the upload limit.
  - When storage is full, the save step fails and says nothing (line 22). The app carries on, and the lesson is gone when you close it.
  - Every answer triggers an upload of your entire progress about 3 seconds later. That is fine at 100 KB. At 2 MB it is 2 MB of mobile data per answer.
- **Hard to undo:** medium. Slimming history later means converting old records.
- **Fix size:** small for a visible "could not save" message. Medium for storing question IDs in place of full text.
- **Checked twice:** Skeptic: this is 7 to 15 months away. Answer: true for size, so the slimming can wait. The silent failure cannot wait as long, because it also triggers in private browsing and when the phone is low on space. Alternative: move to the browser's larger database storage. That is a bigger change than this needs.

### 10. The offline helper re-downloads everything on every open

- **Pile:** 3
- **Where:** `sw.js` line 44.
- **What I found (Verified):** the service worker (the helper that makes Bloom work offline) fetches every file fresh from the network each time and skips the browser's saved copies. Today the whole app is about 120 KB compressed and loads in 0.13 seconds on a slowed test processor. Nothing in the current app is slow.
- **What goes wrong:** a 3D world adds a 3D library and models, likely several megabytes. Re-downloading that on every open means slow starts and mobile data use.
- **Can Bloom host 3D with no build step?** Yes (Inferred). A build step is a tool that packs code before it goes live. A 3D library such as three.js can load as one plain file, roughly 170 KB compressed (from memory, not measured here). A build step becomes worth it later, if the world grows to many files or needs compressed models.
- **The smallest change that keeps both options open (do not make it yet):**
  1. The world gets its own page and folder, loaded only when you enter it. Lessons never pay for it.
  2. The world talks to Bloom only through the doorway from item 4.
  3. The service worker treats big, rarely changing files as "keep the saved copy", and keeps today's always-fresh behavior for app code.
- **Cost:** small to medium. Mostly item 4 plus about 20 lines in `sw.js`. A build step can then be added to the world folder alone, later, without touching the lesson app.
- **Hard to undo:** medium. Easy before the world exists, awkward after.
- **Checked twice:** Skeptic: the browser would cope. Answer: line 44 explicitly forbids it from using saved copies. Alternative: add a build step now. That adds a tool you cannot run from an iPhone, for no benefit yet.
- **What would change my mind:** the prototype's measured numbers on your iPhone 14.

---

## 6. Small items, one line each

**Pile 1: code that breaks the documents**

- Lessons are locked until the placement test is finished (`js/app.js` lines 1604 to 1611, "Locked for now"). The Guide says learning is never gated. The Log leaves "required or optional" open. Needs your decision.
- The profile form requires age and education (lines 219 to 228). The documents say age is optional and education is dropped or optional.
- Age and education are already uploaded to the server inside the progress copy. The Log lists that as a decision still to make.
- The day-streak tile and "N days in a row" are on the home screen (lines 1570 and 1634), not the results screen as your settled note says. Already settled to remove.
- The education benchmark line is still on the results screen (lines 1703 to 1733 and 1807). Already settled to remove.
- The placement screen still shows "Difficulty N/10" (line 1689). Already settled to remove.
- The lesson question screen shows the skill name and a difficulty number (lines 1971 to 1976). The Guide says question screens show only the question. Stage 4 will rebuild this screen.
- "Reset all progress" leaves the saved placement records, the profile and the server copy in place (line 1444). Known; on your later list.
- The old GitHub Pages address is not "unchanged". A workflow redeploys it on every merge to main (`.github/workflows/deploy-pages.yml`). Its uploads fail quietly because that address has no server.
- "Make lessons harder" and "Make lessons easier" shift every skill by 2 levels at once (lines 909 to 922), overriding per-skill data.
- Finishing a retake resets the hidden 1-to-5 level and undoes any earlier "harder" or "easier" choice (line 582). Skill records are untouched, as the retake rule requires.
- The retake message still says "Grammar & Punctuation level" (line 1436).
- Grammar bank questions use an older 1-to-5 rating doubled to 2, 4, 6, 8 or 10. They were not rated with the Stage 3 method (Inferred from the data).

**Question pool spot-check on main (Verified by script)**

- No duplicate IDs. No duplicate active questions. No question with repeated or missing options.
- Counts match the Log exactly: 332 active (83, 79, 85, 85), 3 retired, 50 Reading.
- Answer positions match the Log: A 84, B 90, C 80, D 78. Inside Grammar they are uneven: A 15, B 29, C 20, D 19.
- The right answer is the single longest option in 38 of 332 questions, below the 83 that chance would give. No longest-answer giveaway.
- Nine of 21 placement skills have fewer than 12 questions, all in Grammar (7 to 11 each). Eighteen of the 19 grammar bank skills also fall short, and seven have only one or two. Your settled 12-question rule cannot be met yet.
- Level 10 has one question and level 9 has ten, as the Log says.

**Safety basics (Area 4)**

- **Secrets:** none found in the code or in the full history of every branch (Verified by pattern scan). The server reads its database address from Vercel's settings, never from a file.
- **What the save and load addresses accept:** a device ID in a header (16 to 200 letters, digits, dots, dashes or underscores) and, for saving, one progress object up to 4 MB with a version number. Anything else is refused.
- **Who can call them:** anyone on the internet. There is no sign-in.
- **Could someone read or overwrite your copy by guessing an ID?** Not realistically. The ID is a long random value with more possibilities than could be tried in many lifetimes. The server stores only a scrambled form of it. Anyone who had your actual ID could read and overwrite your copy, so treat it like a password.
- **Open gap:** nothing limits how many new saved copies a stranger could create, at up to 4 MB each. That could fill the database or run up cost. Fix size: small.
- **Open gap:** `api/setup` and `api/ping` answer anyone. They are harmless today (one can only create a table that already exists, the other shows a setting's name but not its value). Already on your later list to remove or lock.
- **Backups and restore:** your Export file is the only restore that works today. The server keeps one copy per device, the latest only, with no history. The app has no way to download it. A hand restore from the database is possible, but you would have to find the right row yourself.

**Other**

- The README still describes the first version: "no server", "nothing is uploaded", the broken Deepo333 address and Reading Comprehension.
- Google Fonts are never saved for offline use because of a wrong check in `sw.js` line 59. Offline, Bloom falls back to the phone's own fonts.
- Starting a new lesson while one is in progress drops the unfinished one from history. Its answers still counted toward skill levels.
- Three more branches were never merged: claude/bloom-handoff (a handoff note, Nov 12) and two from September that look abandoned. None affects main.

---

## 7. Document drift (Pile 2), with places to edit

I have not edited any document. Each line below needs your approval.

**A. The expansion rule (Log is right; these still say milestones-only)**

| Document | Place | Current wording |
|---|---|---|
| Design Guide | Coins and rewards, rules, "Milestones are the doors" | "Finishing a module or reaching mastery opens specific areas or buildings, which can't be bought." |
| Design Guide | Coins and rewards, rules, "Coins are spent on world items" | Needs the added point that coins also open small expansions |
| Roadmap | Stage 8, Part D, step 4 | "Let milestones open areas and buildings that coins can't buy." |
| Roadmap | Stage 8 checklist | "Milestone areas can't be bought." |
| Roadmap | Stage 8, Part A, step 4 | "Set starting coin amounts and the milestone for each building." Under the new rule, small buildings may open with coins. |

**B. Wrong about the code**

| Topic | Places | What is true |
|---|---|---|
| Difficulty step | Log section 1; Roadmap Stage 3 checklist | The hidden target moves 2. Only the on-screen number moves 1. |
| Lesson saving | Log sections 3 and 19; Roadmap Stage 2 change 3, Stage 4 checklist and Stage 10 table; Guide, Sessions and returning | Lessons save after every answer, upload about 3 seconds later and can be resumed from the home screen. What is missing is only the named "where you were" card. |
| Old address | Log sections 1 and 19; Roadmap Stage 2 | It redeploys on every merge. It is not unchanged. |
| The small cleanup | Log sections 1 and 20; Roadmap Stage 3 | It was done on a branch, along with 148 more question changes, and is unmerged. |
| Review timing and decay | Guide, Reviews and spacing; Log section 6 | An early version with different numbers is already running (item 8). |

**C. Settled with you but not yet in the Log**

- One shared skill map with permanent IDs, made at the start of Stage 4.
- The 12-question pool per skill and reuse of the question seen longest ago. The Log and Guide still say "always a fresh question, never a repeat".
- The placement screen drops its difficulty number. The Log and the Roadmap Stage 3 checklist still describe the frozen display.
- The day-streak display and the benchmark line are dropped.
- Icon only, with a weekly Export. Log section 1 still says "use Safari or the icon, not both".
- Saving after every answer moves to Stage 4. The Roadmap has it in Stage 10. It is in fact already built.

**D. Documents against each other**

- Roadmap Stage 2 and Stage 2b each wait on the other (item 5).
- The Roadmap's opening rule says each stage must pass before the next starts. Stage 3 started with Stage 2 open. The rule needs an honest exception or a rewrite.
- The Log says no numbered lesson level exists. The code still keeps a hidden 1-to-5 level that drives the harder and easier buttons.

**E. The World Design Brief against the Log (the Log is binding, so these need a Log entry before world work starts)**

| Topic | Decisions Log, Guide and Roadmap | World Design Brief |
|---|---|---|
| Theme | Default garden world with a school and a nursery | Celestial fantasy with a castle and a portal gate |
| First build | Tap-to-visit map; free roaming is phase 3 | 3D from the start, with a roaming path in the prototype |
| Currency | Coins only | Coins plus crystals for cosmetic items |
| Process | One change per prompt | One purpose per step with an undo point |
| Stage order | World starts after Stage 7 | A prototype now, on its own branch |

A prototype on a separate branch that never touches your progress does not break the stage order in spirit. Say so in the Log, so later readers do not take it as permission to skip stages.

---

## 8. Your one-change-per-prompt rule

**Recommendation: replace it with "one purpose per run, with an undo point".**

**Decision:** one Claude Code prompt per change, each ending with "Keep everything else about the app exactly the same."

**What I found:**

- The rule has already bent. A batch of questions counts as one change. Pull request 43 rewrote 54 questions. The unmerged branch rewrites 154.
- The repository shows 50 pull requests in about two months. The rule did its job: every change has an undo point.
- The one real slip was not a change that was too big. It was work with no pull request at all, which sat unseen for two days (section 2).

**Proof:** the commit history on main, and the branch claude/placement-quality-pass.

**What changes if adopted.** The rule becomes five short rules:

1. **One purpose per run.** A run may touch several places if they serve one purpose you can state in a sentence.
2. **Every run ends in a pull request.** That is the undo point. No pull request means the run is not finished.
3. **Never build on unmerged work.** A new run starts from main.
4. **Three kinds of change never share a run:** question content, app behavior and the shape of saved data.
5. **A change to the shape of saved data always goes alone**, with an Export beforehand and an Import test afterward.

Keep the closing line "Keep everything else about the app exactly the same." It is cheap and it works.

**Checked twice.** Skeptic: you cannot read code, so small steps are your only way to tell what broke. Answer: what protects you is the undo point and the phone check, not the size of the step. Rules 2 and 4 keep both. Alternative: keep the rule as it is. That would make the skill map, which must change several places at once, either impossible or a string of half-working states.

**What would change my mind:** if a multi-part run breaks something and you cannot tell which part did it, tighten back to one change for that kind of work.

---

## 9. Which fixes to bundle and which to keep separate

**Can be bundled (one prompt each)**

| Bundle | Contents | Why it is safe together |
|---|---|---|
| Documents pass | Everything in section 7 that you approve, plus the README | No code. One purpose: make the documents true. |
| Settled screen cleanups | Drop the placement difficulty number and its dead counter, the streak tile, the benchmark line and the old retake wording | All display only. No saved data changes. |
| Server hardening | Limit new saved copies, lock or remove `api/setup` and `api/ping` | Server only. The app is untouched. |
| Answer log | The per-answer record, plus the question ID in lesson history | Both only add data. Nothing existing changes shape. |

**Must stay separate (one prompt each, alone)**

| Fix | Why alone |
|---|---|
| Merging or splitting the question branch | Content only, and it must land before the retake |
| Skill map with permanent IDs, version number and conversion | Changes the shape of saved data. Export before, Import test after. |
| Moving the engine behind a doorway | A pure move with no behavior change. It can be proven by running the same simulation before and after. |
| Service worker caching change | A mistake here can leave the phone stuck on an old version |
| The 85% target becoming a setting | Changes how lessons behave. Do it with the Stage 4 engine work. |
| Review timing numbers | Stage 7 |
| Slimming history to IDs | Changes the shape of saved data |
| Stage 2b (sign-in, then download, choice screen and Reset) | Its own stage |

---

## 10. What needs an outside check

I could not settle these from the code. Each needs you, a device or another person.

| Finding | Who or what can check it |
|---|---|
| Whether the 154 rewritten questions are correct and fair | A second reviewer with a dictionary, then your read on the preview |
| Whether the difficulty ratings are close | Only your real retake |
| AP style in the questions | Someone with AP Stylebook access; it is paywalled |
| Safari's storage limit and the silent-save failure on your iPhone | A test on your phone |
| Whether the icon is exempt from Safari's seven-day erase | A test on your phone or Apple's current documentation |
| Whether your database provider keeps backups, and for how long | Your Prisma account settings |
| Whether Vercel preview links write to the same database as the live app | Your Vercel project settings |
| Whether Vercel can limit request rates for you without code | Your Vercel plan settings |
| Whether a 3D scene runs smoothly on an iPhone 14 | The prototype, on your phone |
| My simulated learner model | Retake data |

**Not checked**

- **Whether your database provider keeps its own backups.** I have no access to the account.
- **Safari's real storage limit on your iPhone.** My test browser allows more than Safari does.
- Anything on a real iPhone. All timing came from a test browser on a server.
- Your actual saved progress. I never saw it.
- Vercel settings, environment values and deployment protection.
- The three research claims behind the rules. You asked me not to re-grade them.
- The 50 Reading questions and the full text of the 332 active questions on main. I checked structure by script and read samples only.
- The size of a 3D library. That figure is from memory.

---

## 11. Recommendations I dropped after challenging them

- **Change the placement step to 1.** The gain was small and uncertain, and it would disturb scoring just before the retake.
- **Move Stage 2b ahead of lessons.** Weekly Export covers the risk for one user. Your order stands.
- **Add a build step now.** No benefit until the world outgrows plain files.
- **Rebuild sync as a merged event stream.** It solves a problem one phone does not have. The answer log from item 1 keeps that door open at almost no cost.
- **Lower the 85% target now.** It is inside your range. Make it a setting when Stage 4 touches the engine.

---

## 12. What I would do first

The smallest safe sequence, five steps:

1. **Decide the question branch.** Open a pull request for claude/placement-quality-pass, read the preview and either merge it or merge only its first six-question commit.
2. **Export, then take the real retake.** It is the only check on the ratings, and it should run on the questions you intend to keep.
3. **One documents-only pass.** Approve the edits in section 7 so every later prompt is checked against true documents.
4. **Add the answer log.** It is small, it only adds data and every lesson before it is evidence lost.
5. **Open Stage 4 with the skill map, version number and conversion, alone.** Then move the engine behind a doorway before any world code is written.

Keep everything else about the app exactly the same.
