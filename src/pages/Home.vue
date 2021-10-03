<template>
  <div class="home" v-cloak>
    <h3>Hello, World</h3>
    <table v-if="trips.length && !noDataMessage">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Откуда</th>
          <th>Куда</th>
          <th>Кол-во пассажиров</th>
          <th>Цель поездки</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <td>{{ trip.date }}</td>
          <td>{{ trip.from }}</td>
          <td>{{ trip.to }}</td>
          <td style="text-align:center;">{{ trip.passengersCount }}</td>
          <td>{{ trip.reason }}</td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>{{ noDataMessage }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      trips: [],
      noDataMessage: ''
    }
  },
  async beforeRouteEnter (from, to, next) {
    const tripsResponse = await axios.get('http://localhost:3000/trips/')
    next(vm => {
      if (tripsResponse.data) {
        vm.trips = tripsResponse.data
      } else {
        this.noDataMessage = 'Не найдены поездки'
      }
    })
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.home {
  width: 100%;
  margin: auto;
  text-align: center;
}

.home h3 {
  text-align: center;
}

table {
  margin: auto;
  border: 1px solid;
  border-collapse: collapse;
}

thead {
  background-color: #c4c3c3;
}

th, td {
  border-right: 1px solid;
  border-bottom: 1px solid;
  padding: 0 10px;
}

tbody tr:nth-child(even) {
  background-color: #fdeffa;
}

tr {
  height: 30px;
}
</style>
