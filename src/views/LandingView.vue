<template>
    <div class="main-container">
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls background="black"
            @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
            <div v-for="(item, index) in dataCarousel" :key="index">
                <div class="center_img_div">
                    <b-carousel-slide :img-src="item.front_page" class="carousel_slide">
                    </b-carousel-slide>
                </div>
            </div>
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

.carousel_slide {
    background-color: black;
    max-height: 50vh;
    /* Valor por defecto */


}

#carousel-1 {
    max-height: 50vh;
    /* Valor por defecto */
}

.b-carousel-slide img {
    height: 100%;
    width: 90%;
    object-fit: cover;
}
.center_img_div{
    max-width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}
/* Media queries para diferentes tamaños de pantalla */

/* Pantallas de menos de 329.98px */
@media (max-width: 329.98px) {
    .carousel_slide {
        max-height: 17vh;
        /* Ajustar según tus necesidades */
    }

    #carousel-1 {
        max-height: 17vh;
        /* Ajustar según tus necesidades */
    }
}

/* Pantallas de 330 a 415.98 px */
@media (min-width: 330px) and (max-width: 415.98px) {
    .carousel_slide {
        max-height: 25vh;
        /* Ajustar según tus necesidades */
    }

    #carousel-1 {
        max-height: 25vh;
        /* Ajustar según tus necesidades */
    }
}

/* Pantallas  de 416 a 578.98 px */
@media (min-width: 416px) and (max-width: 575.98px) {
    .carousel_slide {
        max-height: 32vh;
        /* Ajustar según tus necesidades */
    }

    #carousel-1 {
        max-height: 32vh;
        /* Ajustar según tus necesidades */
    }
}

/* Pantallas medianas (576px a 767.98px) */
@media (min-width: 576px) and (max-width: 767.98px) {
    .carousel_slide {
        max-height: 39vh;
        /* Ajustar según tus necesidades */
    }

    #carousel-1 {
        max-height: 39vh;
        /* Ajustar según tus necesidades */
    }
}

/* Pantallas grandes (768px a 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .carousel_slide {
        max-height: 46vh;
        /* Ajustar según tus necesidades */
    }

    #carousel-1 {
        max-height: 46vh;
        /* Ajustar según tus necesidades */
    }
}

/* Pantallas grandes (768px a 991.98px) */
@media (min-width: 992px) and (max-width: 1129.98px) {
    .carousel_slide {
        max-height: 53vh;
        /* Ajustar según tus necesidades */
    }

    #carousel-1 {
        max-height: 53vh;
        /* Ajustar según tus necesidades */
    }
}

/* Pantallas extra grandes (992px y más) */
@media (min-width: 1129.98px) {
    .carousel_slide {
        max-height: 60vh;
        /* Valor por defecto para pantallas grandes */
    }

    #carousel-1 {
        max-height: 60vh;
        /* Valor por defecto para pantallas grandes */
    }
}
</style>
