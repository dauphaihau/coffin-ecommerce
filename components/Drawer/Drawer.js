import {XIcon} from "@heroicons/react/solid";
import {useUIController} from "../../context/UIControllerContext";
import {Text} from "../index";

let blackTheme = false;

const Drawer = ({children, classes = '', theme = '', isOpen}) => {

  if (theme === 'black') {
    blackTheme = true;
  } else {
    blackTheme = false;
  }

  return (
    <aside className={`drawer ${isOpen && 'open'} ${classes} ${blackTheme && 'bg-[#1c1b1b]'}`}>
      <div className='drawer__container'>
        {children}
      </div>
    </aside>
  )
}

const Title = ({title}) => {
  const {closeDrawerModal} = useUIController();
  return (
    <>
      <div className='drawer__title'>
        <Text h1 classes={blackTheme ? 'text-white' : ''}>{title}</Text>
        <XIcon className={`${blackTheme ? 'text-white' : ''} btn-icon`} onClick={() => closeDrawerModal()}/>
      </div>
      <div className={`border-b border-${blackTheme ? 'gray-200' : ''}`}></div>
    </>
  );
}

const Content = ({children}) => <div className='drawer__content'>{children}</div>;
const Footer = ({children}) => <div className='drawer__footer'>{children}</div>;

Drawer.Title = Title;
Drawer.Content = Content;
Drawer.Footer = Footer;

export default Drawer