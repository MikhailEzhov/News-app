import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomNews from '../randomNews/RandomNews';
import NewsList from '../newsList/NewsList';

import './app.scss';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {

        return (
            <div className="app">
                <AppHeader/>
                <RandomNews/>
                <NewsList/>
            </div>
        )
    }
}

export default App;
