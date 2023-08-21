import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { MenuContext } from '../../MenuContext';
import "./Menu.css"
/* function responsive() {
    let orientation;//true=>mobile
    // ou utiliser l'event "deviceOrientation"
    if (window.innerWidth > window.innerHeight) {
        orientation = false;
    } else {
        orientation = true;
    }
    return orientation;
} */
function Logo() {
    return <div className="logo">
        <i className="fa-solid fa-record-vinyl"></i>
        {/* <img src={bla} alt="mon super logo"></img> import d'une image */}
    </div>;
}
function MenuEntrie(props) {
    return (
        <a href={props.url} onClick={(e)=>{e.preventDefault()}}>
            <li>{props.text}</li>
        </a>
    );
}
function Research() {
    return "";
}
function Menu() {
    const menuContext = useContext(MenuContext);
    //let orientation = responsive();//true=>mobil ne marchera pas dans la vue
    // utilisation de state dans un component fonctionnel
    /* const [orientation, setOrientation] = React.useState(responsive());
    const [displayUl, setDisplayUl] = React.useState(orientation ? false : true);
    const [tabMenuNav, settabMenuNav] = React.useState(
        [
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
        ]
    ); */
    /* window.addEventListener("resize", () => {
        setOrientation(responsive());
        setDisplayUl(!orientation);
    }); */
    return (
        <nav className="navMenu ">
            <Logo></Logo>
            {
                menuContext.displayUl ?
                    <ul>
                        {
                            menuContext.tabMenuNav.map((valeur, index) => {
                                return <MenuEntrie
                                    text={valeur.text}
                                    url={valeur.text}
                                    isActive={valeur.isActive}
                                    key={index}
                                ></MenuEntrie>
                            })
                        }
                    </ul>
                    :
                    <></>
            }
            <Research></Research>
            <div onClick={() => menuContext.burgerButton(menuContext.displayUl)} className="burger">
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    )
}
export { Menu }