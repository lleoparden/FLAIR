import { useState } from 'react';
import { Plus, X, Upload, Edit2, Trash2, ImageIcon, DollarSign, Tag } from 'lucide-react';

import tee1 from "../assets/tee1.png";
import tee2 from "../assets/tee2.webp";
import tee3 from "../assets/tee3.webp";

function Dashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: tee1,
      title: "FLAIR 'DEFINE YOUR FORM' Oversized Tee – White",
      price: "420.00",
      oldPrice: "600.00"
    },
    {
      id: 2,
      image: tee2,
      title: "FLAIR 'FLUID' Oversized Tee – White",
      price: "385.00",
      oldPrice: "550.00"
    },
    {
      id: 3,
      image: tee3,
      title: "Snake's Wind Shorts",
      price: "550.00",
      oldPrice: "750.00"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    oldPrice: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...formData
      };
      setProducts([...products, newProduct]);
    }
    
    closeModal();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice || '',
      image: product.image
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      price: '',
      oldPrice: '',
      image: ''
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
        
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your product catalog</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border-2 border-black">
            <div className="text-4xl font-black mb-2">{products.length}</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">Total Products</div>
          </div>
          <div className="p-6 border-2 border-black">
            <div className="text-4xl font-black mb-2">{products.filter(p => p.oldPrice).length}</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">On Sale</div>
          </div>
          <div className="p-6 border-2 border-black">
            <div className="text-4xl font-black mb-2">LE {products.reduce((acc, p) => acc + parseFloat(p.price), 0).toFixed(2)}</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">Total Value</div>
          </div>
        </div>

        {/* Products Table */}
        <div className="border-2 border-black">
          <div className="bg-black text-white p-4">
            <h2 className="text-xl font-bold tracking-wide">Products</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-black">
                <tr>
                  <th className="text-left p-4 font-bold text-sm uppercase tracking-wider">Image</th>
                  <th className="text-left p-4 font-bold text-sm uppercase tracking-wider">Product</th>
                  <th className="text-left p-4 font-bold text-sm uppercase tracking-wider">Price</th>
                  <th className="text-left p-4 font-bold text-sm uppercase tracking-wider">Old Price</th>
                  <th className="text-right p-4 font-bold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="p-4">
                      <div className="w-16 h-16 bg-gray-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-sm max-w-md">{product.title}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold">LE {product.price}</div>
                    </td>
                    <td className="p-4">
                      {product.oldPrice && (
                        <div className="text-gray-500 line-through">LE {product.oldPrice}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-gray-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-100 transition-colors text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-black bg-black text-white">
              <h2 className="text-2xl font-black tracking-tight">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={closeModal}
                className="hover:bg-gray-800 p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-black transition-colors">
                  {formData.image ? (
                    <div className="relative">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="max-h-64 mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 bg-black text-white p-2 hover:bg-gray-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <div className="text-sm font-medium mb-2">Click to upload image</div>
                      <div className="text-xs text-gray-500">PNG, JPG up to 10MB</div>
                    </label>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-4 border-2 border-black focus:outline-none focus:border-gray-600"
                  placeholder="Enter product title"
                />
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Price (LE)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-4 border-2 border-black focus:outline-none focus:border-gray-600"
                  placeholder="420.00"
                />
              </div>

              {/* Old Price */}
              <div className="mb-8">
                <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                  Old Price (LE) - Optional
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                  className="w-full p-4 border-2 border-black focus:outline-none focus:border-gray-600"
                  placeholder="600.00"
                />
                <p className="text-xs text-gray-500 mt-2">Leave empty if not on sale</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-4 border-2 border-black font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;