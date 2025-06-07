
import React from 'react';
import { Code, Server, Cloud, Layers } from 'lucide-react';

const TechnologyStack = () => {
  const stacks = [
    {
      category: "Frontend",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      technologies: [
        "React.js & TypeScript",
        "Tailwind CSS & Bootstrap",
        "Chart.js & D3.js",
        "Fabric.js & OpenCV.js"
      ]
    },
    {
      category: "Backend",
      icon: Server,
      color: "from-purple-500 to-pink-500",
      technologies: [
        "Python (FastAPI/Django)",
        "OpenCV & Scikit-Image",
        "Scikit-Learn & NumPy",
        "Pandas & Data Processing"
      ]
    },
    {
      category: "Database",
      icon: Layers,
      color: "from-green-500 to-teal-500",
      technologies: [
        "MongoDB & PostgreSQL",
        "Image Metadata Storage",
        "Result Caching",
        "Configuration Management"
      ]
    },
    {
      category: "Deployment",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      technologies: [
        "Docker Containerization",
        "AWS S3 & Firebase",
        "NGINX & Apache",
        "REST API Architecture"
      ]
    }
  ];

  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technology <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built with cutting-edge technologies to ensure scalability, performance, and reliability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stacks.map((stack, index) => (
            <div 
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 group"
            >
              <div className={`bg-gradient-to-br ${stack.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}>
                <stack.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">{stack.category}</h3>
              
              <ul className="space-y-3">
                {stack.technologies.map((tech, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300">
                    <div className={`w-2 h-2 bg-gradient-to-r ${stack.color} rounded-full`}></div>
                    <span className="text-sm">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
