# Question Branch Review

Nov 14, 2026 · for Dee · read-only review of the branch claude/placement-quality-pass against main

Nothing was changed, merged or deleted. The question branch was not edited. This file is the only thing created.

**Words used in this report**

- **Branch:** a separate working copy of the code. Main is the live one.
- **Merge:** copying a branch's changes into main.
- **Keyed answer:** the option the app treats as correct.
- **Distractor:** a wrong option.
- **Verified:** I read it or ran it. **Inferred:** I am reasoning from clues or making a judgment call.

**Branch check**

- The branch has no new commits since the audit. It still ends at commit 52eb492.
- Main has not moved. It is still at pull request 50.
- No pull request exists for the branch.
- The count is still 154 changed questions: 17 Grammar, 20 Word Choice, 83 Vocabulary and 34 Spelling.

---

## 1. Summary and verdict

**Verdict: merge after the listed fixes.**

I read all 154 changed questions against main, the Decisions Log and the Design Guide. The branch is better than main on the things your rules care about most. It is not ready as it stands.

**What the branch does well**

- It removes sentences that defined the answer. On main, many Vocabulary sentences explained the word they were testing. Those are gone.
- The wrong options are stronger. Most are now real, tempting mistakes, and each explanation says why they tempt.
- Every explanation I read matches its keyed answer.
- Answer positions are exactly even: 83 each for A, B, C and D.
- The approved small cleanup is all here: sx32, the xanthosis swap, the three Spelling re-ratings and the vx9 origin line.
- The difficulty ratings moved in the direction your rating method calls for. Less help from the sentence means a higher rating.

**What needs fixing before a merge: 17 questions**

| Problem | How many | Questions |
|---|---|---|
| A second answer can be defended | 3 | wb4, wb23, wb3 |
| An antonym question whose options include a pair of opposites, which your Log lists as a giveaway | 8 | vc45 to vc50, vx29, vx34 |
| Punctuation gives the answer away | 1 | ge36 |
| Wrong options are not tempting, and the rating is too high | 1 | wx8 |
| The explanation is wrong or has a small error | 4 | sx5, vc27, vc29, sp25 |

**What needs a dictionary check, not a rewrite: 12 questions**

Twelve explanations make new word-origin claims. Your rule says no origin claim unless it was read on a dictionary page. All 12 look right to me from memory, but I did not look them up. See section 2F.

**Fine as they are: 125 questions.** See section 3.

**The Vocabulary design change**

It is partly a good change and partly a matter of taste. It is right for a placement test under your own rules. It has two side effects you should accept on purpose: one skill name no longer fits, and easy Vocabulary questions drop from 25 to 10. Neither blocks the merge. See section 4.

**What I could not check**

Whether the ratings match real learners. Only your retake and a second reviewer can show that. See section 5.

Every recommendation here was challenged twice before it was kept: once as a skeptic who thinks it is wrong, and once by asking for a better alternative. Section 6 lists what I dropped.

---

## 2. Questions I would change, grouped by problem

### A. A second answer can be defended (3)

Removing the context clue fixed a giveaway but left the blank open to another option. All three are judgment calls, so I mark them Inferred.

**wb4** · Word Choice · level 8

- **Now:** "The inspector's _____ conduct was exposed in a state investigation." Keyed: venal. Others: venial, vengeful, venomous.
- **Problem:** "vengeful conduct" also fits. An inspector who punished people out of spite could be exposed by a state investigation. Nothing in the sentence points to bribery.
- **Fix:** add a light money clue that does not define the word. For example: "The inspector's _____ conduct came to light when investigators traced the payments."
- **How sure:** Inferred. This is the strongest of the three.

**wb23** · Word Choice · level 3

- **Now:** "Rather than rewrite section four, the lawyers added a glossary meant to _____ its language." Keyed: clarify. Others: amplify, condense, disguise.
- **Problem:** "amplify" can mean to expand on a statement with more detail, which is what a glossary does. The explanation itself concedes that it "can mean to expand on".
- **Fix:** put back the one word the branch removed: "meant to _____ its vague language." Vague language is clarified, not amplified.
- **How sure:** Inferred.

**wb3** · Word Choice · level 7

- **Now:** "The creek followed a _____ course through the valley." Keyed: tortuous. Others: torturous, torpid, torrential.
- **Problem:** "torpid" means sluggish, and a slow creek can be said to follow a sluggish course. It is a weaker case than the two above.
- **Fix:** swap "torpid" for a lookalike that cannot describe a course, such as "torrid".
- **How sure:** Inferred. Fix it if you are fixing the others. It would not block a merge alone.

### B. Antonym questions with a pair of opposites among the options (8)

