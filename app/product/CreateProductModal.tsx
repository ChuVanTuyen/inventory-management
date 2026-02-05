'use client';

import Title from '@/components/Title';
import { NewProduct } from '@/libs/frontend/types/global.type';
import { ChangeEvent, FormEvent, useState } from 'react';

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: NewProduct) => void;
};

export default function CreateProductModal({ isOpen, onClose, onCreate }: CreateProductModalProps) {
  const [formData, setFormData] = useState<NewProduct>({
    name: '',
    price: 0,
    stockQuantity: 0,
    rating: 0
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'price' || name === 'stockQuantity' || name === 'rating'
          ? parseFloat(value)
          : value
    });
  };

  if (!isOpen) return null;

  const labelCss = 'block text-sm font-medium text-gray-700';
  const inputCss = 'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

  return (
    <div className="fixed inset-0 bg-[#4a556580] overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Title name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCss}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCss}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCss}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCss}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCss}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCss}
            required
          />

          {/* RATING */}
          <label htmlFor="rating" className={labelCss}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCss}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
