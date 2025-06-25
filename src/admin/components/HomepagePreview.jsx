import React from 'react';

const HomepagePreview = ({ settings }) => {
  if (!settings) return null;
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Homepage Preview</h3>
        <span className="text-xs text-gray-500">Preview updates as you make changes</span>
      </div>
      
      <div className="p-4 space-y-6 max-h-[600px] overflow-y-auto">
        {/* Hero Section Preview */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4">
          {settings.heroImage ? (
            <img 
              src={typeof settings.heroImage === 'string' ? settings.heroImage : 
                   settings.heroImage.path || '/assets/placeholder.txt'} 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No hero image selected</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
              {settings.heroTitle || 'Hero Title'}
            </h2>
            <p className="text-sm md:text-base text-center">
              {settings.heroSubtitle || 'Hero Subtitle'}
            </p>
          </div>
        </div>
        
        {/* Featured Categories Preview */}
        {settings.featuredCategories?.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium border-b pb-2">Featured Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {settings.featuredCategories.map((categoryId, index) => (
                <div key={index} className="bg-gray-100 rounded p-3 text-center">
                  <span className="text-sm">{categoryId}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Featured Products Preview */}
        {settings.featuredProducts?.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium border-b pb-2">Featured Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {settings.featuredProducts.map((productId, index) => (
                <div key={index} className="bg-gray-100 rounded p-3 text-center">
                  <span className="text-sm">{productId}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Promo Banner Preview */}
        {(settings.promoTitle || settings.promoImage) && (
          <div className="space-y-3">
            <h3 className="font-medium border-b pb-2">Promotional Banner</h3>
            <div className="relative h-32 rounded-lg overflow-hidden">
              {settings.promoImage ? (
                <img 
                  src={typeof settings.promoImage === 'string' ? settings.promoImage : 
                       settings.promoImage.path || '/assets/placeholder.txt'} 
                  alt="Promo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No promo image selected</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-bold text-center mb-1">
                  {settings.promoTitle || 'Promo Title'}
                </h3>
                <p className="text-xs md:text-sm text-center">
                  {settings.promoSubtitle || 'Promo Subtitle'}
                </p>
                {settings.promoLink && (
                  <div className="mt-2 bg-white text-primary text-xs px-3 py-1 rounded-full">
                    Shop Now
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Testimonials Preview */}
        {settings.testimonials?.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium border-b pb-2">Testimonials</h3>
            <div className="space-y-3">
              {settings.testimonials.slice(0, 2).map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {testimonial.image ? (
                      <img 
                        src={typeof testimonial.image === 'string' ? testimonial.image : 
                             testimonial.image.path || '/assets/placeholder.txt'} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm italic mb-1">"{testimonial.comment}"</p>
                    <p className="text-xs font-medium">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
              {settings.testimonials.length > 2 && (
                <p className="text-xs text-gray-500 text-center">
                  +{settings.testimonials.length - 2} more testimonials
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomepagePreview; 