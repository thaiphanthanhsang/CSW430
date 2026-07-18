import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import Product from '../components/Product';
import ProductType from '../types/ProductType';

export default function SearchProduct() {
  const [data, setData] = useState<ProductType[]>([]);
  const [value, setValue] = useState('');

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
      .then(() => {
        setData(prev => prev.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const searchProduct = () => {
    let filePath = 'https://dummyjson.com/products';
    if (value !== '') {
      filePath = 'https://dummyjson.com/products/search?q=' + value;
    }

    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Text className="text-lg font-bold text-gray-800 mb-2">
        Search Products
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-gray-700 bg-white"
        placeholder="Enter keyword..."
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={setValue}
      />

      <Pressable
        onPress={searchProduct}
        className="bg-blue-500 rounded-lg py-3 items-center mb-4 active:bg-blue-600"
      >
        <Text className="text-white font-bold">SEARCH</Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            props={item}
            key={item.id}
            handleDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );
}
