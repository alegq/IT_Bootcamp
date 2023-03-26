import React from 'react';
import Character from './Character';
import InfoCharacter from './InfoCharacter';

//компанент формирует таблицу из персонажей и показывает при клике подробную информацию о персонаже

import './AnimatedSeries.css';
import PropTypes from "prop-types";

class AnimatedSeries extends React.PureComponent {

    static propTypes = {
        сharacters: PropTypes.array.isRequired,
        dataReady: PropTypes.bool.isRequired,
    };

    state = {
        selectCharacter : -1, // порядковый номер выбранного персонажа в общем массиве загруженных данных
    };

    ClickCharacter = (id) => {
      this.props.сharacters.forEach( (client,index) => {
          if(client.id == id)
              this.setState({selectCharacter : index})
      } )
    }

    closeInfo = () => {
      this.setState({selectCharacter : -1})
    }

    render() {
        if ( !this.props.dataReady ) //ожидание данных
          return <div>загрузка данных...</div>;

        const clientsCode=this.props.сharacters.map( client =>
          <Character key={client.id} id={client.id} info={client.name} image={client.image} cbClickCharacter={this.ClickCharacter} />
        );

        return (
          <div  >
            {/*  таблица персонажей*/}
            <div className='GridCharacters'>
              {clientsCode}
            </div>
            {/*  отображение информации выбранного персонажа*/}
            {
                (this.state.selectCharacter >= 0)&&
                <InfoCharacter info={this.props.сharacters[this.state.selectCharacter]} cbCloseInfo={this.closeInfo}/>
            }
          </div>
        )
        ;
    }

}

export default AnimatedSeries;
