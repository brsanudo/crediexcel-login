import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
  const [copy, setCopy] = useState({ propiedadX: true });
  const { required } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  const { loading, data, error, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    console.log("click delete");
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    console.log("copiado");
    setCopy({ [nanoid]: true });
  };

  return (
    <>
      <Title text="Consulta tu estado de cuenta" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa tu Cedula"
          type="text"
          {...register("url", {
            required,
          })}
          error={errors.url}
        ></FormInput>

        {newOriginID ? (
          <Button
            type="submit"
            text="EDIT URL"
            color="yellow"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text="Consultar"
            color="blue"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.nombre}
          </h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span>Cedula: </span>
            {item.cedula}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span>Empresa: </span> {item.empresa}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span>Valor del Credito: </span> {item.valorCredito}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span>Valor de cada Couta: </span> {item.valorCouta}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span>Numero de Coutas pagadas: </span> {item.coutasPagadas}
          </p>
          <div className="flex space-x-2">
            <Button
              type="button"
              text="Eliminar"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
