
# Dicewars Tweaks

## Introduction

This is an opinionated Google Chrome extension that expands the functionality
of [Game Design's Dicewars](https://www.gamedesign.jp/games/dicewars/) by fixing
perceived bugs or omissions, and adding features that I think are fun. See the
list of features below for details.

## Getting Started

Because of the browser's security model, this extension can only be installed
via the web store, or temporarily used via developer mode. Hence, running it
means enabling developer mode in the top right corner of `chrome://extensions`,
clicking `LOAD UNPACKED`, and selecting the folder you checked out this
repository into.

As of this writing, there is no public extension on the Chrome web store.

## Features

- Fixes the sound being muted because of Chrome's autoplay restrictions.
- Faster dice rolling animation on slow computers.
- CPU-only mode, so you can watch the AI fight itself.
- Fast-game mode, which skips AI vs AI dice rolls to reduce the time before
  your next turn. Also makes CPU-only games more bearable.
- A loading screen representative of the actual time spent loading.
- History replaying, so you can watch yourself win (or lose) again and again.

Have a look at the **CHANGELOG** for more information.

## Versioning

This project adheres to a variant of
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). As there is no API,
the rules are informally modified as follows:

1. The *major* field is incremented when the UI changes in a significant way.
2. The *minor* field is incremented when features are added.
3. The *patch* field is incremented when bugfixes are applied.

## Acknowledgements

Endless thanks to Game Design for creating such a fun game, and updating it to
HTML5 so that it can continue to be enjoyed in the future.
