# 4. Impact on the app

Nov 16, 2026 · for Dee

What painted art and 3D models would mean for file types, download size, loading, the offline helper and phone performance. Nothing here is built. Every number is labeled measured or estimated.

**Starting point, from your phone test:** the prototype holds 60 frames a second at the top quality step on your iPhone. It draws 33 to 51 objects and 13,500 to 29,100 triangles, and downloads 237 KB in total (measured earlier). That leaves a lot of room.

## File types

| For | File type | Why | Phone support |
|---|---|---|---|
| Paintings, cutouts, portraits | **WebP** | Small, sharp, allows see-through edges | Safari on iOS 14 and later (checked on caniuse) |
| 3D models | **GLB** | The web standard. One file. | Read by an add-on to the 3D library already in the project |
| Sound | **M4A or MP3** | Plays on every iPhone | Ogg, a common free-music format, is fully supported only from iOS 18.4 (checked on caniuse), so I would convert |

AVIF, a newer picture format, is a little smaller and works from iOS 16.0. I would stay with WebP because it opens faster.

## Download size

**Paintings (measured).** To learn what paintings of this kind weigh, I re-saved four of your reference photos as WebP in my scratch area and read the sizes. The copies were not added to the project.

| Kind of picture | About 1,024 pixels wide | About 2,048 pixels wide |
|---|---|---|
| A character | 50 to 75 KB | 110 to 165 KB |
| A crystal city | 60 to 95 KB | 140 to 210 KB |
| Floating rocks and clouds | 75 to 125 KB | 180 to 280 KB |
| A very detailed hall | 280 to 410 KB | 630 to 930 KB |

The larger sizes were enlarged from smaller photos, so true high-detail art at that size will run somewhat bigger.

**3D models (estimated).** A raw model from a picture-to-3D tool is 10 to 50 MB. Slimmed for a phone it is about 0.3 to 1 MB.

**Add-ons to the 3D library (measured from version 0.187.0).**

| Add-on | Needed for | Size, compressed |
|---|---|---|
| Model loader and its helper | Any GLB | 35 KB |
| Shape unpacker (meshopt) | Slimmed models | 8 KB |
| Texture unpacker (KTX2 and Basis) | Only if we need to save graphics memory | 275 KB |
| Glow effect (bloom) | A true glow around bright things | 6 KB |

**One place, hybrid route (estimated from the measurements above).**

| Item | Count | Size |
|---|---|---|
| Backdrop paintings | 3 | 0.5 to 1.5 MB |
| Depth maps | 2 | 0.1 MB |
| Character standees, front and back | 2 characters | 0.3 MB |
| Portraits | 2 | 0.2 MB |
| One hero 3D object | 1 | 0.3 to 1 MB |
| **Total for one place** | | **about 1.5 to 3 MB** |

For scale: the whole prototype is 0.24 MB today. One painted place is about ten times that, and about the size of one phone photo.

**The whole writing realm,** eight places, would be roughly 12 to 25 MB (estimated). It must never download all at once.

## Loading

- **Each place loads only when you go there.** The first screen stays fast.
- **A calm loading moment** covers the wait: the gate's swirl, with a progress line.
- **First visit to a place:** about 2 to 5 seconds on ordinary mobile data (estimated). **Later visits:** under a second, if the offline helper keeps the files.
- **Pictures are opened in the background** so the scene does not stutter while a painting unpacks.
- **Leaving a place frees its art** before the next one loads. A phone that holds two places at once is the most likely way to run out of memory.

## The offline helper

This matters more now than it did.

- Today the helper re-downloads every file on every open. With a 0.24 MB prototype nobody notices. With 2 MB of paintings per place, every visit would re-download them. That wastes mobile data and makes every arrival slow.
- **Step B8 in the handoff (the helper keeps the saved copy of big, rarely changing files) becomes a must-do before any real art ships.** It is still its own run, alone, and I have not touched the helper.
- **Art files get a version in their name,** such as `amaris-front.v2.webp`. A new painting is a new file name, so the phone never shows a stale one and the helper never has to guess.

