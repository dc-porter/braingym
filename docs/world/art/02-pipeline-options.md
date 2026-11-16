# 2. Pipeline options, free only

Nov 16, 2026 · for Dee

A pipeline is the chain of tools that turns an idea into a file Bloom can show. This file lists every free tool I looked at, what each can and cannot do, and three ways to chain them. File 3 says how good each result can be. File 8 lists exactly what I checked.

## How to read the "Checked?" column

Free plans and licenses change fast, so every line says where its facts came from.

- **Checked** means I read the tool's own page on Nov 16, 2026.
- **Reported** means the tool's own page blocked me or was silent, and the fact comes from search results or other people's write-ups. Treat it as a lead, not a fact.
- **Not checked** means I could not confirm it either way.

**Words used here**

- **GLB:** the standard file for a 3D model on the web. One file holds the shape, the colors and any movement.
- **Rig:** an invisible skeleton inside a 3D model, so it can bend and move. **Auto-rig:** a tool that adds one for you.
- **Cutout:** a picture with its background removed, so only the character or building remains.
- **Standee:** a flat painted cutout standing in the 3D world, like a cardboard figure in a shop window, that always turns to face you.
- **Backdrop:** a large painting placed far away in the scene.
- **Depth map:** a gray picture that records how far away each part of a painting is. It lets a flat painting shift like a window when the view moves.
- **CC0:** "no rights reserved". Free for anything, no credit needed.
- **CC BY 4.0:** free for anything, as long as you give credit and link the license.

## The big findings first

1. **Free picture-making is strong.** Several good tools have real free plans that work on an iPhone.
2. **Free picture-to-3D is much weaker than it looks.** The best-known tool, Meshy, does not let free accounts download a colored model at all. Others let you look but not export, or limit you to one a day for personal use. The routes that are truly free are the open ones, and they give a few tries a day.
3. **I found no free auto-rig that works from an iPhone.** The one free rigging service, Mixamo, is built for a computer, and I could not confirm it works on a phone.
4. **The "free CC0 character libraries" are mostly the blocky, low-detail style you just rejected,** and the best known of them, Quaternius, is no longer CC0. It now has its own license (still free, still fine for games).
5. **You do not need a computer for the clean-up work.** Shrinking, converting and compressing files can be done by a model like me in a cloud run. You make and choose the art on your phone. A run prepares and installs it.

## Tools for making pictures

| Tool | Free plan | Your rights to the pictures | Works on iPhone | Checked? |
|---|---|---|---|---|
| **Google Gemini app** | Image making and editing are on the free plan. Google publishes no number: "Your limit refreshes every 5 hours until you reach your weekly limit." Earlier this year the published figure was up to 20 a day. | Not stated on the pages I could read. Other write-ups say Google does not claim ownership. An invisible mark is embedded in every image. | Yes, iOS app | Limits: Checked. Rights: Reported. |
| **ChatGPT** | Free accounts can make images. The limit is unpublished, and reports range from 2 or 3 a day to 20 or more. | Other write-ups say you own what you make. | Yes, iOS app | Not checked. OpenAI's pages blocked me. |
| **Microsoft Copilot** (Bing Image Creator) | 15 fast images a day, then slower ones. Needs a Microsoft sign-in. | "Microsoft does not claim ownership of Prompts, Creations." Commercial use is not stated. Images "may not be unique across users". | Yes, app and phone browser | Terms: Checked. Limit: Reported, from Microsoft's own features page via search. |
| **Krea** | "100 units / day": about 50 fast images, or 5 with its best model | A commercial license is listed only on paid plans | Phone browser: Not checked | Checked |
| **Adobe Firefly** | "Limited free daily generations". No number given. | Not stated for the free plan | "Firefly on web and mobile" | Checked, partly |
| **Draw Things** (app that makes pictures on the phone itself) | Free. "Create limitlessly on your device without ads or token limits." | Depends on the model you load. One good one, FLUX.1 schnell, is Apache 2.0: free for "personal, scientific, and commercial purposes". | Yes, iOS 15.4 or later. Whether an iPhone 14 runs the bigger models comfortably: Not checked. | Checked |
| **Recraft** | | Free images "are owned by Recraft", are public and are "not licensed for commercial use". **Avoid.** | | Checked |
| Leonardo, Ideogram, Canva | | | | Not checked. Their pages blocked me. |

