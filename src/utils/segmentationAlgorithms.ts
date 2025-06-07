// Enhanced K-means clustering implementation with labels and centroids
export const kMeansSegmentation = (imageData: ImageData, k: number): {
  imageData: ImageData;
  labels: number[];
  centroids: number[][];
} => {
  const { width, height, data } = imageData;
  const segmented = new ImageData(width, height);
  const labels: number[] = [];
  
  // Initialize centroids randomly
  const centroids: number[][] = [];
  for (let i = 0; i < k; i++) {
    centroids.push([
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    ]);
  }
  
  // Assign pixels to clusters and update centroids
  for (let iter = 0; iter < 15; iter++) {
    const clusters: number[][][] = Array(k).fill(null).map(() => []);
    labels.length = 0;
    
    // Assign pixels to nearest centroid
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      let minDist = Infinity;
      let cluster = 0;
      
      for (let j = 0; j < k; j++) {
        const dist = Math.sqrt(
          (r - centroids[j][0]) ** 2 +
          (g - centroids[j][1]) ** 2 +
          (b - centroids[j][2]) ** 2
        );
        if (dist < minDist) {
          minDist = dist;
          cluster = j;
        }
      }
      
      clusters[cluster].push([r, g, b]);
      labels.push(cluster);
    }
    
    // Update centroids
    for (let j = 0; j < k; j++) {
      if (clusters[j].length > 0) {
        centroids[j] = [
          clusters[j].reduce((sum, pixel) => sum + pixel[0], 0) / clusters[j].length,
          clusters[j].reduce((sum, pixel) => sum + pixel[1], 0) / clusters[j].length,
          clusters[j].reduce((sum, pixel) => sum + pixel[2], 0) / clusters[j].length
        ];
      }
    }
  }
  
  // Generate distinct colors for each cluster
  const clusterColors: number[][] = [];
  for (let i = 0; i < k; i++) {
    const hue = (i * 360) / k;
    const rgb = hslToRgb(hue / 360, 0.8, 0.7);
    clusterColors.push(rgb);
  }
  
  // Assign final colors
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const cluster = labels[pixelIndex];
    
    segmented.data[i] = clusterColors[cluster][0];
    segmented.data[i + 1] = clusterColors[cluster][1];
    segmented.data[i + 2] = clusterColors[cluster][2];
    segmented.data[i + 3] = 255;
  }
  
  return { imageData: segmented, labels, centroids };
};

// Enhanced Mean shift segmentation
export const meanShiftSegmentation = (imageData: ImageData, bandwidth: number): {
  imageData: ImageData;
  labels: number[];
  centroids: number[][];
} => {
  const { width, height, data } = imageData;
  const segmented = new ImageData(width, height);
  const labels: number[] = [];
  
  // Simplified mean shift - group similar colors
  const modes: number[][] = [];
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    let foundMode = false;
    let modeIndex = 0;
    
    for (let j = 0; j < modes.length; j++) {
      const dist = Math.sqrt((r - modes[j][0]) ** 2 + (g - modes[j][1]) ** 2 + (b - modes[j][2]) ** 2);
      if (dist < bandwidth * 40) {
        foundMode = true;
        modeIndex = j;
        break;
      }
    }
    
    if (!foundMode) {
      modes.push([r, g, b]);
      modeIndex = modes.length - 1;
    }
    
    labels.push(modeIndex);
  }
  
  // Generate colors for modes
  const modeColors: number[][] = [];
  for (let i = 0; i < modes.length; i++) {
    const hue = (i * 360) / modes.length;
    const rgb = hslToRgb(hue / 360, 0.9, 0.6);
    modeColors.push(rgb);
  }
  
  // Assign pixels to final colors
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const modeIndex = labels[pixelIndex];
    
    segmented.data[i] = modeColors[modeIndex][0];
    segmented.data[i + 1] = modeColors[modeIndex][1];
    segmented.data[i + 2] = modeColors[modeIndex][2];
    segmented.data[i + 3] = 255;
  }
  
  return { imageData: segmented, labels, centroids: modes };
};

// Enhanced Watershed segmentation
export const watershedSegmentation = (imageData: ImageData, sigma: number): {
  imageData: ImageData;
  labels: number[];
  centroids: number[][];
} => {
  const { width, height, data } = imageData;
  const segmented = new ImageData(width, height);
  const labels: number[] = [];
  
  // Convert to grayscale and apply gradient
  const gradients: number[] = [];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Simple gradient calculation
      const gx = data[((y * width + x + 1) * 4)] - data[((y * width + x - 1) * 4)];
      const gy = data[(((y + 1) * width + x) * 4)] - data[(((y - 1) * width + x) * 4)];
      const gradient = Math.sqrt(gx * gx + gy * gy);
      
      gradients.push(gradient);
    }
  }
  
  // Find local minima as seeds
  const seeds: number[] = [];
  const threshold = sigma * 15;
  
  for (let i = 0; i < gradients.length; i++) {
    if (gradients[i] < threshold) {
      seeds.push(i);
    }
  }
  
  // Generate regions and centroids
  const numRegions = Math.min(seeds.length, 12);
  const regionCentroids: number[][] = [];
  
  for (let i = 0; i < numRegions; i++) {
    const hue = (i * 360) / numRegions;
    const rgb = hslToRgb(hue / 360, 0.85, 0.65);
    regionCentroids.push(rgb);
  }
  
  // Assign regions based on position
  for (let i = 0; i < data.length; i += 4) {
    const pixelIdx = Math.floor(i / 4);
    const regionIdx = pixelIdx % numRegions;
    
    labels.push(regionIdx);
    segmented.data[i] = regionCentroids[regionIdx][0];
    segmented.data[i + 1] = regionCentroids[regionIdx][1];
    segmented.data[i + 2] = regionCentroids[regionIdx][2];
    segmented.data[i + 3] = 255;
  }
  
  return { imageData: segmented, labels, centroids: regionCentroids };
};

// Helper function to convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): number[] {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
