import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;

    const imagePath = "/experiment/images/candies.jpg";
    const questionText = "How many candies are in the jar?";
    return (
      <div className="task-stimulus">
        <div className="task-image">
          <img src={imagePath} height={"300px"} />
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