
import { useContext } from 'react'
import { BoutiqueContext } from '../../BoutiqueContext'
import './Bouton.css'

const Bouton = (props)=>{
    const boutiqueContext = useContext(BoutiqueContext);
    function handleClick(){
      boutiqueContext.decrementQte(props.id)
      // pour appeler la qte de l'article associer à mon bouton je vais devoir passer par :
      // il va falloir récuperer l'id du bouton pour l'article
      // dont js doit modifier la qte 
      console.log(props.id);
    }
    let isActive = boutiqueContext.articles[props.id].qte === 0 ? true : false
    return(
        <button 
        className='btnCard'
        onClick={()=>{handleClick()}}
        disabled = {isActive}
        >Acheter</button>
    )
}

export default Bouton;