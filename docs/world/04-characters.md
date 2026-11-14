# 4. Characters

## Two kinds, as you asked

- **One anchor,** who opens the game, appears at story moments and offers gentle direction.
- **One host per place,** always the same person, always there.

Nobody else speaks more than a line. That keeps reading short and makes each host memorable.

## The peoples of Aurelune

Humanoids are the clear majority. The shares are for the whole cast over time.

| People | Share | Look | Where you meet them |
|---|---|---|---|
| **Lumen folk** (humanoid) | about 60% | Tall, graceful adults in draped robes. Warm brown skin, most often medium golden-brown. Many with long, flowing platinum hair. | Everywhere. The Queen and most hosts. |
| **Tideborn** | about 15% | Skin from pale sky blue to deep ocean blue, finned ears, pearl ornaments. Some are mer-folk with tails. | The Message Spire, Echo Lagoon |
| **Verdant** | about 8% | Soft green skin, leaf-like hair, living vines as jewelry | Gardens, the Memory realm later |
| **Rosari** | about 7% | Rose to magenta skin, petal-shaped collars, quick and bright in manner | The Star Market |
| **Veil folk** | about 5% | Tall, slim, pearl-gray, large dark calm eyes, long hooded robes. My original take on the classic gray visitor. | The Lexicon Archive |
| **Far-star visitors** | about 5% | Beings of light and crystal with no fixed face, from distant galaxies | Rare visitors, the Observatory |

## Skin tones for the Lumen folk

Stored as color values only. Your three references set the range and are not recorded anywhere in the app or the style guide.

| Position | Value (starting point) |
|---|---|
| Lighter end of the range | #C6905F |
| **Center: medium golden-brown, the most common** | **#B27A48** |
| Deeper end of the range | #7B4A2A |

All three have warm, golden undertones. Under the world's cool moonlight, warm skin can drift gray, so every character also gets a soft warm fill light. I will tune these on screen, and they are yours to adjust on your phone: this is the part where your eye matters most.

Hair: platinum #F3EBD3 with a faint glow, plus silver-white, soft gold and deep indigo for variety.

## Costume language: the celestial court

- **Draped and layered:** long robes, wrapped bodices, floor-length skirts and cloaks that trail. Ancient-Greek in the way cloth falls, not in any specific copied garment.
- **Gradients:** cloth fades from one color to another, such as twilight purple into rose.
- **Gold trim and star motifs:** thin gold edges, small stars, crescents at the brow or shoulder.
- **Circlets and halos, not helmets.** No armor, hammers, horned helms, capes or lightning motifs.
- **Status shows in light, not in metal:** the Queen's robe glows faintly at the hem.

**A practical bonus:** floor-length robes hide legs. Characters glide a hand's width above the ground, which suits the world and removes the hardest animation of all, a believable walk.

## How characters are built from code

- **Proportions:** tall and elegant, about seven and a half heads high. Adult, never chibi.
- **Body:** a smooth tapered form under the robe. Robes are simple cone and ribbon shapes that sway.
- **Hair:** long ribbon shapes that drift as if underwater. This is where the "flowing platinum hair" comes from, and it is something code does well.
- **Face:** deliberately simple. Calm eyes drawn as soft curved lines of light, a gentle nose plane, a hint of a mouth. Expression comes from head tilt, hands and a soft glow that brightens when they speak.
- **Hands:** mitten shapes with a thumb. Gestures are slow and open.
- **Motion:** breathing, drifting hair, a slight bow when greeting, an open-palm gesture when handing you a task.

This is a statue-come-to-life look. It is a choice, and file 2 (B8) explains what we do if you want more.

## The anchor: Queen Amaris, Keeper of the First Light

The name is a proposal. See file 5.

