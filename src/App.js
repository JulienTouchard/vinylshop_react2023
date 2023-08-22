import { useState } from 'react';
import { Menu } from './components/Menu/Menu';
import Boutique from './components/Boutique/Boutique';
import './App.css';
import articles from './articles';
import { BoutiqueContext } from './BoutiqueContext';
import { MenuContext } from './MenuContext';
import { Panier } from './components/Panier/Panier';
function App() {
  // declaration des mes states
  const [stateMenu, setStateMenu] = useState(
    {
      "displayPanier": false,
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
      "burgerButton": burgerButton,
      "fonctDisplayPanier": fonctDisplayPanier
    }
  )

  const [stateArticles, setStateArticles] = useState(
    {
      "articles": articles,
      "tabPanier": [],
      "totalPanier": 0,
      "decrementQte": decrementQte,
      "incrementQte": incrementQte
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
  }
  function fonctDisplayPanier(disp) {
    setStateMenu({
      ...stateMenu,
      "displayPanier": !disp
    })
  }
  function decrementQte(id) {

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
    // j'ajoute l'id de l'article acheté au tableau stateArticles.tabPanier
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)
    console.dir(tmpTabPanier);
    // je réassigne le nouveau tableau article modifié à mon stateArticles
    // grace à sa fonction setStateArticles
    setStateArticles(
      {
        ...stateArticles,// le ...objet, rappelle toutes les propriétées:valeur de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    //mise a jour du total du panier dans le state
    calculTotal()
  }
  function incrementQte(id) {
    // je crée une variable pour l'index du tableau tabPanier
    // que je vais supprimer
    let supprIndex;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {
        // je récupere dans mon tableau stateArticles.tabPanier l'index de
        // l'article à supprimer
        supprIndex = index;
      }
    })
    // array.splice(index,nb_elements) me permet de supprimer l'index supprIndex
    tmpTabPanier.splice(supprIndex, 1);
    // Comme dans la fonction précédente je doit maintenant gérer la quantité 
    // d'article disponible et y ajouter une unité
    const tmpTabPanier = stateArticles.tabPanier;
    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        ++valeur.qte;
      }
    })
    // une fois toutes les modifications effectuées sur mes tableaux temporaires
    // je peux les affecter à mes state (set)
    setStateArticles(
      {
        ...stateArticles,
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    //mise a jour du total du panier dans le state
    calculTotal();
  }
  function calculTotal() {
    let totalTmp = 0;
    stateArticles.tabPanier.map((valeur) => {
      totalTmp += stateArticles.articles[valeur].price;
    })
    setStateArticles(
      {
        ...stateArticles,
        "totalPanier": totalTmp
      }
    )
  }
  return (
    <MenuContext.Provider value={stateMenu}>
      <BoutiqueContext.Provider value={stateArticles}>
        <header>
          <Menu></Menu>
        </header>
        <main>
          {
            stateMenu.displayPanier ?
              <Panier></Panier>
              :
              <></>
          }
          <Boutique articles={stateArticles.articles}></Boutique>
        </main>
        <footer></footer>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
