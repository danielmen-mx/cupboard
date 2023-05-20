<template>
  <!-- <v-container class="skeleton-container skeleton-body skeleton-all">
    <div class="" id="card-link">
      <div class="skeleton skeleton-card-title"></div>
      <v-divider class="my-4"></v-divider>
      <div class="skeleton skeleton-card-right"></div>
      <div class="skeleton skeleton-card-left"></div>
      <div class="skeleton skeleton-card-right"></div>
      <div class="skeleton skeleton-card-left"></div>
      <div class="skeleton skeleton-card-right"></div>
      <div class="skeleton skeleton-card-left"></div>
      <div class="skeleton skeleton-card-right"></div>
    </div>
  </v-container> -->
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="desserts"
    item-value="name"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
        headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', align: 'end', key: 'calories' },
          { title: 'Fat (g)', align: 'end', key: 'fat' },
          { title: 'Carbs (g)', align: 'end', key: 'carbs' },
          { title: 'Protein (g)', align: 'end', key: 'protein' },
          { title: 'Iron (%)', align: 'end', key: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22',
          },
        ],
    }
  },
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap");
.skeleton-all {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

.skeleton-body {
  font-family: "Source Sans Pro", sans-serif;
  min-height: 100vh;
}

.skeleton-container {
  text-decoration: none;
}

.skeleton-img[alt] {
  text-indent: -10000px;
}

.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin: 5rem;
}

@media screen and (max-width: 600px) {
  .container {
    margin: -0.5rem;
  }
}

.card {
  background-color: #f5f8fc;
  -webkit-box-shadow: 0 0 transparent, 0 0 transparent, 0 0.375rem 0.375rem -0.125rem rgba(168, 179, 207, 0.4);
          box-shadow: 0 0 transparent, 0 0 transparent, 0 0.375rem 0.375rem -0.125rem rgba(168, 179, 207, 0.4);
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(82, 88, 102, 0.2);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-pack: distribute;
      justify-content: space-around;
  width: 330px;
  height: auto;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  margin: 2rem;
}

.card__header {
  margin-bottom: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  margin: 0.5rem 0 0.5rem 0.5rem;
}

.card__header .header__img {
  height: 2rem;
  width: 2rem;
  -o-object-fit: cover;
     object-fit: cover;
  border-radius: 50%;
}

.card__header .header__title {
  font-size: 1.0625rem;
  line-height: 1.375rem;
  color: #0e1217;
  font-weight: 700;
  margin: 0.5rem;
}

.card__body {
  margin: 0 0.5rem;
}

.card__body .body__text {
  color: #525866;
  font-size: 0.8125rem;
}

.card__body .body__img {
  height: 30rem;
  margin: 0.5rem 0;
}

.card__body .body__img img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  margin: auto;
  border-radius: 0.75rem;
}

.card__footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
      justify-content: space-around;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin: 0.5rem;
}

.skeleton:hover {
  border-color: rgba(82, 88, 102, 0.4);
}

ion-icon {
  font-size: 1.5rem;
  color: #525866;
  cursor: pointer;
  -webkit-transition: color 0.2s ease;
  transition: color 0.2s ease;
}

ion-icon:hover:nth-of-type(1) {
  color: #15ce5c;
}

ion-icon:hover:nth-of-type(2) {
  color: #15ce5c;
}

ion-icon:hover:nth-of-type(3) {
  color: #fa6620;
}
/*# sourceMappingURL=starter.css.map */

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-text {
  width: 100%;
  height: 0.7rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-card-title {
  margin: auto;
  width: 80%;
  height: 6rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-card-right {
  float: right;
  width: 80%;
  height: 6rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-card-left {
  float: left;
  width: 80%;
  height: 6rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-text__body {
  width: 75%;
}

.skeleton-footer {
  width: 30%;
}
</style>