# Connect 4 extension
The Simplest connect 4 Extension for twitch.

## Motivation
This project is created under 30 days as part of my completed apprenticeship. The goal is to make an minigame and deploy the minigame on twitch under 30 days. It'll act as an learning experience for my future extensions. 

__The extension is broken into two main components:__

1. The panel of the Extension, comprised of HTML files and a js bundle file. The panel has the following functionality:
    * connect 4 board that are using Createjs's easeljs to create the UI part.
    * A call to the web worker.
    * Connect 4 logic to handle how the board is going to look like when clicked.
2. A web worker that performs the following functionality:
    * perform minimax with alpha beta pruning AI
    * return the call back to the panel.

## Using the Sample
The recommended path to using this sample is with the [Developer Rig](https://github.com/twitchdev/developer-rig).

The Developer Rig is able to host the files. But it's recommend to use `npm install` and then `npm run build` to generate webpack configuration and generate the bundle.
