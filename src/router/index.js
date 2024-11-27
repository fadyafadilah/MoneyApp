import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, AddDebt, DebtDetails, EditDebt } from "../pages";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDebt"
        component={AddDebt}
        options={{ headerTitle: "Tambah Peminjam" }}
      />
      <Stack.Screen
        name="DebtDetails"
        component={DebtDetails}
        options={{ headerTitle: "Detail Peminjam" }}
      />
      <Stack.Screen
        name="EditDebt"
        component={EditDebt}
        options={{ headerTitle: "Edit Data Peminjam" }}
      />
    </Stack.Navigator>
  );
};

export default Router;
