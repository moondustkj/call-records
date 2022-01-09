/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Home from 'containers/Home/Loadable';

import Calls from '../Calls/Calls';
import CallLabels from '../CallLabels/CallLabels';

const Header = styled.div`
  width: 100%;
  padding: 20px;
  background-color: aliceblue;
  a {
    margin: 10px;
  }
`;
export default function App() {
  const { location } = useSelector(state => state.router);
  return (
    <div>
      <Header>
        <Link
          to="/calls"
          style={{
            textDecoration: location.pathname === '/calls' ? 'underline' : '',
          }}
        >
          Part 1
        </Link>
        <Link
          to="/labels"
          style={{
            textDecoration: location.pathname === '/labels' ? 'underline' : '',
          }}
        >
          Part 2
        </Link>
      </Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/calls" component={Calls} />
        <Route exact path="/labels" component={CallLabels} />
      </Switch>
    </div>
  );
}
