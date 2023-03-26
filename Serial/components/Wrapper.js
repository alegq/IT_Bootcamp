import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';

import './Wrapper.css';
import AnimatedSeries from './AnimatedSeries';

//компанет рендерит обертку для основного блока

class Character extends React.PureComponent {

    static propTypes = {

    };

    componentDidMount() {
        this.loadData("https://rickandmortyapi.com/api/character");

        window.onscroll= () => {
            // нижняя граница документа
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            // если пользователь прокрутил достаточно далеко (< 100px до конца)
            if (windowRelativeBottom < document.documentElement.clientHeight + 100 && this.state.addCharacters && this.state.infiniteLoad) {
               this.loadData("https://rickandmortyapi.com/api/character/?page="+this.state.loadPage);  // загрузить следующую страницу
               this.setState({addCharacters : false})  //запретип загрузку данных
            }
        }
    }

    state = {
        dataReady: false,           //флаг загрузки данных при первом рендере
        сharacters: [],             //массив звгруженных персонажей
        addCharacters : true,       //ждем ответ на запрос, загрузка при скроленге запрещена
        loadPage : 1,               //счетчик загруженных страниц

        urlNextPage:null,           // url следующей страницы
        urlPrevPage:null,           // url предыдущей страницы

        infiniteLoad: true,         // выбор режима загрузки, "true" - бесконечная загрузка
    };

    loadData = async (url) => {

        const response=await isoFetch(url);
        // в response - http-ответ
        if ( !response.ok ) {
            this.fetchError("fetch error " + response.status);
        }
        else {
            const data=await response.json();
            // в data - пришедшие в ответе данные
            this.fetchSuccess(data);
        }

    };

    fetchError = (errorMessage) => {
        alert(showStr);
    };

    fetchSuccess = (loadedData) => {
        this.setState({
            dataReady:true,
            urlNextPage: loadedData.info.next,
            urlPrevPage: loadedData.info.prev,
            addCharacters : true,
        });

        if (this.state.infiniteLoad)
            this.setState({
                сharacters:this.state.сharacters.concat(loadedData.results), //склеиваем массивы
                loadPage : this.state.loadPage+1,
            })
        else
            this.setState({сharacters:loadedData.results})
    };

    scrollTop = () => {
        window.scrollTo(pageXOffset, 0);  //переместить в начало страницы

    };

    switchNaxtPage = () => {
        if(this.state.urlNextPage){
            this.loadData(this.state.urlNextPage);
            this.setState({loadPage : this.state.loadPage+1});
        }
    };
    switchPrevPage = () => {
        if(this.state.urlPrevPage){
            this.loadData(this.state.urlPrevPage);
            this.setState({loadPage : this.state.loadPage-1});
        }

    };

    //функция переключения режима загруки данных (бесконечная загрузка или пагинация)
    disableInfiniteLoad = () => {
        if (this.state.infiniteLoad)
            this.setState({
                infiniteLoad:false,
                //оставляем только последнюю загруженную страницу
                сharacters: this.state.сharacters.slice(this.state.сharacters.length-1-20, this.state.сharacters.length-1),
            })
        else
            this.setState({infiniteLoad:true})
    }

    render() {
        return (
            <div className='Wrapper'>
                <div className="arrowTop" onClick={this.scrollTop}></div>
                <div className="Checkbox"><input type="checkbox" onClick={this.disableInfiniteLoad}/>отключить бесконечную загрузку</div>
                {/* компанет для отображения всех персонажей */}
                <AnimatedSeries сharacters={this.state.сharacters} dataReady={this.state.dataReady}/>
                {
                    (!this.state.infiniteLoad )&&
                    <div className="Pagination">
                        <div>
                            <div className="BackArrowPag" onClick={this.switchPrevPage}></div>
                        </div>
                        <div>
                            <div className="NumberPagePag">{this.state.loadPage-1}</div>
                        </div>
                        <div>
                            <div className="NextArrowPag" onClick={this.switchNaxtPage}></div>
                        </div>
                    </div>
                }

            </div>
        );

    }

}

export default Character;
