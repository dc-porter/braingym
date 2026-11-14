# 6. World layout and places

## The shape of the world

Aurelune is built upward, because your screen is tall.

- **The Crown Isle** sits at the center with the castle and the First Gate.
- **Seven smaller isles** rise around it in a loose spiral, joined by bridges of light. These make up the **writing realm**.
- **Echo Lagoon** lies below the Crown Isle, fed by its waterfalls.
- **The Gate Court** holds a ring of seven archways. One is the First Gate. Five will each open onto a later subject's realm. The seventh stays faint and unnamed, reserved for a subject you have not decided on, such as science.
- **Beyond the map,** small drift isles float in from the distance over time. They are the part of the world that never runs out. See file 7.

```
                 ✦ Observatory
            Herald's Tower   ◦ drift isles
        Lexicon Archive          ◦
                    The Loom
   Star Market
              CROWN ISLE
          [ castle · First Gate ]
   Message Spire
              ~ Echo Lagoon ~
```

## Three views, one world

| View | What you see | How you get there |
|---|---|---|
| **Overview** | The whole realm: every isle, lit or dim, with Amaris's light on the suggested one | Pinch out, or tap the map button |
| **Isle** | One island filling the screen, its host, things to tap | Tap an isle |
| **Inside** | The place's own scene, like stepping into a shop | Tap the doorway |

Entering a place is the "walk into the shop" moment you described: a one-second fold of light, then the interior with its host.

## The places of the writing realm

Each place names its sub-skills, using today's names from the code. They will become permanent IDs when the skill map is made. Each place has at least two activity types. Every activity uses stored right answers, no timers and no AI grading.

| Place | City equivalent | Sub-skills practiced | Activities | Real-world material |
|---|---|---|---|---|
| **Gate Court** (castle) · Amaris | Town square | Punctuation · Sentence Fragments · Run-ons and Comma Splices | **Inscription repair** (tap to find and fix) · **Keystone** (multiple choice: which inscription is whole) | Notices, plaques, formal one-line statements |
| **Message Spire** · Tavi | Post office | Apostrophes: possessives and plurals · Subject-Verb Agreement · Pronoun Agreement and Reference | **Mend the letter** (tap to fix inside an email) · **Choose the reply** (multiple choice) · **Fill the line** (fill-in-the-blank) | Customer emails, replies about late orders, requests |
| **Star Market** · Mirelle | Shops | Commonly Misspelled Words · Double Letters · Prefixes and Suffixes · Commonly Confused Words | **Sign check** (tap to fix on shop signs) · **Label the crate** (one-word typing) · **Which tag** (multiple choice) | Price signs, product descriptions, receipts |
| **Lexicon Archive** · Oren | Library | Word Meaning in Context · Synonyms and Nuance · Antonyms and Contrast · Roots and Prefixes/Suffixes | **Shelve the word** (multiple choice in a sentence) · **Root crystals** (fill-in-the-blank) | Short passages, memos, article lines |
| **Herald's Tower** · Calix | Newsroom | Precision and Connotation · Idiomatic Usage · Register and Wordiness (lesson topics) · AP style points | **Edit the bulletin** (tap to fix) · **Trim the line** (tap the words that can go) · **Best headline** (multiple choice) | Announcements, newsletters, public notices |
| **The Loom** · Brisa | Workshop | Parallel Structure · Modifier Placement · Verb Tense Consistency · Sentence Variety and combining | **Weave the sentence** (tap to arrange, if you approve it) · **Mend the thread** (tap to fix) · **Which weave** (multiple choice) | Instructions, lists, report sentences |
| **Echo Lagoon** · Nerine | Music hall | Homophones · Silent Letters | **Echo spelling** (hear a word, type it; needs sound, so a read-the-clue version is the default) · **Twin shells** (pick the right homophone in a sentence) | Everyday sentences read aloud |
| **Observatory** · Zephra | Records office | No new skill. Mixed and delayed practice. | **Mixed constellation** (a short set mixing easily confused skills) · **Long look** (the optional longer review) · your progress sky | A mix of everything above |

**Notes on the list**

