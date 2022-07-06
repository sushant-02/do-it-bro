import {
	View,
	Text,
	StyleSheet,
	ImageSourcePropType,
	Image,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface SlideProps {
	item: {
		id: number;
		image: ImageSourcePropType;
		title: string;
		subtitle: string;
	};
}

const Slide: React.FC<SlideProps> = ({ item }) => {
	return (
		<SafeAreaView style={styles.slideContainer}>
			<Image source={item.image} style={styles.image} />
			<View style={styles.textContainer}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.subtitle}>{item.subtitle}</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	slideContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: width,
	},
	image: {
		flex: 0.7,
		justifyContent: 'center',
		width: width * 0.9,
		resizeMode: 'contain',
	},
	textContainer: {
		flex: 0.3,
	},
	title: {
		fontSize: 36,
		fontWeight: '800',
		marginBottom: 10,
		color: '#493d8a',
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 20,
		fontWeight: '300',
		color: '#62656b',
		textAlign: 'center',
		paddingHorizontal: 64,
	},
});

export default Slide;