**What they do well:** whole scenes, mood, light, fabric, faces at portrait size.

**What they do badly:**

- **Hands.** Extra or fused fingers still happen. Ask for hands relaxed at the sides or hidden in sleeves.
- **Fine jewelry and patterns.** Chains melt into each other. Fine up close, mush when shrunk.
- **Keeping one character the same** across many pictures. Much better than a year ago if you ask the tool to edit a picture it already made ("same woman, now seen from behind"), but never perfect.
- **Exact counts and exact layouts.** "Five towers" may give four or seven.
- **Clean edges on wispy hair** once the background is removed.
- **Skin tone drift.** Tools tend to lighten brown skin between pictures. Say the tone in every request and reject pictures that drift.

## Tools for preparing pictures

| Job | Tool | Free plan and license | iPhone | Checked? |
|---|---|---|---|---|
| Cut out a character | **iPhone photo cutouts** (press and hold the subject in Photos) | Built in. "iOS 16 and later on iPhone XS, iPhone XR, and later." Offers Copy, Add Sticker and Share. | Yes | Checked. How to save the cutout as its own file: Reported. |
| Cut out a character | **Adobe Firefly background remover** | "Free with an Adobe account." Gives a see-through PNG file. | "Works on mobile" | Checked |
| Cut out a character | **A plain background, removed in a run** | You ask the art tool for a plain pale background. A cloud run removes it. | Yes | My own method. The image tools exist in my workspace (tested today). Not yet tried on your art. |
| Make a depth map | **Depth Anything V2, small model** | Apache 2.0. The larger models are non-commercial. | Run by a model in the cloud, not by you | License: Checked. Running it here: Not checked. |
| Shrink files | Image tools in my workspace | Open tools | Run by a model | Tested today |
| Shrink files yourself | **Squoosh** | Runs in the browser. "Images never leave your device." | Not checked | Checked, partly |

## Tools for making 2D art move

| Tool | Free plan | Verdict | Checked? |
|---|---|---|---|
| **Live2D Cubism** (the standard for animated 2D characters) | Free version: one texture, 100 parts, 30 controls. "Designed for use on computers only." | No. Needs a computer and hours of hand work per character. | Checked |
| **Inochi2D** (open alternative) | Open license. Desktop only. | No, same reason | Checked |
| **Rive** | "Free exports play a Rive splash screen." | No | Checked |
| **Picture-to-video tools,** for short "living portrait" loops | Luma lists no free plan. Pika's free plan has zero monthly credits and no commercial license. Google's Flow comes with paid plans. Kling's free plan is reported to add a watermark and forbid commercial use. | **No usable free route found.** | Luma, Pika: Checked. Flow: partly. Kling: Reported. |
| **Motion made in code** | Free | **Yes.** Breathing, drifting hair and cloth, a gentle float, glow, a slow blink if you make a second picture with eyes closed. This is the one job where code is the right tool. | My own method |

## Tools for turning a picture into a 3D model

