# Changelog

All notable changes to IronLog are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [4.6.1] — 2026-03-16

### Fixed
- **Exercise remove confirmation missing from logger:** The ✕ button on individual exercise cards in the logger was calling `remEx` directly without any confirmation, inconsistent with the session-level delete modal added in v4.6.0. Tapping ✕ now shows an inline confirmation inside the exercise card — "Remove [exercise name] from this session?" with Cancel and Yes, Remove buttons. Implemented as inline UI rather than a full-screen overlay to keep the interaction local to the card.

---

## [4.6.0] — 2026-03-14

### Added
- **Delete confirmation modal (Change 1):** Tapping × on a session card in History now opens a centred modal showing the session name, a reminder that the session moves to Deleted Sessions for 30 days, and two buttons — "Cancel" and "Yes, Delete". Backdrop tap also dismisses. Prevents accidental deletions.
- **Rename individual exercises (Change 2):** Each exercise card in the logger (both new session and edit mode) now shows a small ✏️ pencil icon next to the exercise name. Tapping it replaces the name with an inline input, auto-focused, pre-filled with the current name. Enter or blur commits if non-empty. Empty name shows an inline red validation hint "Exercise name can't be empty" and keeps the input open. Escape reverts to the original name. Rename flows through the existing save handler naturally.
- **Expand deleted sessions inline (Change 3):** Deleted session cards in the Deleted Sessions section now have a ▼ chevron and are tappable to expand inline. Expanded view shows the full `SessionDetail` — all exercises, sets, reps, weights, RIR, RPE, and session notes — consistent with how History list cards expand. Restore and Delete Forever buttons remain at the bottom of each card.

---

## [4.5.0] — 2026-03-08

### Fixed
- **Dashboard nudge showing wrong day:** "You trained today 🔥" was appearing when the user had actually trained the previous calendar day. The bug was caused by comparing raw millisecond elapsed time (dividing by 86,400,000 and flooring) rather than calendar dates. Training at 11:30 PM and checking the dashboard at 8 AM the next morning produces only ~8.5 hours elapsed — which floors to 0, incorrectly matching "today". Fixed by stripping both timestamps to midnight before comparing, so the result always reflects calendar days regardless of time-of-day.

---

## [4.4.0] — 2026-03-08

### Changed
- **New logo — C4 wordmark design:** Replaced the 🔩 emoji + plain text logo with a refined text-only wordmark. "IRON" in white Black Ops One typeface, "LOG" in amber, with a left-anchored amber gradient underline beneath. Black Ops One font loaded via Google Fonts in `index.html`.

---

## [4.3.0] — 2026-03-08

### Fixed
- **Quick successive deletes losing sessions:** Deleting two sessions in quick succession caused only the last-deleted session to appear in Deleted Sessions — the first was silently lost. Root cause was a stale closure inside `delSession`: both undo timers captured the same empty `deletedSessions` array at call time, so when they fired after 5 seconds each wrote `[session]` independently, with the second overwriting the first. Fixed by using functional state updaters (`setDeletedSessions(prev => ...)`) inside `doCommit` and `doUndo` so they always read current state at the time the timer fires, not the captured value.
- **Restored sessions appearing at wrong position in History:** Restoring a deleted session always placed it at the top of the list regardless of its original date. Fixed by sorting the restored sessions array by date descending after insertion, consistent with how the rest of the list is ordered.

---

## [4.2.0] — 2026-03-08

### Fixed
- **Critical crash: white screen when adding an exercise to a session.** Three helper functions were referenced by incorrect names in the WorkoutLogger render and in the session save handler — `getLastPerformance` (correct: `getLastExData`), `suggestWeight` (correct: `nextWeight`), and `checkNewPRs` (correct: `detectNewPRs`). All three caused `ReferenceError` crashes at runtime. The progressive overload suggestions, PR detection on save, and exercise logging were all broken as a result. This has been present since v4.0.0 but only became visible once the correct build was deployed to Netlify.

---

## [4.1.0] — 2026-03-08

### Fixed
- Expanded session card in History List view now collapses automatically when navigating away to another tab — previously the expanded state persisted across tab switches

