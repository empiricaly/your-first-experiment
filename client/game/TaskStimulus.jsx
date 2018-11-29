import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;

    window.round = round;

    const imagePath = round.get("imagePath");
    const questionText = round.get("questionText");

    return (
      <div className="task-stimulus">
        <div className="task-image">
          {imagePath == undefined ? (
            ""
          ) : (
            <img src={imagePath} height={"300px"} />
          )}
        </div>
        <div className="task-question">
          <b>Please answer the following question:</b>
          <br />
          {questionText}
        </div>
      </div>
    );
  }
}
