import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';

import Navigation from './components/Navigation';
import Main from './routers/Main';
import Login from './routers/Login';
import Footer from './components/Footer';
import Signup from './routers/Signup';
import ApplicationList from './routers/ApplicationList';
import ApplicationWrite from './routers/ApplicationWrite';
import Axios from 'axios';
import URL from './config/URL';
import { SET_SEQ, SET_NAME, SET_TOKEN } from './actions';

const store = createStore(reducers);

class App extends React.Component {
  state = {
    isLoad: false
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const token =  await localStorage.getItem("token");
    if(token) {
      try {
        const {data: user} = await Axios.get(`${URL}/auth`, {
            headers: { token }
        });
  
        store.dispatch({
          type: SET_SEQ,
          value: user.seq
        });
  
        store.dispatch({
          type: SET_NAME,
          value: user.name
        });
  
        store.dispatch({
          type: SET_TOKEN,
          value: token
        });
      } catch(e) {
        console.log(e);
      }
    }
    this.setState({isLoad: true})
  }

  render() {
    if(!this.state.isLoad) return (<></>);

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navigation/>
          <Route component={Main} path="/" exact={true}/>
          <Route component={Login} path="/signin" exact={true}/>
          <Route component={Signup} path="/signup" exact={true}/>
          <Route component={ApplicationList} path="/list" exact={true}/>
          <Route component={ApplicationWrite} path="/write" exact={true}/>
          <Footer/>
        </BrowserRouter>
      </Provider>
    );
  }
  
}

export default App;
