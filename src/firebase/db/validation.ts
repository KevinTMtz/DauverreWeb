import * as yup from 'yup';

export const postDocSchema = yup.object().shape({
  title: yup.string().required('El campo de título está vacío'),
  date: yup.date().required('La fecha no ha sido seleccionada'),
  content: yup.string().ensure(),
  imageUrl: yup.string().ensure(),
});

export const residentDocSchema = yup.object().shape({
  firstName: yup.string().required('El campo de nombre está vacío'),
  lastName: yup.string().required('El campo de apellido está vacío'),
  birthDate: yup.date().required(),
  gender: yup.string().required('El campo de sexo está vacío'),
  telephone: yup
    .string()
    .matches(/(\d\s?-?){10}/, 'Ingresa 10 dígitos en el campo de teléfono')
    .required('El campo de teléfono está vacío'),
  isActive: yup.boolean().default(true),
});

export const reportDocSchema = yup.object().shape({
  date: yup.date().required('La fecha no ha sido seleccionada'),
  mood: yup.number().min(1).max(5).required(),
  health: yup.number().min(1).max(5).required(),
  sad: yup.boolean().required(),
  angry: yup.boolean().required(),
  rested: yup.boolean().required(),
  wellFed: yup.boolean().required(),
  lonely: yup.boolean().required(),
  comments: yup.string().ensure(),
});
