import React, { useContext } from 'react';
import Bouton from '../Bouton/Bouton';
import './Card.css';
import { BoutiqueContext } from '../../BoutiqueContext';

/* function Card (props){
  return(
    <div className={styles.Card}>
    Card Component
  </div>
  )
}  est identique à :*/
const Card = (props) => {
  const boutiqueContext = useContext(BoutiqueContext);
  return (
    <div className="card">
      <div className='cardImg'>
        <img src={props.article.url}></img>
      </div>
      <p className="cardName">{props.article.name}</p>
      <p className="cardPrice">{props.article.price} €</p>
      <p className='qte'>{props.article.qte}</p>
      <p className='description'>{props.article.description}</p>
      {
        /* props.article.promo && <p className='promo'>PROMO</p> */
        props.article.promo ? <p className='promo'>PROMO</p> : <></>
      }
      <Bouton id={props.article.id}></Bouton>
    </div>
  );
}



export default Card;
