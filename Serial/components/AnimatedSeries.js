import React from 'react';
import isoFetch from 'isomorphic-fetch';

import Character from './Character';
import InfoCharacter from './InfoCharacter';

import './AnimatedSeries.css';
import PropTypes from "prop-types";

class AnimatedSeries extends React.PureComponent {

    static propTypes = {
        addCharacters: PropTypes.number.isRequired,
    };

  constructor(props) {
    super(props);
    // this.loadData();
    // не надо запускать асинхронные или долгие операции из конструктора
    // конструктор инициализирует только КЛАСС, это ещё не React-компонент
    // конструктор должен быть лёгким и быстрым
  }

  componentDidMount() {
    this.loadData("https://rickandmortyapi.com/api/character");

      window.onscroll= () => {
          // нижняя граница документа
          let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
          // если пользователь прокрутил достаточно далеко (< 100px до конца)
          if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
              // добавим больше данных
             this.addPage();
          }
      }
  }
    addPage = () => {
        this.loadData("https://rickandmortyapi.com/api/character/?page=2");
    };

  state = {
    dataReady: false,
    сharacters: [],
    selectCharacter : false,
    addCharacters : this.props.addCharacters,
  };

  fetchError = (errorMessage) => {
    alert(showStr);
  };

  fetchSuccess = (loadedData) => {
    this.setState({
      dataReady:true,
      сharacters:this.state.сharacters.concat(loadedData.results) ,
    });
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

  ClickCharacter = (id) => {
      this.setState({selectCharacter : id})

  }

  render() {
      console.log(this.state.сharacters);

    if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;

    const clientsCode=this.state.сharacters.map( client =>
      <Character key={client.id} id={client.id} info={client.name} image={client.image} cbClickCharacter={this.ClickCharacter} />
    );

      console.log('this.state.сharacters');
    return (
      <div className={'grid'} >
        <div className='MobileCompanyClients'>
          {clientsCode}
        </div>
        {
            (this.state.selectCharacter )&&
            <InfoCharacter info={this.state.сharacters[this.state.selectCharacter-1]}
            />
        }
      </div>
    )
    ;

  }

}

export default AnimatedSeries;
