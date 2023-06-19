import ProductDetailsC from '@/components/ProductDetailsC';
import RelatedProducts from '@/components/RelatedProducts';
import { addToCart } from '@/store/cartSlice';
import { fetchDataFromApi } from '@/utils/api';
import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({product, products}) => {

  const dispatch = useDispatch();
  const p=product?.data?.[0]?.attributes;
  const notify = () => {
    toast.success("Success. added to Cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};
  return (
    <div className='w-full md:py-20'>
      <ToastContainer/>
        <div className='flex flex-col lg:flex-row md: px-10 gap-[50px] '>
            <div className='w-full md:w-auto flex-[1.5] max-w-[500px] '>
                
                <ProductDetailsC images={p?.image?.data}/>
            </div>
            <div className='flex-[1] py-3'>
                <div className='text-[30px] font-semibold mb-3  leading-tight'>
                    {p.name}
                </div>
                <div className='text-lg font-semibold'>
                  MRP : ₹ {p.price}
                </div>
                <div className='text-md font-medium text-black/[0.5]'>
                  incl. of taxes
                </div>
                <div className='my-8'>
                <butto className='w-full cursor-pointer  p-6 rounded-full bg-[#6b13b9] text-white text-lg font-medium transition-transform active:scale-45 mb-3 hover:opacity-75' 
                  onClick={() => {
                    dispatch(
                            addToCart({
                                ...product?.data?.[0],
                         
                                oneQuantityPrice: p.price,
                  })
                        );
                    notify()
                    }
                  }
              
                >
              Add To Cart
            </butto> 
                </div>
                <div className='text-lg font-bold mb-5'>
                  Product details 
                </div>
                <div className='text-md mb-5'>
                {p.description}
        
                </div>
            </div>
           
        </div>
        < RelatedProducts products={products}/>
    </div>
  )
}

export default ProductDetails;
export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
      params: {
          slug: p.attributes.slug,
      },
  }));

  return {
      paths,
      fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  )
  return {
      props: {

          product,
        products
      },
  };
}