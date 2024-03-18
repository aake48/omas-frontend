import * as Yup from 'yup';

export const roundValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nimi on liian lyhyt')
        .max(50, 'Nimi on liian pitkä')
        .required('Nimi on pakollinen'),
    roundScore: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(10.9, 'Tulos ei voi olla yli 10.9')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Napakymppi ei voi olla negatiivinen')
        .max(10, 'Napakymppi ei voi olla yli 10')
        .required('Napakymppi on pakollinen'),
    });

export const fullCompValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nimi on liian lyhyt')
        .max(50, 'Nimi on liian pitkä')
        .required('Nimi on pakollinen'),
    roundScore: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(520, 'Tulos ei voi olla yli 520')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Napakymppi ei voi olla negatiivinen')
        .max(60, 'Napakymppi ei voi olla yli 60')
        .required('Napakymppi on pakollinen'),
    });