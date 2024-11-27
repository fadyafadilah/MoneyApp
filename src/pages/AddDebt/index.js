import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import React, { Component } from 'react';
import { DataInput } from '../../components';
import { addDebt } from '../../services'; // Import fungsi dari service/index.js

export default class AddDebt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaPeminjam: "",
      nominal: "",
      tanggalPinjam: "",
      jatuhTempo: "",
    };
  }

  // Fungsi untuk mengupdate state
  handleInputChange = (nameState, text) => {
    this.setState({ [nameState]: text });
  };

  // Fungsi untuk menambahkan data hutang
  handleAddDebt = async () => {
    const { namaPeminjam, nominal, tanggalPinjam, jatuhTempo } = this.state;

    // Validasi input
    if (!namaPeminjam || !nominal || !tanggalPinjam || !jatuhTempo) {
      Alert.alert("Error", "Semua field harus diisi!");
      return;
    }

    const payload = {
      namaPeminjam,
      nominal,
      tanggalPinjam,
      jatuhTempo,
    };

    try {
      const response = await addDebt(payload); // Panggil fungsi dari service
      Alert.alert("Success", "Data berhasil ditambahkan!");
      console.log("Response:", response);
      this.props.navigation.replace('Home');
    } catch (error) {
      Alert.alert("Error", "Gagal menambahkan data!");
    }
  };

  render() {
    return (
      <View style={styles.pages}>
        <DataInput
          label="Nama Peminjam :"
          placeholder="Masukan Nama"
          nameState="namaPeminjam"
          value={this.state.namaPeminjam}
          onChangeText={this.handleInputChange}
        />
        <DataInput
          label="Nominal Pinjaman :"
          placeholder="Masukan Nominal"
          keyboardType="number-pad"
          nameState="nominal"
          value={this.state.nominal}
          onChangeText={this.handleInputChange}
        />
        <DataInput
          label="Tanggal Pinjam :"
          placeholder="Masukan Tanggal Pinjam"
          nameState="tanggalPinjam"
          value={this.state.tanggalPinjam}
          onChangeText={this.handleInputChange}
        />
        <DataInput
          label="Jatuh Tempo :"
          placeholder="Masukan Jatuh Tempo"
          nameState="jatuhTempo"
          value={this.state.jatuhTempo}
          onChangeText={this.handleInputChange}
        />
        <TouchableOpacity style={styles.btn} onPress={this.handleAddDebt}>
          <Text style={styles.textbtn}>Tambah</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  btn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textbtn: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
