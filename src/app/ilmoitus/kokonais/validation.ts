import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nimi on liian lyhyt')
        .max(50, 'Nimi on liian pitkä')
        .required('Nimi on pakollinen'),
    roundScore: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(520, 'Tulos ei voi olla yli 520')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Bullseye ei voi olla negatiivinen')
        .max(60, 'Bullseye ei voi olla yli 60')
        .required('Bullseye on pakollinen'),
    });