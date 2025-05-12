
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
import { Upload, Image as ImageIcon, Camera, Save, RefreshCw, Brush, Undo, Redo, Download, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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

// Additional color palettes organized by theme
const colorPalettes = {
  neutrals: [
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Off-White', hex: '#F8F8F8' },
    { name: 'Light Gray', hex: '#E0E0E0' },
    { name: 'Medium Gray', hex: '#A0A0A0' },
    { name: 'Charcoal', hex: '#404040' },
    { name: 'Soft Black', hex: '#202020' },
  ],
  blues: [
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Baby Blue', hex: '#89CFF0' },
    { name: 'Cornflower', hex: '#6495ED' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Midnight Blue', hex: '#191970' },
  ],
  greens: [
    { name: 'Mint', hex: '#98FB98' },
    { name: 'Sage', hex: '#BCB88A' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Forest', hex: '#228B22' },
    { name: 'Emerald', hex: '#50C878' },
    { name: 'Moss', hex: '#8A9A5B' },
  ],
  earthy: [
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Terracotta', hex: '#E2725B' },
    { name: 'Clay', hex: '#CC7357' },
    { name: 'Mocha', hex: '#967969' },
    { name: 'Sienna', hex: '#A0522D' },
  ],
  vibrant: [
    { name: 'Coral', hex: '#FF7F50' },
    { name: 'Marigold', hex: '#FFAA33' },
    { name: 'Ruby', hex: '#E0115F' },
    { name: 'Amethyst', hex: '#9966CC' },
    { name: 'Emerald', hex: '#50C878' },
    { name: 'Sapphire', hex: '#0F52BA' },
  ],
};

const ColorPreview = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#F5F5F5');
  const [colorName, setColorName] = useState<string>('Classic White');
  const [opacity, setOpacity] = useState<number>(0.7);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedCombinations, setSavedCombinations] = useState<Array<{name: string, color: string, imageUrl: string}>>([]);
  const [colorHistory, setColorHistory] = useState<Array<{color: string, name: string}>>([]);
  const [brushSize, setBrushSize] = useState<number>(20);
  const [mode, setMode] = useState<'fill' | 'brush'>('fill');
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const brushPreviewRef = useRef<HTMLDivElement>(null);
  const activeColorRef = useRef<string>(selectedColor);
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{x: number, y: number}>({x: 0, y: 0});
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Clear undo/redo stacks when loading new image
      setUndoStack([]);
      setRedoStack([]);
      
      toast.success("Image loaded successfully!");
    }
  };

  // Handle camera capture
  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    // For now, we'll just trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    toast.info("Camera functionality would be implemented here");
  };
  
  // Apply color to the image - Fill mode
  useEffect(() => {
    if (previewUrl && canvasRef.current && mode === 'fill') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = previewUrl;
      
      img.onload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Save current state to undo stack before applying color
        const currentImageData = canvas.toDataURL();
        setUndoStack(prev => [...prev, currentImageData]);
        setRedoStack([]); // Clear redo stack when making a new change
        
        // Apply color overlay with specified opacity
        ctx.fillStyle = selectedColor;
        ctx.globalAlpha = opacity;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Reset alpha for future operations
        ctx.globalAlpha = 1;
        
        // Update active color ref
        activeColorRef.current = selectedColor;
      };
    }
  }, [previewUrl, selectedColor, opacity, mode]);

  // Setup brush mode
  useEffect(() => {
    if (!canvasRef.current || !previewUrl || mode !== 'brush') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleMouseDown = (e: MouseEvent) => {
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      lastPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Save current state to undo stack before starting to draw
      const currentImageData = canvas.toDataURL();
      setUndoStack(prev => [...prev, currentImageData]);
      setRedoStack([]); // Clear redo stack when making a new change
    };
    
    const handleMouseUp = () => {
      isDrawingRef.current = false;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const currentPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      ctx.beginPath();
      ctx.arc(currentPos.x, currentPos.y, brushSize/2, 0, Math.PI * 2);
      ctx.fillStyle = selectedColor;
      ctx.fill();
      
      lastPosRef.current = currentPos;
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      lastPosRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
      
      // Save current state to undo stack before starting to draw
      const currentImageData = canvas.toDataURL();
      setUndoStack(prev => [...prev, currentImageData]);
      setRedoStack([]); // Clear redo stack when making a new change
      
      // Draw at the touch point
      ctx.beginPath();
      ctx.arc(lastPosRef.current.x, lastPosRef.current.y, brushSize/2, 0, Math.PI * 2);
      ctx.fillStyle = selectedColor;
      ctx.fill();
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const currentPos = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
      
      ctx.beginPath();
      ctx.arc(currentPos.x, currentPos.y, brushSize/2, 0, Math.PI * 2);
      ctx.fillStyle = selectedColor;
      ctx.fill();
      
      lastPosRef.current = currentPos;
    };
    
    const handleTouchEnd = () => {
      isDrawingRef.current = false;
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    // Update brush preview
    if (brushPreviewRef.current) {
      brushPreviewRef.current.style.width = `${brushSize}px`;
      brushPreviewRef.current.style.height = `${brushSize}px`;
      brushPreviewRef.current.style.backgroundColor = selectedColor;
    }
    
    // Remove event listeners on cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [previewUrl, selectedColor, brushSize, mode]);

  // Handle color selection
  const handleColorSelect = (hex: string, name: string) => {
    setSelectedColor(hex);
    setColorName(name);
    setColorHistory(prev => {
      // Don't add duplicate consecutive colors
      if (prev.length > 0 && prev[0].color === hex) return prev;
      // Add to history, limit to last 10 colors
      return [{color: hex, name}, ...prev.slice(0, 9)];
    });
  };

  // Handle save combination
  const handleSave = () => {
    if (!previewUrl || !canvasRef.current) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsSaving(true);
    
    // In a real app, this would save to a database
    // For now, we'll just save to local state
    setTimeout(() => {
      const canvas = canvasRef.current!;
      const dataUrl = canvas.toDataURL("image/png");
      
      const newCombination = {
        name: colorName,
        color: selectedColor,
        imageUrl: dataUrl
      };
      
      setSavedCombinations([...savedCombinations, newCombination]);
      setIsSaving(false);
      toast.success("Color combination saved successfully!");
      
      // In a real app, we would save this to the user's profile
      // This is just a placeholder
      const stored = localStorage.getItem('savedColorCombinations');
      const existingCombinations = stored ? JSON.parse(stored) : [];
      localStorage.setItem('savedColorCombinations', JSON.stringify([...existingCombinations, newCombination]));
      
      // If user is not logged in, prompt to login/register
      if (!localStorage.getItem('user')) {
        toast("Create an account to save your combinations permanently!", {
          action: {
            label: "Login/Register",
            onClick: () => window.location.href = "/login"
          }
        });
      }
    }, 1000);
  };

  // Handle reset
  const handleReset = () => {
    if (!previewUrl || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = previewUrl;
    
    img.onload = () => {
      // Reset to original image
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Clear undo/redo stacks
      setUndoStack([]);
      setRedoStack([]);
      
      toast.success("Reset to original image");
    };
  };
  
  // Handle undo
  const handleUndo = () => {
    if (undoStack.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Save current state to redo stack
    const currentState = canvas.toDataURL();
    setRedoStack(prev => [...prev, currentState]);
    
    // Pop the last state from undo stack
    const undoState = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    
    // Apply the previous state
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = undoState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    
    toast.info("Undo successful");
  };
  
  // Handle redo
  const handleRedo = () => {
    if (redoStack.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Save current state to undo stack
    const currentState = canvas.toDataURL();
    setUndoStack(prev => [...prev, currentState]);
    
    // Pop the last state from redo stack
    const redoState = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    
    // Apply the redo state
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = redoState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    
    toast.info("Redo successful");
  };
  
  // Handle download
  const handleDownload = () => {
    if (!canvasRef.current) {
      toast.error("No image to download");
      return;
    }
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    
    const link = document.createElement("a");
    link.download = `paintpro-${colorName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  };

  // Load saved combinations from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('savedColorCombinations');
    if (savedData) {
      setSavedCombinations(JSON.parse(savedData));
    }
  }, []);

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
            {/* Left Column - Upload and Tools */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Tabs defaultValue="upload">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload">
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
                  </div>
                </TabsContent>
                
                <TabsContent value="tools">
                  <h2 className="text-2xl font-semibold text-paint-blue mb-6">Painting Tools</h2>
                  <div className="space-y-6">
                    <div>
                      <Label>Painting Mode</Label>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <Button 
                          variant={mode === 'fill' ? 'default' : 'outline'} 
                          onClick={() => setMode('fill')}
                        >
                          Fill Entire Wall
                        </Button>
                        <Button 
                          variant={mode === 'brush' ? 'default' : 'outline'} 
                          onClick={() => setMode('brush')}
                        >
                          <Brush className="mr-2 h-4 w-4" /> Brush Tool
                        </Button>
                      </div>
                    </div>
                    
                    {mode === 'brush' && (
                      <div>
                        <Label htmlFor="brush-size">Brush Size</Label>
                        <div className="flex items-center gap-4">
                          <input
                            id="brush-size"
                            type="range"
                            min="5"
                            max="50"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="flex-1"
                          />
                          <div 
                            ref={brushPreviewRef}
                            className="rounded-full border border-gray-300" 
                            style={{
                              width: brushSize,
                              height: brushSize,
                              backgroundColor: selectedColor
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {mode === 'fill' && (
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
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleUndo} 
                        disabled={undoStack.length === 0}
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleRedo} 
                        disabled={redoStack.length === 0}
                      >
                        <Redo className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleReset} 
                        disabled={!previewUrl}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleDownload} 
                        disabled={!previewUrl}
                        className="ml-auto"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <h2 className="text-2xl font-semibold text-paint-blue mb-6">Recent Colors</h2>
                  {colorHistory.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {colorHistory.map((item, idx) => (
                        <button
                          key={idx}
                          className="p-2 rounded-lg transition-all hover:bg-gray-50"
                          onClick={() => handleColorSelect(item.color, item.name)}
                        >
                          <div 
                            className="w-full h-10 rounded-md mb-2" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <p className="text-xs text-center font-medium truncate">{item.name}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-paint-gray text-center py-8">
                      Colors you select will appear here
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Middle Column - Color Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
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
                    
                    {mode === 'brush' && (
                      <div className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-md px-3 py-1 text-sm">
                        Brush mode: Click and drag to paint
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-paint-gray">Upload an image to see the preview</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex gap-2 items-center mb-2">
                    <Label htmlFor="color-name">Save as:</Label>
                    <Input 
                      id="color-name"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      className="flex-1"
                      placeholder="Color combination name"
                    />
                  </div>
                  
                  <div className="flex gap-4 mt-2">
                    <Button 
                      className="flex-1" 
                      disabled={!previewUrl || isSaving}
                      onClick={handleSave}
                    >
                      <Save className="mr-2 h-4 w-4" /> 
                      {isSaving ? 'Saving...' : 'Save This Combination'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Color Selection */}
          <div className="mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-paint-blue mb-6">Paint Colors</h2>
              
              <Tabs defaultValue="popular">
                <TabsList className="mb-6">
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="neutrals">Neutrals</TabsTrigger>
                  <TabsTrigger value="blues">Blues</TabsTrigger>
                  <TabsTrigger value="greens">Greens</TabsTrigger>
                  <TabsTrigger value="earthy">Earthy</TabsTrigger>
                  <TabsTrigger value="vibrant">Vibrant</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular">
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
                </TabsContent>
                
                <TabsContent value="neutrals">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {colorPalettes.neutrals.map((color, index) => (
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
                </TabsContent>
                
                <TabsContent value="blues">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {colorPalettes.blues.map((color, index) => (
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
                </TabsContent>
                
                <TabsContent value="greens">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {colorPalettes.greens.map((color, index) => (
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
                </TabsContent>
                
                <TabsContent value="earthy">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {colorPalettes.earthy.map((color, index) => (
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
                </TabsContent>
                
                <TabsContent value="vibrant">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {colorPalettes.vibrant.map((color, index) => (
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
                </TabsContent>
                
                <TabsContent value="custom">
                  <div className="mt-4">
                    <Label htmlFor="custom-color">Choose a custom color</Label>
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
                </TabsContent>
              </Tabs>
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
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{combo.name}</p>
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300" 
                          style={{backgroundColor: combo.color}}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            if (previewUrl) {
                              setSelectedColor(combo.color);
                              setColorName(combo.name);
                            } else {
                              toast.error("Please upload an image first");
                            }
                          }}
                        >
                          Apply
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleDownload}
                        >
                          Download
                        </Button>
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
