# 2. Challenges to your concept

You asked me to treat your ideas as intent, not orders. Here is where I push back. **Big calls** are yours and are ranked by how hard they are to undo. **Small calls** I decided, with one line each.

Each Big call has the same shape: what you asked for, the problem, what I recommend, what it costs and what would change my mind.

---

## Big calls (yours to make)

### B1. A second currency changes the economy for good

- **You asked for:** crystals found while roaming, spent on cosmetic items only, able to top up a small shortfall on a cosmetic purchase.
- **Why it is hard to undo:** once anyone holds a balance, removing or repricing a currency takes something earned away. That breaks your no-punishment rule. Of everything here, this is the hardest to walk back.
- **The problem:** as written, crystals reward roaming. Roaming is not learning. An easily distracted learner can then spend whole visits collecting, and the 60/40 learning share slips. It also strains "growth in the world only comes from learning", even though crystals are cosmetic only.
- **I recommend:** keep crystals, with three changes.
  1. **Learning makes them appear.** Each finished task scatters a few crystals somewhere in the world. Roaming collects them. Uncollected crystals wait forever and never expire.
  2. **A small fixed number of hidden ones per area** reward exploring, once each. They never come back, so there is nothing to farm.
  3. **Two clean wallets, no top-ups.** Coins buy growth. Crystals buy cosmetics. Nothing is priced in both. A top-up rule needs an exchange rate, and an exchange rate quietly makes crystals worth coins.
- **Cost:** you lose the top-up. In return the rule fits on one line and can never leak into buying buildings.
- **Would change my mind:** if you want roaming to be rewarding with no learning attached. Then I would cap free crystals per day instead, and call it a measured experiment.

### B2. Where the learner's coins live, and who is allowed to pay them

- **You asked for:** coins earned from tasks in the world.
- **Why it is hard to undo:** it sets the shape of saved data, and saved data is the hardest thing in Bloom to reshape.
- **The problem:** the code has no coins at all today. If the world keeps the wallet, then lessons outside the world cannot pay coins, and there are two places that decide what a task is worth.
- **I recommend:** Bloom's core keeps the wallet and a **coin ledger** (a dated list of every coin earned, with its one-line reason). The world can only ask "what is the balance?" and "spend this much on that". The world never adds coins. This is the only way to guarantee your rule that coins come only from finished learning tasks.
- **A tension to know about:** your conflict rule says when the phone and the server both have new work, you pick one whole copy. Picking one throws away coins earned in the other. With one phone and the icon only, this is rare. I would not change the rule. I would say so in the Log, so nobody later calls it a bug.
- **Would change my mind:** nothing I can think of. It only removes a way to cheat.

### B3. 3D from the start: yes to the engine, not yet to free roaming

- **You asked for:** a 3D world designed for 3D from the start, with walking, swimming and talking in the final version.
- **The Log says:** tap-to-visit map first, set paths second, free roaming third.
- **Why it is hard to undo:** the way you move decides how every place is built. Switching from tap-to-move to a joystick later is cheap. Switching from a flat map to 3D later means starting over. So the order below is the safe one.
- **I recommend: 3D always, freedom in stages.**
  - **Stage A (prototype and world phase 1):** real 3D scenes. Each place is a small floating island you can see all of. You tap where to go and your avatar glides there. The camera follows by itself.
  - **Stage B:** islands joined by light-bridges and portals. You travel between them along set paths.
  - **Stage C:** open roaming inside bigger areas, swimming and creature rides.
- **Why not everything at once:** free roaming needs a moving camera, collision (stopping you walking through walls), a walkable-area map and far more scenery in view. Each one costs frame rate and build time. None of them teaches anything.
- **Cost:** your first weeks in the world feel like visiting beautiful dioramas, not exploring an open land.
- **Would change my mind:** the prototype running at a steady 60 on your iPhone 14 with plenty to spare.

### B4. The build-step call

- **You asked:** tell me the options and costs before choosing.
- **Why it is hard to undo:** medium. It decides which tools every future run needs, and you build from an iPhone.

