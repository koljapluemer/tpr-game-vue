# الكـُتشينـَة (?)

## Commands

- translation conversions:

```
cat translations.csv | python -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))' > translations.json
```

## Dev/Content

- some useful settings in `src/debugSettings.ts`

### Adding A Level

- add the images you want in `public/assets/items`, make sure they're `webp` and nicely named
- go to `data/affordances.ts` and add all new affordances you may need, name-wise (you probably need to interact with all 3 data structures)
- go to `data/items.ts`, make up some item names, then fill the items you want in the big thing
- go to `data/levelTemplates.ts`
    - first, make up a name
    - then, add the template definition (mostly spicy grid stuff) in the big data structure at the bottom
        - make sure the insane array nesting is fine
    - create a topic, with at least one array of one level template in progressions and one level in final 
- get the missing keys by playing, then right clicking the warn message in console and go 'copy object'
- paste this in `translation_scripts/missing_keys.txt`
- run `01_add_missing_keys_to_csv.py`
    - venv should be created, on root folder I guess
    - thinking about this, you could also guess the keys, but you better not be wrong
    - or write that glorious recursive function getting all possible keys for a level
- add translations to csv, use DeepL from German
- run `02_get_audio_for_csv.py`
- test


- if you need cards to disappear etc, adapt `affordanceBespokeUtils.ts`
- if you have fancy identifiers planned (e.g. eye color), go for `identifierUtils.ts`
- as of now there only quests generated that go specific-thing-verb-specific-thing, no `ANY__` — it's rather nice actually, but you may need to adapt that in `questUtils` and `alchemyUtils` (actions). you probably also need to changes types in `types.ts`
- write some tests, file is randomly under `components/__tests__`
