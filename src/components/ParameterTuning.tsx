
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface Parameters {
  clusters: number;
  sigma: number;
  epsilon: number;
  minSamples: number;
}

interface ParameterTuningProps {
  algorithm: string;
  parameters: Parameters;
  onParameterChange: (param: keyof Parameters, value: number) => void;
}

const ParameterTuning: React.FC<ParameterTuningProps> = ({ 
  algorithm, 
  parameters, 
  onParameterChange 
}) => {
  const getParametersForAlgorithm = () => {
    switch (algorithm) {
      case 'kmeans':
        return [
          { key: 'clusters' as keyof Parameters, label: 'Number of Clusters', min: 2, max: 20, step: 1 }
        ];
      case 'dbscan':
        return [
          { key: 'epsilon' as keyof Parameters, label: 'Epsilon (ε)', min: 0.1, max: 2.0, step: 0.1 },
          { key: 'minSamples' as keyof Parameters, label: 'Min Samples', min: 1, max: 20, step: 1 }
        ];
      case 'watershed':
        return [
          { key: 'sigma' as keyof Parameters, label: 'Gaussian Sigma', min: 0.5, max: 5.0, step: 0.1 }
        ];
      case 'meanshift':
        return [
          { key: 'sigma' as keyof Parameters, label: 'Bandwidth', min: 0.5, max: 5.0, step: 0.1 }
        ];
      case 'felzenszwalb':
        return [
          { key: 'sigma' as keyof Parameters, label: 'Sigma', min: 0.1, max: 2.0, step: 0.1 },
          { key: 'clusters' as keyof Parameters, label: 'Min Size', min: 10, max: 1000, step: 10 }
        ];
      default:
        return [];
    }
  };

  const parameterConfigs = getParametersForAlgorithm();

  if (parameterConfigs.length === 0) {
    return (
      <div className="text-center text-slate-400 py-8">
        Select an algorithm to configure parameters
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Algorithm Parameters</h3>
      {parameterConfigs.map((config) => (
        <div key={config.key} className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-white font-medium">{config.label}</Label>
            <span className="text-blue-400 font-mono">
              {parameters[config.key].toFixed(config.step < 1 ? 1 : 0)}
            </span>
          </div>
          <Slider
            value={[parameters[config.key]]}
            onValueChange={(values) => onParameterChange(config.key, values[0])}
            min={config.min}
            max={config.max}
            step={config.step}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default ParameterTuning;
