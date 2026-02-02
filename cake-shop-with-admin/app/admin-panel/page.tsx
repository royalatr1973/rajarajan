'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, Save, Package } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'biscuits' | 'chocolates' | 'brownies';
  type: string;
  image: string;
  isFeatured: boolean;
};

type Category = 'cakes' | 'biscuits' | 'chocolates' | 'brownies';

// Initial data for all verticals
const initialData = {
  cakes: [
    { id: 'c1', name: 'Chocolate Truffle Cake', description: 'Rich chocolate layers with smooth truffle cream frosting', category: 'cakes' as Category, type: 'Chocolate', image: '/images/chocolate.jpg', isFeatured: true },
    { id: 'c2', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', category: 'cakes' as Category, type: 'Theme', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', isFeatured: true },
    { id: 'c3', name: 'Black Forest Cake', description: 'Chocolate cake with cherry filling and whipped cream', category: 'cakes' as Category, type: 'Chocolate', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', isFeatured: true },
    { id: 'c4', name: 'Butterscotch Cake', description: 'Classic butterscotch flavor with crunchy caramel bits', category: 'cakes' as Category, type: 'Classic', image: '/images/butterscotch.jpg', isFeatured: true },
  ],
  biscuits: [
    { id: 'b1', name: 'Chocolate Chip Cookies', description: 'Classic cookies loaded with chocolate chips', category: 'biscuits' as Category, type: 'Chocolate', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', isFeatured: true },
    { id: 'b2', name: 'Butter Cookies', description: 'Melt-in-mouth buttery cookies', category: 'biscuits' as Category, type: 'Classic', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', isFeatured: true },
    { id: 'b3', name: 'Oatmeal Cookies', description: 'Healthy oats cookies with raisins', category: 'biscuits' as Category, type: 'Healthy', image: 'https://images.unsplash.com/photo-1590080876876-5674a3e5e26f?w=800&q=80', isFeatured: false },
  ],
  chocolates: [
    { id: 'ch1', name: 'Dark Chocolate Truffles', description: 'Premium dark chocolate truffles with cocoa dusting', category: 'chocolates' as Category, type: 'Dark', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', isFeatured: true },
    { id: 'ch2', name: 'Milk Chocolate Box', description: 'Assorted milk chocolates in a gift box', category: 'chocolates' as Category, type: 'Milk', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80', isFeatured: true },
    { id: 'ch3', name: 'Chocolate Bark', description: 'Handcrafted chocolate bark with nuts', category: 'chocolates' as Category, type: 'Specialty', image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80', isFeatured: false },
  ],
  brownies: [
    { id: 'br1', name: 'Classic Fudge Brownies', description: 'Dense, fudgy brownies with intense chocolate flavor', category: 'brownies' as Category, type: 'Classic', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', isFeatured: true },
    { id: 'br2', name: 'Walnut Brownies', description: 'Chewy brownies loaded with crunchy walnuts', category: 'brownies' as Category, type: 'Nut', image: 'https://images.unsplash.com/photo-1564355808853-07d7e1278c76?w=800&q=80', isFeatured: true },
    { id: 'br3', name: 'Cream Cheese Brownies', description: 'Swirled brownies with tangy cream cheese', category: 'brownies' as Category, type: 'Specialty', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80', isFeatured: false },
  ],
};

const categoryInfo = {
  cakes: { title: '🎂 Cakes', color: 'bg-pink-500', icon: '🎂' },
  biscuits: { title: '🍪 Biscuits', color: 'bg-amber-500', icon: '🍪' },
  chocolates: { title: '🍫 Chocolates', color: 'bg-brown-500', icon: '🍫' },
  brownies: { title: '🧁 Brownies', color: 'bg-purple-500', icon: '🧁' },
};

export default function AdminPanel() {
  const [allProducts, setAllProducts] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState<Category>('cakes');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const currentProducts = allProducts[selectedCategory];

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setAllProducts({
        ...allProducts,
        [selectedCategory]: currentProducts.filter(p => p.id !== id)
      });
    }
  };

  const handleSave = () => {
    if (editForm) {
      setAllProducts({
        ...allProducts,
        [selectedCategory]: currentProducts.map(p => p.id === editForm.id ? editForm : p)
      });
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAdd = () => {
    setShowAddForm(true);
    setEditingId(null);
    const prefix = selectedCategory.substring(0, 2);
    const maxId = currentProducts.length > 0
      ? Math.max(...currentProducts.map(p => parseInt(p.id.replace(/\D/g, '') || '0')))
      : 0;
    const newId = `${prefix}${maxId + 1}`;

    setEditForm({
      id: newId,
      name: '',
      description: '',
      category: selectedCategory,
      type: '',
      image: '',
      isFeatured: false
    });
  };

  const handleAddSave = () => {
    if (editForm && editForm.name) {
      setAllProducts({
        ...allProducts,
        [selectedCategory]: [...currentProducts, editForm]
      });
      setShowAddForm(false);
      setEditForm(null);
    }
  };

  const downloadAllData = () => {
    const fileContent = JSON.stringify(allProducts, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all-products.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cream-light p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cocoa-dark">🏪 Product Management</h1>
              <p className="text-cocoa-medium">Manage all your product verticals</p>
            </div>
            <button
              onClick={downloadAllData}
              className="flex items-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Download size={20} /> Download All Data
            </button>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(categoryInfo) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setEditingId(null);
                  setShowAddForm(false);
                  setEditForm(null);
                }}
                className={`p-4 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-cocoa-dark shadow-lg scale-105'
                    : 'bg-white text-cocoa-medium hover:bg-cream border-2 border-cream'
                }`}
              >
                <div className="text-2xl mb-1">{categoryInfo[cat].icon}</div>
                <div className="text-sm capitalize">{cat}</div>
                <div className="text-xs mt-1">({allProducts[cat].length} items)</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Category Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cocoa-dark">
              {categoryInfo[selectedCategory].icon} {categoryInfo[selectedCategory].title}
            </h2>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Plus size={20} /> Add {selectedCategory.slice(0, -1)}
            </button>
          </div>

          {/* Edit/Add Form */}
          {(editingId || showAddForm) && editForm && (
            <div className="bg-cream p-6 rounded-lg mb-6 border-2 border-gold">
              <h3 className="text-xl font-bold text-cocoa-dark mb-4">
                {showAddForm ? `Add New ${selectedCategory.slice(0, -1)}` : 'Edit Product'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Type/Variety</label>
                  <input
                    type="text"
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                    placeholder="e.g., Chocolate, Classic, etc."
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                    rows={2}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Image Path</label>
                  <input
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-cocoa-medium rounded-lg"
                    placeholder="/images/product.jpg or https://..."
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editForm.isFeatured}
                    onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.checked })}
                    className="mr-2 w-4 h-4"
                  />
                  <label className="text-sm font-semibold text-cocoa-dark">Featured Product</label>
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="bg-cream-light rounded-lg p-4 border-2 border-gold/20 hover:border-gold transition-all">
                <div className="relative h-40 mb-3 rounded-lg overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-2 right-2 bg-gold text-cocoa-dark px-2 py-1 rounded text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-cocoa-dark mb-1">{product.name}</h3>
                <p className="text-xs text-cocoa-medium mb-2">{product.description.substring(0, 60)}...</p>
                <div className="flex items-center justify-between">
                  <span className="bg-gold text-cocoa-dark px-2 py-1 rounded text-xs font-semibold">
                    {product.type}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentProducts.length === 0 && (
            <div className="text-center py-12 text-cocoa-medium">
              <Package size={48} className="mx-auto mb-3 opacity-50" />
              <p>No products in this category yet.</p>
              <p className="text-sm">Click "+ Add {selectedCategory.slice(0, -1)}" to get started!</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-cocoa-dark mb-3">📝 How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-cocoa-medium">
            <li>Switch between product categories using the tabs above</li>
            <li>Add, edit, or delete products in each category</li>
            <li>Mark products as "Featured" to show them on the homepage</li>
            <li>Click "Download All Data" to save your changes</li>
            <li>Save the downloaded file and commit to GitHub</li>
            <li>Deploy to see your changes live!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
