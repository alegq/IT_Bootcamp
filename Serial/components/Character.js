import React from 'react';
import PropTypes from 'prop-types';

import './Character.css';

class Character extends React.PureComponent {

  static propTypes = {
    //info:PropTypes.shape({
     // id: PropTypes.number.isRequired,
     // fio: PropTypes.string.isRequired,
    //  balance: PropTypes.number.isRequired,
    //}),
    id : PropTypes.number.isRequired,
    info: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cbClickCharacter: PropTypes.func.isRequired,
  };

  ClickCharacter = (EO) => {
    console.log('VotesAnswer: текст свободного ответа изменён '+ this.props.id);
    this.props.cbClickCharacter(this.props.id);
  };

  render() {

    return (
      <div className='Character'>
        {/*<span className='MobileClientBalance'>{this.props.info}</span>*/}
        <img src={this.props.image} onClick={this.ClickCharacter}/>
        <span className='MobileClientFIO' >{this.props.info} </span>
      </div>
    );

  }

}

export default Character;
