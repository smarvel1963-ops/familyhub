# Family Hub
Save path: C:/MarvelApps/familyhub/README.md

Live (once pushed): https://smarvel1963-ops.github.io/familyhub/ - app #9 of the Marvel Corp Hub family (Scott 2026-10-25,
plan: C:/MarvelDesktop/docs/FAMILY_HUB_PLAN_FROM_OUTSIDE_CHAT_2026-10-25.md; 11/07 boards + "these are CORE" + "Phase B: all phones").

This repo is Family Hub's OWN shell: index.html, manifest.json, icons, art/, sw.js and privacy.html. The app itself is the shared Hub
engine in the Day Hub repo, run with window.DH_MODE = "family" plus family.js, familymsg.js, familytree.js, familyphotos.js,
familylife.js, familysync.js and family.css (Family's look, loaded only here).

- Own data on the phone (familyhub.v1); photos, profile photos and document pictures in IndexedDB (familyhub.photos).
- Phase A (engine 1.59): Scott's board 1 look; tabs Today | Messages | Calendar | Family | More; messages and check-ins; Month / Week /
  Today calendar with reminders; family tree, profiles and "who sees what"; photos and memories; meals, school, documents, pets, goals,
  trips; chores and allowances; lists; emergency card; Grandparent Mode; the 30-day trial clock ($25 once after - Scott 11/07).
- Phase B: sharing between phones on Firebase (project day-hub-510322, Spark): ../dayhub/familysync.js. Rules:
  C:/MarvelApps/docs/hub_improvement/familyhub/firestore.rules (published 11/07, tested first: rules_test/).
- Roles (owner / adult / child / guest): fhCan() in family.js; who sees what: fhAudOk / fhSees. Kids are profiles a parent manages:
  no kid logins, no location, no medical records.
- art/: made on OpenArt for this look (no text, people, faces, logos or real places); masters on D:\MarvelBackups\art\familyhub_2026-11-07,
  cut by C:/MarvelApps/docs/hub_improvement/make_hub_art.py familyhub.
- Release order: push THIS repo first (and turn on GitHub Pages), then the Day Hub repo, then Hub Universe.
- Tests: the Day Hub repo (python tests/run_tests.py, tests/test_family_v2.py, tests/test_family_sync.py; on Firebase's emulator:
  docs/hub_improvement/familyhub/rules_test/run_sync_emu.ps1).