**The rule.** Decisions Log section 20 lists as a giveaway "two options that are opposites of each other in an antonym question".

**What I found (Verified).** In eight changed questions, one wrong option is the word's own meaning. That option and the keyed answer are opposites of each other. A learner who does not know the word can spot the pair and guess between two options, not four.

Example, vc45: "What is the opposite of 'lugubrious'?" The options include "sad and downcast" and "cheerful and lively". The answer has to be one of those two.

| Question | Word | The option to replace | A replacement that is not an opposite |
|---|---|---|---|
| vc45 | lugubrious | sad and downcast | tense and uneasy |
| vc46 | stringent | strict and demanding | detailed and specific |
| vc47 | destitute | poor and desperate | bitter and resentful |
| vc48 | antagonistic | hostile and bitter | long and tedious |
| vc49 | ascetic | strictly self-denying | lonely and withdrawn |
| vc50 | pessimistic | doubtful and gloomy | anxious and rushed |
| vx29 | insouciant | carefree and casual | proud and boastful |
| vx34 | truculent | aggressive and defiant | rambling and long-winded (main's own option) |

- **Fix:** replace that one option in each, then update the explanation line that mentions it.
- **How sure:** Verified that the pattern is there. Whether it breaks your rule depends on how you read it. The Design Guide words the rule differently ("only the right answer is an opposite of the word"), and under that wording these eight pass.
- **Outside this branch:** six questions on main already have the same pattern and were not introduced by this branch: vx20, vx21, vx22, vx23, vx24 and vx25. Decide the rule once and apply it to all 14.

### C. Punctuation gives the answer away (1)

**ge36** · Grammar · level 3

- **Now:** the two wrong rewrites end with a period ("Each one, carefully evaluated against a detailed rubric."). The keyed answer has none. The sentence already has a period after the underlined part.
- **Problem:** the keyed answer is the only rewrite that fits the punctuation, so it can be picked without knowing the grammar. Main did not have this.
- **Fix:** remove the period from options B and C.
- **How sure:** Verified by script and by reading.

### D. Wrong options are not tempting (1)

**wx8** · Word Choice · level 5

- **Now:** "The merger talks were not merely difficult but _____." Keyed: protracted. Others: retracted, contracted, distracted.
- **Problem:** the three wrong options cannot describe talks at all. A learner can reach the answer by elimination. The branch removed the giveaway clause but left the options as they were.
- **Fix:** re-rate from 5 to 4. I tried to write better options and each one created a second right answer, so the honest fix is the rating.
- **How sure:** Inferred.

### E. Explanation errors (4)

**sx5** · Spelling · resuscitate

- **Problem:** the explanation says the word has a "single-s / double-s / double-c pattern". It has neither a double s nor a double c. The hard part is the "sc" in the middle. This error is on main too. The branch re-rated the question and left the explanation.
- **Fix:** "'Resuscitate' has an s, then an sc: re-sus-ci-tate. The common errors drop the c or double the s."
- **How sure:** Verified.

**vc27** · Vocabulary · terse

- **Problem:** the explanation names three wrong options and then says "neither". Small grammar slip.
- **Fix:** change "neither describes" to "none describes".
- **How sure:** Verified.

**vc29** and **sp25**

- **Problem:** each new explanation uses an Oxford comma in a simple list. Your house style is AP. The rest of the branch's new explanations follow AP.
  - vc29: "never running out, unable to be heard, and incapable of error"
  - sp25: "drop the n, add an e, or lose the first u"
- **Fix:** remove the comma before "and" and before "or".
- **How sure:** Verified.

### F. New word-origin claims to check against a dictionary (12)

**The rule.** Decisions Log section 20: explanations make "no word-origin claim that wasn't read on a dictionary page". This is the rule that removed the origin line from vx9.

**What I found (Verified that the claims are new; not verified that they are correct).** Twelve changed explanations add an origin claim that main did not have. I could not tell whether anyone read a dictionary page for them. From memory, all 12 are right.

| Question | Claim |
|---|---|
| vc15 | omniscient: Latin roots for "all" and "knowing" |
| vc17 | sesquipedalian: literally "a foot and a half long" |
| vc18 | carnivorous: Latin "carn-" (flesh) |
| vc19 | verisimilitude: Latin "verus" (true) and "similis" (like) |
| vc21 | bibliophile: Greek "biblio-" (book) and "-phile" (lover) |
| vc22 | xenophobic: Greek "xeno-" (foreign) and "-phobic" (fearing) |
| vc23 | antebellum: Latin "ante" (before) and "bellum" (war) |
| vc26 | quixotic: from Don Quixote |
| vc28 | mercurial: the god Mercury or the metal mercury |
| vx8 | biography: Greek "bio-" (life) and "-graphy" (writing) |
| vx13 | peripatetic: Greek for "walking about" |
| sp28 | pterodactyl: "pter-" means wing |

- **Fix:** look each one up in Merriam-Webster. Keep the claim if the page supports it. Cut the clause if it does not.
- **How sure:** Verified that the rule applies. The risk that any claim is wrong is low.
- **Note:** most of these are in the Roots & Prefixes/Suffixes skill, where the root is the whole point of the question. Cutting them all would weaken those explanations, so checking is better than cutting.

---

## 3. Questions that are fine

125 of the 154 changed questions need no change. "vc" and "vx" are Vocabulary, "ge" and "gx" are Grammar, "wb" and "wx" are Word Choice, and "sp" and "sx" are Spelling.

- **Grammar (16 of 17):** ge2, ge7 to ge9, ge12, ge23, ge26, ge29, ge37 to ge41, gx4, gx18, gx19.
- **Word Choice (16 of 20):** wb1, wb2, wb5, wb12 to wb15, wb17, wb20, wb24, wb49, wx5, wx7, wx9, wx10, wx28.
- **Vocabulary (62 of 83):** vc1 to vc14, vc16, vc20, vc24, vc25, vc30 to vc44, vx1 to vx7, vx9 to vx12, vx14 to vx28, vx30 to vx32.
- **Spelling (31 of 34):** sp5 to sp7, sp9 to sp12, sp14, sp15, sp18, sp20, sp21, sp29, sp31 to sp33, sp36, sp41, sp42, sp48, sx1, sx4, sx6, sx7, sx9, sx14, sx16, sx19, sx26, sx27, sx32.

The 12 questions in section 2F are also fine as questions. Only one clause in each explanation needs a dictionary check.

**Checks every changed question passed (Verified by script):**

- Four different options and one keyed answer.
- A non-empty explanation.
- No ID added, removed or changed.
- No keyed answer that repeats a distinctive word from its own sentence.

**Giveaway by length.** Among the 154, the keyed answer is the single longest option in 18 and the single shortest in 17. Chance would give about 38 each. There is no length tell.

**Answer positions.** Overall: A 83, B 83, C 83, D 83. By category:

| Category | A | B | C | D |
|---|---|---|---|---|
| Grammar | 15 | 20 | 24 | 24 |
| Word Choice | 25 | 20 | 17 | 17 |
| Vocabulary | 20 | 20 | 22 | 23 |
| Spelling | 23 | 23 | 20 | 19 |

Grammar's A is low because A is always "NO CHANGE" and it is right only 15 times in 83. A test-wise learner could learn that "NO CHANGE" is rarely right. This is the same on main and is not caused by the branch.

**Ratings and the cap rules.**

- The Spelling cap is applied as your rule says. Eleven words common in print moved down to 6, including hemorrhage and resuscitate, which you chose to keep. Desiccate sits at 7, which is fair for a word that is rare in print.
- The result is a crowd at level 6: 27 Spelling questions, up from 17. Only four Spelling questions remain at level 7 or above.
- Sixty Vocabulary questions moved up by 1 to 3 levels. The biggest jumps (vc23 antebellum from 2 to 5, vc25 vociferous from 4 to 7) are the ones whose old sentence spelled out the meaning. The direction is right. The exact numbers are judgments.

**Small things on main that I noticed while reading (not caused by the branch)**

- gx13 and ge45 have the same period mismatch as ge36, in a form that gives nothing away but can show a double period.
- Several Grammar test sentences use an Oxford comma, such as ge23 and gx18. AP style would drop it.
- Some Vocabulary options start with a capital letter (vx14 to vx19, vx27, vx31) and the rest do not.

---

## 4. The Vocabulary design question

**What changed.** On main, most Vocabulary questions gave a sentence rich enough to work out the word. On the branch, the sentence only shows the word in use. Twelve antonym questions also changed from fill-in-the-blank to "What is the opposite of X?"

Example, vc8:

- **Main:** "The garrulous cab driver talked nonstop for the entire forty-minute ride, covering weather, politics, and his grandchildren without pausing for a reply."
- **Branch:** "The garrulous cab driver took us across town."

**Is it good, bad or a matter of taste?**

- **Good, for three of the four skills.** Roots & Prefixes/Suffixes, Synonyms & Nuance and Antonyms & Contrast are about knowing words. A sentence that explains the word lets a careful reader score well without knowing it. Your own rules say the sentence must not give the answer away, and your rating method lowers a rating when it does. The branch applies your rules as written.
- **A matter of taste, for Word Meaning in Context.** Working out a word from its surroundings is a real skill. The old questions measured that. The new ones measure whether you already know the word. Neither is wrong. They are different measurements.

**Side effect 1: one skill name no longer fits.** Twenty-five questions are still tagged "Word Meaning in Context" and still say "As used here". The context no longer helps. Your results screen would report a score for a skill the test no longer measures. "Antonyms & Contrast" has a milder version of the same problem, since the contrast sentences are gone.

**Side effect 2: easy Vocabulary questions drop from 25 to 10 (Verified).**

| Skill | Levels 1 to 3 on main | Levels 1 to 3 on the branch |
|---|---|---|
| Word Meaning in Context | 9 | 3 |
| Roots & Prefixes/Suffixes | 8 | 4 |
| Synonyms & Nuance | 3 | 1 |
| Antonyms & Contrast | 5 | 2 |
| **Total** | **25** | **10** |

What that does:

- **To the placement test: little.** The test asks 8 Vocabulary questions, two per skill. In my simulation a learner who misses everything still scores 1. A weak learner will meet a few questions at level 4 where main would have served level 2 or 3.
- **To lessons: more.** Lessons draw on the same questions. A learner at level 1 to 3 in Vocabulary now has 10 questions at their level, and Synonyms & Nuance has one. They will see repeats quickly.
- **The ratings are not the problem.** I would not re-rate questions downward to fill the gap. The fix is writing 10 to 15 new easy Vocabulary questions later. It does not block the merge.

**My recommendation**

1. Accept the change. It makes the placement test a cleaner measure of vocabulary.
2. Rename "Word Meaning in Context" to something like "Word Meaning" when you build the skill map in Stage 4. Do not rename it before then, because skill records are filed under the name.
3. Drop "As used here" from the wording in the same pass, or leave it. It is harmless.
4. Add easy Vocabulary questions later, as lesson content.
5. Write this decision into the Decisions Log, so it stops being an unrecorded change.

**The strongest argument against my recommendation**

Adults almost never meet a word alone. They meet it in a sentence and use the sentence. A test of bare recall can underrate a strong reader who would handle the word well in real life, and Bloom is built around real-world content. The old questions had also been through three rounds of fixes and re-rating, and that work is thrown away for 83 questions on the word of one unreviewed pass. If you weigh "how well does she read real text" above "how many words does she know", keep main's Vocabulary questions and take only the rest of the branch.

**Why I still recommend it.** Reading in context belongs with Reading Comprehension, which you set aside on purpose. Lessons, not the placement test, are where your Guide asks for real-world content. And your own giveaway rule would keep flagging the old sentences in every future audit.

---

## 5. What I could not check

- **Whether the ratings match real learners.** Every rating is a judgment, by the branch's author and now by me. **This needs your retake.** It is the first result that will show whether level 6 is really harder for you than level 4.
- **Whether the keyed answers and definitions are right by the dictionary.** I judged all 154 from my own knowledge and found no wrong key. I did not look words up. **This needs a second reviewer** with Merriam-Webster open, at least for the 41 questions whose keyed answer text changed and the 12 origin claims.
- **AP style points.** The AP Stylebook is paywalled.
- **The three judgment calls in section 2A.** A second reader may find the second answer weaker or stronger than I did.
- **How the questions look on your iPhone.** Some new options are longer than the old ones. I did not see them on a screen.
- **The 231 unchanged questions.** This review covered only what the branch changed.
- **Your saved progress.** I never saw it. Placement records keep their own copy of each question, so old results stay readable after a merge.

---

## 6. Recommendations I dropped after challenging them

- **"Do not merge; redo the Vocabulary questions with light context."** A skeptic's point held: light context either helps, which is the giveaway you ruled out, or does not help, which is what the branch already has.
- **"Re-rate some Vocabulary questions back down to restore easy coverage."** That would make the ratings dishonest to hide a content gap.
- **"Rewrite wx8's wrong options."** Every tempting option I tried also fit the blank. A lower rating is the honest fix.
- **"Cut all 12 origin claims."** For root questions the origin is the teaching point. Checking is better.
- **"Split the branch and merge only the six-question cleanup."** That was my fallback in the audit. After reading everything, the rest of the branch is worth keeping, so one merge after fixes is simpler.

---

## 7. Suggested order

1. Decide the antonym rule (section 2B) and the Vocabulary design (section 4).
2. One small prompt applies the fixes in section 2 on a new branch built on this one, and opens a pull request.
3. A second reviewer checks the 41 changed answers and the 12 origin claims.
4. You read the preview on your iPhone and merge.
5. Export, then take the retake.

Keep everything else about the app exactly the same.
