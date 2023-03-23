import React from 'react';
import isoFetch from 'isomorphic-fetch';

import Character from './Character';

import './AnimatedSeries.css';

class AnimatedSeries extends React.PureComponent {

  constructor(props) {
    super(props);
    // this.loadData();
    // не надо запускать асинхронные или долгие операции из конструктора
    // конструктор инициализирует только КЛАСС, это ещё не React-компонент
    // конструктор должен быть лёгким и быстрым
  }

  componentDidMount() {
    this.loadData();
  }

  state = {
    dataReady: false,
    name: "???",
    clients: [],
    selectCharacter : false,
  };

  fetchError = (errorMessage) => {
    alert(showStr);
  };

  fetchSuccess = (loadedData) => {
    console.log(loadedData);
    this.setState({
      dataReady:true,
      clients:loadedData.results,
    });
  };

  loadData = async () => {

    const response=await isoFetch("https://rickandmortyapi.com/api/character");
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
    console.log(id)
  }



  render() {

    if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;

    const clientsCode=this.state.clients.map( client =>
      <Character key={client.id} id={client.id} info={client.name} image={client.image} cbClickCharacter={this.ClickCharacter} />
    );

    return (
      <div className={'grid'} >
        <div className='MobileCompanyClients'>
          {clientsCode}
        </div>
        {
            (this.state.selectCharacter )&&
            <InfoCharacter code={this.state.selectedProductCode}
            />
        }
      </div>
    )
    ;

  }

}

export default AnimatedSeries;
