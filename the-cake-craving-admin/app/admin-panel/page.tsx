'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Download, Save, Package, RefreshCw, Database } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Product = {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'biscuits' | 'chocolates' | 'brownies';
  type: string;
  image: string;
  is_featured: boolean;
  is_best_seller: boolean;
  display_order: number;
};

type Category = 'cakes' | 'biscuits' | 'chocolates' | 'brownies';

const fallbackData: Record<Category, Product[]> = {
  cakes: [
    { id: 'c1', name: 'Chocolate Truffle Cake', description: 'Rich chocolate layers with smooth truffle cream frosting', category: 'cakes', type: 'Chocolate', image: '/images/chocolate.jpg', is_featured: true, is_best_seller: true, display_order: 1 },
    { id: 'c2', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', category: 'cakes', type: 'Theme', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', is_featured: true, is_best_seller: true, display_order: 2 },
    { id: 'c3', name: 'Black Forest Cake', description: 'Chocolate cake with cherry filling and whipped cream', category: 'cakes', type: 'Chocolate', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', is_featured: true, is_best_seller: true, display_order: 3 },
    { id: 'c4', name: 'Butterscotch Cake', description: 'Classic butterscotch flavor with crunchy caramel bits', category: 'cakes', type: 'Classic', image: '/images/butterscotch.jpg', is_featured: true, is_best_seller: true, display_order: 4 },
  ],
  biscuits: [
    { id: 'b1', name: 'Chocolate Chip Cookies', description: 'Classic cookies loaded with chocolate chips', category: 'biscuits', type: 'Chocolate', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', is_featured: true, is_best_seller: false, display_order: 1 },
    { id: 'b2', name: 'Butter Cookies', description: 'Melt-in-mouth buttery cookies', category: 'biscuits', type: 'Classic', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', is_featured: true, is_best_seller: false, display_order: 2 },
    { id: 'b3', name: 'Oatmeal Cookies', description: 'Healthy oats cookies with raisins', category: 'biscuits', type: 'Healthy', image: 'https://images.unsplash.com/photo-1590080876876-5674a3e5e26f?w=800&q=80', is_featured: false, is_best_seller: false, display_order: 3 },
  ],
  chocolates: [
    { id: 'ch1', name: 'Dark Chocolate Truffles', description: 'Premium dark chocolate truffles with cocoa dusting', category: 'chocolates', type: 'Dark', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', is_featured: true, is_best_seller: false, display_order: 1 },
    { id: 'ch2', name: 'Milk Chocolate Box', description: 'Assorted milk chocolates in a gift box', category: 'chocolates', type: 'Milk', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80', is_featured: true, is_best_seller: false, display_order: 2 },
    { id: 'ch3', name: 'Chocolate Bark', description: 'Handcrafted chocolate bark with nuts', category: 'chocolates', type: 'Specialty', image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80', is_featured: false, is_best_seller: false, display_order: 3 },
  ],
  brownies: [
    { id: 'br1', name: 'Classic Fudge Brownies', description: 'Dense, fudgy brownies with intense chocolate flavor', category: 'brownies', type: 'Classic', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', is_featured: true, is_best_seller: false, display_order: 1 },
    { id: 'br2', name: 'Walnut Brownies', description: 'Chewy brownies loaded with crunchy walnuts', category: 'brownies', type: 'Nut', image: 'https://images.unsplash.com/photo-1564355808853-07d7e1278c76?w=800&q=80', is_featured: true, is_best_seller: false, display_order: 2 },
    { id: 'br3', name: 'Cream Cheese Brownies', description: 'Swirled brownies with tangy cream cheese', category: 'brownies', type: 'Specialty', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80', is_featured: false, is_best_seller: false, display_order: 3 },
  ],
};

const categoryInfo = {
  cakes: { title: '🎂 Cakes', color: 'bg-pink-500', icon: '🎂' },
  biscuits: { title: '🍪 Biscuits', color: 'bg-amber-500', icon: '🍪' },
  chocolates: { title: '🍫 Chocolates', color: 'bg-brown-500', icon: '🍫' },
  brownies: { title: '🧁 Brownies', color: 'bg-purple-500', icon: '🧁' },
};

export default function AdminPanel() {
  const [allProducts, setAllProducts] = useState<Record<Category, Product[]>>(fallbackData);
  const [selectedCategory, setSelectedCategory] = useState<Category>('cakes');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    if (!supabase) {
      setIsConnected(false);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        setIsConnected(false);
        setLoading(false);
        return;
      }

      setIsConnected(true);

      if (data && data.length > 0) {
        const grouped: Record<Category, Product[]> = {
          cakes: [],
          biscuits: [],
          chocolates: [],
          brownies: [],
        };
        data.forEach((p: any) => {
          if (grouped[p.category as Category]) {
            grouped[p.category as Category].push({
              ...p,
              type: p.product_type,
            });
          }
        });
        setAllProducts(grouped);
      }
    } catch {
      setIsConnected(false);
    }
    setLoading(false);
  };

  const currentProducts = allProducts[selectedCategory];

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    if (supabase && isConnected) {
      setSaving(true);
      const { error } = await supabase.from('products').delete().eq('id', id);
      setSaving(false);
      if (error) {
        alert('Error deleting product: ' + error.message);
        return;
      }
    }

    setAllProducts({
      ...allProducts,
      [selectedCategory]: currentProducts.filter(p => p.id !== id),
    });
  };

  const handleSave = async () => {
    if (!editForm) return;

    if (supabase && isConnected) {
      setSaving(true);
      const { error } = await supabase
        .from('products')
        .update({
          name: editForm.name,
          description: editForm.description,
          product_type: editForm.type,
          image: editForm.image,
          is_featured: editForm.is_featured,
          is_best_seller: editForm.is_best_seller,
          display_order: editForm.display_order,
        })
        .eq('id', editForm.id);
      setSaving(false);
      if (error) {
        alert('Error saving product: ' + error.message);
        return;
      }
    }

    setAllProducts({
      ...allProducts,
      [selectedCategory]: currentProducts.map(p => p.id === editForm.id ? editForm : p),
    });
    setEditingId(null);
    setEditForm(null);
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
      is_featured: false,
      is_best_seller: false,
      display_order: currentProducts.length + 1,
    });
  };

  const handleAddSave = async () => {
    if (!editForm || !editForm.name) return;

    if (supabase && isConnected) {
      setSaving(true);
      const { error } = await supabase.from('products').insert({
        id: editForm.id,
        name: editForm.name,
        description: editForm.description,
        category: editForm.category,
        product_type: editForm.type,
        image: editForm.image,
        is_featured: editForm.is_featured,
        is_best_seller: editForm.is_best_seller,
        display_order: editForm.display_order,
      });
      setSaving(false);
      if (error) {
        alert('Error adding product: ' + error.message);
        return;
      }
    }

    setAllProducts({
      ...allProducts,
      [selectedCategory]: [...currentProducts, editForm],
    });
    setShowAddForm(false);
    setEditForm(null);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={48} className="mx-auto mb-4 text-gold animate-spin" />
          <p className="text-cocoa-dark text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cocoa-dark">🏪 Product Management</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-cocoa-medium">Manage all your product verticals</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${isConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  <Database size={12} />
                  {isConnected ? 'Supabase Connected' : 'Using Local Data'}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadProducts}
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <RefreshCw size={20} /> Refresh
              </button>
              <button
                onClick={downloadAllData}
                className="flex items-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <Download size={20} /> Download All Data
              </button>
            </div>
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
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editForm.is_featured}
                      onChange={(e) => setEditForm({ ...editForm, is_featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-cocoa-dark">Featured</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editForm.is_best_seller}
                      onChange={(e) => setEditForm({ ...editForm, is_best_seller: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-cocoa-dark">Best Seller</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={showAddForm ? handleAddSave : handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <Save size={18} /> {saving ? 'Saving...' : 'Save'}
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
                  {product.is_featured && (
                    <div className="absolute top-2 right-2 bg-gold text-cocoa-dark px-2 py-1 rounded text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}
                  {product.is_best_seller && (
                    <div className="absolute top-2 left-2 bg-cocoa-dark text-gold px-2 py-1 rounded text-xs font-bold">
                      🏆 Best Seller
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
              <p className="text-sm">Click &quot;+ Add {selectedCategory.slice(0, -1)}&quot; to get started!</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-cocoa-dark mb-3">📝 How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-cocoa-medium">
            <li>Set up your Supabase project and run the SQL setup script (supabase-setup.sql)</li>
            <li>Add your Supabase URL and anon key to .env.local</li>
            <li>Switch between product categories using the tabs above</li>
            <li>Add, edit, or delete products - changes sync to Supabase automatically</li>
            <li>Mark products as &quot;Featured&quot; or &quot;Best Seller&quot; to highlight them</li>
            <li>Click &quot;Download All Data&quot; to export a JSON backup</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
