# Processing src/data/add.json

These are instructions for Claude Code to follow when asked to "process add.json."
`add.json` is a staging file for new songs (same shape as `dance.json`) that are
missing some metadata. The goal is to fill in what can be confidently found online,
then merge the entries into `dance.json`.

## Fields

Each song entry has these fields:

```json
{
  "artist": "",
  "album": "",
  "song": "",
  "genre": [],
  "who": [],
  "languages": [],
  "lyrics": "",
  "notes": "",
  "spotify": "",
  "appleMusic": "",
  "youtube": "",
  "bpm": 0
}
```

**Fields to fill in if missing:** `genre`, `languages`, `spotify`, `appleMusic`,
`youtube`, `bpm`.

**Fields to never touch:** `who`, `notes`, `lyrics`. Leave them exactly as they
are, even if empty.

## Step 1: Process songs in batches of three

Work through `add.json` in order, three songs at a time (fewer if less than
three remain in the batch). For each song in the batch:

1. For each of the six fillable fields that is currently empty (`""`, `0`, or an
   empty/blank-string array), search the internet to find the correct value.
   **Never guess or infer from general knowledge** — only use what you find via
   search. Base searches only on `artist`, `album`, and `song` — ignore `who`,
   `notes`, and `lyrics` entirely when forming search queries (they're personal
   notes, not useful search criteria).
2. **Genre and languages can hold multiple values.** Add more than one tag only
   when multiple sources clearly agree. Before adding a new genre tag, check
   whether one of the genre tags already used in `dance.json` is a good match —
   reuse the existing tag rather than introducing a near-duplicate (e.g. prefer
   `"electropop"` over inventing `"electro pop"` if `dance.json` already uses
   `"electropop"`). As of now `dance.json` uses tags including: afro-pop,
   afropop, bachata, bhangra, blues-rock, bollywood, boogaloo, celtic, country,
   cumbia, dance-pop, dancehall, deep-house, dembow, electro-house,
   electro-latino, electro-pop, electropop, folk, folk-pop, french-pop, funk,
   funk-carioca, hip-hop, indie-pop, indie-rock, j-pop, jazz, k-pop, latin-pop,
   latin-trap, latin-urban, merengue, mizrahi, neo-soul, pop, pop-rock, r&b,
   reggae-pop, reggaeton, rock-and-roll, salsa, soca, soul, synth-pop, trap-pop,
   tropical. Treat this as a helpful starting point, not an exhaustive or frozen
   list — re-check `dance.json` itself if it's been a while, and it's fine to
   add a genuinely new tag when nothing existing fits. Likewise check existing
   `languages` values (e.g. bengali, english, french, hebrew, hindi, japanese,
   korean, lingala, n/a, portuguese, punjabi, spanish, thai) and reuse spelling/
   casing conventions.
3. **bpm** should be written as a plain number (not a string), matching the
   convention in `dance.json`.
4. **Three tries per field:** for each individual field, try up to three
   distinct searches or sources (e.g. the Spotify track page, Apple Music page,
   a lyrics/genre site like Genius or AllMusic, a BPM site like
   SongBPM/Tunebat, etc.). If after three distinct attempts you still don't
   have a confident answer, leave that field as it was (empty) and move on.
   Don't spend more than three tries per field.
5. **Write to `add.json` immediately after finishing each batch of three** (not
   song-by-song, and not at the end of the whole file). This way progress is
   saved incrementally and nothing is lost if the process is interrupted.
6. Briefly tell the user what was found/skipped for each song before moving to
   the next batch of three.

Continue batch by batch until every entry in `add.json` has been processed.

## Step 2: Review

Once all entries in `add.json` have been processed, stop and let the user
review `add.json` themselves. Don't proceed to Step 3 until they say it's okay.

## Step 3: Merge into dance.json

After the user confirms `add.json` looks good:

1. Ask explicitly: "Okay to add these entries to dance.json?" Don't merge
   without an explicit yes.
2. For each entry in `add.json`, insert it into `dance.json` in the correct
   alphabetical position by the `song` field, preserving the existing sort
   order/convention already used in `dance.json` (use the surrounding entries
   to judge the correct insertion point — e.g. how punctuation, leading digits,
   and accented characters are currently ordered — rather than recomputing a
   strict sort from scratch and potentially reshuffling unrelated entries).
3. Use the standard field order already used by most entries in `dance.json`:
   `artist`, `album`, `song`, `genre`, `who`, `languages`, `lyrics`, `notes`,
   `spotify`, `appleMusic`, `youtube`, `bpm`.
4. Confirm with the user once the merge is done.

## Step 4: Validate dance.json

After merging, check `dance.json` and report findings to the user:

1. **JSON format errors** — confirm the file still parses as valid JSON.
2. **Likely duplicate genres** — flag genre tags that look like near-duplicates
   of each other (e.g. `"electro-pop"` vs `"electropop"`, `"afro-pop"` vs
   `"afropop"`) so the user can decide whether to consolidate them. This is a
   report only — don't change the tags without the user's say-so.
3. **Missing `who`** — list any song entries where `who` is missing or only
   contains an empty string. (It's fine for other fields — genre, languages,
   spotify, appleMusic, youtube, bpm — to be blank; only `who` is being
   checked here.)
4. **bpm type** — flag any entry where `bpm` is not a plain number (e.g. it's
   a string, empty string, or missing).

## Step 5: Offer to clear add.json

Ask the user: "Do you want to clear add.json now that its entries are in
dance.json?" Don't clear it without an explicit yes.

If the user says yes, replace the contents of `add.json` with an array of two
completely blank entries, matching this shape:

```json
[
  {
    "artist": "",
    "album": "",
    "song": "",
    "genre": [""],
    "who": [""],
    "languages": [""],
    "lyrics": "",
    "notes": "",
    "spotify": "",
    "appleMusic": "",
    "youtube": "",
    "bpm": ""
  },
  {
    "artist": "",
    "album": "",
    "song": "",
    "genre": [""],
    "who": [""],
    "languages": [""],
    "lyrics": "",
    "notes": "",
    "spotify": "",
    "appleMusic": "",
    "youtube": "",
    "bpm": ""
  }
]
```

If the user says no, leave `add.json` as-is (entries are not removed).
