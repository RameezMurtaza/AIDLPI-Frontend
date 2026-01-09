import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CartesianChart, Bar } from 'victory-native';


const DATA = [
  { month: 'Jan', sales: 30 },
  { month: 'Feb', sales: 50 },
  { month: 'Mar', sales: 40 },
  { month: 'Apr', sales: 70 },
  { month: 'May', sales: 60 },
  { month: 'Jun', sales: 90 },
];

export function SimpleBarChart() {
  
  return (
    <View style={styles.container}>
      <CartesianChart
        data={DATA}
        xKey="month"
        yKeys={['sales']}
        domainPadding={{ left: 20, right: 20, top: 20, bottom: 20 }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.sales}
            chartBounds={chartBounds}
            color="#4F46E5" // Indigo color, change as you like
            roundedCorners={{ topLeft: 8, topRight: 8 }}
            animate={{ type: 'timing', duration: 800 }}
          />
        )}
      </CartesianChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300, // Adjust height as needed
    width: Dimensions.get('window').width - 40,
    margin: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
});