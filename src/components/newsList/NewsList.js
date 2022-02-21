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
        error: false,
        loadingNewItem: false,
        count: 0,
        published: ''
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


    // метод-функция: запрашивает и дозагружает остальные новости:
    onRequest(published) {
        this.onNewsListLoading();
        this.newsService
            .getAllNews(published)
            .then(this.onNewsListLoaded)
            .catch(this.onError)
    }


    // метод-функция: когда список новостей дозагружается:
    onNewsListLoading = () => {
        this.setState({
            loadingNewItem: true
        })
    }


    // метод-функция: когда список новостей загрузился:
    onNewsListLoaded = (newListNews) => {
        this.setState(({newsList}) => ({
            newsList: [...newsList, ...newListNews],
            loading: false,
            loadingNewItem: false
        }))
        this.nextCount();
        this.backDate(this.state.count);
    }


    // метод-функция: когда ошибка при загрузке списка новостей:
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    // метод-функция: count увеличивает на 1 - нужно count передавать в backDate:
    nextCount = () => {
        this.setState({
            count: this.state.count + 1
        });
    }


    // метод-функция: меняет дату на сутки назад и записывает в state:
    backDate = (num) => {
        const currentDate = new Date();
        
        const backDate = currentDate.setDate(currentDate.getDate() - num);
        const backDateFinal = new Date(backDate);
        
        const backDateFinalYear = backDateFinal.getFullYear();
        const backDateFinalMonth = 1 + backDateFinal.getMonth();
        const backDateFinalDay = backDateFinal.getDate();
        
        const strbackDateFinal = backDateFinalYear + '-0' + backDateFinalMonth + '-' + backDateFinalDay;
        // return strbackDateFinal;
        this.setState({
            published: strbackDateFinal
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
        const {newsList, loading, error, loadingNewItem, count, published} = this.state; // диструктурируем state
        
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
                    <button 
                        className="other__button"
                        disabled={loadingNewItem}
                        onClick={() => this.onRequest(published)}>Load more</button>
                </div>
            </div>
        )
    }
}

export default NewsList;
