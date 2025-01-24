<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-3">
      <v-col cols="12" md="6" lg="10">
        <v-card elevation="3">
          <v-card-title class="text-h5 text-center my-2">
            Pago Seguro
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-text-field label="Nombre en la tarjeta" outlined></v-text-field>
              <v-text-field label="Número de tarjeta" outlined></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="Fecha de expiración (MM/AA)" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="CVV" outlined></v-text-field>
                </v-col>
              </v-row>
              <v-text-field label="Correo electrónico" outlined></v-text-field>
              <v-btn block color="primary" class="mt-4">Pagar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PaymentGateway',
};
</script>
