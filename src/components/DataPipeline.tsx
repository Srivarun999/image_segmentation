
import React from 'react';
import { Upload, Settings, Database, BarChart3, Image, Filter } from 'lucide-react';

const DataPipeline = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Multiple sources including BSDS500, MS COCO, ImageNet, and user uploads",
      details: ["Public datasets integration", "Synthetic data generation", "User upload functionality"]
    },
    {
      icon: Settings,
      title: "Preprocessing",
      description: "Standardization and optimization for segmentation algorithms",
      details: ["Image resizing & normalization", "Color space conversion", "Noise reduction filters"]
    },
    {
      icon: Filter,
      title: "Edge Detection",
      description: "Advanced boundary detection using Canny and other edge detection techniques",
      details: ["Canny edge detection", "Boundary highlighting", "Feature extraction"]
    },
    {
      icon: BarChart3,
      title: "Cluster Analysis",
      description: "Optimal cluster tendency evaluation for precise segmentation",
      details: ["K-Means clustering", "DBSCAN implementation", "Watershed algorithms"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Data <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Pipeline</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A sophisticated data processing workflow designed to handle diverse image datasets and deliver optimal segmentation results
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 text-lg mb-4 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-400">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataPipeline;
