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
  // Establish node list
  console.log(game);

  const nodes = [];
  for (var i = game.players.length; i--; i > 0) nodes.push(i);

  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);

    // Give each player a nodeId
    player.set("nodeId", i);

    // Assign each node as a neighbor with probability 0.5
    const networkNeighbors = _.filter(nodes, function(num) {
      return _.random(1) == 1;
    });
    player.set("neighbors", networkNeighbors);
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
