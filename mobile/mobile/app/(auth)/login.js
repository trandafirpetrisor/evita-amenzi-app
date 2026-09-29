import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.68.68:3000';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !parola) {
      Alert.alert('Eroare', 'Completati email si parola');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, parola }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        router.replace('/(tabs)');
      } else {
        Alert.alert('Eroare', data.error);
      }
    } catch (err) {
      Alert.alert('Eroare', 'Nu ma pot conecta la server');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>evita<Text style={styles.logoLight}>amenzi</Text>.ro</Text>
        <Text style={styles.tagline}>Actele masinii tale, mereu la zi.</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#94A3B8"
        />
        <TextInput
          style={styles.input}
          placeholder="Parola"
          value={parola}
          onChangeText={setParola}
          secureTextEntry
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
          <Text style={styles.btnPrimaryText}>{loading ? 'Se incarca...' : 'Intra in cont'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.btnSecondaryText}>Nu am cont - Inregistreaza-ma</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#1D6FF2', paddingTop: 100, paddingBottom: 50, alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: '800', color: 'white' },
  logoLight: { fontWeight: '400', opacity: 0.8 },
  tagline: { color: 'rgba(255,255,255,0.75)', marginTop: 6, fontSize: 14 },
  form: { padding: 24, gap: 12 },
  input: { backgroundColor: 'white', borderRadius: 12, padding: 16, fontSize: 15, color: '#0F172A', elevation: 2 },
  btnPrimary: { backgroundColor: '#1D6FF2', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  btnPrimaryText: { color: 'white', fontWeight: '700', fontSize: 15 },
  btnSecondary: { alignItems: 'center', padding: 12 },
  btnSecondaryText: { color: '#1D6FF2', fontWeight: '600', fontSize: 14 },
});