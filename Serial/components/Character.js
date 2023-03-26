import React from 'react';
import PropTypes from 'prop-types';
import './Character.css';

//компанент создает карточку одного персонажа(картинка и имя)

class Character extends React.PureComponent {

  static propTypes = {
    id : PropTypes.number.isRequired,
    info: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cbClickCharacter: PropTypes.func.isRequired,
  };

  ClickCharacter = () => {
    this.props.cbClickCharacter(this.props.id);
  };

  render() {
    return (
      <div className='Character'>
        <img className={'ImgCharacter'} src={this.props.image} onClick={this.ClickCharacter}/>
        <span className='NameCharacter' >{this.props.info} </span>
      </div>
    );

  }
}

export default Character;
