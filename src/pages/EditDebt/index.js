import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { updateDebt } from '../../services';

export default class EditDebt extends Component {
  constructor(props) {
    super(props);
    const { debtor } = this.props.route.params; // Data yang akan diedit
    this.state = {
      namaPeminjam: debtor.namaPeminjam,
      nominal: debtor.nominal,
      jatuhTempo: debtor.jatuhTempo,
    };
  }

  handleSave = async () => {
    const { namaPeminjam, nominal, jatuhTempo } = this.state;
    const { debtor } = this.props.route.params;
    const { navigation } = this.props;
    const userId = 'user123'; // Ganti dengan ID pengguna yang sedang login

    if (!namaPeminjam || !nominal || !jatuhTempo) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const updatedData = { namaPeminjam, nominal, jatuhTempo };
      await updateDebt(debtor.id, updatedData, userId); // Update data di API jika userId sesuai
      Alert.alert('Success', 'Data successfully updated');
      navigation.navigate('Home'); // Navigasi kembali ke Home
    } catch (error) {
      Alert.alert('Error', 'Failed to update data');
    }
  };

  render() {
    const { namaPeminjam, nominal, jatuhTempo } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Data</Text>

        <Text style={styles.label}>Nama Peminjam:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={namaPeminjam}
          onChangeText={(value) => this.setState({ namaPeminjam: value })}
        />

        <Text style={styles.label}>Nominal:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nominal"
          value={nominal.toString()}
          keyboardType="numeric"
          onChangeText={(value) => this.setState({ nominal: value })}
        />

        <Text style={styles.label}>Tanggal Jatuh Tempo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Due Date (DD-MM-YYYY)"
          value={jatuhTempo}
          onChangeText={(value) => this.setState({ jatuhTempo: value })}
        />

        <TouchableOpacity style={styles.saveButton} onPress={this.handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
