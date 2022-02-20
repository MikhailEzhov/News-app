import { Component } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';



// Предохранитель - ловит ошибки:
class ErrorBoundary extends Component {


    state = {
        error: false, // ошибка - изначально её нету
    }


    // hook - при ошибке (сама ошибка, информация где эта ошибка)
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true // меняет начальное состояние
        });
    }



    render() {

        // если произошла ошибка:
        if (this.state.error) {
            return <ErrorMessage/> // вернет: компонент для ошибки
        }

        // если нет ошибки:
        return this.props.children; // вернет: дочерний компонент, который был обернут от ошибки
    }
}

export default ErrorBoundary;