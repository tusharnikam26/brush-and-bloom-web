
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star, Filter, Search, Check } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Premium Interior Paint',
    brand: 'ColorMaster',
    price: 45.99,
    type: 'interior',
    finish: 'Matte',
    coverage: '400 sq. ft. per gallon',
    warranty: '10 years',
    colors: ['#FFFFFF', '#F5F5DC', '#FFFFF0', '#FFF8DC', '#FFE4B5'],
    colorNames: ['Pure White', 'Beige', 'Ivory', 'Cornsilk', 'Moccasin'],
    rating: 4.8,
    reviewCount: 124,
    image: '/placeholder.svg',
    bestseller: true,
  },
  {
    id: 2,
    name: 'Weather Shield Exterior Paint',
    brand: 'DuraPaint',
    price: 52.99,
    type: 'exterior',
    finish: 'Semi-Gloss',
    coverage: '350 sq. ft. per gallon',
    warranty: '15 years',
    colors: ['#FFFFFF', '#F5F5DC', '#A9A9A9', '#D3D3D3', '#696969'],
    colorNames: ['White', 'Beige', 'Dark Gray', 'Light Gray', 'Dim Gray'],
    rating: 4.6,
    reviewCount: 89,
    image: '/placeholder.svg',
    bestseller: false,
  },
  {
    id: 3,
    name: 'Commercial Grade Enamel',
    brand: 'ProCoat',
    price: 64.99,
    type: 'commercial',
    finish: 'Gloss',
    coverage: '300 sq. ft. per gallon',
    warranty: '20 years',
    colors: ['#FFFFFF', '#F5F5DC', '#00008B', '#000080', '#191970'],
    colorNames: ['White', 'Beige', 'Dark Blue', 'Navy', 'Midnight Blue'],
    rating: 4.9,
    reviewCount: 56,
    image: '/placeholder.svg',
    bestseller: true,
  },
  {
    id: 4,
    name: 'Waterproofing Sealer',
    brand: 'AquaShield',
    price: 79.99,
    type: 'waterproofing',
    finish: 'Clear',
    coverage: '200 sq. ft. per gallon',
    warranty: '10 years',
    colors: ['#FFFFFF', '#F5F5F5', '#F8F8FF'],
    colorNames: ['Clear', 'Off-White', 'Light Clear'],
    rating: 4.7,
    reviewCount: 42,
    image: '/placeholder.svg',
    bestseller: false,
  },
  {
    id: 5,
    name: 'Textured Paint',
    brand: 'ArtTexture',
    price: 47.99,
    type: 'texture',
    finish: 'Textured',
    coverage: '100 sq. ft. per gallon',
    warranty: '8 years',
    colors: ['#FFFFFF', '#FFF8DC', '#F5F5DC', '#FFFFF0', '#F0F8FF'],
    colorNames: ['White', 'Cornsilk', 'Beige', 'Ivory', 'Alice Blue'],
    rating: 4.5,
    reviewCount: 38,
    image: '/placeholder.svg',
    bestseller: false,
  },
  {
    id: 6,
    name: 'Interior Primer',
    brand: 'BasePro',
    price: 29.99,
    type: 'primer',
    finish: 'Flat',
    coverage: '450 sq. ft. per gallon',
    warranty: '5 years',
    colors: ['#FFFFFF'],
    colorNames: ['White'],
    rating: 4.4,
    reviewCount: 102,
    image: '/placeholder.svg',
    bestseller: false,
  },
];

const Products = () => {
  const [cart, setCart] = useState<Array<{ id: number, quantity: number }>>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredProducts = products.filter(product => {
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default: popularity (bestsellers first)
    return b.bestseller ? 1 : -1;
  });

  const handleAddToCart = (productId: number) => {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
    toast.success("Product added to cart!");
  };

  const handleAddToWishlist = () => {
    toast("Added to wishlist");
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-paint-blue mb-6">Paint Products</h1>
          <p className="text-lg text-paint-gray mb-10 max-w-3xl">
            Browse our selection of high-quality paints, primers, and specialty coatings for your next project. 
            All products come with manufacturer warranties and expert support.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar with filters */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
                <div className="mb-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Filter size={18} />
                    Filter Products
                  </h3>
                  
                  <div className="mb-5">
                    <Label className="mb-2 block">Product Type</Label>
                    <div className="space-y-1">
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'all' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('all')}
                      >
                        All Products
                      </button>
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'interior' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('interior')}
                      >
                        Interior Paint
                      </button>
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'exterior' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('exterior')}
                      >
                        Exterior Paint
                      </button>
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'commercial' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('commercial')}
                      >
                        Commercial Paint
                      </button>
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'waterproofing' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('waterproofing')}
                      >
                        Waterproofing
                      </button>
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'texture' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('texture')}
                      >
                        Texture Paint
                      </button>
                      <button 
                        className={`block w-full text-left px-2 py-1 rounded ${selectedType === 'primer' ? 'bg-paint-blue text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedType('primer')}
                      >
                        Primers
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <Label className="mb-2 block">Price Range</Label>
                    <Slider 
                      defaultValue={[20, 80]} 
                      max={100} 
                      min={0} 
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-paint-gray">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Sort By</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="popularity">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rating</option>
                    </select>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedType('all');
                    setPriceRange([20, 80]);
                    setSearchTerm('');
                    setSortBy('popularity');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="text-sm text-paint-gray">
                  Showing {sortedProducts.length} of {products.length} products
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4" 
                      />
                      {product.bestseller && (
                        <Badge className="absolute top-2 right-2 bg-paint-terracotta">Bestseller</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{product.brand}</CardDescription>
                        </div>
                        <div className="text-lg font-bold text-paint-blue">
                          ${product.price}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={16}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm ml-1">{product.rating}</span>
                        <span className="text-xs text-paint-gray">({product.reviewCount} reviews)</span>
                      </div>
                      <div className="space-y-1 text-sm text-paint-gray">
                        <div className="flex justify-between">
                          <span>Finish:</span>
                          <span className="font-medium text-paint-blue">{product.finish}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage:</span>
                          <span className="font-medium text-paint-blue">{product.coverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Warranty:</span>
                          <span className="font-medium text-paint-blue">{product.warranty}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm mb-2">Available Colors:</p>
                        <div className="flex gap-1">
                          {product.colors.map((color, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded-full border cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                              title={product.colorNames[index]}
                            ></div>
                          ))}
                          {product.colors.length > 5 && (
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                              +{product.colors.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button onClick={() => handleAddToCart(product.id)} className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-paint-gray">No products match your filters.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSelectedType('all');
                      setPriceRange([20, 80]);
                      setSearchTerm('');
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
