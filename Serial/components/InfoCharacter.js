import React from 'react';

import "./InfoCharacter.css";

export default ({info}) => {
    console.log(info)
    return (
        <div className={'InfoCharacter'}>
            {/*<button>сброс</button>*/}
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