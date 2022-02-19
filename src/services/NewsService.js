class NewsService {


    _apiBase = 'https://newsapi.org/v2/'; // начало для API
    _apiKey = 'apiKey=3a513d52c6284ab6b5942c0bf9e6fe9d'; // конец для API, это мой ключ

    // apiKey=ae2bdcaec4574743b3c3434c4a403e04 - от gmail.com


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
        const res = await this.getResource(`${this._apiBase}top-headlines?country=us&pageSize=8&${this._apiKey}`); 
        return res.articles.map(this._transformNews);
    }


    // Метод-функция: по keyword получает данные-большой объект, записывает данные в res, res трансформируется и возвращается уже ныжный объект - одну новость:
    getOneNews = async (keyword) => {
        const res = await this.getResource(`${this._apiBase}everything?q=${keyword}&language=en&pageSize=1&${this._apiKey}`); 
        return this._transformNews(res);
    }


    // Метод-функция: получает данные, трансформирует их, возвращает объект только уже с нужными данными:
    _transformNews = (res) => {
        return {
            title: res.articles[0].title,
            description: res.articles[0].description,
            url: res.articles[0].url,
            urlToImage: res.articles[0].urlToImage
        }
    }


}

export default NewsService;