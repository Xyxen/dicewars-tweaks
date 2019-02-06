# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- Added the ability to speed up games by skipping dice roll animations for AI
  vs AI battles. This can be controlled via a toggle button on the map
  selection screen.
- Added a "back to title" button to the map selection screen.

## Fixed
- Fixed an issue where starting a standard game after watching a CPU-only match
  would result in playing as the winner of the CPU match, rather than purple.
- Fixed extension not working on HTTPS.

## 1.0.0 - 2018-05-23
### Added
- Restored sound on Chrome by resuming the sound context on the first available
  user-generated event.
- Sped up battles on slow computers by skipping frames on the dice rolling
  animation when the canvas can't keep up with the target framerate (60FPS)
  that the game expects.
- Added a toggle button on the main menu that lets you run CPU-only matches.
  Watch the AI fight it out.
- Replaced the default (fake) loading screen with one that responds to actual
  resource initialization events.
