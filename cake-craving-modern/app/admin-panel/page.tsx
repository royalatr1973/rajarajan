'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Download, Save, X, Upload,
  Eye, EyeOff, Lock, RefreshCw, Image as ImageIcon,
  CheckCircle, AlertCircle, LogOut, GripVertical,
  Home, MessageSquare, Phone, Cake, Star
} from 'lucide-react';
import { useProducts, HeroSettings, Testimonial, ContactSettings } from '@/lib/ProductsContext';
import { Product, ChocolateType } from '@/types/product';

const ADMIN_PASSWORD = 'cakeadmin2024';

type TabType = 'products' | 'hero' | 'testimonials' | 'contact';

export default function AdminPanel() {
  const {
    products, addProduct, updateProduct, deleteProduct, reorderProducts, resetProducts,
    hero, updateHero,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    contact, updateContact
  } = useProducts();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Hero edit state
  const [heroForm, setHeroForm] = useState<HeroSettings>(hero);
  const [heroPreviewImage, setHeroPreviewImage] = useState<string>(hero.backgroundImage);

  // Testimonial edit state
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Testimonial | null>(null);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);

  // Contact edit state
  const [contactForm, setContactForm] = useState<ContactSettings>(contact);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Update forms when context data changes
  useEffect(() => {
    setHeroForm(hero);
    setHeroPreviewImage(hero.backgroundImage);
  }, [hero]);

  useEffect(() => {
    setContactForm(contact);
  }, [contact]);

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

  // Product handlers
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

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, product: Product) => {
    setDraggedItem(product);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const dragIndex = products.findIndex(p => p.id === draggedItem.id);
    if (dragIndex === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newProducts = [...products];
    newProducts.splice(dragIndex, 1);
    newProducts.splice(dropIndex, 0, draggedItem);
    reorderProducts(newProducts);

    setDraggedItem(null);
    setDragOverIndex(null);
    showNotification('success', 'Product order updated!');
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // Hero handlers
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('error', 'Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setHeroPreviewImage(base64);
        setHeroForm({ ...heroForm, backgroundImage: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroSave = () => {
    updateHero(heroForm);
    showNotification('success', 'Hero section updated!');
  };

  // Testimonial handlers
  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonialId(testimonial.id);
    setTestimonialForm({ ...testimonial });
    setShowAddTestimonial(false);
  };

  const handleDeleteTestimonial = (id: string, name: string) => {
    if (confirm(`Delete testimonial from "${name}"?`)) {
      deleteTestimonial(id);
      showNotification('success', 'Testimonial deleted.');
    }
  };

  const handleSaveTestimonial = () => {
    if (testimonialForm) {
      updateTestimonial(testimonialForm.id, testimonialForm);
      setEditingTestimonialId(null);
      setTestimonialForm(null);
      showNotification('success', 'Testimonial updated!');
    }
  };

  const handleAddTestimonial = () => {
    setShowAddTestimonial(true);
    setEditingTestimonialId(null);
    setTestimonialForm({ id: '', name: '', text: '', rating: 5 });
  };

  const handleAddTestimonialSave = () => {
    if (testimonialForm && testimonialForm.name && testimonialForm.text) {
      addTestimonial(testimonialForm);
      setShowAddTestimonial(false);
      setTestimonialForm(null);
      showNotification('success', 'Testimonial added!');
    } else {
      showNotification('error', 'Please fill in name and review text');
    }
  };

  const handleCancelTestimonial = () => {
    setEditingTestimonialId(null);
    setShowAddTestimonial(false);
    setTestimonialForm(null);
  };

  // Contact handlers
  const handleContactSave = () => {
    updateContact(contactForm);
    showNotification('success', 'Contact information updated!');
  };

  const handleReset = () => {
    if (confirm('This will reset ALL content to defaults. Are you sure?')) {
      resetProducts();
      showNotification('success', 'All content reset to defaults.');
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

          <p className="text-center text-cocoa-medium/50 text-xs mt-6">
            Contact the site owner if you forgot the password
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
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg transition-all ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-cocoa-dark text-cream-light py-4 px-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gold">Admin Panel</h1>
            <p className="text-cream/60 text-sm">Manage your website content</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={downloadProductsFile}
              className="flex items-center gap-1 bg-cocoa-medium hover:bg-cocoa-dark text-cream-light px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              <Download size={16} /> Export
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              <RefreshCw size={16} /> Reset
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gold/20 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'products', label: 'Menu Items', icon: Cake },
              { id: 'hero', label: 'Hero Section', icon: Home },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
              { id: 'contact', label: 'Contact Info', icon: Phone },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gold text-cocoa-dark'
                    : 'bg-cream hover:bg-gold/20 text-cocoa-dark'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-cocoa-dark">Menu Items</h2>
                <p className="text-cocoa-medium text-sm">Drag items to reorder. Changes save automatically.</p>
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
              >
                <Plus size={20} /> Add Cake
              </button>
            </div>

            {/* Edit/Add Form */}
            {(editingId || showAddForm) && editForm && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-gold">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-cocoa-dark">
                    {showAddForm ? 'Add New Cake' : 'Edit Cake'}
                  </h3>
                  <button onClick={handleCancel} className="text-cocoa-medium hover:text-cocoa-dark">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-cocoa-dark mb-1">
                        Cake Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                        placeholder="e.g., Chocolate Truffle Cake"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cocoa-dark mb-1">Category</label>
                      <select
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value as ChocolateType })}
                        className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
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
                        className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none resize-none"
                        rows={3}
                        placeholder="Describe your delicious cake..."
                      />
                    </div>

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

                  <div>
                    <label className="block text-sm font-semibold text-cocoa-dark mb-2">
                      Image <span className="text-red-500">*</span>
                    </label>
                    <div className="relative aspect-square w-full max-w-[250px] mx-auto bg-cream rounded-lg overflow-hidden border-2 border-dashed border-cocoa-medium/30 mb-3">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-cocoa-medium">
                          <ImageIcon size={40} className="opacity-50" />
                          <p className="text-sm">No image</p>
                        </div>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-2 rounded-lg font-semibold transition-all mb-2"
                    >
                      <Upload size={18} /> Upload Photo
                    </button>
                    <input
                      type="text"
                      value={editForm.image.startsWith('data:') ? '' : editForm.image}
                      onChange={(e) => {
                        setEditForm({ ...editForm, image: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                      className="w-full px-3 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none text-sm"
                      placeholder="Or enter image URL"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-cream">
                  <button onClick={handleCancel} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold">
                    Cancel
                  </button>
                  <button
                    onClick={showAddForm ? handleAddSave : handleSave}
                    className="flex items-center gap-2 px-5 py-2 bg-gold hover:bg-gold-light text-cocoa-dark rounded-lg font-semibold"
                  >
                    <Save size={18} /> {showAddForm ? 'Add Cake' : 'Save'}
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid with Drag and Drop */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, product)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-move transition-all duration-300 ${
                    draggedItem?.id === product.id ? 'opacity-50 scale-95' : ''
                  } ${dragOverIndex === index ? 'ring-2 ring-gold ring-offset-2' : ''}`}
                >
                  <div className="relative aspect-square bg-cream">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-white/90 p-1.5 rounded-lg cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} className="text-cocoa-medium" />
                    </div>
                    {product.isBestSeller && (
                      <span className="absolute top-2 right-2 bg-gold text-cocoa-dark text-xs font-bold px-2 py-1 rounded-full">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-cocoa-dark text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-cocoa-medium mb-3 line-clamp-1">{product.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-sm font-semibold"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <ImageIcon size={48} className="mx-auto text-cocoa-medium/30 mb-3" />
                <h3 className="text-lg font-bold text-cocoa-dark mb-2">No Products Yet</h3>
                <button onClick={handleAdd} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-5 py-2 rounded-lg font-semibold">
                  <Plus size={18} /> Add Your First Cake
                </button>
              </div>
            )}
          </>
        )}

        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-cocoa-dark mb-6">Hero Section</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Main Title</label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Subtitle</label>
                  <textarea
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Button Text</label>
                  <input
                    type="text"
                    value={heroForm.ctaText}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-2">Background Image</label>
                  <div className="relative aspect-video w-full max-w-md mx-auto bg-cream rounded-lg overflow-hidden border-2 border-dashed border-cocoa-medium/30 mb-3">
                    <img src={heroPreviewImage} alt="Hero preview" className="w-full h-full object-cover" />
                  </div>
                  <input ref={heroFileInputRef} type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => heroFileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 bg-cocoa-dark hover:bg-cocoa-medium text-cream-light px-4 py-2 rounded-lg font-semibold"
                    >
                      <Upload size={18} /> Upload Image
                    </button>
                  </div>
                  <input
                    type="text"
                    value={heroForm.backgroundImage.startsWith('data:') ? '' : heroForm.backgroundImage}
                    onChange={(e) => {
                      setHeroForm({ ...heroForm, backgroundImage: e.target.value });
                      setHeroPreviewImage(e.target.value);
                    }}
                    className="w-full px-3 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none text-sm mt-2"
                    placeholder="Or enter image URL"
                  />
                </div>

                <button
                  onClick={handleHeroSave}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-6 py-3 rounded-lg font-bold"
                >
                  <Save size={20} /> Save Hero Section
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cocoa-dark">Customer Testimonials</h2>
              <button
                onClick={handleAddTestimonial}
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-lg font-semibold"
              >
                <Plus size={20} /> Add Review
              </button>
            </div>

            {/* Edit/Add Testimonial Form */}
            {(editingTestimonialId || showAddTestimonial) && testimonialForm && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-gold">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-cocoa-dark">
                    {showAddTestimonial ? 'Add New Review' : 'Edit Review'}
                  </h3>
                  <button onClick={handleCancelTestimonial} className="text-cocoa-medium hover:text-cocoa-dark">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-cocoa-dark mb-1">Customer Name</label>
                    <input
                      type="text"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                      placeholder="e.g., Priya S."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cocoa-dark mb-1">Review</label>
                    <textarea
                      value={testimonialForm.text}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none resize-none"
                      rows={3}
                      placeholder="What did the customer say?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cocoa-dark mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                          className="p-1"
                        >
                          <Star
                            size={24}
                            className={star <= testimonialForm.rating ? 'fill-gold text-gold' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={handleCancelTestimonial} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold">
                      Cancel
                    </button>
                    <button
                      onClick={showAddTestimonial ? handleAddTestimonialSave : handleSaveTestimonial}
                      className="flex items-center gap-2 px-5 py-2 bg-gold hover:bg-gold-light text-cocoa-dark rounded-lg font-semibold"
                    >
                      <Save size={18} /> {showAddTestimonial ? 'Add Review' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl shadow-md p-5">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-cocoa-dark text-sm mb-4 line-clamp-3">"{testimonial.text}"</p>
                  <p className="font-bold text-cocoa-dark text-sm mb-3">- {testimonial.name}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-sm font-semibold"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id, testimonial.name)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-cocoa-dark mb-6">Contact Information</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Phone Number 1</label>
                  <input
                    type="text"
                    value={contactForm.phone1}
                    onChange={(e) => setContactForm({ ...contactForm, phone1: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Phone Number 2</label>
                  <input
                    type="text"
                    value={contactForm.phone2}
                    onChange={(e) => setContactForm({ ...contactForm, phone2: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">WhatsApp Number (for chat link)</label>
                  <input
                    type="text"
                    value={contactForm.whatsappNumber}
                    onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                    placeholder="e.g., 918838424741 (country code + number, no spaces)"
                  />
                  <p className="text-xs text-cocoa-medium mt-1">Format: Country code + number without spaces or symbols</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-dark mb-1">Address</label>
                  <textarea
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-cocoa-medium/30 rounded-lg focus:border-gold focus:outline-none resize-none"
                    rows={3}
                  />
                </div>

                <button
                  onClick={handleContactSave}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-cocoa-dark px-6 py-3 rounded-lg font-bold"
                >
                  <Save size={20} /> Save Contact Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
