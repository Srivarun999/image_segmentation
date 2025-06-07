
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Image as ImageIcon, Sliders, Layers } from 'lucide-react';
import MetricsChart from './MetricsChart';
import ClusterDisplay from './ClusterDisplay';

interface SegmentationResult {
  originalImage: string;
  segmentedImage?: string;
  clusterTendency?: number;
  metrics?: {
    numSegments: number;
    averageSize: number;
    homogeneity: number;
    silhouetteScore: number;
    daviesBouldinIndex: number;
    calinskiHarabaszIndex: number;
  };
  clusters?: Array<{
    id: number;
    image: string;
    size: number;
    color: string;
    centroid: number[];
  }>;
  clusterData?: Array<{
    cluster: number;
    size: number;
    color: string;
  }>;
}

interface ResultsVisualizationProps {
  result: SegmentationResult | null;
  isProcessing: boolean;
}

const ResultsVisualization: React.FC<ResultsVisualizationProps> = ({ 
  result, 
  isProcessing 
}) => {
  if (isProcessing) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Processing image segmentation...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center text-slate-400 py-12">
        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Upload an image and select an algorithm to see results</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="comparison" className="data-[state=active]:bg-slate-700">
            <ImageIcon className="w-4 h-4 mr-2" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="clusters" className="data-[state=active]:bg-slate-700">
            <Layers className="w-4 h-4 mr-2" />
            Clusters
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-slate-700">
            <Sliders className="w-4 h-4 mr-2" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Original Image</h4>
              <img
                src={result.originalImage}
                alt="Original"
                className="w-full rounded-lg border border-slate-600"
              />
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Segmented Result</h4>
              {result.segmentedImage ? (
                <img
                  src={result.segmentedImage}
                  alt="Segmented"
                  className="w-full rounded-lg border border-slate-600"
                />
              ) : (
                <div className="w-full h-64 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center">
                  <p className="text-slate-400">Segmentation in progress...</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {result.metrics && result.clusterData ? (
            <MetricsChart metrics={result.metrics} clusterData={result.clusterData} />
          ) : (
            <p className="text-slate-400">No metrics available yet</p>
          )}
          
          {result.metrics && (
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-600">
                <h4 className="text-blue-400 font-medium mb-2">Silhouette Score</h4>
                <p className="text-2xl font-bold text-white">{(result.metrics.silhouetteScore * 100).toFixed(1)}%</p>
                <p className="text-sm text-slate-400">Higher is better</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-600">
                <h4 className="text-cyan-400 font-medium mb-2">Davies-Bouldin Index</h4>
                <p className="text-2xl font-bold text-white">{result.metrics.daviesBouldinIndex.toFixed(2)}</p>
                <p className="text-sm text-slate-400">Lower is better</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-600">
                <h4 className="text-purple-400 font-medium mb-2">Calinski-Harabasz</h4>
                <p className="text-2xl font-bold text-white">{result.metrics.calinskiHarabaszIndex.toFixed(1)}</p>
                <p className="text-sm text-slate-400">Higher is better</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="clusters" className="space-y-4">
          {result.clusters ? (
            <ClusterDisplay clusters={result.clusters} />
          ) : (
            <p className="text-slate-400">No cluster data available</p>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-600">
            <h4 className="text-white font-medium mb-4">Cluster Tendency Analysis</h4>
            {result.clusterTendency !== undefined ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Clustering Tendency</span>
                  <span className="text-blue-400 font-mono">{(result.clusterTendency * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.clusterTendency * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  {result.clusterTendency > 0.7 ? 'High clustering tendency - excellent for segmentation' : 
                   result.clusterTendency > 0.4 ? 'Moderate clustering tendency - good results expected' : 
                   'Low clustering tendency - consider parameter adjustment'}
                </p>
              </div>
            ) : (
              <p className="text-slate-400">No cluster analysis available</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsVisualization;
