import PrimarySearchAppBar from "./Appbar";
import MiniDrawer from "./Sidebar";
import Tasks from "./Tasks";
import Timer from "./Timer";
import Workspace from "./Workspace";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: "6em",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <PrimarySearchAppBar />
      <MiniDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <Typography variant="h4" align="center">
                Session Title and #
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Tasks />
            </div>
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <div>
                  <Timer />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Workspace />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Home;
