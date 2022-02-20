import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import NewsService from '../../services/NewsService'; // подключаем сетевую-сервисную часть (это классовый-компонент)

import './randomNews.scss';



class RandomNews extends Component {


    // состояния:
    state = {
        oneRandomNews: {},
        loading: true,
        error: false
    }


    // создаём экземпляр от сетевой-сервисной части (от классового-компонента):
    newsService = new NewsService();


    // hook - компонент появился на странице, выполняем действия:
    componentDidMount() {
        this.updateOneRandomNews();
    }


    // метод-функция: когда рандомная новость загрузилась:
    onNewsLoaded = (oneRandomNews) => {
        this.setState({
            oneRandomNews, 
            loading: false
        })
    }


    // метод-функция: когда рандомная новость грузятся:
    onNewsLoading = () => {
        this.setState({
            loading: true
        })
    }


    // метод-функция: когда ошибка при загрузке рандомной новости:
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    // метод-функция: обновляет рандомную новость:
    updateOneRandomNews = () => {
        // генерация случайной строки:
        const abc = "abcdefghijklmnopqrstuvwxyz";
        let keyword = "";
        while (keyword.length < 2) {
            keyword += abc[Math.floor(Math.random() * abc.length)];
        }
        // console.log(keyword);
        this.onNewsLoading(); // показывать спиннер перед загрузкой новости
        this.newsService
            .getOneNews(keyword)
            .then(this.onNewsLoaded) // загрузится ответ(новость) и передастся в метод-функцию onNewsLoaded
            .catch(this.onError) // при ошибке (сработает onError)
    }


    // метод-функция: отображает на странице рандомную новость:
    renderRandomNews = ({oneRandomNews}) => {
        const {title, description, url, urlToImage} = oneRandomNews; // диструктурируем oneRandomNews
    
        return (
            <article 
                className="article"
                tabIndex={0}
                onClick={() => window.open(url, '_blank')}>
                <div className="article__block">
                    <img className="article__picture" src={urlToImage} alt="Random News"/>
                </div>
                <div className="article__info">
                    <h3 className="article__title">{title}</h3>
                    <p className="article__description">{description}</p>
                </div>
            </article>
        )
    }



    render() {
        const {oneRandomNews, loading, error} = this.state; // диструктурируем state

        const item = this.renderRandomNews({oneRandomNews}); // в item находится рандомная новость

        const errorMessage = error ? <ErrorMessage/> : null; // при ошибке
        const spinner = loading ? <Spinner/> : null; // при загрузке
        const content = !(loading || error) ? item : null; // контент помещается на страницу: когда уже нет загрузки, или нет ошибки

        return (
            <div className="random">
                <div className="container">
                    <div className="random__block">
                        <h2 className="random__title">Random News</h2>
                        <button className="random__button" onClick={this.updateOneRandomNews}>Random</button>
                    </div>
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </div>
        )
    }
}


export default RandomNews;
