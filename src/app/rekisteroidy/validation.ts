import * as yup from 'yup';


const validationSchema = yup.object().shape({
    name: yup.string().required('Nimi on pakollinen'),
    email: yup.string().email('Sähköposti on virheellinen').required('Sähköposti on pakollinen'),
    password: yup.string().min(6, 'Salasanan pitää olla vähintään 6 merkkiä').required('Salasana on pakollinen'),
    username: yup.string().required('Käyttäjätunnus on pakollinen').min(3, 'Käyttäjätunnuksen pitää olla vähintään 3 merkkiä'),
    passrepeat: yup.string().oneOf([yup.ref('password')], 'Salasanojen pitää täsmätä').required('Anna salasana uudelleen'),
});

export default validationSchema;