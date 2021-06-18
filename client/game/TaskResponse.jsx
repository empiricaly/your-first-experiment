import React from "react";

export default class TaskResponse extends React.Component {
  handleChange = event => {
    const value = Number(event.currentTarget.value);
    const { player } = this.props;
    player.round.set("value", value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderInput() {
    const { player } = this.props;
    const value = player.round.get("value");
    return (
      <input
        type={"number"}
        min={1}
        onChange={this.handleChange}
        value={value}
        required
      />
    );
  }

  render() {
    const { player } = this.props;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form className="task-response-form" onSubmit={this.handleSubmit}>
          {this.renderInput()}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
