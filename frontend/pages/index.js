import Banner from "@/components/Banner";
import ProductCart from "@/components/ProductCart";

import { fetchDataFromApi } from "@/utils/api";
export default function Home({ products }) {
    return (
        <main>
            <Banner />
         
                {/* heading and paragaph start */}
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                     Comfort for your house 
                    </div>
            
                </div>
          
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {products?.data?.map((product) => (
                        <ProductCart key={product?.id} data={product} />
                    ))}
         
                </div>
                {/* products grid end */}
     
        </main>
    );
}

export async function getStaticProps() {
    const products = await fetchDataFromApi("/api/products?populates=*");

    return {
        props: { products, },
    };
};