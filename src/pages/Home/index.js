import { 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import API from '../../services';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDebtors: null,
      debtorsData: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTotalDebtors();
  }

  fetchTotalDebtors = async () => {
    try {
      const response = await API.get('/debtList');
      this.setState({ 
        totalDebtors: response.data.length, 
        debtorsData: response.data,
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching debtors data:', error);
      this.setState({ loading: false });
    }
  };

  handleDebtorClick = (debtor) => {
    this.props.navigation.navigate('DebtDetails', { debtor });
  };

  render() {
    const { totalDebtors, debtorsData, loading } = this.state;

    return (
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Daftar Peminjam</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : debtorsData.length > 0 ? (
          <ScrollView contentContainerStyle={styles.debtorsContainer}>
            <Text style={styles.totalText}>Total Peminjam : {totalDebtors}</Text>
            {debtorsData.map((debtor) => (
              <TouchableOpacity
                key={debtor.id}
                style={styles.debtorContainer}
                onPress={() => this.handleDebtorClick(debtor)}
              >
                <Text style={styles.debtorName}>{debtor.namaPeminjam}</Text>
                <Text style={styles.debtorNominal}>
                  Nominal: Rp. {debtor.nominal.toLocaleString('id-ID')}
                </Text>
                <Text style={styles.debtorDueDate}>Jatuh Tempo: {debtor.jatuhTempo}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>Belum ada data peminjam</Text>
        )}
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => this.props.navigation.navigate('AddDebt')}
          >
            <FontAwesomeIcon icon={faPlus} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    marginTop :  30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  debtorsContainer: {
    paddingBottom: 100,
  },
  debtorContainer: {
    padding: 15,
    backgroundColor: '#EAF7EF',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  debtorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  debtorNominal: {
    fontSize: 16,
    marginVertical: 5,
  },
  debtorDueDate: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  btnAdd: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 30,
  },
});
