// import React, { useState } from 'react';
// import { Modal, View, Text, Pressable, TextInput, Alert } from 'react-native';
// import { useColorScheme } from 'nativewind';

// type TaskOption = {
//   id: string;
//   name: string;
//   icon: string;
// };

// const taskOptions: TaskOption[] = [
//   { id: '1', name: 'Exercise', icon: '🏋️' },
//   { id: '2', name: 'Read', icon: '📚' },
//   { id: '3', name: 'Meditate', icon: '🧘' },
//   { id: '4', name: 'Code', icon: '💻' },
// ];

// // Mock function to simulate saving to a database
// const saveTaskToDatabase = async (task: TaskOption, customName: string) => {
//   // In a real app, this would be an API call or database operation
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Task saved:', { ...task, customName });
//       resolve(true);
//     }, 1000);
//   });
// };

// type AddTaskModalProps = {
//   isVisible: boolean;
//   onClose: () => void;
// };

// export function AddTaskModal({ isVisible, onClose }: AddTaskModalProps) {
//   const { colorScheme } = useColorScheme();
//   const isDark = colorScheme === 'dark';
//   const [selectedTask, setSelectedTask] = useState<TaskOption | null>(null);
//   const [customName, setCustomName] = useState('');

//   const handleSaveTask = async () => {
//     if (selectedTask) {
//       try {
//         await saveTaskToDatabase(selectedTask, customName);
//         Alert.alert('Success', 'Task saved successfully!');
//         onClose();
//       } catch (error) {
//         Alert.alert('Error', 'Failed to save task. Please try again.');
//       }
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={onClose}
//     >
//       <View className="flex-1 justify-end">
//         <View className={`bg-white dark:bg-gray-800 rounded-t-3xl p-6 ${isDark ? 'shadow-white' : 'shadow-black'} shadow-lg`}>
//           <Text className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Task</Text>
//           <View className="flex-row flex-wrap justify-between mb-4">
//             {taskOptions.map((option) => (
//               <Pressable
//                 key={option.id}
//                 className={`w-[48%] p-4 mb-4 rounded-xl ${
//                   selectedTask?.id === option.id
//                     ? 'bg-violet-500 dark:bg-violet-600'
//                     : 'bg-gray-100 dark:bg-gray-700'
//                 }`}
//                 onPress={() => setSelectedTask(option)}
//               >
//                 <Text className="text-3xl mb-2">{option.icon}</Text>
//                 <Text className={`text-lg ${
//                   selectedTask?.id === option.id
//                     ? 'text-white'
//                     : 'text-gray-800 dark:text-white'
//                 }`}>
//                   {option.name}
//                 </Text>
//               </Pressable>
//             ))}
//           </View>
//           {selectedTask && (
//             <TextInput
//               className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-4 text-gray-800 dark:text-white"
//               placeholder="Custom task name (optional)"
//               placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
//               value={customName}
//               onChangeText={setCustomName}
//             />
//           )}
//           <View className="flex-row justify-end">
//             <Pressable
//               className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 mr-4"
//               onPress={onClose}
//             >
//               <Text className="text-gray-800 dark:text-white font-semibold">Cancel</Text>
//             </Pressable>
//             <Pressable
//               className={`px-6 py-3 rounded-xl ${
//                 selectedTask
//                   ? 'bg-violet-500 dark:bg-violet-600'
//                   : 'bg-gray-300 dark:bg-gray-600'
//               }`}
//               onPress={handleSaveTask}
//               disabled={!selectedTask}
//             >
//               <Text className="text-white font-semibold">Save</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

import React, { useState } from 'react';
import { Modal, View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useColorScheme } from 'nativewind';

type TaskOption = {
  id: string;
  name: string;
  icon: string;
};

const taskOptions: TaskOption[] = [
  { id: '1', name: 'Exercise', icon: '🏋️' },
  { id: '2', name: 'Read', icon: '📚' },
  { id: '3', name: 'Meditate', icon: '🧘' },
  { id: '4', name: 'Code', icon: '💻' },
];

type Habit = {
  id: string;
  name: string;
  icon: string;
  progress: number;
  target: number;
  streak: string;
  color: string;
};

type AddTaskModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onAddHabit: (habit: Habit) => void;
};

export function AddTaskModal({ isVisible, onClose, onAddHabit }: AddTaskModalProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedTask, setSelectedTask] = useState<TaskOption | null>(null);
  const [customName, setCustomName] = useState('');
  const [target, setTarget] = useState('');

  const handleSaveTask = () => {
    if (selectedTask) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: customName || selectedTask.name,
        icon: selectedTask.icon,
        progress: 0,
        target: parseInt(target) || 30,
        streak: '0 Days streak',
        color: '#7C3AED',
      };

      onAddHabit(newHabit);
      onClose();
      setSelectedTask(null);
      setCustomName('');
      setTarget('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className={`bg-white dark:bg-gray-800 rounded-t-3xl p-6 ${isDark ? 'shadow-white' : 'shadow-black'} shadow-lg`}>
          <Text className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Habit</Text>
          <View className="flex-row flex-wrap justify-between mb-4">
            {taskOptions.map((option) => (
              <Pressable
                key={option.id}
                className={`w-[48%] p-4 mb-4 rounded-xl ${
                  selectedTask?.id === option.id
                    ? 'bg-violet-500 dark:bg-violet-600'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
                onPress={() => setSelectedTask(option)}
              >
                <Text className="text-3xl mb-2">{option.icon}</Text>
                <Text className={`text-lg ${
                  selectedTask?.id === option.id
                    ? 'text-white'
                    : 'text-gray-800 dark:text-white'
                }`}>
                  {option.name}
                </Text>
              </Pressable>
            ))}
          </View>
          {selectedTask && (
            <>
              <TextInput
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-4 text-gray-800 dark:text-white"
                placeholder="Custom habit name (optional)"
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                value={customName}
                onChangeText={setCustomName}
              />
              <TextInput
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-4 text-gray-800 dark:text-white"
                placeholder="Target (days)"
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                value={target}
                onChangeText={setTarget}
                keyboardType="numeric"
              />
            </>
          )}
          <View className="flex-row justify-end">
            <Pressable
              className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 mr-4"
              onPress={onClose}
            >
              <Text className="text-gray-800 dark:text-white font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              className={`px-6 py-3 rounded-xl ${
                selectedTask
                  ? 'bg-violet-500 dark:bg-violet-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onPress={handleSaveTask}
              disabled={!selectedTask}
            >
              <Text className="text-white font-semibold">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

