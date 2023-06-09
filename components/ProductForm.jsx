import React, { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import {storage} from '../firebase'
import {ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid';

const ProductForm = ({
    _id,
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice,
    images
  }) => {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription ||'');
    const [price, setPrice] = useState(existingPrice ||'');
    const [goToProducts, setGoToProducts] = useState(false)
    const [imageUpload, setImageUpoad] = useState(false)

    const router = useRouter();
    async function saveProduct(e) {
        e.preventDefault();
        const data = {title, description, price}
      if(_id){
        //update
        await axios.put('/api/products', {...data, _id})
      } else{
          //create
          const data = {title, description, price}
          await axios.post('/api/products', data)
      }
      setGoToProducts(true)
    }
    if(goToProducts){
      router.push('/products')
    }

    //upload file to supabase using form
 
    const uploadImage = () => {

      if(imageUpload === null)
      return;

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("image uploaded")
      })
    }
    

      return (
          <form onSubmit={saveProduct}>
              <label>Product name</label>
              <input type='text' placeholder='product name' 
              value={title} onChange={(e) => setTitle(e.target.value)} />
              <label>
                Photos
              </label>
              <div className="mb-2 block" onClick={imageUpload ? uploadImage : null}>
                <label className='w-24 h-24 flex items-center justify-center flex-col hover:opacity-60 text-gray-800 rounded-lg bg-gray-200 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p>Upload</p>
                <input type="file" className='hidden' onChange={(e) => {setImageUpoad(e.target.files[0])}}/>
                </label>
                {!images?.length && (
                  <div>No photos in this product</div>
                )}
              </div>
              <label>Description</label>
              <textarea placeholder='description' value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
              <label>Price (in USD)</label>
              <input type='number' placeholder='price' 
              value={price}
              onChange={(e) => setPrice(e.target.value)}/>
              <button type="submit" className='btn-primary'>Save</button>
          </form>
    )
}

export default ProductForm