### Added
- **Draft auto-save (Option A):** Logger state is continuously written to `il_draft` in localStorage as the user types. On next app open, if an unsaved session is detected, a recovery banner appears at the top of the Log tab showing the workout name, exercise count, and last-saved timestamp. User can restore or discard. Draft is cleared on successful save.
- **Browser close warning (Option B):** If exercises have been entered and the user tries to close the browser tab or navigate away entirely, a native browser confirmation dialog is shown. Note: iOS Safari may suppress this dialog — Option A covers those cases.
- **Logger state survives tab switching (Option C):** Logger mode, exercise list, session name, and notes are now held in root state. Tapping away to another tab mid-session and returning to Log preserves everything exactly as left.

---

## [4.0.0] — 2026-03-08

### Added
- **Dashboard navigation:** Total Sessions card navigates to History → List → All filter. This Week card navigates to History → Calendar → Week view. Recent session rows are tappable and open the selected session pre-expanded in History List view.
- **Soft delete with undo:** Deleting a session from History shows a 5-second undo toast. After expiry, session moves to `il_deleted` storage with a timestamp rather than being permanently removed.
- **Deleted Sessions section:** Collapsible section at the bottom of History tab showing soft-deleted sessions with days-until-expiry indicator. Per-item Restore and Delete Forever (with inline confirmation). Sessions auto-purge after 30 days on app load.
- **Edit saved sessions:** Pencil icon on every History list card opens the logger pre-filled with that session's data. Save Changes overwrites the original by ID.
- **Session notes:** Free-text notes field added to the logger. Preview shown in collapsed History list cards; full text shown in expanded detail view.
- **Custom exercises saved to library:** Typing a custom exercise name and tapping Add reveals an inline muscle group picker. On confirm, the exercise is saved to `il_custom_ex` and appears across all future sessions with a purple "custom" badge.
- **Personal Records tracking:** Every session save scans for new Epley estimated 1RM records by exercise. New PRs fire a toast notification. Top 5 PRs displayed on Dashboard.
- **Progressive overload suggestions:** When an exercise is added to the logger, the app looks up the last logged performance and shows a dismissible suggestion chip (e.g. "Last: 80kg × 8 → try 82.5kg"). Compound lifts use 2.5kg increments, isolation lifts use 1kg.
- **Dashboard stats:** Current and longest training streaks, total all-time volume, this week vs last week session count, most trained muscle group, days-since-last-workout nudge after 2+ rest days.
- **Import / Export / QR:** History header now includes JSON export, CSV export, QR code export (last 30 days, via api.qrserver.com), and JSON file import with union-by-ID merge to prevent duplicates.

### Changed
- Dashboard replaced static placeholder stats with live computed data from session history.
- `main.jsx` updated to import from `./App` instead of `./IronLog`. Stale `IronLog.jsx` removed from `src/`.

### Storage keys added
- `il_deleted` — soft-deleted sessions with `deletedAt` timestamp
- `il_custom_ex` — user-defined exercises with name, category, and metadata
- `il_prs` — personal records keyed by exercise name with weight, reps, e1RM, and date
- `il_draft` — in-progress logger session for crash recovery

---

## [3.0.0] — 2026-03-07

### Added
- **Calendar views:** History tab now has a List / Calendar toggle. Calendar offers Day, Week, Month, and Year views.
- **Heatmap:** Amber intensity heatmap across all calendar views based on session volume. Today outlined in green.
- **Session detail popovers:** Tapping any trained day in calendar views opens a workout detail panel (inline for Day, popover for Week/Month, bottom sheet for Year).
- **Workout detail component:** Shared `SessionDetail` component used across all views showing exercises, sets, weight × reps, RIR, and RPE.
- **Export:** JSON and CSV export buttons added to History header.
- **PWA:** App configured as a Progressive Web App with offline support via vite-plugin-pwa. Installable to home screen on iOS and Android.

### Changed
- History tab redesigned with List/Calendar mode toggle.
- Session cards in List view now expand inline to show full workout detail.

---

## [2.0.0] — 2026-03-06

