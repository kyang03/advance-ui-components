import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';

// Custom Component (button)
const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
};

// Higher-Order Component (HOC) to log actions
const withLogging = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log(`${this.props.title} Button Mounted`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
const EnhancedButton = withLogging(CustomButton);

// Main Application
const App = () => {
  //Task 2 (Fading effect using Animated API)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <EnhancedButton title="Click Me" onPress={() => console.log('Button Pressed!')} />
      {/* Task 2: Fading effect */}
      <View style={styles.spacer} />
      <Animated.View style={{ ...styles.box, opacity: fadeAnim }} />
      <Button title="Fade In" onPress={fadeIn} />
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    marginVertical: 20,
  },
  spacer: {
    height: 40,
  },
});

export default App;
