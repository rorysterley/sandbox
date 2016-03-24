'use strict';

var fullScreen = require('./lib/full_screen');

var game = new Phaser.Game(400, 300, Phaser.AUTO, 'game',
  { preload: preload, create: create, update: update });

function preload() {
}

function create() {
  fullScreen(game, 'EXACT_FIT');
}

function update() {
}
