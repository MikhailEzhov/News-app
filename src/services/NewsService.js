class NewsService {


    _apiBase = 'https://newsapi.org/v2/'; // начало для API
    _apiKey = 'apiKey=ae2bdcaec4574743b3c3434c4a403e04'; // конец для API, это мой ключ

    // apiKey=ae2bdcaec4574743b3c3434c4a403e04 - от gmail.com
    // apiKey=3a513d52c6284ab6b5942c0bf9e6fe9d - от mail.ru


    // Метод-функция: получить ресурсы c url адреса
    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }


    // Метод-функция: получает данные-большой объект, записывает данные в res, в res есть массив articles, через map создаётся и возвращается уже новый массив с объектами - все новости:
    getAllNews = async () => {
        const res = await this.getResource(`${this._apiBase}everything?q=a&language=en&pageSize=8&${this._apiKey}`); 
        return res.articles.map(this._transformNews);
    }


    // Метод-функция: по keyword получает данные-большой объект, записывает данные в res, res трансформируется и возвращается уже ныжный объект - одну новость:
    getOneNews = async (keyword) => {
        const res = await this.getResource(`${this._apiBase}everything?q=${keyword}&language=en&pageSize=1&${this._apiKey}`); 
        return this._transformNews(res.articles[0]); // только первый объект
    }


    // Метод-функция: получает данные, трансформирует их, возвращает объект только уже с нужными данными:
    _transformNews = (news) => {
        return {
            title: news.title,
            description: news.description,
            url: news.url,
            urlToImage: news.urlToImage
        }
    }


}

export default NewsService;