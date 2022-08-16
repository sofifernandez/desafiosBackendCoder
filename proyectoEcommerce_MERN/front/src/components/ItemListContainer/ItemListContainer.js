import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { ItemList } from "../ItemList/ItemList";



export const ItemListContainer = () => {
  const URI = 'http://localhost:8080/api/productos'
  const [productos, setProductos] = useState([]);
  const { categoria } = useParams();

  useEffect(() => {
    getProds(categoria);
  }, [categoria]);

  const getProds = async (categoria) => {
    if (!categoria) {
      const res = await axios.get(URI)
      setProductos(res.data)  
    } else {
      const res = await axios.get(URI + `/category/${categoria}`)
      setProductos(res.data)
    }
    
  }
  return (
    <main className="container-fluid row justify-content-center mt-0 mx-0 px-0 mb-5">
      <div className='container-fluid row justify-content-center mt-0 mx-0 px-0 mb-5'>
        <div className="mt-5 mb-md-5 mx-0 container-fluid row justify-content-center justify-self-center col-11 col-md-8 col-lg-6">
          {productos.length ? productos.map((producto) => (<ItemList product={producto} key={producto._id} />))
            : "Loading..."
          }
        </div>
      </div>
    </main>

  );
};


