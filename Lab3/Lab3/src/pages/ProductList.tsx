import { ScrollView, Text } from 'react-native';
import Product from '../components/Product';
import ProductType from '../types/ProductType';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [data, setData] = useState<ProductType[]>([]);
  const filePath = 'https://dummyjson.com/products/';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        console.log(d);
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => setData(prev => prev.filter(p => p.id !== id)))
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <ScrollView>
      <Text className="text-3xl font-bold text-gray-800 px-4 pt-8 pb-2">
        Product list
      </Text>
      {data.map(item => (
        <Product
          key={item.id}
          props={item}
          handleDelete={() => handleDelete(item.id)}
        />
      ))}
    </ScrollView>
  );
}
