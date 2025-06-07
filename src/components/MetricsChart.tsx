
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MetricsChartProps {
  metrics: {
    silhouetteScore: number;
    daviesBouldinIndex: number;
    calinskiHarabaszIndex: number;
    numSegments: number;
    averageSize: number;
    homogeneity: number;
  };
  clusterData: Array<{
    cluster: number;
    size: number;
    color: string;
  }>;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics, clusterData }) => {
  const metricsData = [
    { name: 'Silhouette Score', value: (metrics.silhouetteScore * 100).toFixed(1), fullValue: metrics.silhouetteScore },
    { name: 'Davies-Bouldin Index', value: metrics.daviesBouldinIndex.toFixed(2), fullValue: metrics.daviesBouldinIndex },
    { name: 'Calinski-Harabasz Index', value: metrics.calinskiHarabaszIndex.toFixed(1), fullValue: metrics.calinskiHarabaszIndex },
    { name: 'Homogeneity', value: (metrics.homogeneity * 100).toFixed(1), fullValue: metrics.homogeneity }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Metrics Bar Chart */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <h4 className="text-white font-medium mb-4">Segmentation Metrics</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value: any, name: string) => [
                `${value}${name.includes('Score') || name.includes('Homogeneity') ? '%' : ''}`,
                name
              ]}
            />
            <Bar dataKey="fullValue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cluster Distribution Pie Chart */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <h4 className="text-white font-medium mb-4">Cluster Size Distribution</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={clusterData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `C${entry.cluster}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="size"
            >
              {clusterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value: any) => [`${value} pixels`, 'Size']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;
