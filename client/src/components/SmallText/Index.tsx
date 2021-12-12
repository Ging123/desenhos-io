import './styles.scss';

interface props {
  className?:string;
  content?:string;
  margin?:string;
  onClick?:() => void;
}

const SmallText = (props:props) => {
  const classes = `small-text ${props.className || ''}`;
  const styles = {margin:props.margin};

  return (
    <div className={classes} style={styles} onClick={props.onClick}>
      {props.content}
    </div>
  );
}

export default SmallText;