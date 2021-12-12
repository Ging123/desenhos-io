type ref = React.RefObject<HTMLInputElement>;
type set = React.Dispatch<React.SetStateAction<string>>;

export default function changeInputVisibility(inputRef:ref, setEyeClass:set) {
  const input = inputRef.current!;
  if(input.type === 'password') return showPassword(input, setEyeClass);
  hidePassword(input, setEyeClass);
}

function showPassword(input:HTMLInputElement, setEyeClass:set) {
  input.type = 'text';
  setEyeClass('password-eye fas fa-eye-slash')
}

function hidePassword(input:HTMLInputElement, setEyeClass:set) {
  input.type = 'password';
  setEyeClass('password-eye fas fa-eye');
}