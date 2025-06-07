
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AlgorithmSelectionProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
}

const algorithms = [
  { value: 'kmeans', label: 'K-Means Clustering', description: 'Partitions data into k clusters' },
  { value: 'dbscan', label: 'DBSCAN', description: 'Density-based clustering' },
  { value: 'watershed', label: 'Watershed', description: 'Marker-based segmentation' },
  { value: 'meanshift', label: 'Mean Shift', description: 'Non-parametric clustering' },
  { value: 'felzenszwalb', label: 'Felzenszwalb', description: 'Graph-based segmentation' },
];

const AlgorithmSelection: React.FC<AlgorithmSelectionProps> = ({ 
  selectedAlgorithm, 
  onAlgorithmChange 
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-white font-medium">Segmentation Algorithm</Label>
      <Select value={selectedAlgorithm} onValueChange={onAlgorithmChange}>
        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
          <SelectValue placeholder="Select segmentation algorithm" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          {algorithms.map((algorithm) => (
            <SelectItem 
              key={algorithm.value} 
              value={algorithm.value}
              className="text-white hover:bg-slate-700 focus:bg-slate-700"
            >
              <div>
                <div className="font-medium">{algorithm.label}</div>
                <div className="text-sm text-slate-400">{algorithm.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlgorithmSelection;
