import PrimarySearchAppBar from "./Appbar";
import MiniDrawer from "./Sidebar";
import Tasks from "./Tasks";
import Timer from "./Timer";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const Home = () => {
  return (
    <div>
      <PrimarySearchAppBar />
      <MiniDrawer />
      <div
        className="content"
        style={{ paddingTop: "5%", paddingLeft: "7%", paddingRight: "1%" }}
      >
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
            <Grid container direction="column">
              <Grid item xs={12}>
                <div>
                  <Timer />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={{ backgroundColor: "yellow" }}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur fugit ab voluptatem quae eos! Amet at magni
                    dolorum velit nisi minima animi explicabo architecto quidem,
                    voluptatum maiores tenetur necessitatibus. Dicta.
                  </p>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
