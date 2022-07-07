import { FontAwesome5, Foundation } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DailyTasksScreen from '../screens/DailyTasksScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { BottomTabTypes } from '../types';

function TabBarIconFontAwesome5(props: {
	name: React.ComponentProps<typeof FontAwesome5>['name'];
	color: string;
}) {
	return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconFoundation(props: {
	name: React.ComponentProps<typeof Foundation>['name'];
	color: string;
}) {
	return <Foundation size={24} style={{ marginBottom: -3 }} {...props} />;
}

export const bottomTabs: BottomTabTypes[] = [
	{
		name: 'Home',
		title: 'Home',
		component: HomeScreen,
		icon: (color: string) => {
			return <TabBarIconFontAwesome5 name='home' color={color} />;
		},
	},
	{
		name: 'DailyTasks',
		title: 'Daily Tasks',
		component: DailyTasksScreen,
		icon: (color: string) => {
			return <TabBarIconFontAwesome5 name='tasks' color={color} />;
		},
	},
	{
		name: 'Projects',
		title: 'Projects',
		component: ProjectsScreen,
		icon: (color: string) => {
			return <TabBarIconFoundation name='page-multiple' color={color} />;
		},
	},
	{
		name: 'Profile',
		title: 'Profile',
		component: ProfileScreen,
		icon: (color: string) => {
			return <TabBarIconFontAwesome5 name='user-alt' color={color} />;
		},
	},
];