- **The Log's "nursery customer email" lives on.** It becomes a Star Market or Message Spire customer. Same real task, new setting.
- **Skills appear in more than one place over time.** The Guide asks for this so a skill does not get tied to one setting. Apostrophes show up at the Spire in letters and at the Market on signs.
- **The Observatory is the home of measurement.** Your progress shows there as a sky that fills in: one star per day practiced, which never resets. That is the Guide's calendar, drawn as a constellation. It is also where the placement stops and the "put it together" moment would live.
- **One skill above is not in the code yet:** apostrophes for possessives and plurals. It is the Roadmap's leading candidate for the template module, so I placed it where it fits best.
- **The other skill names are from today's code.** The audit found a second set of names in the older grammar bank. The skill map has to settle them before places are wired up.

## The two tests, applied

**Test 1: it teaches.** Every activity above names its sub-skills. Improvement shows in three ways the learner can see: the set finishes in fewer retries, Bloom steers to harder items and the place's host names what improved, using your own record. An activity with no skill cannot be created, because the doorway refuses a task without a skill ID.

**Test 2: it is not vanilla.** Eight places, seven activity types, hosts with different manners and real-world material that differs by place. On top of that:

- **Proofreading patrol.** Signs and banners around the isles sometimes flicker, which means they carry an error. Tap one for a quick fix. These are your due reviews, placed in the scenery. So the Guide's "gentle note about reviews that are due" becomes something you notice on a walk.
- **Visitors.** Now and then a traveler stands on an isle with a short request. It is a normal task on a skill Bloom chose, in a new voice.
- **A changing sky.** Dawn, day, dusk and night follow your phone's clock, and each has its own light.

## Refinements to your four variety rules

You approved these rules and asked me to challenge them. I keep all four and tighten three.

| Your rule | My refinement | Why |
|---|---|---|
| Every place offers at least two activity types | Kept as written | |
| The same activity type never runs twice in a row | **The skill is chosen first by Bloom. The type is chosen second, from the types that fit that skill.** If only one type fits, it may repeat. | Variety must never push the wrong practice in front of the right one |
| Difficulty adapts so a retry feels winnable, and a failed attempt shows what to try differently | **There is no failed attempt.** Lit lights stay lit. A miss shows the rule, the reason and a corrected example, then offers a fresh item on that point. | Fits "never punish" and still gives the retry pull |
| After a short time in the world there is always something new | **New things come from three sources: your own due reviews, held-back content released over weeks 4 to 10 as the Log asks, and generated drift isles.** | "Always something new" cannot depend on me hand-making content forever |

## Later realms

Each opens through its own archway at a learning milestone, as a small event. Lessons for every subject stay open from Bloom's Learn screen at all times. The archway is a reward, never a lock.

| Realm (working name) | Subject | Sample places | Ongoing practice mode after mastery |
|---|---|---|---|
| **Tidewater Exchange** | Finance | Counting house, trading floor, tax office | **Paper trading with real past market data.** Framed in every screen as practice, not advice: past dates only, no real money, no tips. |
| **Guild Harbor** | Business | Shipwright's office, charter hall, market stalls | Run a small stall: pricing, simple accounts, customer messages |
| **The Thinking Atelier** | AI skills | Question workshop, checking room | Judge and improve prompts and answers against a checklist |
| **Memory Gardens** | Memory | Path of stones, hall of echoes | Recall walks that grow longer |
| **Orrery Heights** | Math | Clockwork orrery, measuring bridge | Puzzle orbits that need estimation and arithmetic |
| *(unnamed, faint)* | Reserved | | |

For writing, the ongoing mode is **the Daily Dispatch** at the Herald's Tower: a fresh short bulletin to proof, mixing skills you have mastered. It is built from your review queue, so it is spaced practice that happens to look like a newsroom job.

These are sketches to show the pattern holds. Each new subject still needs everything the Log requires first: trusted sources, a second review pass, the recipe-fit check and a small trial.

## What is deliberately absent

- No shop that sells progress.
- No place that exists only to look at. Every place opens a kind of practice, as the Guide requires.
- No area that closes, expires or needs daily visits to keep.
