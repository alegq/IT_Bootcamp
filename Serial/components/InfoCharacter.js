import React from 'react';
import "./InfoCharacter.css";

//компанент создает окно с подробной информацией одного персонажа

export default ({info,cbCloseInfo}) => {
    return (
        <div className={'InfoCharacter'}>
            <div className="Close " onClick={cbCloseInfo}>❌</div>
            <img className={'ImagInfo'} src={info.image} alt=""/>
            <div className={'TextInfo'}>
                <span>Name: <br/> {info.name} </span>
                <span>Origin:<br/>{info.origin.name}</span>
                <span>Status:<br/>{info.status}</span>
                <span>Species:<br/>{info.species}</span>
                <span>Location:<br/>{info.location.name}</span>
                <span>Gender:<br/>{info.gender}</span>
            </div>
        </div>
    );
};