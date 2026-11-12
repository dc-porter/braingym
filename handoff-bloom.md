# active-memory handoff: Bloom placement-question cleanup

**Handoff #1** · 2026-11-12 · Lineage: #1 (2026-11-12): continued Bloom from a pasted summary; audited and rewrote the placement question pool in js/data.js (PRs #39–#43); #43 is open and not merged.

## 0. Instructions for Claude (read first)

You are continuing work from a previous chat. That chat is gone; this file is the complete context and the source of truth.

1. Read this whole file before replying.
2. Follow sections 3 (Style), 4 (Hard rules) and 5 (Corrections) in every reply, for the rest of this chat. They override your defaults.
3. Use the values in section 8 exactly. Never round, re-estimate, or "correct" them.
4. Do not suggest anything listed in section 7 (Changed / rejected) again unless the user brings it up.
5. Code word: None active. If the user types /amcodeword, start every reply with the phrase they choose (default "Yes Boss!").
6. Your first reply: at most 5 lines covering the goal, the current state, and the next step (section 11). Mention any files from section 13 that were not attached. Ask the questions in section 12 if there are any. End with "Ready to continue with <next step>?" Then wait for the user's go.

## 1. Mission
- **Goal:** Bloom is a no-login, client-side PWA in vanilla JS with no build step (repo `dc-porter/braingym`; the old summary also said `Deepo333/braingym`). It is moving from GitHub Pages to Vercel, with progress saved to Vercel Prisma Postgres keyed by a per-device ID; browser storage stays the local copy (key prefix `bloom_v1_`). The current track is cleaning the placement question pool in `js/data.js` so no question can be answered by guessing from option shape, and no wrong option is defensible.
- **Done looks like:** each batch is built on its own branch, checked, and opened as a PR (never merged by Claude). The user reviews and merges.
- **Context:** the user works from an iPhone and builds one small step at a time.

## 2. About the user (as relevant to this work)
- Works from an iPhone; builds Bloom one small step at a time; no name or email recorded here (never put personal details in external requests).
- Sends precise, numbered instructions; says "Draft only" or "Read-only" for no-change tasks, and "Push the branch and open a pull request, but do not merge it" for builds.

## 3. Style & communication
- **Language:** English.
- **Tone:** plain and direct; flag uncertainty clearly; for read-only planning answer in short plain language.
- **Reply length:** as short as the task allows; tables for data; long lists only when asked.
- **Formatting:** markdown tables; questions shown as original, rewrite, correct answer, one line on why nothing stands out, dictionary evidence, rating, explanation (✓ marks the correct option; [brackets] mark underlined text). End build reports with checks, then position counts, then difficulty table.
- **Working style:** one batch at a time; draft first, then build exactly as drafted plus the user's listed changes; confirm the numbers with scripts rather than by eye.
- **Avoid:** opening PRs unprompted; committing on main; rebuilding a draft from memory (stop and say so instead); inventing dictionary claims (say "from memory, unconfirmed").

