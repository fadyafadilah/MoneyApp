import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteDebt } from '../../services'; // Impor fungsi delete dari services

export default class DebtDetails extends Component {
  handleDelete = async () => {
    const { debtor } = this.props.route.params; // Dapatkan ID data
    const { navigation } = this.props;
    const userId = 'user123'; // Ganti dengan ID pengguna yang sedang login

    Alert.alert(
      'Delete Confirmation',
      `Are you sure you want to delete "${debtor.namaPeminjam}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDebt(debtor.id, userId); // Hapus data dari API jika userId sesuai
              Alert.alert('Success', 'Data berhasil terhapus');
              navigation.navigate('Home'); // Navigasi ke Home
            } catch (error) {
              Alert.alert('Error', 'Failed to delete data');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  handleEdit = () => {
    const { debtor } = this.props.route.params;
    const { navigation } = this.props;
    navigation.navigate('EditDebt', { debtor }); // Navigasi ke halaman EditDebt dengan data debtor
  };

  render() {
    const { debtor } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detail Peminjam</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{debtor.namaPeminjam}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nominal:</Text>
          <Text style={styles.value}>Rp {debtor.nominal}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Tanggal Pinjam:</Text>
          <Text style={styles.value}>{debtor.tanggalPinjam}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Jatuh Tempo :</Text>
          <Text style={styles.value}>{debtor.jatuhTempo}</Text>
        </View>

        {/* Tombol Edit dan Delete */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={this.handleEdit}>
            <FontAwesomeIcon icon={faEdit} size={20} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={this.handleDelete}>
            <FontAwesomeIcon icon={faTrash} size={20} color="white" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
  },
  detailContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    width: '45%',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
