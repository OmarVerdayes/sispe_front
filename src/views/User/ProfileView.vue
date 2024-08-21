<template>
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
    <div v-else>
      <p>Loading user profile...</p>
    </div>

    <div v-if="showAvatarSelection" class="avatar-selection">
      <div v-for="(avatar, index) in avatars" :key="index" class="avatar-option">
        <img :src="avatar" @click="updateAvatar(avatar)" class="avatar-small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      avatarUrl: '', 
      avatars: [
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T162737Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=578cc59211868fa9c4d0889a773d7ab7dfd0d3f95547d7fb693c1af0bc1d380e',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar2.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T164448Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=d8c2b96688f89954e7ae9b1854623ab036e93ae7566923fd95e9bb4b32a1ad5f',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar3.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T170406Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2f91c15df7a411b58d4c323f8453d2c202d208b1f9b0b1ac189e50bb09f18b94',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar4.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T170436Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=13a806b6f856cbf8e204b8482bedacbc6f52905bb9d385e6c4783ac8ac23c6f6',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar5.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T170503Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1e8359fd09f4512cb34efa5fe548c265cb3b312bfa1185e14d398c66c9fa2652',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar6.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T170540Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a75d5029fe6c704eee4272c54d7006dca10b3cf4023fa652e6a07d7e5e0a4048',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar7.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T165217Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7616aedb5e60e59c12ce29af9b976ee955ade2dae241dc51c36330439d069d2c',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/gunbal.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T165245Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=69b0e097bdc31d4f00a6e03de839ef2cb3dca4a4fd43858b4e83f083443d490c',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/wallE.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMSJHMEUCIQDqkFzg6wceXCLCX1agyeG74tLsUD%2BPvOj7qdmZebrB%2BQIgCJ0nJ%2B1U15AbuGSrji3szPtup4Cy%2FteM08NkxayDHukq5AIIehAAGgwxMzcyMzc1NzA0NzciDMLJDCPpVhhCWLXEmCrBAvfDbAe0Tl5BbKRca5cAnmoztSKfrR1xGVioE8n5E9ERT28AUDhdtGsgBI51BuRrS9InXcZSZ%2B0Dx1wOHA7uz%2BOml3bhZfpAbYaz4BGGLYi%2FDGrsG0WSSICTeGvP0vfiCALAcw532s3V%2BVCIIMRfrDAzXarXZuNE6pXgXOnOZVUtfp5VnrftvWL7B3z6wr%2BQIfOIsdSqg4MAfSLoGpZH1sYemrFbWvFY68w5umP2x1fkiL7iGkjzJaFBXvs8toxZkd4p%2BYNVVWMtgt5etv5tZKsMHMwLbOl07aNWg1NkJgt3j5%2BawjAt1f%2BCPLMBQ1apkRdHLxUOO1K6sCf9%2FnfeFL%2B2PB6vjAweIgMaQ37%2BYZH5XW08dhjArejOsHdmy12siOQ7FNZWgN%2BvRrFCfob%2FXSAoULs1c%2Bn6KepF4AHd7JrM%2FDDPqpi2BjqzAv4HlkthDwUl0tdTNnPur%2BTaST5d%2FXs2Zonzz1hlaT9ohxkLKDckb92P9lH42qoUjnmv8EBt%2BcS0PJw7XbFwTjdirjKiyBIa33BPXrsfeNM5H%2B%2BMu6uOEhuBfoA%2FP7tn3urh6UHApU4IvnHJlCNDux1Bh0B6Hcjg29jPpeW8L02FsglFYuHjirpZoX1%2BreR7bUDY8r5jX7UMffssXE%2FQg0pNvHeh3jvjqycnVd2xI66r6SS3QCabTPT378mDQImf79oPyjTIn0nQ7tBroItwsb%2BGb%2BWT7odEEDLk%2Fp%2B5pWJSErkBBarfLV%2Bg9SnLQidtX09Peibz30p4mkOjKY%2FIOmr7nFqEOEqdlcRFwsZtQRsXijUFLO6HI4fho5CWfs1uown4HeBEcumCc7CNsqIDnScrf1o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240821T165255Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOWXVXESW6K%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=fff95feb93d47fc397664e4d84cd79f43af8887d6567da3f1ef929006805473c',
      ],
      showAvatarSelection: false
    };
  },
  created() {
    this.fetchUserProfile();
    this.loadAvatar();
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>

.user-profile {
  background-color: #0e141e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
</style>