## 4. Hard rules (word for word)
1. "Branch per task. Always create a branch from a fresh origin/main first (git fetch origin main). Never commit on main."
2. "Never open a pull request unless explicitly asked." Before opening one, list PRs to avoid duplicates (a worker restart once risked a duplicate). Never merge.
3. "Planning requests are read-only." "Draft only. Do not change any files or open a pull request." Make no file changes and open no PR; answer plainly and flag uncertainty.
4. "Keep everything else about the app exactly the same." (every build request ends with it)
5. Commit trailers: `Co-Authored-By: Claude <model> <noreply@anthropic.com>` (use the model named in the current system reminder, e.g. Sonnet 5.5 or Opus 5.5) and `Claude-Session: https://claude.ai/code/session_01N8wKwAmBkFSDdFJHMSBNiW`. PR descriptions end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)` plus the session URL. (The first summary named session_018RQvESQd1MaUzKXBdiHZLy; the system reminders in this chat gave session_01N8wK… and that is what was used.)
6. "Privacy: never put the user's email or personal details into external requests."
7. "GitHub access: there is no gh CLI. Use the mcp__github__* tools (load them via ToolSearch). Scope is" dc-porter/braingym.
8. "Look up each keyed word and each new word in Merriam-Webster, quote what you found, and say plainly if you can't confirm something." Mark unconfirmed claims "from memory, unconfirmed".
9. "Don't create new tells." Check each rewrite for length, shape and oddly absurd options, and avoid wrong options that form a stock phrase with the sentence.
10. "Spread correct answers evenly across A to D. Keep NO CHANGE at A where it is correct." Grammar NO CHANGE questions list NO CHANGE first.
11. "Don't change any IDs, categories or sub-skill tags." Only change `js/data.js` for question work.
12. Build checks to report every time: all changed questions have four options, a valid correct answer and no duplicate options (same for all 350 pool questions); only the named questions differ from main; pool still 350 in the same order; lesson bank (GRAMMAR_BANK) untouched; correct-answer positions across the changed set and the 300 active questions, before and after; how often the correct answer is the longest option per category; question counts by difficulty 1-10 per category, flagging any level below 3; app loads on an emulated iPhone 14 with no errors.
13. "If you can't find the full revised draft, stop and tell me instead of rebuilding it from memory."

## 5. Corrections log
| # | Claude did | The user wanted |
|---|---|---|
| 1 | Committed on main / pushed to the wrong branch (earlier chat) | Always create the branch first from a fresh origin/main |
| 2 | Opened PRs unprompted (earlier chat) | Only when explicitly asked |
| 3 | Risked a duplicate PR after a worker restart (earlier chat) | List PRs first |
| 4 | Put the correct answer at option A in five rewritten questions (placement shows options in stored order) | Spread correct answers across A to D, no more than two of the five per position |
| 5 | wb19 wrong option "neutrality" pairs with "moral" | Replace it with a word that does not pair with "moral" (now "duration") |
| 6 | vc36 correct answer was the longest option | Replace "anxious" and "defensive" with similar-length wrong options (now apologetic, remorseful, apprehensive) |
| 7 | wx4 and wb28 had wrong options that did not fit the sentence grammar (interfered, conferred, contracted) | Sound-alikes that do fit: preferred and ensured (wx4), contacted (wb28) |
| 8 | vc17's sentence defined "sesquipedalian" ("four-syllable words") | Sentence must not hint "long words"; still suggest heavy ornate prose |
| 9 | ge10 relied on "than", a disputed usage | New Pronoun Agreement & Reference question without "than" and without disputed usage |

## 6. Decisions
| Decision | Why |
|---|---|
| gx5 built the stricter way: "it" underlined; options NO CHANGE (comma splice), "a delay that" (correct), "this" (comma splice), "a delay, that" (comma error); never offer "which" or "and this" | User's call after MW showed "which" for a whole clause is accepted by many writers |
| ge10 is now: "The new safety regulations, written by a panel of engineers, are so strict that many small businesses struggle to comply with [it]." Options NO CHANGE / them (correct) / they / themselves; rating 4 | Avoids "than" and disputed usage |
| vc17, vc19, vx19 stay at rating 10 | User's call (keeps Vocabulary level 10 at 3 questions) |
| wb33: change only the explanation (remove the claim that "averse from" is archaic) | Claim could not be confirmed |
| ge33, wx18, wx19 stay exactly as they are | Audit verdict KEEP |
| Register-tagged questions rewritten as meaning questions for now (wb49, wb42, wb45, wb48, wx23; also wb47, wb43, wb44 now test meaning) | User will add true register questions later; wb41, wb46, wx24 still Register |
| PRs are built but never merged by Claude | Standing rule |

## 7. Changed / rejected
- wb19 wrong options: "ambiguity" → "triviality" → "neutrality" → "duration".
- ge7: "she herself" → "which".
- ge10: the "than" question → regulations/them question.
- gx5: "which" and "and this" as options → not offered.
- vc36: anxious, defensive → remorseful, apprehensive.
- wx4: interfered, conferred → preferred, ensured. wb28: contracted → contacted.
- ❌ Rejected as defensible: "averred" (wx4), "counteracted", "contested", "contrasted" (wb28), "stingy/cheap"-style synonyms trios, "pungent" (wb16), "peruse" and "review" (wx15), "ratified" (wb44).
- ❌ Idea: treating "averse from" as archaic (could not be confirmed).
- Earlier ratings (before PR #40): gx3 9, ge6 7, ge39 8, ge7 3, vc26 10, vx25 10, wb19 10, wb13 8 → now 7, 6, 6, 4, 7, 6, 7, 6.

## 8. Data & facts (exact)
**Pool:** 350 questions in `PLACEMENT_POOL` (`js/data.js`): 75 each of Grammar & Sentence Errors (`error`), Word Choice (`blank`), Vocabulary (`vocab`), Spelling (`spelling`) = 300 active, plus 50 Reading (`reading`, not used). The test draws 40 (12 error, 10 blank, 8 vocab, 10 spelling); the "Difficulty N/10" pill is a running counter, not the question's rating. Placement shows options in stored order; lessons shuffle all but `error` questions.
**PRs:** #39 (10 rewrites) merged; #40 (re-rating) merged; #41 (35 rewrites) merged; #42 (15 rewrites) merged (main at `fe24c00`); **#43 open, not merged:** `claude/placement-giveaway-fixes`, 54 rewrites, 3 commits, https://github.com/dc-porter/braingym/pull/43.
**Correct-answer positions A/B/C/D across the 300:** on main now 64 / 99 / 83 / 54; with #43 68 / 92 / 84 / 56. The 54 in #43: 8 / 21 / 13 / 12 before, 12 / 14 / 14 / 14 after.
**Correct answer is the longest option (300 active):** now (main) Grammar 6 of 62, Word Choice 17 of 75, Vocabulary 50 of 75, Spelling 7 of 75; with #43 Grammar 3, Word Choice 15, Vocabulary 30 (40%), Spelling 7. Chance 25% (33% for grammar, NO CHANGE set aside).
**Difficulty counts, 1-10, on main now:** Grammar 7 6 10 13 12 7 8 4 4 4; Word Choice 9 9 11 9 9 9 5 6 5 3; Vocabulary 7 7 9 13 7 9 9 5 6 3; Spelling 6 8 9 8 9 9 10 5 6 5.
**With #43:** Grammar 6 5 12 13 13 7 7 4 4 4; Word Choice 9 7 12 12 8 11 5 4 4 3; Vocabulary 5 7 9 16 9 11 9 5 **1** 3; Spelling unchanged. Vocabulary level 10 = vc17, vc19, vx19; level 9 = vc5 only.
**Giveaway re-run (main at `fe24c00`, before #43):** 84 flagged (Grammar 16, Word Choice 21, Vocabulary 47, Spelling 0); High 54 (all rewritten in #43), Medium 26, Low 4.
- Medium (26): wb24, wx15, vc5, vc2, vc9, vc6, vx18, vc32, wb42, wb48, wx10, vx12, vc14, vx5, vx8, ge40, vc10, vc39, vx1, ge1, ge2, ge3, ge4, ge5, gx1, gx2.
- Low (4): wb47, ge20, gx23, vc30.
**Bloom architecture (from the first summary; only PR states and `sw.js` cache name `bloom-shell-v3` re-checked):** device ID `bloom-device-id` (UUID), header `X-Bloom-Device-Id`; `api/ping.js`, `api/setup.js` (table `bloom_progress`), `api/progress.js` (GET, GET ?check=1, POST with optimistic concurrency, 4 MB limit, fingerprint = SHA-256 of canonical JSON cut to 32 hex); sync keys outside the prefix: `bloom-sync-version`, `bloom-sync-changed`, `bloom-sync-fingerprint`, `bloom-sync-import`; PRs #29–#38 merged (Import replaces the server copy: #38).
**MW lookups:** `merriam-webster.com/dictionary/<word>` works via curl through the proxy; Purdue OWL fails (certificate error) and the Chicago Manual of Style page returns a login shell.

## 9. People, terms & names
- **Terms:** giveaway = one option stands apart so the answer can be guessed; High/Medium/Low = guessability; FIX/KEEP/DECISION = double-answer audit verdicts; "twin" = correct answer has a near-identical sibling option; Register questions = sub-skill tag "Register".
- **Names in use:** `js/data.js` (`PLACEMENT_POOL`, `GRAMMAR_BANK`, `CATEGORY_NAMES`), `js/app.js` (`renderPlacement`, `pickAdaptiveQuestion`, `PLACEMENT_DRAW_COUNTS`), `api/progress.js`; branches `claude/rewrite-placement-batch1`, `claude/rerate-placement-batch1`, `claude/placement-double-answer-fixes`, `claude/placement-fixes-batch3`, `claude/placement-giveaway-fixes`.
- **Scratch scripts** (in `/tmp/claude-0/-home-user-braingym/5e6f6cdf-ae1c-520d-b960-8fff83d297b3/scratchpad`, may not survive): `build54.js`, `draft54.json`, `expl54.js` (the 54 build), `verify4.js`, `det.js` and `gv.js` (giveaway detectors), `mw2.js` (MW fetch), `ui4.js` (Playwright iPhone 14, seeds `bloom_v1_placementProgress`, clicks "Resume placement test"). Rebuild if missing.

## 10. Work state
| Item | Status | Version / location | Notes |
|---|---|---|---|
| Placement rewrites #39–#42 | merged | main `fe24c00` | |
| PR #43 (54 giveaway rewrites) | open, not merged | branch `claude/placement-giveaway-fixes`, commits e232956, 0d54996, b6eefe0 | Vocabulary level 9 now only vc5 |
| Remaining giveaways | not started | 26 Medium, 4 Low (section 8) | next batch candidates |
| Download-from-server (Bloom sync) | planned only | no code | dry run first, then empty-phone, then phone-behind; user has not answered whether to pair it with email sign-in |
| This handoff file | saved, untracked | `/home/user/braingym/handoff-bloom.md` | do not commit |

## 11. Next steps
1. **Next action:** run `git fetch origin main` and `mcp__github__list_pull_requests` to see whether #43 was merged, then ask the user how to fix Vocabulary level 9 (only vc5).
2. Draft rewrites for the 26 Medium and 4 Low giveaway questions (draft only, same format as before).
3. Later: add true register questions; resume the download-from-server planning.

## 12. Open questions ⚠️
- Is PR #43 merged, and does the user want changes before merging?
- Vocabulary level 9 has 1 question: re-rate some vocabulary questions to 9, write new level-9 ones, or leave it?
- Are grammar rewrites that now test agreement, case, word form or prepositions as well as fragments acceptable under "Sentence Fragments" and "Modifier Placement"?
- Next batch: rewrite the 26 Medium and 4 Low giveaways?
- Whether to build the download-from-server feature alone or together with email sign-in (unanswered).
- Unconfirmed in MW (kept, flagged in PR notes): usage labels for "tank" and "can"; "attribute … to"; general sense of "persistent"; "prefer that" grammar; "prudent" not fetched in the last batch.
- Not verified: iOS storage behaviour (Safari vs home-screen app), resume without restart.

## 13. Re-attach checklist
Nothing to attach. The repo is on GitHub (dc-porter/braingym); scratch scripts in section 9 can be rebuilt.

---
<sub>Audit: 13/13 sections · 13 rules · 9 corrections · 30 data points · secrets removed: none found · generated by active-memory</sub>
