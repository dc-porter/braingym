# 3. Art direction and style guide

## The look in one line

**A moonlit city of floating islands, built like glowing glass and carved stone, under planets so large they fill half the sky.** Soft, stylized and luminous. Never photoreal, never cartoon-babyish.

Mood references only: the wonder of drifting between small worlds, the warmth of a grand fantasy capital at dusk. Every shape, character and name is original.

## What I can and cannot make

I build pictures from code: shapes, surfaces, light, motion and effects. I cannot paint or generate images.

| Looks great from code | Possible but plain | Needs painted or modeled art |
|---|---|---|
| Skies, stars, planets, rings | Trees and plants (stylized) | Realistic faces |
| Water, waterfalls, mist | Furniture and small props | Detailed creatures (a dragon's head, a horse's legs in motion) |
| Glass, crystal, glowing stone | Robes and hair | A painted nebula backdrop |
| Towers, arches, bridges, domes | Simple stylized characters | Illustrated icons and the app icon |
| Portals, shimmer, particles, light beams | | Hand-drawn story panels |

The style below is designed so the first column carries the beauty.

## Color

Color values are starting points. I will tune them on screen in Phase 2 and you judge them on your phone.

| Role | Name | Value | Used for |
|---|---|---|---|
| Deep sky | Void indigo | #141033 | Top of the sky, task card background |
| Sky middle | Night violet | #2A1E5C | Sky gradient, far islands |
| Sky low | Twilight purple | #5B3FA8 | Horizon glow, shadows on stone |
| Accent warm | Orchid pink | #E58AD0 | Planet rims, blossoms, portal edge |
| Accent soft | Rose glow | #FFB3DE | Highlights, dawn-side light |
| Accent cool | Star blue | #6FB7FF | Light bridges, glass, cool rim light |
| Water | Lagoon aqua | #58E0E6 | Water, waterfalls, mist |
| Light | Moon white | #F4F0FF | Marble, text, brightest glow |
| Treasure | Star gold | #FFD98A | Coins, lit inscriptions, trim. **Reserved for "you earned this".** |
| Dim | Sleeping gray-violet | #4A4468 | Anything not yet restored |

**Two rules that make it read at a glance:**

1. **Gold means earned.** Nothing is gold until you lit it. A restored place has gold light in its windows. Over time your city turns from blue-violet to gold-flecked, which is progress you can see without a chart.
2. **Dim means waiting, never broken.** Unrestored things are the sleeping gray-violet with a slow, faint pulse. No cracks, no ruins, no decay.

## Shapes

- **Tall and slender:** spires, needle towers, long arches. They suit a portrait screen.
- **Crescents and rings everywhere:** crescent doorways, ringed towers, halo platforms. They echo moons and orbits.
- **Soft edges:** rounded corners and bevels. No aggressive spikes.
- **Islands:** a flat garden top, a rocky underside that narrows to a crystal point and thin waterfalls that pour off the edge and fade into mist.
- **Scale contrast:** tiny lamps and flowers near you, an enormous ringed planet behind. This contrast is what gives the "another universe" feeling for almost no cost.

## Light and surfaces

- **Two lights only:** a cool moonlight from above and behind, and a soft glow from below, as if from the planet. This is cheap for a phone and flattering to every shape.
- **Edge glow** on everything (programmers call it rim light): a thin bright outline on the side facing away from you. It makes shapes read clearly against a busy sky and gives the ethereal look.
- **Banded, soft shading** in place of realistic shading: three or four gentle steps from light to dark.
- **No real shadows.** A soft dark oval under each character and object does the job at a fraction of the cost.
- **Glow is faked.** Bright things get a soft, see-through halo sprite. A true full-screen glow effect looks lovely and costs too much frame rate on a phone, so it is held back as an optional high setting.
- **Distance haze:** far things fade toward the sky color. This adds depth and hides the edges of the world.
- **Almost no image files.** Color comes from the shapes themselves, so the download stays small.

## Sky, water and motion

- **Sky:** a smooth three-color gradient, a few hundred stars that twinkle slowly, two or three planets (one huge and ringed, low on the horizon), drifting dust motes. The sky shifts with the real time of day on your phone: rose at dawn, blue-violet by day, deep indigo with more stars at night.
- **Water:** a single flat surface with gentle moving ripples, a bright edge where it meets the shore and scattered sparkles. Waterfalls are moving streaks of light with mist at the bottom.
- **Motion is slow and breathing:** islands bob a hand's width, banners sway, lamps pulse. Nothing flashes. Fast motion is saved for the one-second payoff when something lights up.

## The quantum theme, as effects only

No effect below teaches or names any physics.

| Effect | What you see | Where |
|---|---|---|
| **Shimmer** | A not-yet-restored thing shows as two or three faint ghost copies, slightly apart, that slide together into one solid shape when you light it | Every restore and every purchase |
| **Twin portals** | Portals come in pairs that pulse in perfect step, in mirrored colors, however far apart | The castle gate and each destination |
| **Probability cloud** | A soft cloud of drifting points that hints at the outline of what a place could become, then gathers into the real thing | Expansions you could afford soon; this doubles as the Log's "gentle glow" |
| **Stepping through** | The scene folds into streaks of light, then unfolds as the new place. About one second, or a plain fade with reduce motion on | Travel |

A nice side effect: the cloud-to-solid moment makes every purchase feel like an event.

## Text, panels and readability

- **Text never floats on the 3D scene.** It sits on solid panels.
- **Task card:** void indigo background, moon-white text, at least 17 px body, following the iPhone's text-size setting. Estimated contrast about 16 to 1, far above the usual 4.5 to 1 standard. I will measure it in Phase 2.
- **Speech bubbles:** same solid panel, the speaker's name in their signature color, two short sentences at most.
- **Buttons:** at least 48 px tall, key buttons 56 px, placed in the lower third of the screen for one-handed reach.
- **Fonts:** the same two Bloom already uses (Fredoka for titles, Nunito for reading), so the world feels like part of Bloom.
- **Feedback colors:** right is star gold with a check mark. Not-yet is star blue with a small arrow. **No red anywhere,** as the Guide requires, and never color alone: every state has a shape or word too.

## Sound (off until you turn it on)

Planned, not in the prototype beyond one or two soft tones: glassy chimes for a lit glyph, a low warm swell for a restored gate, quiet water and wind. No music loop by default.

## Reduce motion

On when the iPhone asks for it, and by its own switch. It removes camera sweeps, bobbing, shimmer ghosts and particle bursts. It keeps soft fades and color changes, so nothing loses meaning.

## If you commission art later

You never need to. If you want to, here is exactly what to ask for.

**A character model (the most valuable one):**
> One original stylized 3D character, full body, in GLB format. Under 15,000 triangles. Colors painted onto the model or one 1024-pixel image. Under 1.5 MB. Posed standing with arms slightly out. Includes three short loops: idle, talking and a welcoming gesture. Stylized, not realistic: elongated elegant proportions, calm face. Original design with full rights for use in my app. Not based on any existing character or real person.

Attach file 4's description of the anchor and the color values.

**A sky backdrop:**
> One seamless panoramic painting of a pastel nebula in blues, pinks and purples, soft and low in contrast, 2048 by 1024 pixels, no stars or planets (those are added in code).

**Icons:**
> A set of 24 simple line icons in one consistent weight, single color, as SVG files: coin, crystal, map, gate, lamp, scroll, quill, shell, star, ship and so on.

If you use an art tool that generates images, check its terms for commercial use, and never ask it for "in the style of" a named game, studio or artist.
