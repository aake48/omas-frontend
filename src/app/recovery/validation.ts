import * as yup from 'yup';

const validationSchema = yup.object().shape({
    password: yup.string().min(6, 'Salasanan pitää olla vähintään 6 merkkiä').required('Salasana on pakollinen'),
    passrepeat: yup.string().oneOf([yup.ref('password')], 'Salasanojen pitää täsmätä').required('Anna salasana uudelleen'),
});

export default validationSchema;