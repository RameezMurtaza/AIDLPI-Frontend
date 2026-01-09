import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { CartesianChart, Bar } from 'victory-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

/* ===== Chart Data ===== */
const CHART_DATA = [
  { month: 'Jan', sales: 30 },
  { month: 'Feb', sales: 50 },
  { month: 'Mar', sales: 40 },
  { month: 'Apr', sales: 70 },
  { month: 'May', sales: 60 },
];

/* ===== Main Screen ===== */
const AnalyticsScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== Stats Card ===== */}
      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <StatItem
            icon="menu-book"
            value="12"
            label="Courses Enrolled"
          />
          <StatItem
            icon="check-circle"
            value="8"
            label="Completed"
          />
        </View>

        <View style={styles.statsRow}>
          <StatItem
            icon="emoji-events"
            value="5"
            label="Badges Earned"
          />
          <StatItem
            icon="assignment-late"
            value="3"
            label="Pending"
          />
        </View>
      </View>

      {/* ===== Chart Card ===== */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Course Activity</Text>

        <View style={styles.chartContainer}>
          <CartesianChart
            data={CHART_DATA}
            xKey="month"
            yKeys={['sales']}
            domainPadding={{ left: 20, right: 20, top: 20 }}
            
          >
            {({ points, chartBounds }) => (
              <Bar
                points={points.sales}
                chartBounds={chartBounds}
                color="#1E40AF"
                roundedCorners={{ topLeft: 6, topRight: 6 }}
                animate={{ type: 'timing', duration: 700 }}
                
                
              />
            )}
          </CartesianChart>
        </View>
      </View>
    </ScrollView>
  );
};

/* ===== Reusable Stat Item ===== */
const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) => (
  <View style={styles.statItem}>
    <View style={styles.iconContainer}>
      <MaterialIcons name={icon} size={24} color="#1E40AF" />
    </View>

    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

/* ===== Styles ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 16,
  },

  /* ===== Stats ===== */
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    elevation: 3,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  /* ===== Chart ===== */
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },

  chartContainer: {
    height: 260,
    width: SCREEN_WIDTH - 64,
    alignSelf: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 10,
  },
});

export default AnalyticsScreen;
