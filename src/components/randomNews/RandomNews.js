import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import NewsService from '../../services/NewsService'; // подключили сервис - это классовый компонент

import './randomNews.scss';



// ОСНОВНОЙ КОМПОНЕНТ, ОТВЕЧАЕТ ЗА ЛОГИКУ:---------------------------------------------------------------------
class RandomNews extends Component {
    // constructor(props) {
    //     super(props);
    //     this.updateOneRandomNews();
    // }


    // состояния:
    state = {
        oneRandomNews: {},
        loading: true,
        error: false
    }


    // создаём экземпляр от класса (классового компонента):
    newsService = new NewsService();


    // метод-функция: когда данные загрузились:
    onNewsLoaded = (oneRandomNews) => {
        this.setState({
            oneRandomNews, 
            loading: false
        })
    }


    // метод-функция: когда ошибка при загрузке:
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
        this.newsService
            .getOneNews(keyword)
            .then(this.onNewsLoaded) // загрузится ответ(новость) и передастся в метод-функцию onNewsLoaded
            .catch(this.onError) // при ошибке (сработает onError)
    }



    render() {
        const {oneRandomNews, loading, error} = this.state; // диструктурируем state

        const errorMessage = error ? <ErrorMessage/> : null; // при ошибке
        const spinner = loading ? <Spinner/> : null; // при загрузке
        const content = !(loading || error) ? <DisplayRandomNews oneRandomNews={oneRandomNews}/> : null; // контент помещается на страницу: когда уже нет загрузки, или нет ошибки

        return (
            <div className="random">
                <div className="container">
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </div>
        )
    }
}


// КОМПОНЕНТ ОТВЕЧАЕТ ЗА ОТОБРАЖЕНИЕ НА СТРАНИЦЕ:---------------------------------------------------------
const DisplayRandomNews = ({oneRandomNews}) => {
    const {title, description, url, urlToImage} = oneRandomNews; // диструктурируем oneRandomNews

    return (
        <>
            <div className="random__block">
                <h2 className="random__title">Random News</h2>
                <button className="random__button">Random</button>
            </div>

            <article className="article">
                <div className="article__block">
                    <img className="article__picture" src={urlToImage} alt="Random News"/>
                </div>
                <div className="article__info">
                    <h3 className="article__title">{title}</h3>
                    <p className="article__description">{description}</p>
                </div>
            </article>
        </>
    )
}


export default RandomNews;
