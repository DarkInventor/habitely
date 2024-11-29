import React, { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, User, Info, CircleUser } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import Colors from '@/src/constants/Colors';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

function TabBarIcon(props: {
  icon: React.ElementType;
  color: string;
}) {
  const Icon = props.icon;
  return <Icon size={24} color={props.color} />;
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { width, height } = useWindowDimensions();

  const isLargeScreen = width > 768;

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
            height: isLargeScreen ? 60 : 80,
            paddingBottom: isLargeScreen ? 10 : 5,
            paddingTop: isLargeScreen ? 10 : 5,
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          },
          tabBarItemStyle: {
            padding: isLargeScreen ? 10 : 5,
          },
          tabBarLabelStyle: {
            fontSize: isLargeScreen ? 12 : 10,
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: isLargeScreen ? 20 : 16,
          },
          headerTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon icon={Home} color={color} />,       
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon icon={CircleUser} color={color} />,
          }}
        />
      </Tabs>
  );
}

