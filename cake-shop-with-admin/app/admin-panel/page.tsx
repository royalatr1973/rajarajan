'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, Package, RefreshCcw } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'biscuits' | 'chocolates' | 'brownies';
  type: string;
  image: string;
  is_featured: boolean;
};

type Category = 'cakes' | 'biscuits' | 'chocolates' | 'brownies';

const categoryInfo = {
  cakes: { title: '🎂 Cakes', color: 'bg-pink-500', icon: '🎂' },
  biscuits: { title: '🍪 Biscuits', color: 'bg-amber-500', icon: '🍪' },
  chocolates: { title: '🍫 Chocolates', color: 'bg-brown-500', icon: '🍫' },
  brownies: { title: '🧁 Brownies', color: 'bg-purple-500', icon: '🧁' },
};

export default function AdminPanel() {
  const [allProducts, setAllProducts] = useState<Record<Category, Product[]>>({
    cakes: [],
    biscuits: [],
    chocolates: [],
    brownies: []
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>('cakes');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentProducts = allProducts[selectedCategory];

  // Load products from Supabase
  const loadProducts = async (category?: Category) => {
    try {
      setLoading(true);
      setError(null);

      if (category) {
        const response = await fetch(`/api/products?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setAllProducts(prev => ({ ...prev, [category]: data }));
      } else {
        // Load all categories
        const categories: Category[] = ['cakes', 'biscuits', 'chocolates', 'brownies'];
        const results = await Promise.all(
          categories.map(cat => fetch(`/api/products?category=${cat}`).then(r => r.json()))
        );
        const productsData: Record<Category, Product[]> = {
          cakes: results[0],
          biscuits: results[1],
          chocolates: results[2],
          brownies: results[3]
        };
        setAllProducts(productsData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount and when category changes
  useEffect(() => {
    loadProducts(selectedCategory);
  }, [selectedCategory]);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');

      // Remove from local state
      setAllProducts({
        ...allProducts,
        [selectedCategory]: currentProducts.filter(p => p.id !== id)
      });

      alert('Product deleted successfully!');
    } catch (err) {
      alert('Failed to delete product: ' + (err instanceof Error ? err.message : 'Unknown error'));
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/products/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Failed to update product');

      const updatedProduct = await response.json();

      // Update local state
      setAllProducts({
        ...allProducts,
        [selectedCategory]: currentProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      });

      setEditingId(null);
      setEditForm(null);
      alert('Product updated successfully!');
    } catch (err) {
      alert('Failed to update product: ' + (err instanceof Error ? err.message : 'Unknown error'));
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
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
      is_featured: false
    });
  };

  const handleAddSave = async () => {
    if (!editForm || !editForm.name) {
      alert('Please fill in the product name');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Failed to create product');

      const newProduct = await response.json();

      // Add to local state
      setAllProducts({
        ...allProducts,
        [selectedCategory]: [...currentProducts, newProduct]
      });

      setShowAddForm(false);
      setEditForm(null);
      alert('Product created successfully!');
    } catch (err) {
      alert('Failed to create product: ' + (err instanceof Error ? err.message : 'Unknown error'));
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-light p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cocoa-dark">🏪 Product Management</h1>
              <p className="text-cocoa-medium">
                {loading ? 'Loading...' : `Manage all your product verticals - Connected to Supabase ✅`}
              </p>
            </div>
            <button
              onClick={() => loadProducts()}
              disabled={loading}
              className="flex items-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} /> Refresh All
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              ⚠️ {error}
            </div>
          )}

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
                    checked={editForm.is_featured}
                    onChange={(e) => setEditForm({ ...editForm, is_featured: e.target.checked })}
                    className="mr-2 w-4 h-4"
                  />
                  <label className="text-sm font-semibold text-cocoa-dark">Featured Product</label>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={showAddForm ? handleAddSave : handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <Save size={18} /> {loading ? 'Saving...' : 'Save to Database'}
                </button>
                <button
                  onClick={() => { setEditingId(null); setShowAddForm(false); setEditForm(null); }}
                  disabled={loading}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
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
                  {product.is_featured && (
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
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-all disabled:opacity-50"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-all disabled:opacity-50"
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
          <h2 className="text-xl font-bold text-cocoa-dark mb-3">✨ How to Use (Supabase Edition)</h2>
          <ol className="list-decimal list-inside space-y-2 text-cocoa-medium">
            <li>Switch between product categories using the tabs above</li>
            <li>Add, edit, or delete products in each category</li>
            <li>Mark products as "Featured" to show them on the homepage</li>
            <li><strong>Changes save instantly to Supabase!</strong> 🚀</li>
            <li>No need to commit code or redeploy - changes go live immediately</li>
            <li>Click "Refresh All" to reload data from the database</li>
          </ol>
          <div className="mt-4 p-4 bg-gold/10 rounded-lg border border-gold">
            <p className="text-sm text-cocoa-dark">
              💡 <strong>Note:</strong> Make sure your Supabase environment variables are configured in <code>.env.local</code> for local development and in Vercel for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
