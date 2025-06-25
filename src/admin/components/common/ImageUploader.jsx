import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';

const ImageUploader = ({ images = [], onChange, multiple = true, maxFiles = 5 }) => {
  const [previewImages, setPreviewImages] = useState(images);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Convert files to array of objects with preview URLs
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        // For now, we'll use the objectURL as the path
        // In a real Firebase implementation, this would be the storage URL
        path: URL.createObjectURL(file),
      }));

      // Limit the number of files if multiple is true
      const updatedImages = multiple
        ? [...previewImages, ...newFiles].slice(0, maxFiles)
        : [...newFiles].slice(0, 1);

      setPreviewImages(updatedImages);
      
      // Call the onChange prop with the updated images
      if (onChange) {
        onChange(updatedImages);
      }
    },
    [previewImages, onChange, multiple, maxFiles]
  );

  const removeImage = (indexToRemove) => {
    const updatedImages = previewImages.filter((_, index) => index !== indexToRemove);
    setPreviewImages(updatedImages);
    
    // Call the onChange prop with the updated images
    if (onChange) {
      onChange(updatedImages);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple,
    maxFiles,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-accent bg-accent/10' : 'border-gray-300 hover:border-accent'
        }`}
      >
        <input {...getInputProps()} />
        <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          {isDragActive
            ? 'Drop the images here...'
            : `Drag & drop ${multiple ? 'images' : 'an image'} here, or click to select ${
                multiple ? 'files' : 'a file'
              }`}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {multiple
            ? `You can upload up to ${maxFiles} images`
            : 'Only one image can be uploaded'}
        </p>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                {image.preview ? (
                  <img
                    src={image.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : image.path ? (
                  <img
                    src={image.path}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaImage className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 