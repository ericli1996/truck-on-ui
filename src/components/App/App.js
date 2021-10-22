import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import TrailIndex from '../TrailIndex/TrailIndex';
import TrailDetails from '../TrailDetails/TrailDetails';
import Filter from '../Filter/Filter';
import FavoriteTrails from '../FavoriteTrails/FavoriteTrails';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Switch } from 'react-router-dom';
import trails from '../../sampleTrailData';
import { filterByCatagories, cleanFilters } from '../Filter/helperMethods';
import './App.scss';

const userLoggedIn = {id: 23, name: 'Eric'}

const App = () => {
  const [allTrails, setAllTrails] = useState(trails);
  const [filteredTrails, setFilteredTrails] = useState(trails);

  const handleTrailFilters = (filterObj) => {
    const cleanedFilters = cleanFilters(filterObj)
    setFilteredTrails(filterByCatagories(cleanedFilters, allTrails))
  }

  return (
    <main className="app-main">
      <NavBar user={userLoggedIn}/>
      <Switch>
        <Route exact path="/"
          render={() =>
            <>
              <input type="text" placeholder="Search Trails"></input>
              <Filter handleTrailFilters={handleTrailFilters}/>
              <TrailIndex filteredTrails={filteredTrails} />
            </>
          }
        />
        <Route exact path="/favorites/:userID"
          render={({match}) =>
            <FavoriteTrails userID={match.params.userID}
            trails={filteredTrails}/>
          }
        />
        <Route exact path="/trail/:id"
          render={({match}) => {
              return <TrailDetails trailID={match.params.id} trails={filteredTrails}/>
          }}
        />
        <Route path="*"
          render={() =>
            <PageNotFound />
          }
        />
      </Switch>
    </main>
  );
}

export default App;