| Tool | Free plan | License of what you make | Catch | Checked? |
|---|---|---|---|---|
| **Meshy** | 100 credits a month. 10 downloads a month, "untextured Meshy 6 Lite models only". | CC BY 4.0, credit required | **Free accounts cannot download a colored model.** Gray shapes only. | Checked |
| **Tripo** | Reported as 200 to 300 credits a month and about 15 downloads | Reported: public, credit required, Tripo keeps ownership. Sources disagree on commercial use. | Unclear rights | Not checked. Its pages blocked me. |
| **Tencent Hunyuan 3D, website** | Reported: 20 free models a day, GLB download | Not checked | The site loaded as an empty page for me | Reported, from Tencent Cloud's own announcement of Nov. 2025 |
| **Hunyuan3D 2.1 and TRELLIS.2 on Hugging Face** (free public demos of open models) | Both demos exist. A free Hugging Face account gets 5 minutes of computing a day. I estimate that is two to five models. | TRELLIS.2: MIT, very permissive. Hunyuan: Tencent's own license, which "does not apply in the European Union, United Kingdom and South Korea"; "Tencent claims no rights in Outputs". | Few tries a day. Whether the demos work in a phone browser: Not checked. | Licenses and quota: Checked. Output file type on the demo pages: Not checked. |
| **Microsoft Copilot 3D** | Free at launch in Aug. 2025, GLB download, reported to work best on a computer | Not checked | Its page now sits behind a sign-in I could not pass | Reported |
| **Rodin** | "Generate for free before confirmation" | Export is not included on the free plan | Look, do not take | Checked |
| **Sloyd** | One picture-to-3D a day | "Personal-use license". Exports are "community models only". | Too limited | Checked |
| **Meta SAM 3D** | Open | Permissive | Makes a different kind of file, not GLB | Checked |
| Stable Fast 3D, InstantMesh | Open models | Permissive for small users | Need a computer with a strong graphics card | Checked |
| CSM, Luma Genie | | | CSM's site was unreachable. Genie's page now leads to Luma's home page with no mention of it. | Not checked |

**What picture-to-3D does well:** solid objects with clear shapes. Crystal spires, statues, rocks, urns, a throne, a gate.

**What it does badly:**

- **Faces.** Soft and slightly melted up close. Eyes are painted on, not shaped.
- **Hands.** Fingers fuse into mittens.
- **Hair.** Long flowing hair becomes one solid lump, like carved wax.
- **Jewelry, chains, lace.** Thin things vanish or become bumps.
- **The back.** The tool invents what it cannot see, and it shows.
- **See-through things.** Glass and crystal come out solid and opaque. The sparkle has to be added back in code.
- **Size.** Raw models are far too heavy for a phone and must be slimmed down in a run.

## Tools for rigging

| Tool | Free plan | Catch | Checked? |
|---|---|---|---|
| **Adobe Mixamo** | Reported: free with an Adobe account, "royalty free for personal, commercial, and non-profit projects". You may not hand out the raw files. | Built for a computer browser. Gives a file type that needs converting. Humans only. | Reported, from Adobe's help page via search. The page itself blocked me. |
| **Reallusion AccuRIG** | "Free download" | A program for a computer | Checked |
| Rigging inside Meshy or Tripo | | Not on the free plans as far as I could tell | Not checked |
| Anything World | | Its pricing page moved to another site | Not checked |

**A rig may not be needed.** Your approved character style is "floor-length robes, gliding, no walk cycle". A character who glides does not need legs that move.

## Free libraries (the fallback you asked about)

| Library | License | What it is | Fits your bar? | Checked? |
|---|---|---|---|---|
| **Kenney** | CC0. "Attribution is not required." | Simple, blocky game pieces and sounds | No for art. Yes for small sounds. | Checked |
| **Quaternius** | **Its own license since Aug. 28, 2026, not CC0.** Free "in personal, educational, and commercial games". No credit needed. No reselling. | Low-detail characters and props, some with rigs | No. This is the look you rejected. | Checked |
| KayKit | Not stated on the page I read | Low-detail, toy-like | No | Not checked |
| **Poly Haven** | CC0 | Realistic rocks, plants, props and real-world skies, very high quality | Yes for rocks, plants and props, after slimming | Checked |
| **ambientCG** | CC0 | Surface pictures: marble, stone, metal | Yes, for surfaces | Checked |
| **Microsoft Rocketbox** | MIT | 115 rigged people, "relatively low-poly", in everyday modern clothes. Archived on Oct. 2, 2026. | No. Wrong clothes, dated look. | Checked |
| **MakeHuman** | The people it makes are CC0 | A program for a computer. Its news page lists "Community services shut down", Oct. 21, 2026. | Not from an iPhone | Checked |
| **Ready Player Me** | | Reported closed on Jan. 31, 2026, after Netflix bought it | Gone | Reported |
| **VRoid Studio** | "Free to use for anyone" | Anime-style characters. Windows, Mac and iPad, not iPhone. | No. Wrong style, wrong device. | Checked |
| MetaHuman, Sketchfab, Poly Pizza | | | | Not checked |

