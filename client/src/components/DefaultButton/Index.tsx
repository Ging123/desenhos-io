import './styles.scss';

interface props {
  background?:string;
  border?:string;
  color?:string;
  content?:string;
  margin?:string;
  onClick?:() => void;
  type?:"button"|"reset"|"submit";
}

const DefaultButton = (props:props) => {
  const styles = { 
    background:props.background, 
    border:props.border,
    color:props.color,
    margin:props.margin 
  };

  return (
    <button 
      className="default-button" 
      onClick={props.onClick} 
      type={props.type}
      style={styles}>
      {props.content}
    </button>
  );
}

export default DefaultButton;