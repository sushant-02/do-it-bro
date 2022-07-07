import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Navigation from './navigation';

export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<Navigation />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
