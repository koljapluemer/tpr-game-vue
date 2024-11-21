# tpr-game-ts

## Commands

- translation conversions:

```
cat translations.csv | python -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))' > translations.json
```