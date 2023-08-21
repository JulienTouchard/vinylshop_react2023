import { useState } from 'react';
import { Menu } from './components/Menu/Menu';
import Boutique from './components/Boutique/Boutique';
import './App.css';
import articles from './articles';
import { BoutiqueContext } from './BoutiqueContext';
import { MenuContext } from './MenuContext';
function App() {
  // declaration des mes states
  const [stateMenu, setStateMenu] = useState(
    {
      "displayUl": !responsive(),
      "tabMenuNav": [
        {
          text: "Magasin",
          url: "#",
          isActive: false
        },
        {
          text: "Panier",
          url: "#",
          isActive: false
        },
        {
          text: "Contact",
          url: "#",
          isActive: false
        }
      ],
      "burgerButton": burgerButton
    }
  )
 
  const [stateArticles, setStateArticles] = useState(
    {
      "articles": articles,
      "decrementQte": decrementQte
    }
  );
  function responsive() {
    let orientationTmp;//true=>mobile
    // ou utiliser l'event "deviceOrientation"
    if (window.innerWidth > window.innerHeight) {
      orientationTmp = false;//paysage
    } else {
      orientationTmp = true;//portrait
    }
    return orientationTmp;
  }
  function burgerButton(disp) {
    //let displayUlTmp = !stateMenu.displayUl
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    })
    console.dir(stateMenu.displayUl);
  }
  function decrementQte(id) {
    console.log(id);
    // je fais une copie de mon tableau stateArticles car il est en lecture seule
    // et je ne peux pas le modfifier directement.
    let articlesTmp = stateArticles.articles;
    // je modifie la qte de l'article correspondant à l'id transmis par mon component Bouton
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        valeur.qte > 0 && --valeur.qte;
        //valeur.qte === 0 ? valeur.qte = 0 : valeur.qte -= 1;
        // if (valeur.qte === 0) {
        //   valeur.qte = 0;
        // } else {
        //   valeur.qte -= 1;
        // }
      }
    })
    // je réassigne le nouveau tableau article modifié à mon stateArticles
    // grace à sa fonction setStateArticles
    setStateArticles(
      {
        ...stateArticles,// le ...objet, rappelle toutes les propriétées:valeur de l'objet
        "articles": articlesTmp
      }
    );
  }
  return (
    <MenuContext.Provider value={stateMenu}>
      <BoutiqueContext.Provider value={stateArticles}>
        <header>
          <Menu></Menu>
        </header>
        <main>
          <Boutique articles={stateArticles.articles}></Boutique>
        </main>
        <footer></footer>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
