import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const DeleteProductPage = () => {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState()
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        } else{
            axios.get('/api/products?id='+id).then(response => {
                setProductInfo(response.data);
            }, [id])
        }
    })
    function goBack(){
        router.push('/products')
    }
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack()
    }
  return (
    <Layout>
      <h1>
        Do you really want to delete&nbsp;<span className='font-bold'>{productInfo?.title}</span>?
      </h1>

      <div className='flex gap-5'>
        <button className='btn-red' onClick={deleteProduct}>Yes</button>
        <button className='btn-default' onClick={goBack}>No</button>
      </div>
    </Layout>
  )
}

export default DeleteProductPage
