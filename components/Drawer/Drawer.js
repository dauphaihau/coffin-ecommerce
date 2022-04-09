import {XIcon} from "@heroicons/react/solid";
import {useUtil} from "../../context/utilContext";

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
  const {closeDrawerModal} = useUtil();
  return (
    <>
      <div className='drawer__title'>
        <h1 className={blackTheme ? 'text-white' : ''}>{title}</h1>
        <XIcon className='btn-icon' onClick={() => closeDrawerModal()}/>
      </div>
      <div className={`border-b border-${blackTheme ? 'white' : ''}`}></div>
    </>
  );
}

const Content = ({children}) => <>{children}</>;
const Footer = ({children}) => <>{children}</>;

Drawer.Title = Title;
Drawer.Content = Content;
Drawer.Footer = Footer;

export default Drawer