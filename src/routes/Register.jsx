import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Register = () => {
  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text="Formulario de Registro" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingresa tu correo"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Repite contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repite contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <Button
          text="Registrarse"
          type="submit"
          loading={loading}
          color="purple"
        />
      </form>
    </>
  );
};

export default Register;
