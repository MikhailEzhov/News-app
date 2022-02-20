import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import NewsService from '../../services/NewsService'; // подключаем сетевую-сервисную часть (это классовый-компонент)

import './newsList.scss';



class NewsList extends Component {


    // состояния:
    state = {
        newsList: [],
        loading: true,
        error: false
    }


    // создаём экземпляр от сетевой-сервисной части (от классового-компонента):
    newsService = new NewsService();


    // hook - компонент появился на странице, выполняем действия:
    componentDidMount() {
        this.newsService
            .getAllNews()
            .then(this.onNewsListLoaded)
            .catch(this.onError)
    }


    // метод-функция: когда список новостей загрузился:
    onNewsListLoaded = (newsList) => {
        this.setState({
            newsList,
            loading: false
        })
    }


    // метод-функция: когда ошибка при загрузке списка новостей:
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    // метод-функция: отображает на странице список новостей из массива данных:
    renderItems(arr) {
        const items =  arr.map((item) => {
            return (
                <li className="news"
                    tabIndex={0}
                    onClick={() => window.open(item.url, '_blank')}
                    key={item.title}>
                    <div className="news__block">
                        <img className="news__picture" src={item.urlToImage} alt={item.title}/>
                    </div>
                    <h3 className="news__title">{item.title}</h3>
                </li>
            )
        });
        // возвращает список с новостями внутри:
        return (
            <ul className="other__grid">
                {items}
            </ul>
        )
    }



    render() {
        const {newsList, loading, error} = this.state; // диструктурируем state

        const items = this.renderItems(newsList); // в items находится список новостей

        const errorMessage = error ? <ErrorMessage/> : null; // при ошибке
        const spinner = loading ? <Spinner/> : null; // при загрузке
        const content = !(loading || error) ? items : null; // контент помещается на страницу: когда уже нет загрузки, или нет ошибки

        return (
            <div className="other">
                <div className="container">
                    <h2 className="other__title">Other news</h2>
                    {errorMessage}
                    {spinner}
                    {content}
                    <button className="other__button">load more</button>
                </div>
            </div>
        )
    }
}

export default NewsList;
