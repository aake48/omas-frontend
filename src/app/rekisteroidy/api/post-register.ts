import axios from 'axios';


export const postRegister = async (values: Object) => {

   axios.post('/rekisteroidy/api', {
    headers: {
        'Content-Type': 'application/json',
    },
    data: JSON.stringify(values),
   })
};