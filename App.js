import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  TextInput,
  RefreshControl,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// ==========================================
// 1. DATA DUMMY (URL GAMBAR OPTIMAL & AMAN)
// ==========================================
const destinationsData = [
  {
    id: '1',
    name: 'Raja Ampat',
    location: 'Papua Barat, Indonesia',
    price: 'Rp 7.500.000',
    description: 'Surga bawah laut dunia dengan gugusan pulau karang yang ikonik dan keanekaragaman hayati laut tertinggi di bumi.',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    name: 'Candi Borobudur',
    location: 'Magelang, Jawa Tengah',
    price: 'Rp 350.000',
    description: 'Candi Buddha terbesar di dunia yang menawarkan pemandangan matahari terbit magis berlatar Gunung Merapi.',
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    name: 'Tanah Lot',
    location: 'Tabanan, Bali',
    price: 'Rp 150.000',
    description: 'Pura legendaris yang berdiri kokoh di atas bongkahan batu karang besar di tengah laut, terkenal dengan pemandangan sunset-nya.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '4',
    name: 'Gunung Bromo',
    location: 'Probolinggo, Jawa Timur',
    price: 'Rp 400.000',
    description: 'Lautan pasir yang luas dan kawah aktif yang menakjubkan, dikelilingi oleh pemandangan kaldera yang seperti planet lain.',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '5',
    name: 'Labuan Bajo',
    location: 'Nusa Tenggara Timur',
    price: 'Rp 5.000.000',
    description: 'Gerbang menuju Taman Nasional Komodo, menawarkan pantai pink yang unik dan pemandangan pulau dari puncak Bukit Padar.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '6',
    name: 'Danau Toba',
    location: 'Sumatera Utara',
    price: 'Rp 600.000',
    description: 'Danau vulkanik raksasa dengan Pulau Samosir di tengahnya, kaya akan budaya Batak dan udara pegunungan yang sejuk.',
    image: 'https://images.unsplash.com/photo-1626125345510-4603468eedfb?w=500&auto=format&fit=crop&q=60'
  }
];

// ==========================================
// 2. KOMPONEN LAYAR (SCREENS)
// ==========================================

function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Detail', { destination: item })}
    >
      <View style={styles.imagePlaceholder}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImage} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={styles.cardName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={14} color="#059669" />
              <Text style={styles.cardLocation}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TravelBuddy</Text>
        <Text style={styles.headerSubtitle}>Ayo Temukan Wisata Ternyaman Mu!!</Text>
      </View>
      <FlatList
        data={destinationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#059669']} />
        }
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route, navigation, favorites, toggleFavorite }) {
  const { destination } = route.params || {};

  if (!destination) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: '#64748b' }}>Data destinasi tidak ditemukan.</Text>
      </View>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === destination.id);

  return (
    <SafeAreaView style={styles.safeContainerDetail}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: destination.image }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => toggleFavorite(destination)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={22} 
              color={isFavorite ? "#ef4444" : "#1e293b"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.detailName}>{destination.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#059669" />
            <Text style={styles.detailLocation}>{destination.location}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{destination.description}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.footerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.priceLabel}>Estimasi Biaya</Text>
              <Text style={styles.price}>{destination.price}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookText}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = destinationsData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            style={styles.input}
            placeholder="Cari destinasi atau lokasi..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.resultItem}
            onPress={() => navigation.navigate('HomeStack', {
              screen: 'Detail',
              params: { destination: item }
            })}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnailImage} resizeMode="cover" />
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 12 }}>
              <Text style={styles.resultName}>{item.name}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={12} color="#059669" />
                <Text style={styles.resultLocation}>{item.location}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Destinasi tidak ditemukan.</Text>
        }
      />
    </SafeAreaView>
  );
}

// Perbaikan khusus pada tampilan Layar Favorit
function FavoritesScreen({ navigation, favorites }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorit Saya</Text>
        <Text style={styles.headerSubtitle}>Destinasi yang kamu simpan</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.favoriteListContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.85}
            style={styles.favoriteCard}
            onPress={() => navigation.navigate('HomeStack', {
              screen: 'Detail',
              params: { destination: item }
            })}
          >
            <Image 
              source={{ uri: item.image }} 
              style={styles.favoriteImage} 
              resizeMode="cover" 
            />
            
            <View style={styles.favoriteCardBody}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.favoriteName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={12} color="#ffffff" style={{ opacity: 0.9 }} />
                  <Text style={styles.favoriteLocation} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>
                <Text style={styles.favoritePriceTag}>{item.price}</Text>
              </View>
              
              <View style={styles.favoriteArrowAction}>
                <Ionicons name="chevron-forward" size={18} color="#195827" />
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.favoriteEmptyContainer}>
            <View style={styles.favoriteEmptyIconBag}>
              <Ionicons name="heart-outline" size={48} color="#195827" />
            </View>
            <Text style={styles.favoriteEmptyTitle}>Belum Ada Favorit</Text>
            <Text style={styles.favoriteEmptyDesc}>
              Ketuk ikon hati pada detail destinasi untuk menyimpannya di sini.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ==========================================
