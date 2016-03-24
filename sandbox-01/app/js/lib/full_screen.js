'use strict';

/**
  * fullScreen:
  * @param game [Object] The Phaser game object
  * @param mode [String]  Optional: 'EXACT_FIT', 'NO_SCALE'. If omited: SHOW_ALL
  */
function fullScreen(game, mode) {
  function gofull() {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen();
    } else {
      game.scale.startFullScreen(false);
    }
  }

  if (mode === 'EXACT_FIT') {
    // Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  } else if (mode === 'NO_SCALE') {
    // Keep original size
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
  } else {
    // Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  game.input.onDown.add(gofull, this); // jshint ignore:line
}

module.exports = fullScreen;
