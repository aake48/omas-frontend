import * as Yup from 'yup';

const MAX_FILE_SIZE = 6291456; // 6MB
const validFileExtensions = { images: ['jpg', 'png', 'jpeg', 'webp'] };

function isValidFileType(fileName: any, fileType: keyof typeof validFileExtensions) {
    return !!fileName && validFileExtensions[fileType].some(extension => fileName.split('.').pop() === extension);
}

// Function to test each file for type and size
const testFiles = (files: FileList | null, testType: 'type' | 'size') => {
    if (!files || files.length === 0) return true; // Pass validation if no files
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (testType === 'type' && !isValidFileType(file.name.toLowerCase(), 'images')) return false;
        if (testType === 'size' && file.size > MAX_FILE_SIZE) return false;
    }
    return true;
};

const fileValidationTests = [
    Yup.mixed()
        .test("is-valid-type", "Väärä tiedostomuoto", (files: any) => testFiles(files, 'type'))
        .test("is-valid-size", "Suurin sallittu tiedosto on 6MB", (files: any) => testFiles(files, 'size')),
];


export const roundValidationSchema = Yup.object().shape({
    competitionName: Yup.string()
        .required('Kilpailu on pakollinen')
        .notOneOf(['none'], 'Kilpailu on pakollinen')
        .default('none'),
        teamMember: Yup.string()
        .required('Joukkueen jäsen on pakollinen')
        .notOneOf(['none'], 'Jäsen on pakollinen')
        .default('none'),
    score: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(10.9, 'Tulos ei voi olla yli 10.9')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Napakymppi ei voi olla negatiivinen')
        .max(10, 'Napakymppi ei voi olla yli 10')
        .required('Napakymppi on pakollinen'),
        // images: Yup.array().of(fileValidationTests[0]),
});

export const fullCompValidationSchema = Yup.object().shape({
    competitionName: Yup.string()
        .required('Kilpailu on pakollinen')
        .notOneOf(['none'], 'Kilpailu on pakollinen')
        .default('none'),
     teamMember: Yup.string()
        .required('Joukkueen jäsen on pakollinen')
        .notOneOf(['none'], 'Jäsen on pakollinen')
        .default('none'),
    score: Yup.number()
        .min(0, 'Tulos ei voi olla negatiivinen')
        .max(654, 'Tulos ei voi olla yli 654')
        .required('Tulos on pakollinen'),
    bullseyes: Yup.number()
        .min(0, 'Napakymppi ei voi olla negatiivinen')
        .max(60, 'Napakymppi ei voi olla yli 60')
        .required('Napakymppi on pakollinen'),
        // images: Yup.array().of(fileValidationTests[0]),
});