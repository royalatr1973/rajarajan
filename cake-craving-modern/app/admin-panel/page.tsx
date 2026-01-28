'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Download, Save, X, Upload,
  Eye, EyeOff, Lock, RefreshCw, Image as ImageIcon,
  CheckCircle, AlertCircle, LogOut
} from 'lucide-react';
import { useProducts } from '@/lib/ProductsContext';
import { Product, ChocolateType } from '@/types/product';
import Image from 'next/image';

const ADMIN_PASSWORD = 'cakeadmin2024';

export default function AdminPanel() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-authenticated');
    setPassword('');
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    setShowAddForm(false);
    setPreviewImage(product.image);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      showNotification('success', `"${name}" has been deleted.`);
    }
  };

  const handleSave = () => {
    if (editForm) {
      updateProduct(editForm.id, editForm);
      setEditingId(null);
      setEditForm(null);
      setPreviewImage(null);
      showNotification('success', 'Product updated successfully!');
    }
  };

  const handleAdd = () => {
    setShowAddForm(true);
    setEditingId(null);
    setEditForm({
      id: '',
      name: '',
      description: '',
      price: 0,
      type: 'Chocolate' as ChocolateType,
      image: '',
      isBestSeller: false
    });
    setPreviewImage(null);
  };

  const handleAddSave = () => {
    if (editForm && editForm.name && editForm.image) {
      addProduct(editForm);
      setShowAddForm(false);
      setEditForm(null);
      setPreviewImage(null);
      showNotification('success', 'New product added successfully!');
    } else {
      showNotification('error', 'Please fill in all required fields (Name and Image)');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setEditForm(null);
    setPreviewImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('error', 'Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        if (editForm) {
          setEditForm({ ...editForm, image: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if (confirm('This will reset all products to the original menu. Are you sure?')) {
      resetProducts();
      showNotification('success', 'Products reset to original menu.');
    }
  };

  const downloadProductsFile = () => {
    const fileContent = `import { Product } from '@/types/product';

export const products: Product[] = [
${products.map(p => `  {
    id: '${p.id}',
    name: '${p.name.replace(/'/g, "\\'")}',
    description: '${p.description.replace(/'/g, "\\'")}',
    price: ${p.price},
    type: '${p.type}',
    image: '${p.image.startsWith('data:') ? '/images/uploaded-image.jpg' : p.image}',
    isBestSeller: ${p.isBestSeller || false},
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
    showNotification('success', 'Products file downloaded!');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={40} className="text-gold" />
            </div>
            <h1 className="text-3xl font-bold text-cocoa-dark">Admin Panel</h1>
            <p className="text-cocoa-medium mt-2">Enter password to access the menu manager</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cocoa-dark mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none transition-colors pr-12"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa-medium hover:text-cocoa-dark"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {loginError && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={16} /> {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-cocoa-dark font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Access Admin Panel
            </button>
          </form>

          <p className="text-center text-cocoa-medium text-sm mt-6">
            Default password: <code className="bg-cream px-2 py-1 rounded">cakeadmin2024</code>
          </p>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-cocoa-dark text-cream-light py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gold">Menu Manager</h1>
            <p className="text-cream/80">Manage your cake menu items and photos</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
            >
              <Plus size={20} /> Add Cake
            </button>
            <button
              onClick={downloadProductsFile}
              className="flex items-center gap-2 bg-cocoa-medium hover:bg-cocoa-dark text-cream-light px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Download size={20} /> Export
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <RefreshCw size={20} /> Reset
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Edit/Add Form */}
        {(editingId || showAddForm) && editForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-gold">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cocoa-dark">
                {showAddForm ? 'Add New Cake' : 'Edit Cake'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-cocoa-medium hover:text-cocoa-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">
                    Cake Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    placeholder="e.g., Chocolate Truffle Cake"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Category</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as ChocolateType })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="Chocolate">Chocolate</option>
                    <option value="Classic">Classic</option>
                    <option value="Theme">Theme</option>
                    <option value="Fruit">Fruit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none transition-colors resize-none"
                    rows={3}
                    placeholder="Describe your delicious cake..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.isBestSeller || false}
                      onChange={(e) => setEditForm({ ...editForm, isBestSeller: e.target.checked })}
                      className="w-5 h-5 rounded border-cocoa-medium text-gold focus:ring-gold"
                    />
                    <span className="text-sm font-semibold text-cocoa-dark">Mark as Best Seller</span>
                  </label>
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-cocoa-dark mb-2">
                  Cake Image <span className="text-red-500">*</span>
                </label>

                <div className="space-y-4">
                  {/* Image Preview */}
                  <div className="relative aspect-square w-full max-w-[300px] mx-auto bg-cream rounded-lg overflow-hidden border-2 border-dashed border-cocoa-medium/30">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-cocoa-medium">
                        <ImageIcon size={48} className="mb-2 opacity-50" />
                        <p className="text-sm">No image selected</p>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-3 rounded-lg font-semibold transition-all w-full"
                    >
                      <Upload size={20} /> Upload Photo
                    </button>

                    {/* OR use URL */}
                    <div className="text-center text-cocoa-medium text-sm">- OR -</div>
                    <input
                      type="text"
                      value={editForm.image.startsWith('data:') ? '' : editForm.image}
                      onChange={(e) => {
                        setEditForm({ ...editForm, image: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                      className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none transition-colors text-sm"
                      placeholder="Enter image URL (e.g., /images/cake.jpg)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-cream">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={showAddForm ? handleAddSave : handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-gold hover:bg-gold-light text-cocoa-dark rounded-lg font-semibold transition-all"
              >
                <Save size={18} /> {showAddForm ? 'Add Cake' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isBestSeller && (
                  <span className="absolute top-3 left-3 bg-gold text-cocoa-dark text-xs font-bold px-2 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-cocoa-dark text-cream-light text-xs font-semibold px-2 py-1 rounded">
                  {product.type}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-cocoa-dark mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-cocoa-medium line-clamp-2 mb-4">{product.description}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all text-sm"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon size={64} className="mx-auto text-cocoa-medium/30 mb-4" />
            <h3 className="text-xl font-bold text-cocoa-dark mb-2">No Products Yet</h3>
            <p className="text-cocoa-medium mb-6">Start adding cakes to your menu</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Plus size={20} /> Add Your First Cake
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-cocoa-dark mb-4">How to Use the Menu Manager</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-cocoa-dark mb-2">Managing Products</h3>
              <ul className="space-y-2 text-cocoa-medium text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gold">1.</span>
                  Click "Add Cake" to add a new item to your menu
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">2.</span>
                  Click "Edit" on any cake to modify its details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">3.</span>
                  Upload photos directly or use image URLs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">4.</span>
                  Mark your popular items as "Best Sellers"
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-cocoa-dark mb-2">Tips</h3>
              <ul className="space-y-2 text-cocoa-medium text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gold">-</span>
                  Changes are saved automatically to your browser
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">-</span>
                  Use "Export" to download products for deployment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">-</span>
                  Use "Reset" to restore the original menu
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">-</span>
                  Image uploads are stored in your browser (max 5MB)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
