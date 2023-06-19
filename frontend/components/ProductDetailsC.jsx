import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsC = ({ images }) => {
    return (
        <>
        
        <div>
                    {images?.map((img)=> (
                                   <img
                                   key={img.id}
                                   src={img.attributes.url}
                                   className="aspect-[50/40] md:h-[340px] object-adjust px-[40px] py-[40px]"
                                   alt={img.attributes.name}
                               />
                           
                    ))}
             
                </div>

        </>
    );
};

export default ProductDetailsC;