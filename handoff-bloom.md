# active-memory handoff: Bloom placement test (questions, scoring, ratings)

**Handoff #2** · 2026-11-12 · Lineage: #1 (2026-11-12): continued Bloom from a pasted summary; audited and rewrote the placement question pool in js/data.js (PRs #39–#43); #43 merged. #2 (2026-11-12): PRs #44–#50 built and merged: per-question record, relabelled sub-skills, skill rotation, new scoring and results screen, rating audit, giveaway and double-answer fixes, 35 new hard questions, spelling cap, overall level hidden on normal screens. Main at 56e582e, no open PRs.

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** Bloom is a no-login, client-side PWA in vanilla JS with no build step (repo `dc-porter/braingym`). It is moving from GitHub Pages to Vercel, with progress saved to Vercel Prisma Postgres keyed by a per-device ID; browser storage stays the local copy (key prefix `bloom_v1_`). The current track is making the placement test accurate: clean questions, honest 1–10 ratings, and a scoring method that fits.
- **Done looks like:** each batch is built on its own branch, checked, and opened as a PR (never merged by Claude). The user reviews and merges. A real placement retake waits until the user has reviewed the newest hard questions.
- **Context:** the user works from an iPhone and builds one small step at a time.

## 2. About the user (as relevant to this work)
- Works from an iPhone; builds Bloom one small step at a time; no name or email recorded here (never put personal details in external requests).
- Sends precise, numbered instructions with "Step"/"Commit" structure; says "Read-only" or "Draft only" for no-change tasks, and "do not merge it" for builds.
- Reviews a side-by-side file after each build and corrects anything with a follow-up prompt.

## 3. Style & communication
- **Language:** English.
- **Tone:** plain and direct; say plainly what could not be confirmed; flag low-confidence calls.
- **Reply length:** short summary in chat; tables for data; the full detail goes in a markdown file sent with SendUserFile.
- **Formatting:** markdown tables. Question reports show: sentence, four options with ✓ on the correct one, rating with R/C/O scores, why it is hard, dictionary evidence, confidence note. End build reports with checks: integrity, positions, longest-option counts, level counts per category, iPhone 14 load.
- **Working style:** one batch at a time; build exactly what was asked; confirm numbers with scripts rather than by eye; report old and new side by side for every changed question.
- **Avoid:** opening PRs unprompted; committing on main; rebuilding a draft from memory (stop and say so); inventing dictionary claims (say "from memory, unconfirmed"); padding ratings to hit a target.

