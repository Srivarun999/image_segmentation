
import React from 'react';

interface ClusterDisplayProps {
  clusters: Array<{
    id: number;
    image: string;
    size: number;
    color: string;
    centroid: number[];
  }>;
}

const ClusterDisplay: React.FC<ClusterDisplayProps> = ({ clusters }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-white font-medium mb-4">Individual Clusters</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {clusters.map((cluster) => (
          <div key={cluster.id} className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="text-center mb-3">
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-slate-600"
                style={{ backgroundColor: cluster.color }}
              ></div>
              <h5 className="text-white font-medium">Cluster {cluster.id}</h5>
              <p className="text-slate-400 text-sm">{cluster.size} pixels</p>
            </div>
            <img
              src={cluster.image}
              alt={`Cluster ${cluster.id}`}
              className="w-full h-24 object-cover rounded border border-slate-600"
            />
            <div className="mt-2 text-xs text-slate-400">
              <p>RGB: ({cluster.centroid.map(v => Math.round(v)).join(', ')})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterDisplay;