| Option | What it is | Cost | My view |
|---|---|---|---|
| **A. three.js, saved in the project, no build step** | One well-known 3D library kept as plain files in the world's own folder | 419 KB compressed as shipped (measured), likely 180 to 220 KB once shrunk (estimated). No new tools. Works from your phone workflow. | **Recommended** |
| B. A bigger engine (Babylon.js or PlayCanvas) | More built in: physics, editors, effects | Several times larger download (estimated). Features we would not use for a year. | No |
| C. Add a build step now (a packer such as Vite) | Smaller files, more modern code layout | A tool that must run on every change. A wrong setting can break the live app. No benefit until the world has dozens of files. | Later, for the world folder only |
| D. Fake 3D with flat layers | Painted-looking layers that slide at different speeds | Smallest and fastest. Cannot grow into roaming, so it would be thrown away. | No, it fails your "grow without starting over" test |
| E. Load the library from someone else's server | No file in the project | Breaks offline use and depends on a third party staying up | No |

- **Would change my mind:** the world passing about 40 code files, or needing compressed 3D models from an artist. Either one makes option C worth it, and the folder layout in file 10 lets us add it then without touching lessons.

### B5. The world should be allowed to start a skill

- **You wrote:** "The tasks are the learning."
- **The Log says:** world tasks are practice, not first teaching, and only draw on skills already started.
- **The problem:** the opening breaks the Log's rule. A new learner at the castle gate has started nothing. And the Guide insists first teaching happens on calm screens with a rule, an example and a worked example.
- **I recommend:** keep the Log's rule that the world does not teach inside the game scene, and add one sentence: **a host can open the short calm lesson for a skill you have not started, and the place's task follows it.** The world becomes the front door to lessons, never a wall in front of them. Lessons stay open from the normal Learn screen too.
- **Cost:** the gate task for a new learner is slightly longer: one teach screen, then the practice.
- **Would change my mind:** if you would rather the world stay locked to practice only. Then a new learner must do one lesson before the castle scene means anything, which weakens your opening.

### B6. Building any of this before the lessons are proven

- **The Roadmap says:** the world does not start until the two-week checkpoint passes (Stage 5), and world phase 1 is Stage 8.
- **The risk:** the world is the biggest build by far. If the lessons under it do not teach, a beautiful world will not fix them, and a beautiful world is very good at hiding that.
- **I recommend:** build the prototype, because your access to me ends Monday and the look, the anchor character and the iPhone frame rate are the three things only a prototype can answer. Then **stop world building** until Stage 7 passes. The Bloom changes in file 9 are mostly things the audit says lessons need anyway, so doing them is never wasted.
- **Needs:** one Log line saying the prototype is an isolated look-and-feel test and not permission to skip stages.

### B7. A fifth answer format

- **You asked for:** mini-games and hands-on activities, not only questions.
- **The Guide says:** four answer formats, each with one stored right answer.
- **I recommend adding one:** **tap to arrange.** You tap word or phrase tiles into order to build a sentence. It still has one stored right answer, needs no typing and no AI, and it is the natural format for parallel structure, modifier placement and sentence combining. It is the difference between a world of four quiz skins and a world with something to do with your hands.
- **Rule to keep it honest:** only use it where exactly one order is defensible. If two orders could be right, the item is rewritten or dropped. Same rule as your placement questions.
- **Label:** measured experiment, switchable off.

### B8. Faces made from code

- **You asked for:** humanoid characters like gods and goddesses, and you want to see yourself in them.
- **The problem:** I build from shapes. Robes, hair, crowns, skin tone and posture I can do well. A face that reads as a beautiful adult woman, and not as a toy or a mannequin, is the hardest thing to build this way. Getting it wrong is worse than keeping it simple.
- **I recommend:** a deliberately stylized face: closed, calm eyes drawn as soft curved lines of light, a simple nose plane and no mouth detail at conversation distance. Think carved statue brought to life, which also suits the mood. The prototype's anchor is the test.
- **If it does not pass your eye:** commission one 3D character model. File 3 has the exact request to give an artist or an art tool. The design keeps a swap point so a model can replace my shapes without changing anything else.
- **Reversible:** yes, fully. It is on this list because it affects how you feel about the whole thing.

