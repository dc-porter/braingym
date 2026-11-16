# 5. Roaming plan: thumb-drag, a bigger isle and a 360-degree camera

Nov 16, 2026 · for Dee · on paper only, nothing built

You asked for three things after testing: move by dragging your thumb, a much bigger isle and a camera that turns all the way around. This plans all three inside the staging you approved: tap-to-move first, paths second, open roaming third. Each stage says what it costs the phone.

## Where I was wrong, and where I still push back

- **Thumb-drag: you are right.** I argued for tap-only in the design package. You have now held it and want to steer. Your thumb outranks my prediction. The plan below keeps both: a tap still means "go there", a drag means "steer".
- **A much bigger isle: I push back on "bigger" as the goal.** The avatar crosses today's isle in about six seconds. Triple the width and it is an 18-second glide across open floor. Mario-like abundance comes from how much there is to do per step, not from acreage. I propose **more tiers, not more floor:** terraces at different heights joined by steps, bridges and small portals. That matches your white tiered city, feels far larger and keeps something to tap every few seconds.
- **A full 360-degree camera: yes in the open, with one honest cost.** A camera that sees everything means everything needs a back. Painted halls and painted backdrops do not have one. So 360 degrees belongs in the open-air areas, and halls and viewpoints keep a gently swinging view. This is decision 2 in file 9.

## The controls, fully grown

One thumb does everything. A second finger is optional.

| You do | What happens | Stage |
|---|---|---|
| Tap the ground | Your avatar glides there | A (built) |
| Tap a person, gate or sign | Your avatar goes to it and uses it | A (built) |
| **Press on the ground and drag** | A soft ring appears under your thumb. Your avatar moves the way you drag, for as long as you hold. Lift to stop. | **B** |
| Drag across the sky, the top third of the screen | The view turns | A: a little, and springs back. C: all the way around, and stays. |
| Drag with two fingers anywhere | The view turns | C |
| Double-tap the sky | The view swings back behind your avatar | C |
| Pinch out | Rise to the map | B |

**Why "press on the ground" and "drag the sky" are separate.** One finger cannot both steer and turn the view. Splitting the screen by where the drag starts keeps it one-handed: ground to move, sky to look.

**The chase camera.** From stage B the view follows behind your avatar and swings smoothly as you turn. You get most of a 360-degree view simply by walking in a circle, without touching the camera at all.

**Reduce motion** keeps tap-to-go, replaces camera swings with short fades and never auto-rotates.

## Stage A: tap to move (the prototype, plus a little)

| | |
|---|---|
| **You get** | Tap to go. A small look-around that springs back. One isle. |
| **Could be added cheaply** | A second terrace on the same isle, a few more things to tap |
| **Art it needs** | Works with painted backdrops and standees with front and back views |
| **Cost to the phone** | What you measured: 60 frames a second at the top quality step |

## Stage B: paths and thumb-drag

| | |
|---|---|
| **You get** | Thumb-drag steering. The chase camera, turning up to about a quarter-turn each way from the front. Three to five terraces joined by steps and light bridges. The map. |
| **Why the camera stops at a quarter-turn** | Painted backdrops and flat painted buildings still look right within that swing |
| **Art it needs** | Standees gain left and right views, which can be one painting mirrored. Each terrace gets its own backdrop. |
| **New code** | A walkable-area map so thumb-drag cannot push you through a wall or off an edge. Scenery split into pieces so the phone skips what is off screen. |
| **Cost to the phone (estimated)** | About 20 to 30% more triangles and 10 to 20 more drawn objects than today. Graphics memory rises with each backdrop, so only the nearest two terraces keep their paintings loaded. Still comfortably 60 frames a second. |

## Stage C: open roaming and the full 360-degree camera

| | |
|---|---|
| **You get** | A view that turns all the way around and stays where you leave it. A much larger open area. Swimming and rides, as in the design package. |
| **Where** | Open-air areas. Halls and viewpoints keep the stage B camera. |
| **Art it needs** | Everything near you must be real 3D, because you can walk behind it. Far paintings must form a complete ring around you, six to eight of them. Characters need more views, or 3D bodies, or an accepted "always faces you" paper-figure look. |
| **New code** | Collision with every solid object. Simpler stand-ins for distant things. Loading and unloading areas as you move. |
| **Cost to the phone (estimated)** | Two to three times today's triangles, toward 60,000 to 100,000, the top of the budget. 70 to 110 drawn objects, at or over the budget of 80. The ring of far paintings alone needs 80 to 100 MB of graphics memory, so the 275 KB texture unpacker becomes necessary. Frame rate risk: medium. This is the first stage where I would not promise a steady 60. |

## What each request costs, side by side

| Request | Cost to the phone | Cost in art | Cost in build effort | My view |
|---|---|---|---|---|
| Thumb-drag | Almost nothing | None | Small, plus the walkable-area map | Do it at stage B |
| More terraces | Small each | One backdrop per terrace | Small each | Do it, a tier at a time |
| One much bigger flat isle | Medium | A lot of floor to fill | Medium | Prefer tiers |
| 360-degree camera in open areas | High | High: everything needs a back | Large | Stage C, after the art route is proven |
| 360-degree camera inside halls | High | Makes painted halls impossible | Large | I recommend against |

## Three rules I would hold to

1. **Something to tap within about five seconds of travel, everywhere.** If a new area cannot meet that, it is not ready.
2. **Never widen the camera past what the art can survive.** A beautiful view with a leash beats a free view of flat scenery.
3. **Each stage ships only after your phone holds 60 frames a second on the one before.**

## What I am not proposing

- A second on-screen stick for the camera. It needs two thumbs.
- Jumping, climbing or falling.
- Any speed that makes the camera lurch.
