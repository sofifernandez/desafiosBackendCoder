import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import axios from 'axios'

export const ItemListContainer = () => {

  //const URI = 'http://localhost:8080/api/productos'
  const URI = 'http://localhost:8080/api/productos-test'
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProds()
  }, []);

  const getProds = async () => {
    const res = await axios
      .get(URI)
    setProductos(res.data)
  }
  return (
    <main className="container-fluid row justify-content-center mt-0 mx-0 px-0 mb-5">
      <div className='container-fluid row justify-content-center mt-0 mx-0 px-0 mb-5'>
        <div className="mt-4 mb-md-5 mx-0 container-fluid row justify-content-center justify-self-center col-11 col-md-8">
          {productos.length ? productos.map((producto) => (<ItemList product={producto} key={producto._id} />))
            : "Loading..."
          }
        </div>
      </div>
    </main>

  );
};