## The no-network rule

The prototype page tells the browser to refuse every network call. Paintings are not affected, because pictures load a different way. **3D model files are affected:** the 3D library fetches them with the kind of call the rule blocks.

So the first GLB forces a choice:

- **Loosen the rule to "this site only".** Simple. But then the promise "this page cannot call Bloom's server" rests on the code being checked, not on the browser enforcing it.
- **Keep the rule and pack the model inside a code file.** Safe, slightly bigger, a little awkward.

For a prototype I would keep the rule and pack the model. For the real world page the rule has to loosen anyway, since the real doorway talks to Bloom.

## Phone performance

| Measure | Budget from the design package | Prototype today | With the hybrid (estimated) | Comment |
|---|---|---|---|---|
| Frames a second | 60, never under 30 | 60 on your phone | 60 | |
| Objects drawn | under 80 | 33 to 51 | 45 to 70 | Each painting is one object |
| Triangles | under 100,000 | 13,500 to 29,100 | 30,000 to 60,000 | Hero 3D objects add most of this |
| Pixels drawn | 2× cap | 2× | 2× | Unchanged |
| **Graphics memory for pictures** | not set before | about zero | **under 100 MB per place** | **The new limit to watch** |
| **See-through layers stacked on screen** | not set before | few | **no more than about four full-screen layers** | **The other new limit** |

**Why graphics memory is the new limit (measured by arithmetic).** A picture takes far more room in the phone's graphics memory than its file size suggests. A 1,024 by 1,500 painting needs about 8 MB. A 2,048 by 3,000 painting needs about 30 to 37 MB. So:

- Backdrops are capped at 2,048 pixels on the long side: about 13 MB each.
- Standees and portraits are capped at about 1,024 pixels tall: about 8 MB each.
- One place then needs about 70 to 90 MB (estimated), inside the limit.
- If that ever gets tight, the 275 KB texture unpacker cuts picture memory to roughly a fifth.

**Why see-through layers matter.** Every see-through painting that covers the screen makes the phone color those pixels again. Four layers is four times the work for that part of the picture. This, not triangles, is what would drop the frame rate.

**Things that stay too costly, and their cheap stand-ins:**

| Wanted effect | Real version | Stand-in |
|---|---|---|
| See-through crystal that bends light | Draws the scene twice | An edge shimmer and a painted inner glow |
| A mirror floor | Draws the scene twice | A flipped, faded copy of the painting |
| Real shadows | Can halve the frame rate | Soft dark ovals, as now |
| Glow around every light | Affordable at half size (estimated) | Test on your phone before relying on it |

## 3D characters, if you ever choose them

For completeness, since the hybrid does not need them.

- Each needs slimming to about 10,000 to 15,000 triangles and one 1,024-pixel picture: about 0.5 to 1 MB each.
- A moving skeleton costs the phone's processor, not its graphics chip. Two to four moving characters on screen is comfortable (estimated). A crowd is not.
- Each would add 1 to 3 drawn objects.

## Storage and hosting

| Limit | Value | Meaning for Bloom | Checked? |
|---|---|---|---|
| GitHub, one file | Blocked above 100 MiB. Upload through the website: 25 MiB. | No art file comes close | Checked |
| GitHub, whole project | "less than 5 GB is strongly recommended" | Fine. But the project keeps every old version of every picture forever, so only final, shrunk files go in. Originals stay in your Photos. | Checked |
| Vercel free plan, data sent to visitors | "First 100 GB" a month | One person uses a tiny fraction | Checked |
| Vercel free plan, commercial use | Not stated on the pages I read | Matters only if Bloom is ever sold | Not checked |

## What does not change

- Bloom's lessons, questions and saved progress.
- The saved-data keys, the api folder and main.
- The rule that the world page is the only page that loads world files.

## What must happen first, in order

1. **Your phone test** (file 7), to see whether free art reaches your bar at all.
2. **Your route decision** (file 9).
3. **The offline helper change** (step B8), alone, before real art ships.
4. **A version-named art folder and the art log.**
5. Only then, art in the scene.
