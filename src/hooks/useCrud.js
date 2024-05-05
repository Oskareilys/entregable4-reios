import axios from "axios";
import { useState } from "react";

const useCrud = (BASEURL) => {
  const [response, setResponse] = useState();

  const getApi = (path) => {
    const url = `${BASEURL}${path}`;
    axios
      .get(url)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  };


  const postApi = (path, data) => {
    const url = `${BASEURL}${path}`;
    if (!data.birthday){
      data.birthday= "1111-01-01";
    }
    axios
      .post(url, data)
      .then((res) => {
        setResponse([...response, res.data]);
      })
      .catch((err) => {
        if (err.response?.data?.birthday) {
          console.error("Error en el formato de la fecha :", err.response.data.birthday);

        } else {
          console.error("Error creando al usuario:", err);
        }
      });
  }

  const deleteApi = (path, id) => {
    const url = `${BASEURL}${path}${id}/`;
    axios
      .delete(url)
      .then((res) => {
        console.log(res.data);
        setResponse(response.filter((e) => e.id !== id));
      })
      .catch((err) => console.log(err));
  };
  

  const updateApi = (path, id, data) => {
    const url = `${BASEURL}${path}${id}/`;
    if (!data.birthday){
      data.birthday= "1111-01-01";
    }
    axios
      .put(url, data)
      .then((res) => {
        console.log(res.data);
        setResponse(response.map((e) => (e.id === id ? res.data : e)));
      })
      .catch((err) => console.log(err));
  };

  return [response, getApi, postApi, deleteApi, updateApi];
};

export default useCrud;
