import React from "react";
import Slider from "meteor/empirica:slider";
import { Chat } from "@empirica/chat";

export default class SocialExposure extends React.Component {
  renderSocialInteraction(otherPlayer) {
    // Get the value or return NA if no value was entered
    const value = otherPlayer.round.get("value") ?? "NA";
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar" />
        Guess: {value}
      </div>
    );
  }

  render() {
    const { game, player, round } = this.props;

    const otherPlayers = game.players.filter(p =>
      player.get("neighbors").includes(p.get("nodeId"))
    );

    if (otherPlayers.length === 0) {
      return null;
    }

    return (
      <div className="social-exposure">
        <h3 className="title">Social Information</h3>
        <p className="title">
          {
            otherPlayers.length > 1
              ? <strong>There are {otherPlayers.length} other players:</strong>
              : <strong>There is one other player:</strong>
          }
        </p>
        {otherPlayers.map(p => this.renderSocialInteraction(p))}
        {game.treatment.chat &&
          <div>
            <p className="chat-title"><strong>Chat</strong></p>
            <Chat player={player} scope={round} />
          </div>
        }
      </div>
    );
  }
}
