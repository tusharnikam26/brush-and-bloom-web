
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload, Image, Camera, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Popular paint colors with their hex values
const popularColors = [
  { name: 'Classic White', hex: '#F5F5F5' },
  { name: 'Soft Gray', hex: '#D3D3D3' },
  { name: 'Light Blue', hex: '#ADD8E6' },
  { name: 'Sage Green', hex: '#9CAF88' },
  { name: 'Pale Yellow', hex: '#FFF9C4' },
  { name: 'Gentle Beige', hex: '#E8DCC5' },
  { name: 'Powder Blue', hex: '#B0E0E6' },
  { name: 'Soft Terracotta', hex: '#E2725B' },
  { name: 'Muted Teal', hex: '#4F7F75' },
  { name: 'Light Lavender', hex: '#E6E6FA' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Forest Green', hex: '#228B22' },
];

const ColorPreview = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#F5F5F5');
  const [colorName, setColorName] = useState<string>('Classic White');
  const [opacity, setOpacity] = useState<number>(0.7);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedCombinations, setSavedCombinations] = useState<Array<{name: string, color: string, imageUrl: string}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Handle camera capture
  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    // For now, we'll just trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    toast("Camera functionality would be implemented here");
  };

  // Apply color to the image
  useEffect(() => {
    if (previewUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.src = previewUrl;
      
      img.onload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Apply color overlay with specified opacity
        ctx.fillStyle = selectedColor;
        ctx.globalAlpha = opacity;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Reset alpha for future operations
        ctx.globalAlpha = 1;
      };
    }
  }, [previewUrl, selectedColor, opacity]);

  // Handle color selection
  const handleColorSelect = (hex: string, name: string) => {
    setSelectedColor(hex);
    setColorName(name);
  };

  // Handle save combination
  const handleSave = () => {
    if (!previewUrl) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsSaving(true);
    
    // In a real app, this would save to a database
    // For now, we'll just save to local state
    setTimeout(() => {
      const newCombination = {
        name: colorName,
        color: selectedColor,
        imageUrl: previewUrl
      };
      
      setSavedCombinations([...savedCombinations, newCombination]);
      setIsSaving(false);
      toast.success("Color combination saved successfully!");
      
      // In a real app, we would save this to the user's profile
      // This is just a placeholder
      localStorage.setItem('savedColorCombinations', JSON.stringify([...savedCombinations, newCombination]));
    }, 1000);
  };

  // Handle reset
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedColor('#F5F5F5');
    setColorName('Classic White');
    setOpacity(0.7);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-paint-blue mb-4">Virtual Color Preview</h1>
            <p className="text-lg text-paint-gray max-w-2xl mx-auto">
              Upload a photo of your room or exterior and see how it looks with different paint colors before making a decision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload Controls */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-paint-blue mb-6">Upload Image</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="file-upload">Upload an image</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleCameraCapture}
                    >
                      <Camera className="mr-2 h-4 w-4" /> Camera
                    </Button>
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-paint-gray">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="opacity-slider">Color Intensity</Label>
                  <input
                    id="opacity-slider"
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-paint-gray mt-1">
                    <span>Subtle</span>
                    <span>Strong</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Column - Color Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-paint-blue mb-6">Preview</h2>
                
                <div className="flex justify-between mb-4">
                  <p className="text-paint-gray">
                    Selected color: <span className="font-semibold">{colorName}</span>
                  </p>
                  <div 
                    className="w-8 h-8 rounded-full border border-gray-300" 
                    style={{backgroundColor: selectedColor}}
                  ></div>
                </div>
                
                {previewUrl ? (
                  <div className="relative border rounded-lg overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-auto"></canvas>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-paint-gray">Upload an image to see the preview</p>
                  </div>
                )}
                
                <div className="flex gap-4 mt-6">
                  <Button 
                    className="flex-1" 
                    disabled={!previewUrl || isSaving}
                    onClick={handleSave}
                  >
                    <Save className="mr-2 h-4 w-4" /> 
                    {isSaving ? 'Saving...' : 'Save This Combination'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleReset}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Bottom Section - Color Selection */}
            <div className="lg:col-span-3 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-paint-blue mb-6">Popular Colors</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {popularColors.map((color, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg transition-all ${selectedColor === color.hex ? 'ring-2 ring-paint-terracotta' : 'hover:bg-gray-50'}`}
                      onClick={() => handleColorSelect(color.hex, color.name)}
                    >
                      <div 
                        className="w-full h-16 rounded-md mb-2" 
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <p className="text-sm text-center font-medium">{color.name}</p>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Label htmlFor="custom-color">Or choose a custom color</Label>
                  <div className="flex gap-4 mt-2">
                    <Input
                      id="custom-color-name"
                      placeholder="Color name"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        id="custom-color"
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-12 h-10 p-0 border-0"
                      />
                      <span className="text-paint-gray">{selectedColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Saved Combinations */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-paint-blue mb-6">Your Saved Combinations</h2>
            
            {savedCombinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedCombinations.map((combo, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="h-48 bg-gray-100 relative">
                      <img 
                        src={combo.imageUrl} 
                        alt={combo.name} 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundColor: combo.color,
                          opacity: 0.7,
                        }}
                      ></div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{combo.name}</p>
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300" 
                          style={{backgroundColor: combo.color}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-paint-gray">You haven't saved any color combinations yet.</p>
                <p className="text-paint-gray mt-2">Upload an image and try different colors to save your favorites.</p>
              </div>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-8 mx-auto block">
                  Book a Professional Color Consultation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Color Consultation</DialogTitle>
                  <DialogDescription>
                    Our professional color consultants can help you choose the perfect palette for your space.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-paint-gray mb-4">
                    Book a color consultation appointment and our experts will:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-paint-gray">
                    <li>Visit your home or business</li>
                    <li>Assess lighting and architectural features</li>
                    <li>Consider your existing décor and preferences</li>
                    <li>Provide professional color recommendations</li>
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <a href="/contact">Schedule Consultation</a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ColorPreview;
