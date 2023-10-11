import React from 'react';
import {
  Grid, AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
      version:""
    };
    let promise = fetchModel("http://localhost:3000/test/info");
    promise.then((response) => {this.setState({ version: response.data.__v});});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      this.setState({ view: this.props.view });
    }
  };

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">

          <Grid item xs>
            <Typography variant="h5" color="inherit">
                Group 9
            </Typography>
          </Grid>
            <Grid item xs>
            <Typography variant="h5" color="inherit">
                Version: {this.state.version}
            </Typography>
            </Grid>
            <Grid item xs>
            <Typography variant="h5" align="right">
                {this.state.view}
            </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
