import { Component } from 'react';

import './randomNews.scss';

import Picture from '../../img/bee-on-daisy.jpg';



class RandomNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {

        return (
            <div className="random">
                <div className="container">
                    <div className="random__block">
                        <h2 className="random__title">Random News</h2>
                        <button className="random__button">Random</button>
                    </div>

                    <article className="article">
                        <div className="article__block">
                            <img className="article__picture" src={Picture} alt="#"/>
                        </div>
                        <div className="article__info">
                            <h3 className="article__title">Ikea Symfonisk review: a good Sonos wifi speaker hiding in a lamp</h3>
                            <p className="article__description">Second-gen speaker lamp pairs improved sound with larger choice of colours, shades and designsThe second generation of Ikea’s novel Sonos-powered wifi speaker lamp looks a little sleeker than the first, sounds a bit better and comes in new shapes, materials a…</p>
                        </div>
                    </article>
                </div>
            </div>
        )
    }
}

export default RandomNews;
