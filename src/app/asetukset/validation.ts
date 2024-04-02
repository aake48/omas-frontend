import * as yup from 'yup';

export const validationSchemaPasswordChange = yup.object().shape({
    newPassword: yup.string().min(6, 'Salasanan pitää olla vähintään 6 merkkiä').required('Salasana on pakollinen'),
    oldPassword: yup.string().required('Salasana on pakollinen'),
    passrepeat: yup.string().oneOf([yup.ref('newPassword')], 'Salasanojen pitää täsmätä').required('Anna salasana uudelleen'),
});

export const validationSchemaEmailChange = yup.object().shape({
    email: yup.string().email('Sähköposti on virheellinen').required('Sähköposti on pakollinen'),
    password: yup.string().required('Salasana on pakollinen'),
});