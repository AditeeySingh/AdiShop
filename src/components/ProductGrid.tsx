import React from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';

type ProductGridProps = {
  products: any[];
  loading: boolean;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;