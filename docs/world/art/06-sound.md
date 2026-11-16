# 6. Sound: free music and soft effects

Nov 16, 2026 · for Dee · on paper only, no audio added

## Why the Sound switch seemed to do nothing

The prototype does contain two soft tones made in code. You heard nothing. The most likely reason, which I could not test: **an iPhone's ring/silent switch silences this kind of web sound.** Browser engineers describe it in their own bug reports, and they say a page can ask to be treated as "playback" from iOS 17, which makes it ignore the switch. I read that in search results, not on a phone, so treat it as a strong lead.

For now, as you asked, the switch is relabeled so it does not pretend to work. Real sound should be its own small run later, and its first job is to prove one tone plays on your phone with the switch in both positions.

## What sound the world needs

| Kind | Examples | Length |
|---|---|---|
| **Ambient music** | A slow, calm bed: soft pads, harp, glass bells, no drums | One or two loops of 1 to 2 minutes |
| **Place ambience** | Water, wind, faint chimes | A 20 to 30 second loop per mood |
| **Soft effects** | A glyph lighting, the gate opening, a coin, a tap, a step through the portal | Under 2 seconds each |

**Rules already agreed:** sound is off until you turn it on. Nothing in a task depends on hearing it. Rewards make sound only when a task ends.

## Free sources

"Checked" means I read the source's own page on Nov 16, 2026.

| Source | What it has | License, in plain words | Credit needed? | Catch | Checked? |
|---|---|---|---|---|---|
| **Pixabay** | Music and effects, large, searchable by mood | Free for "commercial or non-commercial purposes". You may not "sell or distribute the Content... on a Standalone basis". | No | Apps and games are not named either way. Playing a track inside Bloom is use, not handing out the file, but the page does not say so in those words. Some items carry extra rights. | Checked |
| **Freesound** | Huge library of effects and ambience | Each sound has its own license: CC0, CC BY or CC BY-NC | CC0: no. CC BY: yes. CC BY-NC: not for anything that earns money. | You must check each sound. Downloading needs a free account. **Filter to CC0 only.** | Checked |
| **Kenney** | Small packs: interface sounds, impacts | CC0, "even in commercial projects" | No | Plain, game-like sounds. Good for taps, less so for magic. | Checked |
| **Incompetech** (Kevin MacLeod) | A very large music catalog, including calm ambient | CC BY 4.0 | **Yes,** in this exact form: "Title Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0" | Needs a credits screen in Bloom | Checked |
| **Sonniss GDC bundles** | Professional effects | Free for "personal and commercial projects without attribution" | No | Each bundle is 9 to 48 GB. Not practical from a phone. | Checked |
| **Suno** (AI music), free plan | Music made to order | "Suno is the owner of the songs." Free users may use them for "non-commercial purposes" only. | Not stated | Personal use only, and you would not own it. **Avoid** if Bloom might ever be shared. | Checked |
| **ElevenLabs** (AI effects), free plan | About 50 effects a month | A commercial license starts on the paid plan | Not stated | Same problem as Suno | Checked, partly |
| **FreePD** | | | | "Permanently closed" | Checked |
| Mixkit | Music and effects | The license text did not load for me | | | Not checked |
| OpenGameArt, Zapsplat, BBC Sound Effects, Udio, Stable Audio | | | | Their pages blocked me or showed nothing | Not checked |
| YouTube Audio Library | | Its page covers use in YouTube videos. Use elsewhere is not addressed. | | Not meant for apps | Checked |
| **Sound made in code** | Chimes, soft swells, a gentle hum, water-like hiss | None needed. It is ours. | No | Pleasant but simple. It cannot be real music. Costs no download. | My own method |

## My recommendation

1. **Effects: made in code first.** The gate chime, glyph lights and taps are tiny, cost nothing to download and need no license. If they sound thin on your phone, replace them one at a time with CC0 sounds from Freesound or Kenney.
2. **Music: one calm loop from Pixabay,** chosen by you. No credit needed, and the license is the broadest of the checked sources. If you fall for a Kevin MacLeod piece, that works too, with the credit line on a credits screen.
3. **Ambience: CC0 loops from Freesound** for water and wind.
4. **No AI music.** The free plans keep ownership or forbid anything beyond personal use.
5. **Every file gets a line in the art log:** source, date, license, credit.

## How you would choose, on your phone

1. Open the source's website in Safari.
2. Search mood words: *ambient, ethereal, celestial, calm, meditation, harp, bells, no drums*.
3. Listen with your eyes closed and picture the Gate Court. Skip anything with a strong beat or melody that would tire you by the tenth loop.
4. Note the page address of the two or three you like.
5. Send the addresses in a session. A run checks each license, downloads, trims, loops and shrinks them, and writes the log lines.

## Impact on the app (estimated)

| Item | Size | Note |
|---|---|---|
| One music loop, 90 seconds | about 1 MB | Loaded only after you turn sound on |
| One ambience loop, 30 seconds | about 0.3 MB | Per mood, loaded with the place |
| All soft effects, if they are files | about 0.2 MB | Or zero if made in code |

- **File type:** M4A or MP3. A common free-music type, Ogg, is fully supported only from iOS 18.4 (checked on caniuse), so a run would convert.
- **Starting:** an iPhone only lets a page make sound after you tap. The Sound switch is that tap.
- **Pausing:** sound stops the moment you leave the app and fades back in when you return.
- **Looping:** some file types leave a tiny gap when they repeat. A run tests the loop and cross-fades if needed.
- **Two sliders, later:** music and effects, so you can keep chimes and drop music.

## A build order for later, one purpose each

1. Prove one tone plays on your iPhone, ring/silent switch on and off.
2. Effects in code for the gate, glyphs and coins.
3. One music loop, off by default, with a volume slider.
4. Place ambience.

## What only your phone can settle

- Whether the ring/silent switch really was the cause.
- Whether code-made chimes sound good or thin through the phone speaker.
- Whether a loop stays pleasant after ten minutes.
