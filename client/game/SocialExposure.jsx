import React from "react";
import Slider from "meteor/empirica:slider";

export default class SocialExposure extends React.Component {
  renderSocialInteraction(otherPlayer) {
    const value = otherPlayer.round.get("value");
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar" />
        Guess: {value}
      </div>
    );
  }

  render() {
    const { game, player } = this.props;
		
    const otherPlayers = _.filter(
      game.players,
      otherPlayer =>
        player.get("neighbors").includes(otherPlayer._id)
    );

    if (otherPlayers.length === 0) {
      return null;
    }

    return (
      <div className="social-exposure">
        <p>
          <strong>There are {otherPlayers.length} other players:</strong>
        </p>
        {!_.isEmpty(otherPlayers)
          ? otherPlayers.map(p => this.renderSocialInteraction(p))
          : ""}
      </div>
    );
  }
}
