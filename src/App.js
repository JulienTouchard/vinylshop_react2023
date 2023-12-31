import { useEffect, useState } from 'react';
import { Menu } from './components/Menu/Menu';
import Boutique from './components/Boutique/Boutique';
import './App.css';
import articles from './articles';
import { BoutiqueContext } from './BoutiqueContext';
import { Footer } from './components/Footer/Footer';
import { MenuContext } from './MenuContext';
import { Panier } from './components/Panier/Panier';
import backgroudVideo from './tunnel_-_27438 (1080p).mp4';

function App() {
  const updateOrientation = () => {
    if (window.innerWidth > window.innerHeight) {
      setStateMenu({
        ...stateMenu,
        "displayUl": true//landscape
      })
    } else {
      setStateMenu({
        ...stateMenu,
        "displayUl": false//portrait
      })
    }
  }

  // declaration des mes states
  const [stateMenu, setStateMenu] = useState(
    {
      "displayPanier": false,
      "displayBoutique": true,
      "displayContact": false,
      "displayUl": updateOrientation,
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
      "fonctDisplayPanier": fonctDisplayPanier,
      "fonctDisplayBoutique": fonctDisplayBoutique,
      "updateOrientation": updateOrientation,

      /* ajouter les deux fonction display pour Boutique et Contact */
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
  // detection mobile

  useEffect(() => {
    window.addEventListener('resize',
      updateOrientation
    )
    return () => {
      window.removeEventListener('resize',
        updateOrientation
      )
    }
  }, [])


  function burgerButton(disp) {
    //let displayUlTmp = !stateMenu.displayUl
    if (disp) {

      document.body.style.height = 'auto';
      document.body.style.overflowY = 'visible';

    } else {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    }
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    })
  }

  function fonctDisplayPanier(disp) {
    if (disp) {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'visible';

    } else {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    }
    setStateMenu({
      ...stateMenu,
      "displayUl": disp,
      "displayPanier": !disp
    })

  }
  /* creer une fonction pour l'affichage de boutique en fonction de displayBoutique ... */
  /* creer une fonction pour l'affichage de boutique en fonction de displayContact ... */
  function fonctDisplayBoutique() {
    setStateMenu({
      ...stateMenu,
      "displayBoutique": !stateMenu.displayBoutique,
      "displayContact": !stateMenu.displayContact,
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
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);
    // Comme dans la fonction précédente je doit maintenant gérer la quantité 
    // d'article disponible et y ajouter une unité
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
        <video autoPlay loop muted className="video">
          <source src={backgroudVideo} type='video/mp4'></source>
        </video>
        <header>
          <Menu></Menu>
        </header>
        <main>
          <h1>
            Pour vos soirées de foliiiiiiie 
          </h1>
          {
            stateMenu.displayPanier ?
              <Panier></Panier>
              :
              <></>
          }
          {/* displayBoutique -> utiliser une bool dans le stateMenu*/}

          {
            stateMenu.displayBoutique ?
              <Boutique articles={stateArticles.articles}></Boutique>
            :
            <></>
          }

          {/* displayContact -> utiliser une bool dans le stateMenu*/}
        </main>
        <Footer></Footer>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
