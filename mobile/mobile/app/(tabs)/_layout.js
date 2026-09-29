import { Tabs } from 'expo-router';
import { Text } from 'react-native';

function TabIcon({ emoji }) {
  return <Text style={{ fontSize: 22 }}>{emoji}</Text>;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1D6FF2',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#E2E8F0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mașini',
          tabBarIcon: () => <TabIcon emoji="🚗" />,
        }}
      />
      <Tabs.Screen
        name="alerte"
        options={{
          title: 'Alerte',
          tabBarIcon: () => <TabIcon emoji="🔔" />,
        }}
      />
      <Tabs.Screen
        name="acte"
        options={{
          title: 'Acte',
          tabBarIcon: () => <TabIcon emoji="📄" />,
        }}
      />
      <Tabs.Screen
        name="linkuri"
        options={{
          title: 'Link-uri',
          tabBarIcon: () => <TabIcon emoji="🔗" />,
        }}
      />
      <Tabs.Screen
        name="setari"
        options={{
          title: 'Setări',
          tabBarIcon: () => <TabIcon emoji="⚙️" />,
        }}
      />
    </Tabs>
  );
}