---

## Small calls (decided, one line each)

**Look and source material**

1. **Skin tones are stored as color values, never as names.** Your three references set the range. The style guide records colors only. No character is built to resemble anyone.
2. **"Asgard or Olympus" becomes "a celestial court".** Asgard reads as Marvel to most people. I use draped robes, circlets, star motifs and gold filigree, with no helmets, hammers, capes or lightning motifs.
3. **Every name is invented.** I could not check trademarks from here. Search each name once before it is final.
4. **Mermaids, dragons and winged horses are fine** as old shared myths. Each gets an original Aurelune design and its own name. The word Pegasus is not used as a creature name in the app.
5. **Gray aliens are redesigned** as tall, graceful "Veil folk" in robes. The classic big-eyed gray is a pop-culture image I would rather echo than copy.

**Rules of play**

6. **The engine picks the skill first. The activity type is chosen second.** Your "never the same type twice in a row" rule stays, but it never overrides which skill is due. Variety is a skin on the right practice, never a reason to practice the wrong thing.
7. **A task is a small set of items, by default five.** It finishes when every light is lit. A missed light stays dark until you light it with a fresh item on the same sub-skill, after the feedback. Lights you earned never go out.
8. **"Not always finished on the first try" is met by sets, not by harder questions.** At an 80 to 85% success rate, a five-item set comes out perfect on the first pass only about a third to a half of the time (estimated from the rate itself). That gives the retry pull you want without lowering the success range.
9. **A retry is never an identical repeat.** It uses fresh items, so it pays in full when finished. Your half-then-nothing rule only ever applies to replaying a finished set with the same items, which the world will not offer.
10. **No fail screen.** The word is "not yet". The screen shows which point to look at, then offers the fresh item.
11. **No timers anywhere in the world.** Come-back-later moments count real days, never seconds on a task.
12. **Proofreading is built into the scenery.** Signs and banners around the city sometimes carry an error. Tapping one is a real tap-to-fix task. This makes roaming itself pass Test 1.
13. **Each place offers two to four choices on entering,** as the Guide requires.
14. **Locked places are shown dim, not fogged with a padlock.** Each shows the one thing that would light it. It reads as "waiting for you", which fits portals as rewards.
15. **Things you restore never dim again.** Missed days pause growth. Nothing in the story decays.

**Feel and safety**

16. **Sound is off until you turn it on.** One switch on the first screen and in settings.
17. **Reduce motion follows the iPhone's own setting** and has its own switch. It removes camera sweeps, shimmer and particle bursts, and keeps fades.
18. **Rewards show only when a task ends,** never between items.
19. **Text never sits directly on the 3D scene.** Names and speech use solid panels with strong contrast.
20. **Host speech is at most two short sentences per bubble, and always skippable.**
21. **The quantum theme is visual only.** Twin portals, shimmer and probability clouds appear as effects and never as content. One empty island is reserved on the map for a future science subject.
22. **The placement test in the world is unchanged.** Same items, same order rules, no feedback, same coins whatever the score. World stops are a frame around it.

**Engineering**

23. **Portrait first.** The scene re-fits itself in landscape. Safari cannot lock rotation, so both must work.
24. **The world is its own page in its own folder,** loaded only when entered. Lessons never pay for it. This is the audit's own recommendation.
25. **WebGL 2 is the drawing method** (the long-established way browsers draw 3D). The newer WebGPU is skipped for now because not every iPhone 14 has it.
26. **Drawing pauses whenever a task card is open or the app is in the background.** This is the main battery saver.
27. **The prototype stores its data under its own name,** bloomworldproto_, which Bloom's Export, Import and backup do not read. It cannot touch real progress even if it shares an address.
28. **The prototype does not load js/data.js or js/app.js at all.** It cannot read a real question, and it cannot trigger a backup upload.
