import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomNews from '../randomNews/RandomNews';
import NewsList from '../newsList/NewsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.scss';



class App extends Component {


    render() {
        return (
            <div className="app">
                <AppHeader/>

                <ErrorBoundary>
                    <RandomNews/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <NewsList/>
                </ErrorBoundary>
            </div>
        )
    }
}

export default App;
