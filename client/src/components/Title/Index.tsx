import './styles.scss';

interface props {
  content:string;
  margin?:string;
}

const Title = (props:props) => {
  return (
    <div className="title" style={{ margin:props.margin }}>
      {props.content}
    </div>
  )
}

export default Title;