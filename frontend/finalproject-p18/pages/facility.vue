<template>
  <div class="min-h-screen bg-[#FEF9F2]">
    <!-- Header -->
    <header class="bg-[#FEF9F2] text-[#598bb5] py-6 text-center">
      <h1 class="text-4xl font-extrabold">Fasilitas Kost 🏠</h1>
      <p class="text-lg mt-2 font-medium">
        Rasakan kenyamanan dan keamanan terbaik di kost kami
      </p>
    </header>

    <!-- Carousel -->
    <div class="flex justify-center mt-6">
      <swiper-container
        class="w-3/4 max-w-md h-60 rounded-lg shadow-lg overflow-hidden"
        pagination="true"
        navigation="true"
        autoplay-delay="3000"
        loop="true"
      >
        <swiper-slide>
          <img
            src="https://asset.kompas.com/crops/Hx1C9uNVEfESI4G-wn5S8AywBQQ=/0x0:1000x667/1200x800/data/photo/2023/08/02/64ca6f0fd0d96.jpg"
            alt="Kamar Nyaman"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://asset.kompas.com/crops/yMUAxq9AsqB97BiRw1dHkKbTXfo=/0x0:1000x667/750x500/data/photo/2019/10/25/5db25f8d51968.jpg"
            alt="Kamar Mandi Pribadi"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://hydeliving.s3.ap-southeast-3.amazonaws.com/uploads/1669713673719.webp"
            alt="Dapur Bersama"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://coworker.imgix.net/photos/indonesia/jakarta/kekini-ruang-bersama/2.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
            alt="Ruang Bersama"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://www.siliconrepublic.com/wp-content/uploads/2014/12/img/3ow92h.jpg"
            alt="Keamanan 24 Jam"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
      </swiper-container>
    </div>

    <!-- Facility List -->
    <div class="px-6 mt-10">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-justify"
      >
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">
            Kamar Nyaman dan Modern
          </h3>
          <p class="mt-2 text-gray-700">
            Kamar tidur yang luas dengan tempat tidur nyaman, lemari besar, meja
            belajar, dan kursi ergonomis. Setiap kamar juga dilengkapi dengan AC
            untuk kenyamanan maksimal.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">Kamar Mandi Pribadi</h3>
          <p class="mt-2 text-gray-700">
            Nikmati privasi dengan kamar mandi dalam yang bersih dan modern,
            lengkap dengan shower air panas dan dingin.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">
            Dapur Bersama yang Lengkap
          </h3>
          <p class="mt-2 text-gray-700">
            Dapur bersama yang dilengkapi dengan peralatan memasak lengkap,
            termasuk kompor, microwave, kulkas, dan peralatan makan. Cocok untuk
            kamu yang suka memasak!
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">Layanan Laundry</h3>
          <p class="mt-2 text-gray-700">
            Fasilitas laundry dengan mesin cuci dan pengering yang bisa
            digunakan kapan saja, atau layanan laundry yang siap membantu jika
            kamu sibuk.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">
            Internet Cepat dan Stabil
          </h3>
          <p class="mt-2 text-gray-700">
            Akses Wi-Fi super cepat di seluruh area kost, ideal untuk bekerja,
            belajar, atau streaming film favoritmu.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">Keamanan 24 Jam</h3>
          <p class="mt-2 text-gray-700">
            Sistem keamanan 24 jam dengan CCTV dan penjaga kost, memastikan kamu
            merasa aman dan nyaman setiap saat.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "swiper/element/bundle";

export default {
  name: "Facility",
  mounted() {
    register();
  },
};
</script>

<style>
@import "swiper/swiper-bundle.css";
</style>
