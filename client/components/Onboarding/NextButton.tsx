import { useEffect, useRef } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	View,
	Animated,
	Dimensions,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { Input, Button } from '@rneui/themed';

import { Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface NextButtonProps {
	percentage: number;
	scrollTo: () => void;
	showEmailForm: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
	percentage,
	scrollTo,
	showEmailForm,
}) => {
	const size = 128;
	const strokeWidth = 2;
	const center = size / 2;
	const radius = size / 2 - strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;

	const progressAnimation = useRef(new Animated.Value(0)).current;
	const progressRef = useRef<any>(null);
	const scrollViewRef = useRef<any>(null);

	const animation = (toValue: number) => {
		return Animated.timing(progressAnimation, {
			toValue,
			duration: 250,
			useNativeDriver: false,
		}).start();
	};

	useEffect(() => {
		animation(percentage);
	}, [percentage]);

	useEffect(() => {
		progressAnimation.addListener((value) => {
			const strokeDashoffset =
				circumference - (circumference * value.value) / 100;

			if (progressRef?.current) {
				progressRef.current.setNativeProps({
					strokeDashoffset,
				});
			}
		});

		return () => {
			progressAnimation.removeAllListeners();
		};
	}, [percentage]);

	if (showEmailForm) {
		scrollViewRef?.current?.scrollToEnd({ animated: true });
	}

	return (
		<ScrollView
			ref={scrollViewRef}
			contentContainerStyle={styles.container}
			snapToInterval={width}
			decelerationRate={'fast'}
			scrollEnabled={false}
			horizontal
		>
			<View style={styles.nextButtoncontainer}>
				<Svg width={size} height={size}>
					<G rotation='-90' origin={center}>
						<Circle
							stroke='#E6E7E8'
							cx={center}
							cy={center}
							r={radius}
							strokeWidth={strokeWidth}
						/>
						<Circle
							ref={progressRef}
							stroke='#F4338F'
							cx={center}
							cy={center}
							r={radius}
							strokeWidth={strokeWidth}
							strokeDasharray={circumference}
						/>
					</G>
				</Svg>
				<TouchableOpacity
					onPress={scrollTo}
					style={styles.button}
					activeOpacity={0.6}
				>
					<AntDesign name='arrowright' size={32} color='#fff' />
				</TouchableOpacity>
			</View>
			<View style={styles.emailContainer}>
				<Input
					containerStyle={{ width: '80%' }}
					placeholder='Enter your Email'
					leftIcon={<Entypo name='email' size={24} color='black' />}
					leftIconContainerStyle={{ marginRight: 10 }}
				/>
				<Button
					containerStyle={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					title='Get OTP'
					titleStyle={{ fontSize: 20 }}
					buttonStyle={{
						width: '75%',
						backgroundColor: '#4756DF',
						borderRadius: 5,
					}}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextButtoncontainer: {
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		position: 'absolute',
		backgroundColor: '#f4338f',
		borderRadius: 100,
		padding: 20,
	},
	emailContainer: {
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default NextButton;