/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import getStripe from '@/app/checkout/page';

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: string;
}

export default function ProductData() {
  const API = "https://dummyjson.com/products";

  const [showData, setShowData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    thumbnail: "",
    title: "",
    price: "",
  });

  // Display Product

  const fetchData = async () => {
    try {
      const response = await Axios.get(API);
      setShowData(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Remove Product

  const removeProduct = (id: any) => {
    let findProduct = showData.filter((product) => product.id !== id);
    setShowData(findProduct);
  };

  const handleInputChange = (e: any) => {
    const { name, files } = e.target;
    if (name === "thumbnail" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({ ...newProduct, [name]: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      const value = e.target.value;
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add Product

  const handleAddProduct = () => {
    // Add newProduct to the list of products

    if (
      newProduct.price === "" ||
      newProduct.thumbnail === "" ||
      newProduct.title === ""
    ) {
      toast.warning("Please fill all the fields");
    } else {
      setShowData([newProduct, ...showData]);
      // Close the moda
      setIsModalOpen(false);

      toast.success("Product Added ");
      // Reset the newProduct state
      setNewProduct({ id: "", thumbnail: "", title: "", price: "" });
    }
  };


    // Handle Buy Now
    const handleBuyNow = async (price:any) => {
      try {
        const stripe = await getStripe();
        const response = await Axios.post("/API/Users/checkout", { amount: parseFloat(price) });
        const sessionId = response.data.sessionId;
  
        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error(error);
        toast.error("Failed to initiate Stripe checkout");
      }
    };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-center my-8">
          Buy Your Favourite Product
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-400 p-2 border-0 mb-4 flex mx-auto"
        >
          Add Product
        </button>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {showData.map((product: any, id) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-32 h-32 object-cover mb-4"
              />
              <p className="text-lg font-semibold text-gray-800">
                {product.title}
              </p>
              <p className="text-base text-gray-600">${product.price}</p>
              <button
                className="bg-red-500 border-0 p-2 mt-2 absolute right-1 top-0"
                onClick={() => removeProduct(product.id)}
              >
                Remove
              </button>
              <button className="bg-yellow-400 border-0 p-2 mt-2 font-bold" onClick={() => handleBuyNow(product.price)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add Product</h3>
            <input
              type="file"
              name="thumbnail"
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 mb-2 text-black mr-2"
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 mb-2 text-black mr-2"
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 mb-2 text-black mr-2"
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-400 p-2 border-0 rounded-lg text-white"
            >
              Add Product
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-400 p-2 border-0 rounded-lg text-white ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