**Plainly:** no free library has ready-made characters that look like your references.

## Who does what

| You, on your iPhone | A model, in a cloud run |
|---|---|
| Ask the art tool for a picture, using the words in the style guide | Remove plain backgrounds |
| Choose the ones that meet your bar | Resize and compress to phone-friendly files |
| Send them into a session, the way you sent your references | Make depth maps |
| Judge the result on the preview link | Slim and convert 3D models |
| | Place the art in the scene and add gentle motion |
| | Record where each file came from |

**One thing you have never needed before: an art log.** Every art and sound file gets one line: which tool, which day, the words you used, the license and any credit owed. A CC BY file with no credit breaks its license. If Bloom is ever shared, this log is what makes that safe.

## Three routes

### Route 1: painted 2D

Every character is a painting. Every place is a set of painted layers that shift gently as the view moves.

1. You make a character painting on a plain background, front view.
2. You ask for the same character from behind, and a head-and-shoulders portrait.
3. A run cuts them out, shrinks them and sets them into the scene as standees. The portrait appears large in the speech panel.
4. You make a place as two or three paintings: sky and far city, middle buildings, near garden.
5. A run layers them, adds a depth map and adds code-made light, water, glow and drifting petals.

**Strength:** closest to your photos. Light on the phone. Works with tools that are truly free. **Weakness:** the view can only swing a little. No walking all the way around a building.

### Route 2: 3D models from pictures

1. You make a character painting, front view, arms slightly out.
2. You feed it to a picture-to-3D tool and download a GLB.
3. A run slims it and sets it in the scene.
4. If it must bend and walk, it also needs a rig, which today means a computer.

**Strength:** you can walk all the way around it. **Weakness:** faces, hair, hands and jewelry all degrade, the free tools are few and limited, and rigging has no confirmed free iPhone route.

### Hybrid: painted where you look, 3D where you walk

| Part of the world | Made as |
|---|---|
| Faces in conversation | **Painted portraits,** large, in the speech panel |
| Characters standing in the world | **Painted standees** that glide, with code-made motion |
| The inside of each place | **A painted hall** with depth, like looking through a doorway |
| Sky, moon, cloud sea, far islands, far city | **Painted backdrops** set far away, with a code-made sky behind |
| The ground you walk on, water, light, glow, petals | **3D and code,** as in the prototype |
| A few hero objects near you: the gate, a crystal spire, a statue | **3D models from pictures,** made with the open tools, no rig |

## My ranking

1. **Hybrid.** It puts painted art everywhere your eye rests and real 3D only under your feet and in a few solid objects, which is what picture-to-3D does well. It needs no rig and no computer, and it stays inside the performance budget with room to spare.
2. **Route 1 alone.** Nearly as good and simpler. I rank it second only because a few true 3D objects near you make the world feel solid.
3. **Route 2 alone.** It answers "lifelike" on paper and fails it in practice. The free tools are too limited, faces come out worst and there is no rigging route from your phone.

**The CC0 library fallback** stays a fallback for rocks, plants and surfaces only.

## The one way this ranking flips

If you decide a **full 360-degree camera everywhere** matters more than how close the art comes to your photos, painted layers stop working, because a painting has no back. Route 2 becomes necessary, with all its limits. That trade is decision 2 in file 9, and it is the most important call in this package.
