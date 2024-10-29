import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const sprites = {
  welcome1: "./char/welcome1-char.png",
  welcome2: "./char/welcome2-char.png",
  welcome3: "./char/welcome3-char.png",
  happy1: "./char/happy1-char.png",
  happy2: "./char/happy2-char.png",
  happy3: "./char/happy3-char.png",
  wait: "./char/wait-char.png",
}

interface Props {
  type: keyof typeof sprites
}

export const Char = ({type}: Props) => {
  return (
      <div className="relative flex flex-col items-center w-full">
        <ToastContainer icon={false} pauseOnHover={false} pauseOnFocusLoss={false} limit={1}
                        transition={Zoom} draggable={false} style={{
          position: "relative",
          width: "400px",
          padding: "0 20px",
          marginBottom: "50px",
        }}/>
        <img src={sprites[type]} alt="Earth Character"/>
      </div>
  );
}