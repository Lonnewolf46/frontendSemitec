import * as yup from 'yup';

export const customSelectSchema = yup.object().shape({
    email: yup.string().email("Ingrese un correo válido.").required("Requerido"),
    password: yup
    .string()
    .min(1, "Por favor ingrese una contraseña.")
    .required("Requerido"),
    name: yup
    .string()
    .min(3, "Nombre debe ser mayor a tres caracteres.")
    .required("Requerido"),
    user_type: yup
      .string()
      .oneOf(["1", "2"], "Tipo de usuario inválido.")
      .required("Requerido"),
  });