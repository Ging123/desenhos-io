import './styles.scss';

interface props {
  background:string;
  onClick?:() => void;
}

const Modal = (props:props) => {
  return (
    <div 
      className="modal"
      onClick={props.onClick} 
      style={{ background:props.background }}
    />
  )
}

export default Modal;