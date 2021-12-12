import changeInputVisibility from './services/changeInputVisibility';
import { useRef, useState } from 'react';
import './styles.scss';

interface props {
  icone?:string;
  margin?:string;
  maxLength?:number;
  minLength?:number;
  onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string;
  required?:boolean;
  type?:"email"|"number"|"password"|"text";
  value:string;
}

const DefaultInput = (props:props) => {
  const [eyeClass, setEyeClass] = useState('password-eye fas fa-eye');
  const inputRef = useRef(null);

  return (
    <div className='default-input-container' style={{ margin:props.margin }}>
      <input
        className='default-input'
        maxLength={props.maxLength}
        minLength={props.minLength}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        ref={inputRef}
        type={props.type}
        value={props.value}
      />
      <i className={`left-icone ${props.icone || ''}`}/>
      {props.type === 'password' && props.value !== '' &&
        <i 
          className={eyeClass}
          onClick={() => changeInputVisibility(inputRef, setEyeClass)}
        />
      }
    </div>
  );
}

export default DefaultInput;