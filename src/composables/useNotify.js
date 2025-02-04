import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = (text , type) => {
  toast(text, {
    autoClose: 3000,
    position: 'bottom-right', 
    theme: 'dark',
    type : type,
  });
};


export default notify