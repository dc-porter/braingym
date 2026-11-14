# Bloom World Design Package

Nov 14, 2026 · for Dee · Phase 1 of the World Design Brief (critique and design only)

Nothing in the app, its data, its settings or the three reference documents was changed. Nothing here is built. These files are the only things created, on the branch claude/world-design. No pull request was opened.

## Read in this order

If you only have ten minutes, read the first four.

| # | File | What it is |
|---|---|---|
| 1 | [01-summary.md](01-summary.md) | The one-page summary |
| 2 | [02-challenges.md](02-challenges.md) | What I would change in your concept: Big calls for you, Small calls I made |
| 9 | [09-plug-in-contract.md](09-plug-in-contract.md) | Exactly what the world asks Bloom for and sends back, and what must change in Bloom first |
| 12 | [12-top-10-decisions.md](12-top-10-decisions.md) | The ten decisions I need from you, hardest to undo first |
| 3 | [03-art-direction.md](03-art-direction.md) | Art direction and style guide |
| 4 | [04-characters.md](04-characters.md) | Species, costume, the anchor and the hosts |
| 5 | [05-story.md](05-story.md) | Three story options, names and a recommendation |
| 6 | [06-world-and-places.md](06-world-and-places.md) | The map, the places and what each one teaches |
| 7 | [07-growth-and-economy.md](07-growth-and-economy.md) | Coins, crystals, expansions, portals and the growth curve |
| 8 | [08-roaming.md](08-roaming.md) | Roaming and exploration on a phone, the full version |
| 10 | [10-technical-plan.md](10-technical-plan.md) | 3D on an iPhone, the performance budget and the build-step call |
| 11 | [11-prototype-plan.md](11-prototype-plan.md) | What Phase 2 would build, and its size |
| 13 | [13-document-changes.md](13-document-changes.md) | Every line in the Decisions Log, Design Guide and Roadmap this design replaces, with proposed wording |
| — | [handoff-for-opus.md](handoff-for-opus.md) | How a smaller model continues without me |

## Words used in this package

- **3D library:** ready-made code that draws three-dimensional scenes in a web page. The one I recommend is called three.js.
- **Build step:** a tool that packs and shrinks code before it goes live. Bloom has none today: the files you see are the files that run.
- **Doorway:** the small, fixed list of questions the world may ask Bloom and the answers it may send back. Programmers call this an API. It does not exist yet.
- **Stand-in:** fake data that has the same shape as the real thing, so a prototype can run without touching real progress.
- **Frame rate:** how many pictures per second the screen draws. 60 looks smooth. Below 30 looks choppy.
- **Service worker / offline helper:** the small file (sw.js) that lets Bloom open without a connection.
- **Measured / Estimated:** measured means I ran it and read the number. Estimated means I am reasoning from experience and it must be checked.
- **Sub-skill:** one teachable skill with its own record, such as Parallel Structure.

## What I read

- Bloom_World_Design_Brief.md, Bloom_Decisions_Log.md, Bloom_Design_Guide.md and Bloom_Roadmap.md (attached to the session; they are not in the repository, and docs/reference/ does not exist on main).
- docs/audit/bloom-foundation-audit.md on the branch claude/foundation-audit. I treated it as fact.
- The code on main at pull request 50: sw.js, index.html and the structure of js/app.js and js/data.js. I did not copy or use any question from js/data.js.

Keep everything else about the app exactly the same.
