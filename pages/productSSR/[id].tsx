import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
}

export const getServerSideProps = (async (context) => {
    const { id} = context.params as { id: string }; 
    console.log("this is context ", context);

    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
        return {
            notFound: true, 
        };
    }
    
    const product: Product = await res.json();

    return {
        props: { product },
    };
}) satisfies GetServerSideProps<{ product: Product }>;

export default function ProductDetails({
    product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-4">SSR Example</h2>
            <h2 className="text-2xl font-bold text-center mb-4">Product Details</h2>
            <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-700 font-semibold">Category: {product.category}</p>
                <p className="text-blue-500 font-bold">${product.price}</p>
            </div>
        </div>
    );
}
