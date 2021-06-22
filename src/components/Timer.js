import { Typography } from "@material-ui/core";
import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { PauseCircleFilledRounded, PlayArrowRounded } from "@material-ui/icons";

const Timer = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ display: "inline" }}>
          Timer for this Session:
        </Typography>
        <FormControlLabel
          label="Sound"
          labelPlacement="start"
          control={
            <Switch
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="default"
            />
          }
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <Typography variant="body1">Work for: XX:XX:XX</Typography>
          <Typography variant="body1">Rest for: XX:XX:XX</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            color="default"
            startIcon={<PlayArrowRounded />}
          >
            Play
          </Button>
          <Button
            variant="contained"
            color="default"
            startIcon={<PauseCircleFilledRounded />}
          >
            Pause
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
