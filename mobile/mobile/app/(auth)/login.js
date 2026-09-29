import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#94A3B8"
        />

        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Intra in cont</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary}>
          <Text style={styles.btnSecondaryText}>Nu am cont — Inregistreaza-ma</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#1D6FF2', paddingTop: 100, paddingBottom: 50, alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: '800', color: 'white', letterSpacing: -0.5 },
  logoLight: { fontWeight: '400', opacity: 0.8 },
  tagline: { color: 'rgba(255,255,255,0.75)', marginTop: 6, fontSize: 14 },
  form: { padding: 24, gap: 12 },
  input: { backgroundColor: 'white', borderRadius: 12, padding: 16, fontSize: 15, color: '#0F172A', elevation: 2 },
  btnPrimary: { backgroundColor: '#1D6FF2', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  btnPrimaryText: { color: 'white', fontWeight: '700', fontSize: 15 },
  btnSecondary: { alignItems: 'center', padding: 12 },
  btnSecondaryText: { color: '#1D6FF2', fontWeight: '600', fontSize: 14 },
});