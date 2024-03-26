import * as Yup from 'yup';

const MAX_FILE_SIZE = 6291456; // 6MB

const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'webp'] };
type ValidFileExtensions = typeof validFileExtensions;
type FileType = keyof ValidFileExtensions;

function isValidFileType(fileName: any, fileType: FileType) {
    return !!fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}


export const roundValidationSchema = Yup.object().shape({
    competitionlist: Yup.string()
        .required('Kilpailu on pakollinen')
        .notOneOf(['none'], 'Kilpailu on pakollinen')
        .default('none'),
    // name: Yup.string()
    //     .min(2, 'Nimi on liian lyhyt')
    //     .max(50, 'Nimi on liian pitkä')
    //     .required('Nimi on pakollinen'),
    score: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(10.9, 'Tulos ei voi olla yli 10.9')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Napakymppi ei voi olla negatiivinen')
        .max(10, 'Napakymppi ei voi olla yli 10')
        .required('Napakymppi on pakollinen'),
    image: Yup.mixed()
        .optional()
        .test("is-valid-type", "Väärä tiedostomuoto",
            value => !value || (value instanceof File && isValidFileType(value && value.name.toLowerCase(), "image")))
        .test("is-valid-size", "Suurin sallittu tiedosto on 6MB",
            value => !value || (value instanceof File && value.size <= MAX_FILE_SIZE))
});

export const fullCompValidationSchema = Yup.object().shape({
    competitionlist: Yup.string()
        .required('Kilpailu on pakollinen')
        .notOneOf(['none'], 'Kilpailu on pakollinen')
        .default('none'),
    // name: Yup.string()
    //     .min(2, 'Nimi on liian lyhyt')
    //     .max(50, 'Nimi on liian pitkä')
    //     .required('Nimi on pakollinen'),
    score: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(520, 'Tulos ei voi olla yli 520')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Napakymppi ei voi olla negatiivinen')
        .max(60, 'Napakymppi ei voi olla yli 60')
        .required('Napakymppi on pakollinen'),
    image: Yup.mixed()
        .optional()
        .test("is-valid-type", "Väärä tiedostomuoto",
            value => !value || (value instanceof File && isValidFileType(value && value.name.toLowerCase(), "image")))
        .test("is-valid-size", "Suurin sallittu tiedosto on 6MB",
            value => !value || (value instanceof File && value.size <= MAX_FILE_SIZE))
});