### Added
- **10 science-based programs:** Tennis Foundation (2x), Tennis Performance (4x), Tennis Elite (6x PPL), Nippard Essentials (2x and 3x), Nippard Upper/Lower (4x), Athlean-X Combination (5x), RP Hypertrophy (4x), Calisthenics Foundation (3x).
- **Program browser:** Filter by category and days/week. Program recommendation engine based on availability and goal.
- **Program detail view:** Full workout breakdown with exercise targets, sets, reps, RIR, RPE, rest periods, and coaching notes.
- **RIR integration:** RIR (Reps in Reserve) displayed as the primary intensity metric throughout the logger and program views, with RPE shown as secondary.
- **Rest timer:** Inline rest timer in the logger with presets (60s, 90s, 120s, 180s) and a fixed floating display. Skip button.
- **Nutrition tab:** Macro calculator based on Jeff Nippard's Pure Bodybuilding Nutrition principles. Bulk / Maintenance / Cut phases with protein, fat, and carb targets computed from bodyweight. Supplement guide and key principles.
- **226 exercises** across chest, back, shoulders, legs, glutes, arms, core, athletic, and calisthenics categories.

### Changed
- Logger updated to support program workout loading — selecting a program workout pre-populates exercises, sets, targets, and coaching notes.
- Home tab updated to show active program card with direct link to Log.

---

## [1.0.0] — 2026-03-05

### Added
- Initial release.
- **Workout logger:** Free-form session logging with exercise search by category, custom exercise entry, set/rep/weight/RIR/RPE tracking per set, set completion toggle.
- **History tab:** Chronological list of saved sessions with expandable detail view. Filter by All / Program / Free.
- **Dashboard:** Total sessions, this week count, active program indicator, recent sessions list, quick action buttons.
- **localStorage persistence:** All session data stored locally under `il_sessions`. No account or server required.
- **Responsive layout:** Mobile-first design, works in browser and as installed PWA.

---

## [4.7.0] — 2026-03-23

### Added
- **Exercise library expanded to 1,022 exercises (Change 7):** Merged a hand-curated list of 372 exercises with the full yuhonas/free-exercise-db public domain dataset (873 exercises). After deduplication, the library covers 9 muscle group categories (chest, back, shoulders, legs, glutes, arms, core, athletic, calisthenics) with consistent equipment and category tagging.
- **Exercise instructions (Change 7):** 731 exercises now include step-by-step how-to instructions sourced from the free-exercise-db dataset. Instructions include exercise level (beginner/intermediate/expert).
- **ⓘ instruction modal in exercise picker (Change 7A):** A circular ⓘ button appears next to any exercise in the search/category picker that has instructions. Tapping it opens a bottom-sheet modal showing numbered steps and the exercise level. Tapping the backdrop or Close dismisses it.
- **Inline instruction expand in active session (Change 7B):** Each exercise card in the active logger shows a "how to ▾" link if instructions exist. Tapping expands an inline panel below the exercise name with numbered steps. Tap "hide how-to" to collapse. Stays in context while logging sets.
- **lb/kg unit toggle (Change 3):** A pill button in the app header switches between lb and kg. Preference is persisted to `il_unit` in localStorage. All weight displays throughout the app (logger, history, dashboard, PRs, calendar, session detail) update instantly. Canonical storage unit is lb — conversion to kg applies at display time only with no data mutation.
- **Previous session sets modal (Change 4):** The progressive overload suggestion chip now includes a "see all sets" link. Tapping it opens a bottom-sheet modal showing every set from the last time that exercise was logged, including weight, reps, RIR, and RPE. Respects the current lb/kg unit setting.
- **Cancel session button + confirmation (Change 6):** A "✕ Cancel Session" button appears below the Save Session button once exercises have been added. Tapping shows a confirmation modal ("Your progress will not be saved") with Keep Going / Yes Cancel options. Confirming clears the draft, resets logger state, and navigates to the Dashboard.

### Fixed
- **Blank white screen after discarding draft (Change 5):** When a user tapped "Discard" on the unsaved session banner, the app rendered a blank screen. Root cause: the auto-save effect immediately wrote a new blank draft, which triggered a re-render loop leaving the logger in an invalid state. Fixed by (a) guarding the auto-save effect to not write when mode is null and session is empty, and (b) explicitly resetting all logger state (mode, exercises, name, sessionNotes, selW) on discard.

### Changed
- All "kg" unit labels throughout the app now respect the selected unit preference.
- CSV export column header remains `weight_kg` for data integrity (values are stored in lb, header preserved for schema compatibility).
