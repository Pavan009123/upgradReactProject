import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Header from "../../common/header/Header";
import './Home.css';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
});

const tileData = [
];
 
function Home(props) {
  const { classes } = props;
  const [tilesData, setMovies] = useState();

  useEffect(() => {
    fetch(props.baseUrl + "movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {

        for (let movie of response.movies) {
          const tile = {
            img: movie.poster_url,
            title: movie.title
          };
          tileData.push(tile);
        }
        setMovies(response.movies);
      });
  }, []);



  return (
    <div>
        <Header />
        <div className='homeHeader'>Upcoming Movies</div>
        <div className={classes.root}>
          <GridList cellHeight={250} className={classes.gridList} cols={6}>
            {tileData.map(tile => (
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
    </div>
  );


}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);