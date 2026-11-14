# 1. One-page summary

## The world in five sentences

You step through a flickering portal into **Aurelune**, a city of floating islands under huge pastel planets, where every gate, bridge and lamp is powered by clear language. A quiet drift has scrambled the inscriptions, so the lights have gone dim. Queen **Amaris**, the anchor character, finds you at the castle gate and asks for help with the first one. You repair its inscription with real writing practice, the gate blazes back to life and it becomes your way to every new area. From then on, each place in the city has a resident host, at least two kinds of activity and something to grow with the coins your learning earns.

Names are proposals. See file 5.

## What I kept from your vision

Almost all of it: the celestial look, the castle opening, the dim gate as the first task, hosts who live in each place, portals as small events, creatures and ships as unlockables, the two-currency rules, 3D as the goal and quantum ideas as a visual theme only.

## The six things I would change

Each is argued in file 2. The first four need your call.

1. **Real 3D from day one, but roaming arrives in stages.** The world is truly 3D from the first scene. You move by tapping where you want to go, not with a joystick. Free roaming, swimming and flying are designed now and switched on later. This keeps your 3D goal and the Decisions Log's "tap first, roam later" order, and it is the single biggest protection for frame rate and for my ability to finish.
2. **No build step. One 3D library, saved inside the project.** three.js runs from plain files. I measured it: 419 KB compressed as shipped, against 119 KB for all of Bloom today. A build step can be added to the world folder alone later, without touching lessons.
3. **Every task happens on a calm card, not on top of the glowing scene.** When a task starts, the world dims and pauses and a plain, high-contrast card slides up. This is how the world obeys your "calm learning, fun world" rule, keeps text readable over pink and purple light and saves battery.
4. **Crystals appear because you learned, then you go find them.** If crystals can be farmed by roaming alone, roaming competes with learning. In my version each finished task scatters a few crystals into the world. Roaming is the fun of collecting them. Learning sets how many exist.
5. **The world can start a skill, not just practice it.** The Log says world tasks only use skills already started. A brand-new learner at the gate has started none. So a host can open a short, calm lesson first, and the task follows it.
6. **The world never ends because part of it is made by code.** Hand-designed places run out. After them, new "drift isles" are generated from rules, so there is always another one to restore. This is only possible because the art is built from code, which turns a limit into an advantage.

## The honest limits

- **I cannot paint.** Everything is shapes, light and motion. Buildings, sky, water and effects will look good this way. **Faces are the risk.** I will design characters with simple, stylized faces and flowing robes and hair. The prototype's anchor character is the test. If she does not look right to you, the fix is a 3D character model from an artist or an art tool, and file 3 says exactly what to ask for.
- **I cannot test on your iPhone.** Every number in this package is labeled measured or estimated. Smoothness on an iPhone 14 is an estimate until you hold the prototype.
- **Bloom cannot host the real world yet.** There is no doorway, no coins, no world slot in saved data, and the offline helper re-downloads every file on each open. File 9 lists eight small steps that fix this, one purpose each. The prototype needs none of them because it runs on stand-ins.
- **The Roadmap says no world-building before the two-week checkpoint.** A prototype on its own branch that never touches your progress keeps that rule in spirit. The real world should still wait for Stages 4 to 7. This needs one line in the Decisions Log.

## What the prototype would be

One scene: you arrive, see the castle and the dim gate, meet Amaris, repair the inscription with five stand-in practice items, earn fake coins, watch the gate light, step through to a placeholder island and walk a short path outside. It lives in its own folder with its own preview link and its own storage, clearly marked as a prototype.

**Size of Phase 2: medium to large. Plan for large.** The anchor character and the frame-rate work are the uncertain parts.

## What I need from you

The top 10 decisions are in file 12. The three that block Phase 2 are: the staged-roaming call, the no-build-step call and the calm task card. Everything else can be decided after you have held the prototype.

**Stopping here for your approval. Nothing is built.**
