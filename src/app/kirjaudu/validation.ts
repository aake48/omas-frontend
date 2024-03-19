import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup.string().required('Syötä käyttäjätunnus'),
    password: yup.string().required('Syötä salasana'),
});

export default validationSchema;