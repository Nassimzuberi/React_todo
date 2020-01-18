import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const LazyTodos = Loadable({
  loader: () => import(/* webpackChunkName: 'todos' */ './features/todos'),
  loading: () => <h1>Loading ... </h1>
})
class App extends React.Component {
  render() {
    return (
      <div className="container p-5">
        <Route path='/todos' component={LazyTodos} />
      </div>
    )
  }
}

export default App;
