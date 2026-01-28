'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, Save } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  image: string;
  isBestSeller: boolean;
};

// Initial data from your current products
const initialProducts: Product[] = [
  { id: '1', name: 'Chocolate Truffle Cake', description: 'Rich chocolate layers with smooth truffle cream frosting', price: 0, type: 'Chocolate', image: '/images/chocolate.jpg', isBestSeller: true },
  { id: '2', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', price: 0, type: 'Theme', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', isBestSeller: true },
  { id: '3', name: 'Black Forest Cake', description: 'Chocolate cake with cherry filling and whipped cream', price: 0, type: 'Chocolate', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', isBestSeller: true },
  { id: '4', name: 'Butterscotch Cake', description: 'Classic butterscotch flavor with crunchy caramel bits', price: 0, type: 'Classic', image: '/images/butterscotch.jpg', isBestSeller: true },
  { id: '5', name: 'Vanilla Birthday Cake', description: 'Light vanilla sponge with buttercream frosting', price: 0, type: 'Classic', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80', isBestSeller: false },
  { id: '6', name: 'Custom Theme Cake', description: 'Personalized theme cakes for any occasion', price: 0, type: 'Theme', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80', isBestSeller: false },
  { id: '7', name: 'Pineapple Cake', description: 'Tropical pineapple layers with fresh pineapple chunks', price: 0, type: 'Fruit', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80', isBestSeller: false },
  { id: '8', name: 'Brownie Cake', description: 'Dense, fudgy chocolate brownie layers', price: 0, type: 'Chocolate', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', isBestSeller: false },
  { id: '9', name: 'Mango Delight Cake', description: 'Fresh mango puree with vanilla sponge', price: 0, type: 'Fruit', image: '/images/mango.jpg', isBestSeller: false },
  { id: '10', name: 'Grape Delight Cake', description: 'Fresh Grape puree with vanilla sponge', price: 0, type: 'Fruit', image: '/images/grape.jpg', isBestSeller: false },
];

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editForm) {
      setProducts(products.map(p => p.id === editForm.id ? editForm : p));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAdd = () => {
    setShowAddForm(true);
    setEditingId(null);
    const newId = (Math.max(...products.map(p => parseInt(p.id))) + 1).toString();
    setEditForm({
      id: newId,
      name: '',
      description: '',
      price: 0,
      type: 'Chocolate',
      image: '',
      isBestSeller: false
    });
  };

  const handleAddSave = () => {
    if (editForm && editForm.name) {
      setProducts([...products, editForm]);
      setShowAddForm(false);
      setEditForm(null);
    }
  };

  const downloadProductsFile = () => {
    const fileContent = `import { Product } from '@/types/product';

export const products: Product[] = [
${products.map(p => `  {
    id: '${p.id}',
    name: '${p.name}',
    description: '${p.description}',
    price: ${p.price},
    type: '${p.type}',
    image: '${p.image}',
    isBestSeller: ${p.isBestSeller},
  },`).join('\n')}
];
`;

    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cream-light p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cocoa-dark">🍰 Admin Panel</h1>
              <p className="text-cocoa-medium">Manage your cake products</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <Plus size={20} /> Add Product
              </button>
              <button
                onClick={downloadProductsFile}
                className="flex items-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <Download size={20} /> Download File
              </button>
            </div>
          </div>

          {/* Edit/Add Form */}
          {(editingId || showAddForm) && editForm && (
            <div className="bg-cream p-6 rounded-lg mb-6 border-2 border-gold">
              <h3 className="text-xl font-bold text-cocoa-dark mb-4">
                {showAddForm ? 'Add New Product' : 'Edit Product'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                  >
                    <option>Chocolate</option>
                    <option>Classic</option>
                    <option>Theme</option>
                    <option>Fruit</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                    rows={2}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Image Path</label>
                  <input
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                    placeholder="/images/cake.jpg or https://..."
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editForm.isBestSeller}
                    onChange={(e) => setEditForm({ ...editForm, isBestSeller: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm font-semibold text-cocoa-dark">Best Seller</label>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={showAddForm ? handleAddSave : handleSave}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold"
                >
                  <Save size={18} /> Save
                </button>
                <button
                  onClick={() => { setEditingId(null); setShowAddForm(false); setEditForm(null); }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cocoa-dark text-cream-light">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-center">Best Seller</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-cream-light'}>
                    <td className="px-4 py-3 text-cocoa-dark font-semibold">{product.id}</td>
                    <td className="px-4 py-3 text-cocoa-dark font-semibold">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="bg-gold text-cocoa-dark px-2 py-1 rounded text-sm font-semibold">
                        {product.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-cocoa-medium text-sm">{product.description.substring(0, 50)}...</td>
                    <td className="px-4 py-3 text-center">
                      {product.isBestSeller && <span className="text-gold text-xl">⭐</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-cocoa-dark mb-3">📝 How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-cocoa-medium">
            <li>Edit products using the Edit button</li>
            <li>Add new products with the "+ Add Product" button</li>
            <li>Delete products you don't need</li>
            <li>Click "Download File" when done</li>
            <li>Replace <code className="bg-cream px-2 py-1 rounded text-sm">lib/data/products.ts</code> with the downloaded file</li>
            <li>Push to GitHub and deploy!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
