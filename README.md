# Family Hub
Save path: C:/MarvelApps/familyhub/README.md

Live (once pushed): https://smarvel1963-ops.github.io/familyhub/ - app #9 of the Marvel Corp Hub family (Scott 2026-10-25,
plan: C:/MarvelDesktop/docs/FAMILY_HUB_PLAN_FROM_OUTSIDE_CHAT_2026-10-25.md).

This repo is Family Hub's OWN shell: index.html, manifest.json, icons, sw.js and privacy.html. The app itself is the
shared Hub engine in the Day Hub repo, run with window.DH_MODE = "family" plus family.js.

- Own data on the phone (familyhub.v1).
- v1 (engine 1.59), the notes' V1 "Foundation" on one phone:
  - Family Orbit home
  - color-coded calendar with repeats and "adults only" events
  - chores with parent OKs, stars and allowances (pay-outs logged)
  - shopping lists and the family to-do board
  - emergency card, birthdays, Grandparent Mode
  - "Who's using this phone?" with a parent PIN
- Roles (owner / adult / child / guest) are checked by `fhCan()` in family.js for every screen and every action.
  - Kids are profiles a parent manages: no kid logins, no kid emails, no location, no medical records.
- Sharing between phones = the FAMILY_SYNC switch in ../dayhub/features.js, OFF.
  - It is planned on Firebase's free Spark plan (Scott 10/25 "A").
  - privacy.html must describe exactly what it sends BEFORE it is turned on.
- Icons come from the Hub series concept logo (../dayhub/brand/hub_series_20_logos_2026-10-11/family_hub_logo.png, 256 px, scaled up).
- Release order matters. Push this repo first. Then, in the Day Hub repo:
  - drop `soon: true` from the familyhub row in ui.js HUBS;
  - add the UNI_HUBS row in universe.js and take Family Hub off UNI_SOON;
  - add `../dayhub/family.js` to hubuniverse/index.html (before universe.js).
- Tests + release steps: the Day Hub repo (python tests/run_tests.py).
