
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CalendarIcon, CreditCard, Clock } from 'lucide-react';
import { format } from 'date-fns';

const serviceTypes = [
  { id: 'interior', name: 'Interior Painting' },
  { id: 'exterior', name: 'Exterior Painting' },
  { id: 'commercial', name: 'Commercial Services' },
  { id: 'residential', name: 'Residential Services' },
  { id: 'waterproofing', name: 'Waterproofing' },
  { id: 'stencil', name: 'Stencil & Texture Work' },
  { id: 'consultation', name: 'Color Consultation' },
];

const materials = [
  { id: 'economy', name: 'Economy Paint', price: 25 },
  { id: 'standard', name: 'Standard Paint', price: 40 },
  { id: 'premium', name: 'Premium Paint', price: 65 },
  { id: 'waterproof', name: 'Waterproof Coating', price: 80 },
  { id: 'texture', name: 'Texture Paint', price: 55 },
  { id: 'primer', name: 'Primer', price: 30 },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const BookService = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    serviceType: '',
    date: null as Date | null,
    timeSlot: '',
    materials: [] as string[],
    notes: '',
    paymentType: 'onsite',
    applyDiscount: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
  };

  const handleTimeSlotChange = (value: string) => {
    setFormData(prev => ({ ...prev, timeSlot: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleMaterialToggle = (materialId: string) => {
    setFormData(prev => {
      const materials = [...prev.materials];
      const index = materials.indexOf(materialId);
      if (index > -1) {
        materials.splice(index, 1);
      } else {
        materials.push(materialId);
      }
      return { ...prev, materials };
    });
  };

  const handlePaymentTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentType: value }));
  };

  const handleDiscountToggle = (checked: boolean) => {
    setFormData(prev => ({ ...prev, applyDiscount: checked }));
  };

  const calculateTotal = () => {
    let total = 0;
    formData.materials.forEach(materialId => {
      const material = materials.find(m => m.id === materialId);
      if (material) {
        total += material.price;
      }
    });
    
    // Add base service fee (this would be more complex in a real app)
    total += 200;
    
    // Apply discount if full payment selected
    if (formData.applyDiscount) {
      total = total * 0.85; // 15% discount
    }
    
    return total;
  };

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (step === 2) {
      if (!formData.serviceType || !formData.date || !formData.timeSlot) {
        toast.error("Please select service type, date and time");
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would connect to a backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Service booked successfully!");
      // Redirect to confirmation page or dashboard
      // navigate('/booking-confirmation');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-paint-blue mb-6 text-center">Book a Service</h1>
            <p className="text-lg text-center text-paint-gray mb-10">
              Schedule your painting service with our professional team
            </p>
            
            <div className="mb-10">
              <div className="flex justify-between items-center">
                <div className={`flex-1 text-center ${step >= 1 ? 'text-paint-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 1 ? 'bg-paint-blue text-white' : 'bg-gray-200'}`}>1</div>
                  <span className="text-sm font-medium">Personal Info</span>
                </div>
                <div className={`h-1 flex-1 ${step >= 2 ? 'bg-paint-blue' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 text-center ${step >= 2 ? 'text-paint-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 2 ? 'bg-paint-blue text-white' : 'bg-gray-200'}`}>2</div>
                  <span className="text-sm font-medium">Service Details</span>
                </div>
                <div className={`h-1 flex-1 ${step >= 3 ? 'bg-paint-blue' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 text-center ${step >= 3 ? 'text-paint-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 3 ? 'bg-paint-blue text-white' : 'bg-gray-200'}`}>3</div>
                  <span className="text-sm font-medium">Materials & Payment</span>
                </div>
              </div>
            </div>
            
            <Card className="mb-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="(123) 456-7890"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="area">Area (in sq. ft.)</Label>
                          <Input
                            id="area"
                            name="area"
                            type="number"
                            placeholder="e.g., 500"
                            value={formData.area}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="Enter your full address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button type="button" onClick={handleNextStep}>
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
                
                {step === 2 && (
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select onValueChange={handleServiceTypeChange} value={formData.serviceType}>
                          <SelectTrigger id="serviceType">
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map(service => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Service Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.date || undefined}
                              onSelect={handleDateChange}
                              initialFocus
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Time Slot</Label>
                        <Select onValueChange={handleTimeSlotChange} value={formData.timeSlot}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Provide any additional details about your service needs"
                          value={formData.notes}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={handlePreviousStep}>
                          Back
                        </Button>
                        <Button type="button" onClick={handleNextStep}>
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
                
                {step === 3 && (
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">Select Materials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {materials.map(material => (
                            <div key={material.id} className="flex items-center space-x-2 border p-3 rounded-lg">
                              <Checkbox 
                                id={material.id} 
                                checked={formData.materials.includes(material.id)} 
                                onCheckedChange={() => handleMaterialToggle(material.id)}
                              />
                              <div className="flex-1">
                                <Label htmlFor={material.id} className="font-medium cursor-pointer">
                                  {material.name}
                                </Label>
                                <p className="text-sm text-paint-gray">${material.price}/gallon</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Payment Options</h3>
                        <RadioGroup value={formData.paymentType} onValueChange={handlePaymentTypeChange}>
                          <div className="border rounded-lg p-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="onsite" id="onsite" />
                              <Label htmlFor="onsite">Pay on site after service completion</Label>
                            </div>
                          </div>
                          <div className="border rounded-lg p-4 relative">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="prepay" id="prepay" />
                              <Label htmlFor="prepay">Pre-pay now and get 15% discount</Label>
                            </div>
                            {formData.paymentType === "prepay" && (
                              <div className="mt-4 pl-6">
                                <div className="flex items-start space-x-3 mb-4">
                                  <Checkbox 
                                    id="discount" 
                                    checked={formData.applyDiscount} 
                                    onCheckedChange={(checked) => handleDiscountToggle(!!checked)}
                                  />
                                  <div>
                                    <Label htmlFor="discount" className="text-paint-blue font-medium">
                                      Apply 15% discount for full payment
                                    </Label>
                                    <p className="text-sm text-paint-gray">
                                      Pay the full amount now and receive a 15% discount on your booking
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-paint-gray">
                                  <CreditCard size={20} />
                                  <span className="text-sm">Major credit cards accepted</span>
                                </div>
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-paint-terracotta text-white text-xs font-bold px-2 py-1 rounded-full">
                              SAVE 15%
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-2">Booking Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Service Type:</span>
                            <span className="font-medium">
                              {serviceTypes.find(s => s.id === formData.serviceType)?.name || 'Not selected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date & Time:</span>
                            <span className="font-medium">
                              {formData.date ? format(formData.date, "PPP") : 'Not selected'} at {formData.timeSlot || 'Not selected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Materials:</span>
                            <span className="font-medium">
                              {formData.materials.length > 0 
                                ? formData.materials.length + ' items selected' 
                                : 'None selected'}
                            </span>
                          </div>
                          {formData.applyDiscount && (
                            <div className="flex justify-between text-paint-terracotta">
                              <span>Discount (15%):</span>
                              <span className="font-medium">-${(calculateTotal() * 0.15).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={handlePreviousStep}>
                          Back
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Processing...' : formData.paymentType === 'prepay' ? 'Pay Now' : 'Book Service'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookService;
