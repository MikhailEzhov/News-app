class NewsService {


    // Метод-функция: получить ресурсы c url адреса
    getResource = async (url) => {
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
    }


    // Метод-функция: текущая дата - для запроса списка новостей:
    currentDate = () => {
        const currentDate = new Date();
        
        const currentYear = currentDate.getFullYear();
        const currentMonth = 1 + currentDate.getMonth();
        const currentDay = currentDate.getDate();
        
        const strCurrentDate = currentYear + '-0' + currentMonth + '-' + currentDay;
        return strCurrentDate;
    }


    // Метод-функция: получает данные-большой объект, записывает данные в res, в res есть массив articles, через map создаётся и возвращается уже новый массив с объектами - все новости:
    getAllNews = async (published = this.currentDate()) => {
        const res = await this.getResource(`https://api.thenewsapi.com/v1/news/all?api_token=pVJmqBbzUz7p8LhWRLOnigWVoKA3GuN47zt2yqa8&language=en&published_on=${published}&limit=4`); 
        return res.data.map(this._transformNews);
    }


    // Метод-функция: по keyword получает данные-большой объект, записывает данные в res, res трансформируется и возвращается уже ныжный объект - одну новость:
    getOneNews = async (keyword) => {
        const res = await this.getResource(`https://api.thenewsapi.com/v1/news/all?api_token=pVJmqBbzUz7p8LhWRLOnigWVoKA3GuN47zt2yqa8&language=en&search=${keyword}`); 
        return this._transformNews(res.data[0]); // только первый объект
    }


    // Метод-функция: получает данные, трансформирует их, возвращает объект только уже с нужными данными:
    _transformNews = (news) => {
        return {
            id: news.uuid,
            title: news.title,
            description: news.description,
            url: news.url,
            urlToImage: news.image_url
        }
    }


}

export default NewsService;

