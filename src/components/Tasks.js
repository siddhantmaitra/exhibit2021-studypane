import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Paper from "@material-ui/core/Paper";
import { AddBoxRounded } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  const [unSolved, setUnSolved] = useState(["Job 1", "Job 2"]);
  const [solved, setSolved] = useState(["Job 3", "Job 4"]);

  const handleToggleUnSolved = (value) => () => {
    setSolved([...solved, value]);
    setUnSolved(unSolved.filter((task) => task !== value));
  };
  const handleToggleSolved = (value) => () => {
    setUnSolved([...unSolved, value]);
    setSolved(solved.filter((task) => task !== value));
  };

  return (
    <div>
      <Paper elevation={10} style={{ padding: "2em" }}>
        <Typography variant="h6" gutterBottom>
          Today's Tasks
        </Typography>
        <Paper elevation={4}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body1"
              style={{
                display: "inline",
                paddingTop: "1em",
                paddingLeft: "1em",
              }}
            >
              Task: Person A
            </Typography>
            <IconButton>
              <AddBoxRounded />
            </IconButton>
          </div>

          <List>
            {unSolved.map((value) => {
              const labelId = value;
              console.log(value);
              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggleUnSolved(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={false}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                  {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
                </ListItem>
              );
            })}
          </List>
          <hr />
          <List>
            {solved.map((value) => {
              const labelId = value;
              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggleSolved(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                  {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
                </ListItem>
              );
            })}
          </List>
        </Paper>
        <Paper elevation={4} style={{ marginTop: "0.5em" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body1"
              style={{
                display: "inline",
                paddingTop: "1em",
                paddingLeft: "1em",
              }}
            >
              Task: Person A
            </Typography>
            <IconButton>
              <AddBoxRounded />
            </IconButton>
          </div>

          <List>
            {unSolved.map((value) => {
              const labelId = value;
              console.log(value);
              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggleUnSolved(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={false}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                  {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
                </ListItem>
              );
            })}
          </List>
          <hr />
          <List>
            {solved.map((value) => {
              const labelId = value;
              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggleSolved(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                  {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Paper>
    </div>
  );
};

export default Tasks;
