import React, { Component } from 'react';
import routes from '../routes';
import { Router, Route, IndexRoute } from 'react-router';
// import {
//   App,
//   NotFoundPage,
//   // HeadLine,
//   // Rich
// } from '../containers';
// const HeadLine = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../containers/HeadLine/index').default)
//     }, 'HeadLine');
// }
// const Rich = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../containers/Rich/index').default)
//     }, 'Rich');
// }

export default class Root extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router history={history} routes={routes}/>
    // <Router history={history}>
    //     <Route path="/" getComponent={HeadLine}>
    //
    //     </Route>
    //     <Route path="/rich" getComponent={Rich}>
    //       <Route path="/detail/:code" getComponent={HeadLine}/>
    //     </Route>
    //     {/* <Route path="/shop">
    //       <IndexRoute getComponent={HeadLine}/>
    //       <Route path="/:code" getComponent={HeadLine}/>
    //     </Route>
    //     <Route path="/tour" getComponent={HeadLine}/>
    //     <Route path="/user" getComponent={HeadLine}/> */}
    //     <Route path="*" component={NotFoundPage}/>
    // </Router>

    )
  }
}
