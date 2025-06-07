
// Calculate silhouette score for image segmentation
export const calculateSilhouetteScore = (imageData: ImageData, labels: number[]): number => {
  const { width, height, data } = imageData;
  const pixels: number[][] = [];
  
  // Extract pixel RGB values
  for (let i = 0; i < data.length; i += 4) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  
  // Calculate silhouette score (simplified version)
  let totalScore = 0;
  const uniqueLabels = [...new Set(labels)];
  
  for (let i = 0; i < pixels.length; i++) {
    const currentLabel = labels[i];
    
    // Calculate intra-cluster distance (a)
    const sameClusterPixels = pixels.filter((_, idx) => labels[idx] === currentLabel);
    let intraDistance = 0;
    for (const pixel of sameClusterPixels) {
      intraDistance += euclideanDistance(pixels[i], pixel);
    }
    const a = sameClusterPixels.length > 1 ? intraDistance / (sameClusterPixels.length - 1) : 0;
    
    // Calculate nearest-cluster distance (b)
    let minInterDistance = Infinity;
    for (const label of uniqueLabels) {
      if (label !== currentLabel) {
        const otherClusterPixels = pixels.filter((_, idx) => labels[idx] === label);
        let interDistance = 0;
        for (const pixel of otherClusterPixels) {
          interDistance += euclideanDistance(pixels[i], pixel);
        }
        const avgInterDistance = otherClusterPixels.length > 0 ? interDistance / otherClusterPixels.length : 0;
        minInterDistance = Math.min(minInterDistance, avgInterDistance);
      }
    }
    const b = minInterDistance;
    
    // Silhouette coefficient for this pixel
    const s = a === 0 ? 0 : (b - a) / Math.max(a, b);
    totalScore += s;
  }
  
  return totalScore / pixels.length;
};

export const calculateDaviesBouldinIndex = (centroids: number[][], clusters: number[][][]): number => {
  const k = centroids.length;
  let dbIndex = 0;
  
  for (let i = 0; i < k; i++) {
    let maxRatio = 0;
    
    for (let j = 0; j < k; j++) {
      if (i !== j) {
        const scatterI = calculateScatter(clusters[i], centroids[i]);
        const scatterJ = calculateScatter(clusters[j], centroids[j]);
        const distance = euclideanDistance(centroids[i], centroids[j]);
        
        const ratio = (scatterI + scatterJ) / distance;
        maxRatio = Math.max(maxRatio, ratio);
      }
    }
    
    dbIndex += maxRatio;
  }
  
  return dbIndex / k;
};

export const calculateCalinskiHarabaszIndex = (
  imageData: ImageData, 
  centroids: number[][], 
  labels: number[]
): number => {
  const { data } = imageData;
  const pixels: number[][] = [];
  
  for (let i = 0; i < data.length; i += 4) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  
  const k = centroids.length;
  const n = pixels.length;
  
  // Calculate overall centroid
  const overallCentroid = [0, 0, 0];
  for (const pixel of pixels) {
    overallCentroid[0] += pixel[0];
    overallCentroid[1] += pixel[1];
    overallCentroid[2] += pixel[2];
  }
  overallCentroid[0] /= n;
  overallCentroid[1] /= n;
  overallCentroid[2] /= n;
  
  // Calculate between-cluster sum of squares
  let betweenSS = 0;
  for (let i = 0; i < k; i++) {
    const clusterSize = labels.filter(label => label === i).length;
    const distance = euclideanDistance(centroids[i], overallCentroid);
    betweenSS += clusterSize * distance * distance;
  }
  
  // Calculate within-cluster sum of squares
  let withinSS = 0;
  for (let i = 0; i < pixels.length; i++) {
    const distance = euclideanDistance(pixels[i], centroids[labels[i]]);
    withinSS += distance * distance;
  }
  
  return (betweenSS / (k - 1)) / (withinSS / (n - k));
};

const euclideanDistance = (p1: number[], p2: number[]): number => {
  return Math.sqrt(p1.reduce((sum, val, idx) => sum + Math.pow(val - p2[idx], 2), 0));
};

const calculateScatter = (cluster: number[][], centroid: number[]): number => {
  if (cluster.length === 0) return 0;
  
  let scatter = 0;
  for (const point of cluster) {
    scatter += euclideanDistance(point, centroid);
  }
  return scatter / cluster.length;
};
