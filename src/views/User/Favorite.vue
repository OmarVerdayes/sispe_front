<template>
  <div class="about">
    <div class="user-profile">
    <div v-if="user" class="profile-content">
      <div class="avatar-wrapper">
        <img :src="avatarUrl" alt="Avatar" class="avatar" />
        <button @click="toggleAvatarSelection" class="edit-button"><b-icon icon="pencil-fill"></b-icon></button>
      </div>
      <div class="user-info">
        <h2 class="name">{{ user.name }}</h2>
        <p class="email">Email: {{ user.email }}</p>
      </div>
    </div>
    <div v-if="showAvatarSelection" class="avatar-selection">
      <div v-for="(avatar, index) in avatars" :key="index" class="avatar-option">
        <img :src="avatar" @click="updateAvatar(avatar)" class="avatar-small" />
      </div>
    </div>
  </div>
    <div class="title-content">
      <h1 class="title">Mi lista</h1>
    </div>
    <div class="favorites-list">
      <LoadAnimation v-if="loading" />
      <div v-else-if="favorites.length === 0" class="no-favorites">
        No tienes películas favoritas.
      </div>
      <div v-else class="movies">
        <div v-for="movie in favorites" :key="movie.film_id" class="movie-item">
          <img @click="navigateToMovie(movie.film_id)" :src="movie.front_page" style="width:250px ; height:150px" alt="Poster" class="movie-poster" />
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadAnimation from '../load/load.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      favorites: [],
      loading: true,
      user: null,
      avatarUrl: '', 
      avatars: [
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T005701Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5b230939027c69628d783a0b4dc3c2e45c18e7091a6d5efe9289b60a7de2c554',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar2.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T005751Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6f16b74df6b1d7fc6e2cddd7fb186be4fb606a50e6145d82032d45ef5b866ec5',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar3.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T005810Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=438c197e09684f3eb3d532da3e6b4227d4f42ffb2c47b5eeecc22216835f3602',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar4.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T005843Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2191565bfbf8c2c5434f55a5e3ac2f741acfc79a20d5e2d158ad2400143f164c',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar5.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T005910Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e9e4b4de9ba2df23bac90b05d1a9ca2a2bc70f8d817c2a1d6ecde63f68a7f987',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar6.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T005948Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e0a5d824ed3a5999bbe7d8d4dcec96db4bcbd2d7ab4a9a02c2711994bf7f1d7b',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar7.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T010041Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b9f7d811c40cb2f6fa5f13aefe8721415b36dab4f7b7cc096abb3c16a38698b4',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/gunbal.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T010106Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ee800fe1d85742dfe8d342c96a9b4f4b915b42383d968cd2efd91ee6be05c483',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/wallE.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240822T010256Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=66f6e818143391ee497b0699b7b6dafa3184bac598f3f1d5049b20c505674d6d'


      ],
      showAvatarSelection: false
    };
  },
  created() {
    this.loadFavorites();
    this.fetchUserProfile();
    this.loadAvatar();
  },
  methods: {
    navigateToMovie(filmId) {
    this.$router.push({ name: 'movie-view', params: { id: filmId } });
  },
    fetchUserProfile() {
      const authUser = JSON.parse(localStorage.getItem('authUser'));

      if (authUser && authUser.user && authUser.user.email) {
        const email = authUser.user.email;
        fetch(`https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/user/${email}`)
          .then(response => response.json())
          .then(data => {
            this.user = {
              name: data.user.name,
              email: data.user.email,
            };
          })
          .catch(error => console.error('Error fetching user profile:', error));
      } else {
        console.error('No user email found in localStorage');
      }
    }, 
    toggleAvatarSelection() {
      this.showAvatarSelection = !this.showAvatarSelection;
    },
    updateAvatar(url) {
      this.avatarUrl = url;
      this.showAvatarSelection = false;
      this.saveAvatar(url);
    },
    loadAvatar() {
      const savedAvatar = localStorage.getItem('userAvatar');
      if (savedAvatar) {
        this.avatarUrl = savedAvatar;
      } else {
        this.avatarUrl = 'https://profilephotossispe.s3.us-east-1.amazonaws.com/default-avatar.png'; // Imagen por defecto
      }
    },
    saveAvatar(url) {
      localStorage.setItem('userAvatar', url);
    },
    async loadFavorites() {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const userId = authUser.user ? authUser.user.id.toUpperCase() : null;

      if (!userId) {
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get(
          `https://qhl0fcehdg.execute-api.us-east-1.amazonaws.com/Prod/favorites/${userId}`
        );
        this.favorites = response.data;
      } catch (error) {
        console.error("Error al cargar la lista de favoritos:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

.user-profile {
  margin: 20px;
}
.profile-content {
  display: flex;
  align-items: center;
  color: black;
}

.avatar-wrapper {
  display: inline-block;
  position: relative;
  align-items: center;
  margin-right: 20px;}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.edit-button {
  position: absolute;
  bottom: 10px; 
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5); 
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px; 
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.user-info {
  display: flex;
  flex-direction: column;
  color:white;
}
.name {
  font-size: 3.5em;
  margin: 0;
  color:white;
}

.email {
  font-size: 1.0em;
  margin: 0;
}
.avatar-selection {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.avatar-option {
  margin-right: 10px;
  cursor: pointer;
}

.avatar-small {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.about {
  background-color: #00050D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
}

.favorites-list {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-favorites {
  color: white;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-item {
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
  color: white;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.movie-title {
  margin-top: 10px;
  font-size: 18px;
}

.movie-description {
  margin-top: 5px;
  font-size: 14px;
  color: #ccc;
}
</style>
