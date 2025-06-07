
import React from 'react';
import { Upload, Zap, BarChart3, Settings, Download, Eye } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Image Upload & Processing",
      description: "Seamless upload interface with real-time preprocessing and format validation"
    },
    {
      icon: BarChart3,
      title: "Cluster Tendency Analysis",
      description: "Advanced algorithms to determine optimal cluster configurations for segmentation"
    },
    {
      icon: Zap,
      title: "Real-time Segmentation",
      description: "Instant processing with multiple algorithm options (K-Means, DBSCAN, Watershed)"
    },
    {
      icon: Eye,
      title: "Interactive Visualization",
      description: "Dynamic result visualization with comparison tools and segmentation overlays"
    },
    {
      icon: Settings,
      title: "Algorithm Configuration",
      description: "Fine-tune parameters for different segmentation algorithms and clustering methods"
    },
    {
      icon: Download,
      title: "Export & Analysis",
      description: "Download results in multiple formats with detailed performance metrics"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Key <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive tools for advanced image segmentation research and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="bg-gradient-to-br from-green-500 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-slate-300 text-lg mb-6">
              Experience the power of advanced unsupervised image segmentation with optimal cluster tendency analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Launch Application
              </button>
              <button className="border border-slate-600 hover:border-slate-500 text-slate-200 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-slate-800/50">
                View GitHub Repository
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
