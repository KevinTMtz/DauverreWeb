import * as yup from 'yup';

export const postDocSchema = yup.object().shape({
  title: yup.string().required('El campo de título está vacío'),
  date: yup.date().required('La fecha no ha sido seleccionada'),
  content: yup.string().ensure(),
  imageUrl: yup.string().ensure(),
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
