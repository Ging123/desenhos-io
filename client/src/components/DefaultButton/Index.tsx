import './styles.scss';

interface props {
  content?:string;
  margin?:string;
  onClick?:() => void;
  type?:"button"|"reset"|"submit";
}

const DefaultButton = (props:props) => {
  const styles = { margin:props.margin };

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