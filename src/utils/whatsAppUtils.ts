/**
 * WhatsApp utility functions
 */

// The store/seller WhatsApp number (include country code without + symbol)
const STORE_WHATSAPP_NUMBER = "911234567890"; // Replace with actual WhatsApp number

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  brand?: string;
  type?: string;
  finish?: string;
  coverage?: string;
  warranty?: string;
  colorNames?: string[];
}

/**
 * Opens WhatsApp with pre-filled message containing product details
 */
export const redirectToWhatsApp = async (product: ProductDetails, quantity: number = 1): Promise<void> => {
  try {
    // Get current location if permission is granted
    let locationText = "Location not provided";
    
    try {
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        locationText = `Location: https://maps.google.com/maps?q=${latitude},${longitude}`;
      }
    } catch (error) {
      console.log("Location permission denied or error occurred.");
    }
    
    // Create product details message
    const selectedColor = product.colorNames && product.colorNames.length > 0 
      ? `\nSelected Color: ${product.colorNames[0]}` 
      : '';
    
    const message = `Hello! I would like to order the following product:
    
Product: ${product.name}
Brand: ${product.brand || 'N/A'}
Price: $${product.price.toFixed(2)}
Quantity: ${quantity}
Total: $${(product.price * quantity).toFixed(2)}${selectedColor}
Type: ${product.type || 'N/A'}
Finish: ${product.finish || 'N/A'}
Coverage: ${product.coverage || 'N/A'}
Warranty: ${product.warranty || 'N/A'}

${locationText}

Please contact me to confirm this order. Thank you!`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  } catch (error) {
    console.error("Error redirecting to WhatsApp:", error);
  }
};