## 4. Hard rules (word for word)
1. "Branch per task. Always create a branch from a fresh origin/main first (git fetch origin main). Never commit on main." (If the user says to add commits to an open PR's branch, do that instead; if that PR has merged, branch from latest main.)
2. "First list open pull requests and check that none already cover this work." (every build prompt). Never open a PR unless asked; never merge ("do not merge anything").
3. "Planning requests are read-only." "Read-only" / "Draft only": change no files, create no branch, open no PR.
4. "Keep everything else about the app exactly the same." (every build request ends with it)
5. Commit trailers: `Co-Authored-By: Claude <model> <noreply@anthropic.com>` (use the model named in the current system reminder) and `Claude-Session: https://claude.ai/code/session_01N8wKwAbudnQd4x54gth1wv`. PR descriptions end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)` plus that session URL. (Earlier chats named other sessions; this is the latest one given.)
6. "Privacy: never put the user's email or personal details into external requests."
7. "GitHub access: there is no gh CLI. Use the mcp__github__* tools (load them via ToolSearch). Scope is" dc-porter/braingym.
8. "Look up each keyed word and each new word in Merriam-Webster, quote what you found, and say plainly if you can't confirm something." "Say plainly which dictionary claims you read on the page and which came from memory. Say which judgments were yours and unconfirmed. Flag any instruction you did not follow and why."
9. For spelling questions, "confirm on Merriam-Webster that each misspelling returns 'not in the dictionary.'"
10. "Don't create new tells." Check each rewrite for length, shape and oddly absurd options. The correct answer must not be the longest option (a tie for longest also fails), must not be the odd one out, and no wrong option may be defensible. Wrong options must be different, believable mistakes, not three that share a shape or a meaning.
11. "Spread the correct answers across A, B, C and D, favoring D and A, which are the least used." Keep NO CHANGE at A where it is correct; Grammar NO CHANGE questions list NO CHANGE first.
12. "Don't change any IDs, categories or sub-skill tags" unless the prompt names the change. "Use only existing sub-skill tags, and do not add new tags." "Keep Wordiness and Register out. They are lesson topics, not placement topics."
13. Rating method (three factors, scored before the rating is computed): R = how rare or hard the word or rule is for an educated adult; C = how much the sentence gives the answer away; O = how much the options give it away. "R minus (C minus 1) divided by 3 minus (O minus 1) divided by 3, rounded." "Spelling is capped at 6 for any word common in print." Use the adult-learner yardstick. When re-rating existing questions, change a rating only if it differs by 2 or more levels; never change one by 1 level. Do not rate by feel. Say that self-rating is not independent.
14. New hard questions: "A hard word is not a hard question. The sentence must not define the word, hint at it, or repeat its parts." Solve each blind (options only); if it can be picked without the material, rewrite it. State in one line what makes it hard; if you can't, it isn't hard enough. One defensible answer, checked in Merriam-Webster. "If a new question fails a check twice, leave it out and list it." "If you are unsure, leave it out of the build and list it." Do not invent disputed usage to make something harder. Spelling is recognition among four choices, so a hard spelling question must be hard to recognize; a word common in print cannot be rated above 6.
15. Words reserved for lessons or on the reference list may not be used in new Vocabulary or Word Choice questions. Reference list: insouciance, assiduous, inexorable, obfuscate, phlegmatic, germane, spurious, recondite, syncretic, salubrious, imbroglio, stolid. Learner's study words: decorous, antithetical, inscrutable, erudite, heterogeneous, titillate, zenith, salient, churlish, facsimile, ameliorate, farcical, fastidious, capitulate, repudiate, relegate, urbane, scintilla, gumption, cretinous, kerfuffle, gregarious, derision, insipid, pontificate, chutzpah, proselytize, flaccid, resplendent, gauche, pedagogy, paltry, chagrin, kismet. Words must be plausible for a very well-read adult (serious journalism, books, professional writing); no specialist jargon, no archaic words, no word-list words. Placement should "cover core writing basics, not specialist vocabulary."
16. "Change no saved data format, and add no new storage keys." The placement test stays pure measurement with no feedback.
17. Build checks to report every time: all questions have four distinct options and a valid correct answer; IDs unique; only the intended questions differ from the previous state; order and lesson bank (GRAMMAR_BANK) unchanged; correct-answer positions A/B/C/D across the active questions, before and after; how often the correct answer is the longest option per category; question counts by difficulty 1–10 per category (say how many sit at 8, 9, 10 and which); app loads on an emulated iPhone 14 with no errors; a full test, retake, Export, wipe and Import still work and the record comes back identical.
18. PR descriptions must state the real counts at levels 9 and 10 and say that a real retake should wait until the new questions are reviewed. Update a PR description if it quotes old counts.
19. Reports: send the full side-by-side as a file (SendUserFile), paste a short summary in chat. "If you can't find the full revised draft, stop and tell me instead of rebuilding it from memory."

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Committed on main / pushed to the wrong branch (earlier chat) | Always create the branch first from a fresh origin/main |
| 2 | Opened PRs unprompted (earlier chat) | Only when explicitly asked |
| 3 | Risked a duplicate PR after a worker restart (earlier chat) | List PRs first |
| 4 | Put the correct answer at option A in five rewritten questions (placement shows options in stored order) | Spread correct answers across A to D |
| 5 | wb19 wrong option "neutrality" pairs with "moral" | Replace it with a word that does not pair with "moral" (now "duration") |
| 6 | vc36 correct answer was the longest option | Similar-length wrong options (now apologetic, remorseful, apprehensive) |
| 7 | wx4 and wb28 had wrong options that did not fit the sentence grammar | Sound-alikes that do fit (preferred→insisted later, ensured; contacted) |
| 8 | vc17's sentence defined "sesquipedalian" | Sentence must not hint "long words" |
| 9 | ge10 relied on "than", a disputed usage | New Pronoun Agreement & Reference question without disputed usage |
| 10 | Rated the 24 new questions in PR #48 too high (many 9–10) | Stricter re-rating with the three-factor method; honest ratings, not forced ones |
| 11 | Rated sx32–sx35 at 8–9 although the words are common in print | Spelling cap of 6 for any word common in print (reconnaissance, idiosyncrasy, paraphernalia, bellwether now 6) |
| 12 | Put a medical term (ophthalmologist) in the placement test | Core writing basics only; swapped to "reconnaissance" |
| 13 | PR #48 description said 17 at level 9 (real count was 14) | State the real counts; Claude corrected it |

## 6. Decisions
| Decision | Why |
|---|---|
| Category score = staircase method from the saved record: each question's rated level, +1 if right, −1 if missed, later questions weighted more (1st ×1, 2nd ×2…), rounded to 1–10 (function `staircaseScore`). `categoryCeiling` stays as the fallback when there is no record. | Beat the old late-half ceiling in all 36 simulated scenarios (MAE 1.31 vs 1.55 central); IRT-style methods rest on assumptions Bloom can't measure |
| Record saved in `bloom_v1_placementRecords` (array; each record: recordVersion 1, date, 40 entries with id, category, sub, prompt, options, picked, correctIndex, correct). `placementProgress` is still cleared at test end. | Record is built from it just before; keeping it would leave a stale in-progress test |
| Picker rotates through sub-skills: the skill with the fewest questions drawn so far goes next, ties random, counted from `usedIds`; within the skill, nearest to the adaptive target; skills with no unused question are skipped. | Even coverage (worst skill ×1.04 of its category average vs ×1.52 before) |
| Questions retired from placement with `active:false` (wb41, wb46, wx24); picker uses `isPlacementActive(q)` (`q.active !== false`). Lessons ignore the flag, so those three still appear in lessons. | Reading is excluded by category; per-question flag needed for singles |
| Overall level (1–5) no longer shown on normal screens (home, lesson setup, lesson result prompt, history, import summary for new results). Still computed, saved as `moduleLevel`, used as the lesson-seeding fallback, and shown on the results screen for old results with no category scores. | User's request |
| Results screen shows, per category: score 1–10, hardest level answered right, where misses began, right/wrong at Easy 1–3 / Middle 4–7 / Hard 8–10, and "Based on N questions". | User's request |
| Combine-the-sentences instruction (`COMBINE_INSTRUCTION`) shows on its own line for ge47, ge49, ge50, gx23, gx24 (display only). | User's request |
| wx31 retagged to Precision & Connotation (now tests meaning). gx27 left tagged Pronoun Agreement & Reference. | No placement tag fits "pronoun case"; adding "Pronoun Case" would create a tenth Grammar sub-skill with one question (see section 12) |
| vc17, vc19, vx19 and other top ratings were lowered by 2+ levels in PR #48 where the audit said so | Audit and user's later instruction |

## 7. Changed / rejected
- Overall placement level on normal screens → removed (kept only as old-result fallback).
- `categoryCeiling` as the main method → `staircaseScore` (fallback kept).
- sx32 ophthalmologist → reconnaissance (medical term; same ID, tag Silent Letters, answer B).
- sx33–sx35 ratings 9/8/8 → 6 each (print cap); sx32 9 → 6.
- wb1 flout → flaunt key (MW backs "flaunt" for defying rules); wb3 sentence now a winding creek; wb9, wb23, wb50, ge28, wb22, wb29, wx19, ge44, gx16, ge27, gx14 fixed for second answers (PR #47).
- ❌ IRT-style and running-estimate scoring methods (rest on guesses Bloom can't support).
- ❌ "averred", "counteracted", "contested", "contrasted", "pungent", "peruse", "review", "ratified" as wrong options (defensible) (from #1).
- ❌ "militate/mitigate" (MW: some accept "mitigate against"), "fortuitous", "gnomic" (MW gives only the aphorism sense), "fait accompli", "self-fulfilling prophecy" as options (second answers).
- ❌ Treating "averse from" as archaic (unconfirmed) (from #1).
- ❌ Colon options in ge44 and gx16 (style dispute) → removed.
- ❌ Adding "Pronoun Case" as a placement tag now.

## 8. Data & facts (exact)
**PRs (all merged unless noted):** #39–#43 (earlier question work, from handoff #1); #44 per-question record + wx4 fix; #45 relabel/retire + skill rotation + vc20/vx13 to 9 + combine instruction; #46 new category scoring + results screen; #47 double answers + giveaways + re-rating; #48 24 hard questions + five giveaway fixes + lowered 18 top ratings (+ a follow-up commit re-rating those 24 with the stricter method); #49 11 hard questions (gx32, gx33, wx32, vx32–vx35, sx32–sx35); #50 spelling cap, sx32 swap, vx34/vc3/vx9 giveaways, overall level hidden. **Main: 56e582e. Open PRs: none.**
**Pool:** 385 questions in `PLACEMENT_POOL` (js/data.js); 332 active; Grammar 83, Word Choice 79, Vocabulary 85, Spelling 85; plus 50 Reading (unused) and 3 retired (wb41, wb46, wx24). Test draws 40 (12 error, 10 blank, 8 vocab, 10 spelling). Latest IDs: gx33, wx32, vx35, sx35.
**Level counts 1–10 (active):**
| Category | 1 2 3 4 5 6 7 8 9 10 |
|---|---|
| Grammar | 5 5 17 16 22 6 5 5 1 1 |
| Word Choice | 7 9 15 12 10 15 6 4 1 0 |
| Vocabulary | 4 8 13 23 11 11 6 6 3 0 |
| Spelling | 6 9 11 13 15 17 5 4 5 0 |
**Questions at 8/9/10:** Grammar 8: ge12 gx15 gx27 gx31 gx33; 9: gx32; 10: gx6. Word Choice 8: wb4 wb35 wx20 wx32; 9: wb32; 10: none. Vocabulary 8: vc17 vc19 vx19 vx30 vx34 vx35; 9: vc20 vx32 vx33; 10: none. Spelling 8: sp48 sx19 sx20 sx26; 9: sp10 sp42 sx5 sx10 sx15; 10: none. Totals: 10 at level 9, 1 at level 10.
**Reach:** Grammar sub-skills with nothing at 8+: Verb Tense Consistency, Run-ons & Comma Splices, Sentence Fragments, Punctuation, Sentence Variety. Every Word Choice, Vocabulary and Spelling sub-skill has at least one at 8+.
**Correct-answer positions A/B/C/D (active):** 84 / 90 / 80 / 78. By category: Grammar 15/29/20/19, Word Choice 19/22/19/19, Vocabulary 24/18/21/22, Spelling 26/21/20/18.
**Correct answer is the longest option (active):** Grammar 3/83, Word Choice 11/79, Vocabulary 16/85, Spelling 7/85.
**Sub-skill tags (existing):** Grammar: Subject-Verb Agreement, Pronoun Agreement & Reference, Verb Tense Consistency, Parallel Structure, Modifier Placement, Run-ons & Comma Splices, Sentence Fragments, Punctuation, Sentence Variety. Word Choice: Commonly Confused Words, Precision & Connotation, Idiomatic Usage (Wordiness & Redundancy and Register have no active placement questions). Vocabulary: Word Meaning in Context, Roots & Prefixes/Suffixes, Synonyms & Nuance, Antonyms & Contrast. Spelling: Commonly Misspelled Words, Homophones, Silent Letters, Prefixes & Suffixes, Double Letters & Irregular Spellings.
**Specialist terms found in a read-only scan (not changed):** strong: sp9 xanthosis (dermatology), sx15 chthonic (mythology/classics). Mild: sp42 hemorrhage, sx5 resuscitate (medical but general use), sp10 desiccate, sp28 pterodactyl (technical). Word-list word: vc17 sesquipedalian.
**Reserved/reference words already in the pool (found by scan):** vc11 inscrutable, vc39 gregarious (in prompt), vc40 fastidious (in prompt), vx26 recondite (the tested word), vx29 insouciant (the correct answer), wb47 obfuscated (an option), wx30 pontificated (an option). Not changed.
**Overall level mapping (kept for old results):** `levelFromPercent`: <40 → 1, <55 → 2, <70 → 3, <85 → 4, else 5; old results seed lessons from `moduleLevel × 2`.
**Spelling cap decisions:** sx32 reconnaissance, sx33 idiosyncrasy, sx34 paraphernalia, sx35 bellwether all count as common in print, so rated 6. Words treated as not common in print (kept above 6 earlier): sacrilegious (sx26=8), chthonic, desiccate etc. These are the assistant's frequency judgements, not corpus data.
**Lesson seeding:** `categorySeedLevel(cat)` uses the category's stored score, falling back to `moduleLevel × 2` (or 3 × 2 if none); `seedSkillLevel` adds −2 to +1 from the sub-skill's placement percent. Seeded once and kept; a retake does not re-seed existing lesson records. "Reset all progress" does not clear `placementRecords`.
**Bloom architecture (from #1; `sw.js` cache name `bloom-shell-v3`, network-first):** device ID `bloom-device-id` (UUID), header `X-Bloom-Device-Id`; `api/ping.js`, `api/setup.js` (table `bloom_progress`), `api/progress.js` (GET, GET ?check=1, POST with optimistic concurrency, 4 MB limit, fingerprint = SHA-256 of canonical JSON cut to 32 hex); sync keys outside the prefix: `bloom-sync-version`, `bloom-sync-changed`, `bloom-sync-fingerprint`, `bloom-sync-import`. Export, Import and upload walk every `bloom_v1_` key, so `placementRecords` travels with them. One record ≈ 13–15 KB.
**Dictionary access:** `merriam-webster.com/dictionary/<word>` works via curl through the proxy; a misspelling shows "not in the dictionary" with HTTP 404. Purdue OWL fails and the Chicago Manual of Style page returns a login shell.
**Simulation findings (scoring):** staircase vs current MAE 1.31 vs 1.55 (central scenario), within-1-level 66% vs 58%; weaknesses: pulls toward the middle (true 1–2 score ~1.5–2 high, true 10 ~1.5 low), depends on hand-set ratings, tied to the picker's step of 2. Rating audit: ratings ranked fine but ran 0.5–1 level too high, worst at the top.

## 9. People, terms & names
- **Terms:** giveaway = one option stands apart so the answer can be guessed; second answer / double answer = a wrong option is also defensible; R/C/O = the three rating factors; "held" = questions kept at 9/10 until new hard ones existed; "strict-longest" = correct answer is the unique longest option; staircase score = the new category scoring method; record = a `placementRecords` entry.
- **Names in use:** `js/data.js` (`PLACEMENT_POOL`, `GRAMMAR_BANK`, `CATEGORY_NAMES`, flag `active:false`), `js/app.js` (`pickAdaptiveQuestion`, `isPlacementActive`, `staircaseScore`, `recordItems`, `recordForResult`, `buildPlacementRecord`, `appendPlacementRecord`, `finishPlacement`, `categoryCeiling`, `categorySeedLevel`, `renderPlacementResult`, `categoryBreakdownHTML`, `renderPrompt`, `COMBINE_INSTRUCTION`), `css/styles.css`, `api/progress.js`; storage keys `bloom_v1_placementResult`, `placementProgress`, `placementRecords`, `moduleLevel`, `skillState`, `categoryState`, `history`; branches this chat: `claude/placement-answer-record`, `claude/placement-skill-balance`, `claude/placement-scoring`, `claude/placement-fixes-and-ratings`, `claude/hard-questions-and-top-ratings`, `claude/hard-end-questions`, `claude/final-placement-cleanup`.
- **Scratch scripts** (in `/tmp/claude-0/-home-user-braingym/d077b39d-53c5-580d-ba60-90b377f24035/scratchpad`, may not survive; rebuild if missing): `audit/mw.py` (MW fetch), `audit/ratings.js` (first-pass audit ratings for 297 questions), `score_sim.js`/`score_an.js` (scoring comparison), `fix/apply.js`, `fix/insert.js`, `fix/auto.js`, `fix/final.js` (question rewrite, insert, per-question and whole-pool checks), `rt.js` (full test + retake + export + wipe + import), `ui*.js` (Playwright iPhone 14 render checks). Serve with `python3 -m http.server 8765` in the repo.

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Placement pool and scoring work, PRs #44–#50 | merged | main `56e582e` | no open PRs |
| Real placement retake | waiting | n/a | user must review the newest hard questions first |
| gx27 tag (pronoun case) | open | tag is Pronoun Agreement & Reference | see section 12 |
| sx32 tag | open | Silent Letters | "reconnaissance" has no silent letter; fits Double Letters & Irregular Spellings better |
| Specialist terms (sp9, sx15 strong) | not changed | in the pool | awaiting user's call |
| Reserved/reference words in the pool (vx26, vx29, vc11, vc39, vc40, wb47, wx30) | not changed | in the pool | awaiting user's call |
| Level 10 coverage | not met | Word Choice, Vocabulary, Spelling have none at 10; only gx6 at 10 | honest hard questions are rare in multiple choice |
| Download-from-server (Bloom sync) | planned only | no code | dry run first, then empty-phone, then phone-behind; unanswered whether to pair it with email sign-in |
| This handoff file | saved, uncommitted | `handoff-bloom.md` in the repo working folder | `claude/bloom-handoff` branch from handoff #1 holds the earlier copy |

## 11. Next steps
1. **Next action:** run `git fetch origin main`, list open pull requests, then ask the user to decide the open items in section 12 (start with sx32's tag, gx27's tag, and sp9/sx15).
2. Then, as the user directs: replace or keep the specialist terms; decide on reserved/reference words already in the pool; consider more hard Grammar questions in the five sub-skills with nothing at 8+; review the 35 new hard questions together before any real retake.
3. Later: add true register questions as lessons; resume the download-from-server planning.

## 12. Open questions ⚠️
- sx32 (reconnaissance) is tagged Silent Letters but has no silent letter: change to Double Letters & Irregular Spellings, or keep?
- gx27 tests pronoun case (who/whom), tagged Pronoun Agreement & Reference; the user asked for the best-fit tag. No placement tag fits; "Pronoun Case" exists only in the lesson bank. Add it once there are 3–4 case questions (ge9, ge12, gx6, gx27 are candidates), or keep as is?
- Replace the specialist-term questions sp9 (xanthosis) and sx15 (chthonic)? Also the mild ones (sp42, sx5, sp10, sp28) and vc17?
- Replace existing questions that use reserved or reference words (vx26 recondite, vx29 insouciant, vc11 inscrutable, wb47 obfuscated option, wx30 pontificated option, vc39/vc40 prompts)? They predate the rule.
- Whether to build download-from-server alone or together with email sign-in (unanswered).
- The three retired Register questions still appear in lessons: keep or retire there too?
- Unconfirmed in Merriam-Webster (from memory): vx9's "cred-" Latin root claim; vx28's Latin roots for "sacrosanct"; "relish" as a verb; "blessing in disguise" (wx19 option); usage labels for "tank" and "can"; "attribute … to"; general sense of "persistent"; "prefer that" grammar.
- Judgement calls not independently confirmed: which spelling words count as "common in print"; every R/C/O score (the assistant wrote and rated the questions).
- Not verified: iOS storage behaviour (Safari vs home-screen app), resume without restart; whether old lesson records exist on the user's phone (the assistant cannot see it).

## 13. Re-attach checklist
Nothing to attach. The repo is on GitHub (dc-porter/braingym); scratch scripts in section 9 can be rebuilt.

---
<sub>Audit: 13/13 sections · 19 rules · 13 corrections · 40 data points · secrets removed: none found · generated by active-memory</sub>
