# Poker Game Composer

### Overview
This repository contains a node application which is capable of managing the structural information for various poker games. This application is also capable of rendering the games in a 'card' which can visually depict how to play the variant.

### Getting Started
These are basic steps to get the app up and running.

1. Download or clone this repo
2. Install `npm`
3. `npm install`
4. `npm run-script build`
5. `npm run-script server`
6. In a browser, navigate to [http://localhost:3385](http://localhost:3385)

### Game Data
The game data is stored as JSON files, 1 per game. Each file contains a representation of the structural elements of the game, as well as metadata with some supporting info. 

**The structure of these JSON files is subject to change.** The existing structure lacks necessary components to describe some lesser known, more complicated poker game variants (e.g. Banco), so it's probably better to say it's guarenteed to change.

### Notice
This is prototype software. It provides only a basic user experience, contains potentially catastrophic bugs, and has missing functionality. Do not rely on it.