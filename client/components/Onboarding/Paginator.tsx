import {
	View,
	StyleSheet,
	ImageSourcePropType,
	Animated,
	Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PaginatorProps {
	data: {
		id: number;
		image: ImageSourcePropType;
		title: string;
		subtitle: string;
	}[];
	scrollX: Animated.Value;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
	return (
		<View style={styles.container}>
			{data.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp',
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: 'clamp',
				});

				return (
					<Animated.View
						style={[styles.dot, { width: dotWidth, opacity }]}
						key={i.toString()}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 64,
		flexDirection: 'row',
	},
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: '#493d8a',
		marginHorizontal: 8,
	},
});

export default Paginator;
