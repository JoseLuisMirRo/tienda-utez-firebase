import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { db } from "../../../config/util/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";


const Home = () => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
        setProducts(products);
      } catch (error) {
        console.error("Error consultando productos", error);
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  //ALTERNATIVA
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "products"));
  //       const products = querySnapshot.docs.map(doc => doc.data());
  //       setProducts(products);
  //     } catch (error) {
  //       console.error("Error consultando productos", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchProducts();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Productos</Text>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={ProductCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 10,
    paddingEnd: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  list: {
    justifyContent: "center",
  },
});

export default Home;