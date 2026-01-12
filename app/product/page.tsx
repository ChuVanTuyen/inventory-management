'use client';

import Title from '@/components/Title';
import { useGetProductsQuery } from '@/libs/frontend/services/productApi';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError || !products) {
    return <div className="text-center text-red-500 py-4">Failed to fecth products</div>;
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 bg-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <Title name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 text-gray-200!" />
          Create Product
        </button>
      </div>

      {/* Body product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                <p className=''></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