// 3. STRUKTUR NAVIGASI UTAMA
// ==========================================
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator({ favorites, toggleFavorite }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Detail">
        {(props) => <DetailScreen {...props} favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (destination) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === destination.id);
      if (exists) {
        return prev.filter((item) => item.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#059669',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen name="HomeStack" options={{ tabBarLabel: 'Beranda', tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size} /> }}>
          {(props) => <HomeStackNavigator {...props} favorites={favorites} toggleFavorite={toggleFavorite} />}
        </Tab.Screen>
        
        <Tab.Screen name="Search" options={{ tabBarLabel: 'Cari', tabBarIcon: ({color, size}) => <Ionicons name="search" color={color} size={size} /> }}>
          {(props) => <SearchScreen {...props} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="Favorites"
          options={{ 
            tabBarLabel: 'Favorit',
            tabBarIcon: ({color, size}) => <Ionicons name="heart" color={color} size={size} />,
            tabBarBadge: favorites.length > 0 ? favorites.length : null,
            tabBarBadgeStyle: { backgroundColor: '#ef4444' }
          }}
        >
          {(props) => <FavoritesScreen {...props} favorites={favorites} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// 4. DESAIN DAN STYLE BERGAYA EMERALD
// ==========================================
const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#aec2b1' },
  safeContainerDetail: { flex: 1, backgroundColor: '#21782f' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: { paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#195827', borderBottomWidth: 1, borderColor: '#f1f5f9' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#ffffff' },
  headerSubtitle: { fontSize: 14, color: '#ffffff', marginTop: 2 },
  listContent: { padding: 16 },
  
  card: { backgroundColor: '#196926', borderRadius: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#e2e8f0' },
  imagePlaceholder: { width: '100%', height: 200, backgroundColor: '#ffffff' }, 
  cardImage: { width: '100%', height: '100%' }, 
  cardBody: { padding: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: 18, fontWeight: '700', color: '#ffffff' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  cardLocation: { fontSize: 13, color: '#ffffff', marginLeft: 4 },
  priceBadge: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  cardPrice: { fontSize: 14, fontWeight: '700', color: '#19672d' },
  
  imageContainer: { position: 'relative', backgroundColor: '#ffffff' },
  heroImage: { width: '100%', height: 300 },
  backButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#ffffff', padding: 8, borderRadius: 20 },
  favoriteButton: { position: 'absolute', top: 40, right: 20, backgroundColor: '#ffffff', padding: 8, borderRadius: 20 },
  infoContainer: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#ffffff', marginTop: -20 },
  detailName: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  detailLocation: { fontSize: 14, color: '#475569', marginLeft: 4 }, // Perbaikan kontras agar teks lokasi di detail terbaca
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 16 }, // Diubah menjadi abu-abu terang agar estetik
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 6 },
  description: { fontSize: 14, color: '#334155', lineHeight: 22 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: 12, color: '#64748b' },
  price: { fontSize: 20, fontWeight: '800', color: '#237438' },
  bookButton: { backgroundColor: '#1b632b', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  bookText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },

  searchHeader: { padding: 16, backgroundColor: '#569b45', borderBottomWidth: 1, borderColor: '#fefefe' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  input: { flex: 1, fontSize: 15, color: '#0f172a', marginLeft: 8 },
  resultItem: { flexDirection: 'row', backgroundColor: '#306934', padding: 12, borderRadius: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  thumbnailImage: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#cbd5e1' },
  resultName: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
  resultLocation: { fontSize: 13, color: '#ffffff', marginLeft: 4 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#ffffff', fontSize: 14 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },

  // ==========================================
  // SYTLING KHUSUS HALAMAN FAVORIT (BARU)
  // ==========================================
  favoriteListContent: {
    padding: 16,
    flexGrow: 1,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#196926',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  favoriteImage: {
    width: 95,
    height: 95,
    backgroundColor: '#ffffff',
  },
  favoriteCardBody: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  favoriteLocation: {
    fontSize: 12,
    color: '#e2e8f0',
    marginLeft: 3,
    flex: 1,
  },
  favoritePriceTag: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fef08a', 
    marginTop: 6,
  },
  favoriteArrowAction: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  favoriteEmptyIconBag: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(25, 88, 39, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  favoriteEmptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#195827',
    marginBottom: 6,
  },
  favoriteEmptyDesc: {
    fontSize: 13,
    color: '#4f6f52',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 18,
  },
});