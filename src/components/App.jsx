import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import Admin from './Admin';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: []
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
  }

  handleAddingNewTicketToList(newTicket){
    var newMasterTicketList = this.state.masterTicketList.slice();
    newTicket.formattedWaitTime = (newTicket.timeOpen).fromNow(true);
    newMasterTicketList.push(newTicket);
    this.setState({masterTicketList: newMasterTicketList});
  }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    );
    this.setState({masterTicketList: newMasterTicketList});
  }

  //Overriding component lifecycle methods - Look in the console to see when the React library is calling these as the program runs
  componentDidMount() {
    console.log('componentDidMount');
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
    clearInterval(this.waitTimeUpdateTimer);
  }
  // componentWillMount() {
  //   console.log('componentWillMount');
  // }
  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps');
  // }
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   return true;
  // }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  render() {
    return(
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList 
            ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl 
            onNewTicketCreation={this.handleAddingNewTicketToList} />} />
          <Route path='/admin' render={(props)=><Admin 
            ticketList={this.state.masterTicketList} 
            currentRouterPath={props.location.pathname} />} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

}

export default App;