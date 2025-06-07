
import React from 'react';
import { Target, Layers, Zap, Database } from 'lucide-react';

const ProjectOverview = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Segmentation",
      description: "Advanced algorithms for accurate boundary detection and object separation using optimal clustering techniques."
    },
    {
      icon: Layers,
      title: "Multi-Dataset Support",
      description: "Compatible with BSDS500, MS COCO, ImageNet, and custom datasets for comprehensive testing and validation."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Optimized pipeline for efficient image processing with immediate cluster tendency analysis results."
    },
    {
      icon: Database,
      title: "Scalable Storage",
      description: "Robust data management with MongoDB integration and cloud storage solutions for large-scale operations."
    }
  ];

  return (
    <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Project <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Overview</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive web-based solution for unsupervised image segmentation utilizing cutting-edge cluster tendency analysis to deliver optimal segmentation results across diverse image datasets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
