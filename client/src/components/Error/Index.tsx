import './styles.scss';

interface props {
  content:string;
  margin?:string;
}

const Error = (props:props) => {
  return (
    <div className="error-message" style={{ margin:props.margin }}>
      {props.content}
    </div>
  )
}

export default Error;