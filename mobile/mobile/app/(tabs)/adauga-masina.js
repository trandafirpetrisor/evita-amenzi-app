import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function AdaugaMasinaScreen() {
  const router = useRouter();
  const [numar, setNumar] = useState('');
  const [marca, setMarca] = useState('');
  const [model, setModel] = useState('');
  const [an, setAn] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adaugă mașină</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Număr înmatriculare</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: B 123 ABC"
            value={numar}
            onChangeText={setNumar}
            autoCapitalize="characters"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>Marcă</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Dacia"
            value={marca}
            onChangeText={setMarca}
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Logan"
            value={model}
            onChangeText={setModel}
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>An fabricație</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: 2020"
            value={an}
            onChangeText={setAn}
            keyboardType="numeric"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <TouchableOpacity style={styles.btnSave}>
          <Text style={styles.btnSaveText}>Salvează mașina</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#1D6FF2', paddingTop: 55, paddingBottom: 20, paddingHorizontal: 20 },
  backBtn: { marginBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: '800' },
  content: { padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 16, elevation: 2 },
  label: { fontSize: 13, fontWeight: '600', color: '#0F172A', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 14, fontSize: 15, color: '#0F172A', borderWidth: 1, borderColor: '#E2E8F0' },
  btnSave: { backgroundColor: '#1D6FF2', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 40 },
  btnSaveText: { color: 'white', fontWeight: '700', fontSize: 16 },
});