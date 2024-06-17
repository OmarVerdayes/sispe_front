<template>
    <div class="main-container">
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab"
             @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
            <!-- Use v-for to iterate over dataCarousel -->
            <b-carousel-slide v-for="(item, index) in dataCarousel" :key="index" :img-src="item.front_page"
                style="height: 400px;">
                <!-- Customize slide content here if needed -->
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slide: 0,
            sliding: null,
            dataCarousel: [
                {
                    "film_id": "00112233445566778899aabbccddeeff",
                    "title": "The Great Adventure",
                    "description": "An epic journey through uncharted lands.",
                    "length": 120.50,
                    "status": "Activo",
                    "fk_category": "ffddeeaabbcc99887766554433221100",
                    "front_page": "https://cdn.vox-cdn.com/thumbor/ee_7w0oFtMc2Lse2isdoVq467z4=/0x292:2040x1360/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/16207801/jbareham_190421_0886_pikachu_0001.jpg",
                    "file": "http://example.com/files/the_great_adventure.mp4"
                },
                {
                    "film_id": "11223344556677889900aabbccddeeff",
                    "title": "Mystery of the Lost City",
                    "description": "A thrilling tale of ancient secrets and hidden treasures.",
                    "length": 95.75,
                    "status": "Activo",
                    "fk_category": "eeddccbbaa99887766554433221100ff",
                    "front_page": "https://www.laprensagrafica.com/__export/1505094476263/sites/prensagrafica/img/2015/08/27/7d12e526-cae2-4e36-834e-65b67cdabca1.jpg_1758632411.jpg",
                    "file": "http://example.com/files/mystery_of_the_lost_city.mp4"
                },
                {
                    "film_id": "223344556677889900aabbccddeeff00",
                    "title": "Romance in the Rain",
                    "description": "A love story that blossoms in the heart of a rainy city.",
                    "length": 110.00,
                    "status": "Inactivo",
                    "fk_category": "ccddeeaa99887766554433221100ffbb",
                    "front_page": "https://www.mubis.es/media/users/1864/103428/review-interstellar-christopher-nolan-2014-original.jpg",
                    "file": "http://example.com/files/romance_in_the_rain.mp4"
                },
                {
                    "film_id": "3344556677889900aabbccddeeff0011",
                    "title": "Space Odyssey",
                    "description": "A groundbreaking sci-fi adventure across the universe.",
                    "length": 150.25,
                    "status": "Activo",
                    "fk_category": "bbaadd99887766554433221100ffeedd",
                    "front_page": "https://elcomercio.pe/resizer/tzYPKgD1IiCQItsvPDh8NamCjKA=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/JOORGFI26BAGJIYP6NP25MVKB4.jpg",
                    "file": "http://example.com/files/space_odyssey.mp4"
                }
            ]
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true;
        },
        onSlideEnd(slide) {
            this.sliding = false;
        }
    }
}
</script>

<style>
.main-container {
    background: #061523;
    height: 100vh;
}

/* Ajusta la altura de las imágenes dentro del carrusel */
.b-carousel-slide img {
    height: 100%; /* Ajusta la altura al 100% del contenedor */
    object-fit: cover; /* Ajusta el tamaño de la imagen para cubrir el contenedor */
}
</style>
