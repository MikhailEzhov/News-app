import { Component } from 'react';

import './newsList.scss';

import Picture from '../../img/bee-on-daisy.jpg';



class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {

        return (
            <div className="other">
                <div className="container">
                    <h2 className="other__title">Other news</h2>

                    <ul className="other__grid">

                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        <li className="news">
                            <div className="news__block">
                                <img className="news__picture" src={Picture} alt="#"/>
                            </div>
                            <h3 className="news__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                        </li>
                        
                    </ul>

                    <button className="other__button">load more</button>
                </div>
            </div>
        )
    }
}

export default NewsList;
