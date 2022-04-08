import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import axios from 'axios'


export const ItemDetailContainer = () => {
  const URI = 'http://localhost:8080/api/productos'
  const { productoID } = useParams();
  const [item, setItem] = useState(null);

  useEffect( () => {
  async function getProds(){
    const res = await axios
      .get(URI+`/${productoID}`)
    setItem(res.data)
    }
    getProds()
  	
  }, [productoID]);


  return (
    <>
      <main className='container-fluid row justify-content-center mt-0 mx-0 px-0 mb-5'>
        {item ? <ItemDetail item={item} key={item.id} /> : "Loading..."}
      </main>
    </>
  );
};

