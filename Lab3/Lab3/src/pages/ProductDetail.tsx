import { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import ProductType from '../types/ProductType';
import { RootTabParamList } from '../../App';

export default function ProductDetail() {
  const navigation = useNavigation();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const route = useRoute<RouteProp<RootTabParamList, 'Detail'>>();
  const productId = route.params?.productId ?? 1;

  useEffect(() => {
    setProduct(null);
    setIsDeleted(false);
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setProduct(d);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [productId]);

  const handleDelete = () => {
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setIsDeleted(true);
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleCancel = () => {
    navigation.navigate('Products');
  };

  if (!product) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      <Text className="text-3xl font-bold text-gray-800 pb-4">
        Product Detail
      </Text>

      {isDeleted && (
        <View className="bg-red-100 rounded-md px-3 py-2 mb-3">
          <Text className="text-red-600 text-sm font-semibold">
            Sản phẩm này đã được xoá.
          </Text>
        </View>
      )}

      <Image
        source={{ uri: product.images[0] }}
        className="w-full h-48 rounded-lg bg-gray-100"
        resizeMode="cover"
      />

      <Text className="text-base font-bold text-gray-900 mt-3">
        Title: {product.title}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        Description: {product.description}
      </Text>
      <Text className="text-sm text-gray-800 mt-1">Price: {product.price}</Text>
      <Text className="text-sm font-semibold text-green-600 mt-1">
        Discount: {product.discountPercentage} off
      </Text>
      <Text className="text-sm text-gray-800 mt-1">
        Rating: {product.rating}
      </Text>
      <Text className="text-sm text-gray-800 mt-1">Stock: {product.stock}</Text>
      <Text className="text-sm text-gray-800 mt-1">Brand: {product.brand}</Text>
      <Text className="text-sm text-gray-800 mt-1">
        Category: {product.category}
      </Text>

      <View className="flex-row mt-4 mb-8">
        <Pressable
          onPress={handleCancel}
          className="flex-1 bg-gray-400 rounded-md py-2 mr-2 items-center active:bg-gray-500"
        >
          <Text className="text-white font-semibold text-xs">CANCEL</Text>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          disabled={isDeleted}
          className={`flex-1 rounded-md py-2 items-center ${
            isDeleted ? 'bg-gray-300' : 'bg-red-500 active:bg-red-600'
          }`}
        >
          <Text className="text-white font-semibold text-xs">
            {isDeleted ? 'DELETED' : 'DELETE'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
