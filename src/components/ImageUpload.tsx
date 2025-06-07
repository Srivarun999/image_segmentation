
import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (file: File, dataUrl: string) => void;
  uploadedImage?: string;
  onClearImage?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  uploadedImage, 
  onClearImage 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
    }
  }, [onImageUpload, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-blue-400 bg-blue-50/10' 
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-slate-800 rounded-full">
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Upload Image for Segmentation
              </h3>
              <p className="text-slate-400 mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors">
                <ImageIcon className="w-4 h-4" />
                Choose Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={uploadedImage}
            alt="Uploaded for segmentation"
            className="w-full max-h-96 object-contain rounded-lg border border-slate-600"
          />
          {onClearImage && (
            <button
              onClick={onClearImage}
              className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
