# 8. Roaming and exploration, the full version

This is the complete design on paper. The prototype builds only the first small slice: one short path, tap to move.

## The feeling to aim for

A slow, pleasant stroll through somewhere beautiful, where a tap always does something and you keep noticing small things. Not a test of thumb skill. You should be able to roam on a bus, with one hand, while half paying attention.

## Controls

**One thumb, tap to go.**

| You do | What happens |
|---|---|
| Tap the ground | Your avatar glides there by the easiest route |
| Tap a place, a person, a sign or a crystal | Your avatar goes to it and uses it |
| Tap and hold on the ground | Your avatar keeps following your thumb |
| Drag sideways with one finger | The view turns gently, and springs back when you let go |
| Pinch out | Rise to the overview map |
| Tap an isle on the map | Travel there |

**Why not a joystick.** An on-screen joystick needs a thumb held on the glass and constant small corrections. It covers part of a small screen, it is tiring one-handed and it is the usual reason phone 3D feels clumsy. Tap-to-go needs one tap and then nothing. It also works unchanged in all three stages of roaming.

A joystick can be offered later as an option in settings for people who prefer it. It should not be the default.

**Reach.** Everything you must tap sits in the lower two-thirds of the screen. The map, the bag and the home button sit along the bottom edge, above the iPhone's home bar. Nothing important sits in the top corners.

## The camera

- **It follows you by itself,** from above and behind, tilted so you see where you are going and the sky beyond.
- **You never have to steer it.** A gentle drag lets you look around, and it eases back.
- **It frames things for you.** Near a host it drifts to include them. At a viewpoint it lifts to show the vista.
- **It never spins fast.** With reduce motion on, it cuts between fixed angles instead of sweeping.

## Three stages of freedom

| Stage | You can | Built when |
|---|---|---|
| **A. Isles** | Walk anywhere on one small isle. Travel between isles from the map or by portal. | Prototype and world phase 1 |
| **B. Paths** | Walk across light bridges from isle to isle. Travel is something you do, not a cut. | World phase 2 |
| **C. Open roaming** | Wander larger joined areas, swim, ride, find hidden corners | World phase 3 |

Under the hood each isle carries a simple map of where feet may go (programmers call it a navigation mesh). Stage A uses small ones. Stage C uses bigger ones. The controls and the avatar code do not change.

## Moving in other ways

All use the same tap-to-go.

- **Swimming.** Tap the water and your avatar wades in and swims. In deeper water a mer-guide joins you. Below the surface the light turns aqua and sound softens. No breath meter, no danger.
- **Riding.** At marked perches you can call a creature. It carries you along a sky lane, a set route with a view, and sets you down at the other end. You can look around during the ride.
- **Ships.** A small saucer does the same between realms, for the pleasure of the trip. The portal is always there if you want to skip it.
- **Portals.** Step in and you fold into light and unfold at the twin. About one second.

Rides and ships are never required. Every destination can be reached by a tap on the map.

## Things to do while roaming

Each one passes your two tests, or is clearly marked as scenery.

| Thing | What it is | Teaches? |
|---|---|---|
| **Flickering signs** | A sign or banner with an error. Tap for a quick fix. These are your due reviews. | Yes: the sub-skill under review |
| **Visitors** | A traveler with a short request | Yes: a sub-skill Bloom chose |
| **Hosts** | Enter their place for its activities | Yes |
| **Crystals** | Collect by walking through them | No. Cosmetic currency. They exist because you finished tasks. |
| **Viewpoints** | Stand on the marked stone and the camera lifts for a vista | No. Scenery, costs nothing, pays nothing. |
| **Gate fragments** | One line of the old builders' message, found near each new portal | No. Story, one sentence. |
| **Your plots** | Place and move decorations you own | No. Play. |

**The honest split.** Roaming is the "play" share of work-then-play. The first three rows are where roaming and learning meet, and they are the ones Amaris's light points to. The rest is there to make the world worth being in.

## Why you will not feel you have seen everything

- **The world moves with your learning.** Signs flicker where reviews fall due. Crystals land in new corners after each task. What is on the isle today depends on what you did yesterday.
- **Held-back content.** The Log asks for new places, plants and items to be saved for weeks 4 to 10, when interest usually dips. The release list is planned up front.
- **Vertical layers.** Above: sky lanes and the Observatory. On the isles: streets and gardens. Below: the lagoon, and caverns under the isles lit by crystal.
- **Time of day.** Four moods of light. Some small things only show at night: glowing flowers, extra stars.
- **Drift isles.** There is always a new one on the horizon.
- **Rare visitors.** A measured experiment, as in the Log.

None of these sends a notification or shows a countdown. You find them when you come.

## Talking to characters

- Tap a character. One or two short sentences appear on a solid panel, with two to four choices under it.
- Every line can be skipped with a tap.
- Hosts remember your own record and nothing else.
- No long conversations and no choices that change the story. This is a learning app with a world, not a role-playing game.

## Surviving real life

| What happens | What the world does |
|---|---|
| You switch apps or the phone locks | Drawing stops at once. Your place, position and open task were already saved. |
| You come back | Same isle, same spot, same task with the same lights lit. A small "Welcome back" panel names where you are. |
| A phone call | Same as switching apps |
| You rotate the phone | The scene re-fits. The task card stays readable in both directions. Nothing restarts. |
| Safari's bars slide in or out | The layout uses the visible area only, so buttons never hide under a bar |
| The connection drops | Nothing changes. Items, checking and saving all work on the phone. Backup waits, as it does today. |
| iOS clears the 3D picture from memory while you were away | The scene is rebuilt from code in a moment. This is a real advantage of art made from code: there is nothing large to reload. |
| The page is closed entirely | Next open offers "Back to the Gate Court?" or Bloom's home |

## Comfort and access

- **Reduce motion:** covered in file 3.
- **No motion needed to play.** Nothing depends on tilting or shaking the phone.
- **No timing skill.** Nothing has to be tapped quickly.
- **Text size** follows the iPhone's setting on every panel.
- **Tap targets** are at least 48 px, and things in the scene get a tap area larger than they look.
- **Never color alone.** A flickering sign also has a small quill mark over it.
- **A way out is always visible:** a home button to Bloom on every screen.

## What I am leaving out on purpose

- **Combat, health, falling or any way to fail while roaming.**
- **Other players.** Bloom is for one person, or a few with separate profiles.
- **Jumping and platforming.** It needs precise timing and is the wrong mood.
- **A stamina or energy meter.** It is a timer in disguise.
