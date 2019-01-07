import Empirica from "meteor/empirica:core";

import "./callbacks.js";
import "./bots.js";

import { taskData } from "./constants";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {
  // Establish player list
  const playerIds = _.map(game.players, player => player._id);

  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);

    // Randomly select three players to observe
    const otherPlayers = _.without(playerIds, player._id);
    player.set("neighbors", _.sample(otherPlayers, 3));
  });

  _.each(taskData, (task, taskName) => {
    const round = game.addRound({
      data: {
        taskName: taskName,
        questionText: task.questionText,
        imagePath: task.path,
        correctAnswer: task.correctAnswer
      }
    });

    round.addStage({
      name: "response",
      displayName: "Response",
      durationInSeconds: game.treatment.stageLength
    });
    round.addStage({
      name: "social",
      displayName: "Social Information",
      durationInSeconds: game.treatment.stageLength
    });
  });
});
