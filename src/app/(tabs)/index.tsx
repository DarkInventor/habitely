import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { AddTaskModal } from '@/src/components/AddTaskModal';

type Habit = {
  id: string;
  name: string;
  icon: string;
  progress: number;
  target: number;
  streak: string;
  color: string;
};

const initialHabits: Habit[] = [
  { 
    id: '1', 
    name: 'Regular Medicines', 
    icon: '💊', 
    progress: 30, 
    target: 30, 
    streak: '30 Days streak',
    color: '#7C3AED'
  },
  { 
    id: '2', 
    name: 'Daily Cycling', 
    icon: '🚴', 
    progress: 20, 
    target: 20, 
    streak: '20 Days streak',
    color: '#7C3AED'
  },
  { 
    id: '3', 
    name: 'Meditation', 
    icon: '🧘', 
    progress: 15, 
    target: 30, 
    streak: '15 Days streak',
    color: '#7C3AED'
  },
  { 
    id: '4', 
    name: 'Reading', 
    icon: '📚', 
    progress: 10, 
    target: 20, 
    streak: '10 Days streak',
    color: '#7C3AED'
  },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [5, 6, 7, 8, 9, 10, 11];
const currentDay = 1; // Tuesday is selected in the image

export default function App() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { height } = useWindowDimensions();
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addHabit = (newHabit: Habit) => {
    setHabits(prevHabits => [...prevHabits, newHabit]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-6 pb-4 ml-6">
          <View className="flex-row items-center">
            <View>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">Welcome,</Text>
              <Text className="text-gray-900 dark:text-white text-2xl font-semibold">Vidhyut Keshav</Text>
            </View>
          </View>
        </View>

        {/* Calendar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mt-6 px-6"
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {weekDays.map((day, index) => (
            <Pressable 
              key={day} 
              className={`items-center mx-2 px-4 py-3 rounded-full ${
                index === currentDay 
                  ? 'bg-violet-500 dark:bg-violet-600' 
                  : 'bg-transparent'
              }`}
            >
              <Text 
                className={`text-sm ${
                  index === currentDay 
                    ? 'text-white' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {day}
              </Text>
              <Text 
                className={`text-lg font-semibold ${
                  index === currentDay 
                    ? 'text-white' 
                    : 'text-gray-900 dark:text-gray-300'
                }`}
              >
                {dates[index]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Filter Tabs */}
        <View className="flex-row justify-center space-x-4 mt-8 px-6">
          <Pressable className="px-6 py-3">
            <Text className="text-gray-500 dark:text-gray-400">In Progress</Text>
          </Pressable>
          <Pressable className="px-6 py-3 bg-violet-500 dark:bg-violet-600 rounded-full">
            <Text className="text-white font-medium">Completed</Text>
          </Pressable>
          <Pressable className="px-6 py-3">
            <Text className="text-gray-500 dark:text-gray-400">Overdue</Text>
          </Pressable>
        </View>

        {/* Habits List */}
        <View className="px-6 pt-8 pb-24">
          {habits.map(habit => (
            <View 
              key={habit.id} 
              className="p-5 bg-white dark:bg-gray-800 rounded-2xl mb-5"
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900 items-center justify-center mr-4">
                    <Text className="text-3xl">{habit.icon}</Text>
                  </View>
                  <View>
                    <Text className="text-xl font-semibold text-gray-900 dark:text-white">
                      {habit.name}
                    </Text>
                    <Text className="text-sm text-green-500 mt-1">
                      {habit.streak}
                    </Text>
                  </View>
                </View>
                <View className="bg-violet-100 dark:bg-violet-900 px-4 py-2 rounded-lg">
                  <Text className="text-violet-600 dark:text-violet-300 font-medium text-lg">
                    {habit.progress}/{habit.target}
                  </Text>
                  <Text className="text-violet-600 dark:text-violet-300 text-xs text-center">
                    Days
                  </Text>
                </View>
              </View>
              <View className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-violet-500 dark:bg-violet-600 rounded-full"
                  style={{ width: `${(habit.progress / habit.target) * 100}%` }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute right-6 bottom-6">
        <Pressable 
          className="w-16 h-16 bg-violet-500 dark:bg-violet-600 rounded-full items-center justify-center shadow-lg"
          onPress={() => setIsModalVisible(true)}
        >
          <Text className="text-white text-4xl font-light">+</Text>
        </Pressable>
      </View>

      <AddTaskModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddHabit={addHabit}
      />
    </SafeAreaView>
  );
}

