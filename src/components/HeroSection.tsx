
import React from 'react';
import { Brain } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-12 flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23334155%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-4">
          <Brain className="w-10 h-10 text-blue-400" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          <span className="text-blue-400">Unsupervised</span>
          <span className="text-slate-200"> Image Segmentation</span>
        </h1>
        
        <p className="text-base text-slate-300 mb-4 max-w-2xl mx-auto">
          Advanced cluster tendency analysis for precision image segmentation
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
