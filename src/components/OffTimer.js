import React from "react";
import "../styles/css/timer.css";

class OffTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counterLength: 600,
      sessionLength: 25,
      breakLength: 5,
      timeLeft: "25:00",
      minutes: 25,
      seconds: 0,
      timerStatus: "",
      timerType: "Session",
      disableInput: false,
      showMessage: false,
    };

    this.timerControl = this.timerControl.bind(this);
    this.reset = this.reset.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.addZero = this.addZero.bind(this);
    this.breakStart = this.breakStart.bind(this);
    this.sessionStart = this.sessionStart.bind(this);
    this.breakCounter = this.breakCounter.bind(this);
    this.breakInput = this.breakInput.bind(this);
    this.sessionInput = this.sessionInput.bind(this);
  }

  breakDecrement() {
    if (
      this.state.timerStatus === "running" ||
      this.state.timerStatus === "paused"
    ) {
      return;
    }
    const { breakLength } = this.state;
    let newBreakLength = breakLength - 1;
    if (breakLength > 1) {
      this.setState({
        breakLength: newBreakLength,
      });
    }
  }

  breakIncrement() {
    if (
      this.state.timerStatus === "running" ||
      this.state.timerStatus === "paused"
    ) {
      return;
    }
    const { breakLength } = this.state;
    let newBreakLength = breakLength + 1;
    if (breakLength < 60) {
      this.setState({
        breakLength: newBreakLength,
      });
    }
  }

  breakInput(e) {
    if (e.target.value < 60 && e.target.value >= 1) {
      this.setState({
        breakLength: parseInt(e.target.value),
      });
    }
  }

  sessionDecrement() {
    if (
      this.state.timerStatus === "running" ||
      this.state.timerStatus === "paused"
    ) {
      return;
    }
    const { sessionLength, minutes } = this.state;
    let newSessionLength = sessionLength - 1;
    if (sessionLength > 1) {
      this.setState({
        sessionLength: newSessionLength,
        minutes: newSessionLength,
      });
    }
  }

  sessionIncrement() {
    if (
      this.state.timerStatus === "running" ||
      this.state.timerStatus === "paused"
    ) {
      return;
    }
    const { sessionLength, minutes } = this.state;
    let newSessionLength = sessionLength + 1;
    if (sessionLength < 60) {
      this.setState({
        sessionLength: newSessionLength,
        minutes: newSessionLength,
      });
    }
  }

  sessionInput(e) {
    if (e.target.value < 60 && e.target.value >= 1) {
      this.setState({
        sessionLength: parseInt(e.target.value),
        minutes: parseInt(e.target.value),
      });
    }
  }

  timerControl() {
    if (this.state.timerStatus === "running") {
      clearInterval(this.timer);
      clearInterval(this.breakTimer);
      this.setState({
        timerStatus: "paused",
      });
      return;
    } else {
      this.setState({
        timerStatus: "running",
      });
    }

    if (this.state.timerType === "Session") {
      this.timer = setInterval(() => this.sessionStart(), 1000);
    } else if (this.state.timerType === "Break") {
    }
  }

  sessionStart() {
    const { seconds, minutes } = this.state;

    this.setState({
      disableInput: true,
    });
    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
    }
    if (seconds === 0) {
      let minutesDisplay = this.addZero(minutes);
      let secondsDisplay = "00";
      if (minutes === 0) {
        // beep.play();
        clearInterval(this.timer);
        this.setState({
          timerStatus: "",
        });
        this.breakStart();
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
    }
  }

  breakStart() {
    let minutes = this.state.breakLength;
    this.setState({
      timerType: "Break",
      timerStatus: "running",
      minutes: minutes,
      showMessage: true,
    });

    this.breakTimer = setInterval(() => this.breakCounter(), 1000);
    this.props.setDoneDeep(this.props.doneDeep + 1);
    setTimeout(() => {
      this.setState({
        showMessage: false,
      });
    }, 3000);
  }

  breakCounter() {
    const { seconds, minutes } = this.state;

    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
    }
    if (seconds === 0) {
      let minutesDisplay = this.addZero(minutes);
      let secondsDisplay = "00";
      if (minutes === 0) {
        // beep.play();
        clearInterval(this.breakTimer);
        let sessionLength = this.state.sessionLength;
        this.setState({
          timerType: "Session",
          seconds: 0,
          minutes: sessionLength,
          timerStatus: "",
        });

        this.timerControl();
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
    }
  }

  reset() {
    clearInterval(this.timer);
    clearInterval(this.breakTimer);
    // beep.load();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      timerStatus: "",
      timerType: "Session",
      disableInput: false,
    });
  }

  addZero(value) {
    return ("0" + value).slice(-2);
  }

  render() {
    return (
      <div className="clock">
        {" "}
        {/* START of timer clock*/}
        <div>
          <h4>Timer:</h4>
        </div>
        <div className="countdown">
          {" "}
          {/* START of countdown section*/}
          <p className="timerheaders">{this.state.timerType}</p>
          <div className="timerheaders">
            {this.state.minutes < 10
              ? "0" + this.state.minutes
              : this.state.minutes}
            :
            {this.state.seconds < 10
              ? "0" + this.state.seconds
              : this.state.seconds}
          </div>
          <div>
            <button onClick={this.timerControl}>
              {/* {this.state.timerStatus === "" ? "Start" : "Pause"}{" "} */}
              {this.state.timerStatus === "running" ? "Pause" : "Start"}
            </button>

            <button onClick={this.reset}>Reset</button>
            {this.state.showMessage && (
              <div>Congrats you completed 1 set of Deep Work!</div>
            )}

            {/* <audio
              ref="beepSound"
              id="beep"
              src="https://bobmatyas.github.io/fcc-pomodoro-clock/sounds/beep.mp3"
            /> */}
          </div>
        </div>{" "}
        {/* END of countdown section*/}
        <div className="settings">
          {" "}
          {/* START of timer settings*/}
          <div className="setbreak">
            {" "}
            {/* START of div for break settings*/}
            <p className="timerheaders">Break</p>
            <div className="settingbttn">
              {/* START of div for break buttons*/}
              <button
                onClick={this.breakIncrement}
                disabled={this.state.disableInput}
              >
                +
              </button>
              {/* START of div for break settings input*/}{" "}
              {/* <p id="session-length">{this.state.sessionLength}</p> */}
              <input
                className="timerinput"
                disabled={this.state.disableInput}
                type="number"
                value={this.state.breakLength}
                onChange={this.sessionInput}
              />
              <button
                onClick={this.breakDecrement}
                disabled={this.state.disableInput}
              >
                -
              </button>{" "}
              {/* END of div for break buttons*/}
            </div>
          </div>
          <div className="setwork">
            {" "}
            {/* START of div for work settings*/}
            <p className="timerheaders">Session</p>
            <div className="settingbttn">
              {/* START of div for work buttons*/}
              <button
                onClick={this.sessionIncrement}
                disabled={this.state.disableInput}
              >
                +
              </button>
              {/* START of div for work settings input*/}{" "}
              {/* <p id="session-length">{this.state.sessionLength}</p> */}
              <input
                className="timerinput"
                disabled={this.state.disableInput}
                type="number"
                value={this.state.sessionLength}
                onChange={this.sessionInput}
              />
              <button
                onClick={this.sessionDecrement}
                disabled={this.state.disableInput}
              >
                -
              </button>{" "}
              {/* END of div for work buttons*/}
            </div>
          </div>
        </div>{" "}
        {/* END of timer settings*/}
      </div>
    );
  }
}

export default OffTimer;
