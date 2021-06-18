import Empirica from "meteor/empirica:core";
import { choice } from "./randomFunctions";

const botLanguage = [
  "Hi",
  "That's a good question!",
  "What do you think the correct answer is?",
  "This experiment is fun",
  "I also do human things"
]

// This is where you add bots, like Bob:

Empirica.bot("bob", {
  // // NOT SUPPORTED Called at the beginning of each stage (after onRoundStart/onStageStart)
  // onStageStart(bot, game, round, stage, players) {},

  // Called during each stage at tick interval (~1s at the moment)
  onStageTick(bot, game, round, stage, secondsRemaining) {

    // Have the bot always submit their stage
    if (!bot.stage.submitted) {
      bot.stage.submit()
    }

    // if this is a social stage... 
    if (stage.name === "social") {
      // get the mean of the values of the other players and set it to the bot
      if (!bot.round.get("value")) {
        const nonBotPlayers = game.players.filter(p => p.bot === undefined)
        const sumValues = nonBotPlayers
          .map(p => Number(p.round.get("value")))
          .reduce((total, item) => (total += item), 0)

        const mean = Math.round(sumValues / nonBotPlayers.length)

        bot.round.set("value", mean)
      }

      // send a random message every 20s
      if (game.treatment.chat && secondsRemaining % 20 === 0) {
        const chat = round.get("chat") ?? []

        chat.push({
          text: choice(botLanguage),
          player: {
            _id: bot._id,
            avatar: bot.get("avatar"),
            name: bot.bot
          }
        })

        round.set("chat", chat)
      }
    }
  }

  // // NOT SUPPORTED A player has changed a value
  // // This might happen a lot!
  // onStagePlayerChange(bot, game, round, stage, players, player) {}

  // // NOT SUPPORTED Called at the end of the stage (after it finished, before onStageEnd/onRoundEnd is called)
  // onStageEnd(bot, game, round, stage, players) {}
});