- **Who she is:** the ruler of Aurelune, responsible for the First Gate. Warm, unhurried, curious about you. She treats you as an honored guest and a colleague, never as a child or a servant.
- **Look:** medium golden-brown skin (the center value). Platinum hair to her knees, drifting, with points of light in it. A thin crescent circlet. A layered robe fading from twilight purple at the shoulders to rose at the hem, edged in gold, glowing softly at the bottom. She floats.
- **Voice on the page:** short, warm, specific. "You came through the First Gate. No one has done that in an age." Never more than two sentences at a time.
- **What she does:**
  1. Meets you on arrival and gives the first task.
  2. Appears at each big moment: a new portal, a finished module set.
  3. Hosts the castle.
  4. Sends **her light:** a small drifting mote that hovers near the next suggested place. This is the Log's "gentle glow". It can be ignored and it never repeats itself.
- **What she never does:** remind, count days, sound disappointed or mention time away. After a long break her line is the Log's own: "Your world is right where you left it."

**One refinement to your idea.** You suggested the anchor both rules the land and helps you navigate. A queen who follows you around giving directions stops feeling like a queen. So she appears at moments that matter, and her light does the everyday pointing.

## The host system

Every host has the same five things, so new ones are quick to design and easy to tell apart:

1. **A silhouette cue** you can recognize as a dark shape: a hat, a tail, a staff.
2. **A signature color** used for their name and their place's lamps.
3. **A prop** tied to their work.
4. **Two personality words.**
5. **A greeting pattern:** one line of welcome, then two to four choices.

**Rules for every host:**

- The same host, every visit.
- At most two short sentences before the choices appear. Always skippable.
- They may mention what you did last time, using only your own record: "Last visit you relit three lamps here." Never what you did not do.
- They react to your progress with specifics, following the Guide's praise rule: they name what you did well.

## The first hosts (writing realm)

| Place | Host | People | Silhouette and prop | Manner |
|---|---|---|---|---|
| Castle and Gate Court | **Queen Amaris** | Lumen folk | Crescent circlet, drifting hair | Warm, unhurried |
| Message Spire | **Tavi** | Tideborn | Courier satchel, finned ears | Brisk, cheerful |
| Star Market | **Mirelle** | Rosari | Petal collar, a tray of glowing wares | Bright, a little theatrical |
| Lexicon Archive | **Oren** | Veil folk | Tall hood, floating book | Quiet, dry humor |
| Herald's Tower | **Calix** | Lumen folk | Long horn, sash of bulletins | Precise, proud of clean copy |
| The Loom | **Brisa** | Lumen folk | Shuttle of light, braided hair | Patient, hands-on |
| Echo Lagoon | **Nerine** | Tideborn (mer) | Tail, spiral shell | Playful, musical |
| Observatory | **Zephra** | Far-star visitor | A body of soft light with a ring | Calm, speaks in short images |

All names are invented and need the same quick online check as the others.

## Your avatar

- **At setup (full version):** choose a Lumen folk archetype or one of the other peoples, then skin tone from the range above, hair and robe color. Three or four choices per step, never a long menu.
- **In the prototype:** one default. A Lumen folk traveler with medium golden-brown skin, platinum hair in a long braid and a simple traveler's robe in star blue.
- **Unlockables:** robes, circlets, hair styles, trailing light effects, creature companions and ship skins, bought with crystals.

## Creatures and ships

Designed on paper only. None is in the prototype.

- **Creatures** arrive as companions that follow you and, later, as rides along sky lanes or under water: lagoon mer-folk who guide you through the water, small ribbon-bodied sky dragons, winged horses with wings of light. Each gets an original design and an invented name.
- **Ships** scale from a one-seat saucer the size of a rowboat up to a ringed mothership that parks above your city as a landmark.
- **How they are earned:** the creature or ship itself arrives at a learning milestone, free. Colors and trims for it are cosmetics, bought with crystals.

These lean on shapes that are hard to build well from code. Simple gliding forms will work. A convincing galloping horse will not. If creatures matter a lot to you, they are the second-best use of a commissioned model after the anchor.
