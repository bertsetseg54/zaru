"use client";

import { createContext, useContext, useState } from "react";

// 🔹 Products массив
const initialProducts = [
  {
    id: "1",
    zurag: "https://pbs.twimg.com/media/E4yYMVNUcAAaxER?format=jpg&name=medium",
    ner: "Загсаасан өрөм",
    une: 25000,
    orts_nairlaga: ["Үнээний цэвэр сүү,"],
    jin_hemjee: "1кг",
    torol: "Цагаан идээ",
    uildverlegch: "Гантуяа Ганаа",
    delgerengui:
      "Цэвэр үнээний сүүгээр чанарын шаардлагад нийцсэн гайхалтай амттай өрөм",
  },
  {
    id: "2",
    zurag:
      "https://montsame.mn/uploads/content/914567114d3d51a217e473612bf0e41e.png",
    ner: "Бүхэл үрийн талх",
    une: 3600,
    orts_nairlaga: ["Бүхэл үрийн гурил", "ус", "талхны исгэгч", "масло"],
    jin_hemjee: "250гр",
    torol: "Хүнс",
    uildverlegch: "Жинст ЖДҮ",
    delgerengui:
      "Хэрэглэгчдийн хүсэлтээр шинээр гаргаж буй бүхэл үрийн баяжуулсан хөрөнгөний талх. Амттай, хөнгөн бөгөөд гэр бүл, найзуудын уулзалт, цайны цагт тохиромжтой сонголт юм.",
  },
  {
    id: "3",
    zurag:
      "https://lh3.googleusercontent.com/proxy/SYdmaHU3CXH9s9PBHqqAdKaLz8GrDPBr93ISa48mYEJGRUqvOd02oFWqr_YNPPhHYgl1cfVUrnilBc9Q2dRUtss-L7JI-zds_4fKEoiXrEY4tiREeUCvEdubsyCDVY-sUh7psnhDSfRHZ_xlvbcRjTOqSQ",
    ner: "Айраг",
    une: 8000,
    orts_nairlaga: ["гүүний сүү"],
    jin_hemjee: "1 литр",
    torol: "Цагаан идээ",
    uildverlegch: "Ар булаг сум 1р баг",
    delgerengui:
      "Монголын уламжлалт ундаа болох айраг нь баялаг амин дэмтэй, исгэлэн амттай бөгөөд цангаа тайлах, дархлаа дэмжихэд нэн тохиромжтой.",
  },
  {
    id: "4",
    zurag:
      "https://monfresh.mn/wp-content/uploads/2024/09/%D0%B7%D0%B0%D1%81%D0%B2%D0%B0%D1%80-%D0%B7%D0%B0%D1%81%D0%B2%D0%B0%D1%807-1.jpg",
    ner: "Бяслаг",
    une: 35000,
    orts_nairlaga: ["үнээний сүү", "давс"],
    jin_hemjee: "700гр",
    torol: "Цагаан идээ",
    uildverlegch: "ELAM БЯСЛАГ",
    delgerengui:
      "Шинэхэн үнээний сүүнээс гаргаж авсан зөөлөн, амтлаг бяслаг. Өдөр тутмын хоолонд хэрэглэж болох төгс бүтээгдэхүүн.",
  },
  {
    id: "5",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/492895242_1263903722410508_2044557422977813155_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=I0WlLj1pgf0Q7kNvwHa82Ee&_nc_oc=Adkt0X4Diy_uD-b-7qrLmEN2XcoE2jlv1aVQIB-AKykXGHqjiEYJh-7zInDU-cwsurc&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=BVC9h2cc4jsperBXErBL8Q&oh=00_AfYMhedytPKdtsplctr1FU7E6JmKPsGhVuuMmDGrfXyeKg&oe=68DC4657",
    ner: "Гар урлалын модон сав",
    une: 130000,
    orts_nairlaga: ["мод", "байгалийн лак"],
    jin_hemjee: "1.2кг",
    torol: "Гар урлал",
    uildverlegch: "Хөнөг урлаач Багабанди",
    delgerengui:
      "Монгол дархны ур ухаанаар бүтсэн, бат бөх модон сав. Байгалийн материалаар хийсэн тул гоёл чимэглэл болон ахуйн хэрэглээнд тохиромжтой.",
  },
  {
    id: "6",
    zurag: "https://cdn.globalso.com/hsfelt/DSC01582.jpg",
    ner: "Гар урлалын эсгий цүнх",
    une: 25000,
    orts_nairlaga: ["эсгий", "сүлжмэл чимэглэл"],
    jin_hemjee: "35x25см",
    torol: "Гар урлал",
    uildverlegch: "Эсгий урлал ",
    delgerengui:
      "Монгол уламжлалт эсгийгээр хийсэн өвөрмөц загвартай компютэрийн цүнх. Хөнгөн, удаан эдэлгээтэй бөгөөд өдөр тутмын хэрэгцээнд тохиромжтой.",
  },
  {
    id: "7",
    zurag: "https://cdn.greensoft.mn/uploads/users/163/images/4_6.jpg",
    ner: "Эсгий улавч",
    une: 50000,
    orts_nairlaga: ["эсгий", "хамеран ул"],
    jin_hemjee: "free-size",
    torol: "Гар урлал",
    uildverlegch: "Онч",
    delgerengui:
      "Хөлд дулаан мөн эвтэйхэн.Хүний биед харшил өгөхгүй эсгийгээр хийсэн",
  },
  {
    id: "8",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/469856958_122133034550500398_5742659131761272356_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ZXznyv7qi60Q7kNvwETAI6i&_nc_oc=Adkwkk0-l0Wu8RVfl3i_xdovyunq6x4gIYJdjH7JmAE1439CziZrnaQToAfn3zKApj0&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=PjCa7MrNeIDRidLNI8tWww&oh=00_AfZ8Rwzk6QZmlaJgxYhpc_LXXKaY484BKp0LneVYPCm2sw&oe=68DC3F8B",
    ner: "Ногоон  тэжээл",
    une: 110000,
    orts_nairlaga: ["ногоон тэжээлийн үр"],
    jin_hemjee: "1ширхэг прес",
    torol: "Амьтан",
    uildverlegch: "Ногоон  тэжээл худалдаа",
    delgerengui: "Таван хошуу мал болон тахиа гахай тэжээхэд ашиглана.",
  },
  {
    id: "9",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/553169543_1298795971976277_1097504598008760332_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=38SgMSI9cKkQ7kNvwFIFJSX&_nc_oc=Adns3fAKGLVpILZgwSAdxT6MzJG3sf-zAfxWw8_qwZYsTpKqfZKuYDaZZxnwawJEG1Y&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=SBR7srYxEChN2sQDzFqxuQ&oh=00_AfbqD-EOrLW8_s1HMe7CeR8C8RQR28_3UE-Ryl9Sm6DyXQ&oe=68DD63E4",
    ner: "Охидын чамин баантик",
    une: 5000,
    orts_nairlaga: [" үсний тууз"],
    jin_hemjee: "1ширхэг",
    torol: "Бусад",
    uildverlegch: "Туузаар Урлахуй",
    delgerengui:
      "Охидод болон анги нийтийн хүүхдүүдэд зориулж олон тоогоор баантик болон зангиа хийнэ. ",
  },
  {
    id: "10",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/516842802_1305304378262325_3517874867423836137_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_puOB8O9LC8Q7kNvwHZ3mGp&_nc_oc=AdniUJ1MlAYCBgthkU-OCvMuqVnvpSqC1LWrAPVciVAHM09FSfn_h2JR-b9iukHZ2hI&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=3ALleL71KFVNmSQtm2jPzQ&oh=00_AfZNNON_QzyoHGptWx2S6IY-aVRengD-QbJv6YV5HCAAPg&oe=68DD434C",
    ner: "Монгол гутал",
    une: 900000,
    orts_nairlaga: ["Үхэрийн арьс"],
    jin_hemjee: "43размер",
    torol: "Гар урлал",
    uildverlegch: "Угалз-монгол гутал захиалга",
    delgerengui: "64 угалзтай ээтэн гутал. Жич:Захиалгаар хийнэ",
  },
  {
    id: "11",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t1.6435-9/104666224_139732547729320_5467992984819350051_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=33274f&_nc_ohc=CwR2ZvU979UQ7kNvwE36s1c&_nc_oc=Adk-T8RGuV57pBI55C0NqXEBBNSj9nHC8aOlhdtCKQgGzvilKg3DQ-7Wep2eOLWKuow&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=gIoiOEEAxIeHp8wAoysnzQ&oh=00_AfbaRGQW4hCBbPwMjxglaVeTZvMfRhN2Vf-wtcZg5N7M8g&oe=68FEF457",
    ner: "хорол тоглоом",
    une: 350000,
    orts_nairlaga: ["Цэвэр мод, байгалийн гаралтай лак"],
    jin_hemjee: "5:8см",
    torol: "Гар урлал",
    uildverlegch: "Уран сийлбэр & Модон эдлэл",
    delgerengui:
      "Монголын үндэсний тоглоом.Хүний эрүүл мэндэд ямарч хор нөлөө байхгүй. ",
  },
  {
    id: "12",
    zurag:
      "https://montsame.mn/uploads/content/914567114d3d51a217e473612bf0e41e.png",
    ner: "Гар хийцийн саван",
    une: "10000",
    orts_nairlaga: ["Өөхөн тос", "амин тос", "өнгө оруулагч", "үнэр оруулагч"],
    jin_hemjee: "5ширхэг",
    torol: "Гар урлал",
    uildverlegch: "Гэртээ  хийе",
    delgerengui:
      "Малын түүхий эд болох өөхөн тос ашиглан гэртээ хийсэн эрүүл мэндэд хоргүй монгол саван.",
  },
  {
    id: "13",
    zurag:
      "https://ergelt.mn/upload/images/560x360/2022/05/16/08daa0a15e7af2ead6edd0b5c1aa3455.jpg",
    ner: "Тасалгааны цэцэг",
    une: 15000,
    orts_nairlaga: ["Тасалгааны цэцэг"],
    jin_hemjee: "1 сав цэцэг",
    torol: "Бусад",
    uildverlegch: "Erdenee Erka",
    delgerengui: "Гэрийн агаарыг цэвэршүүлж тайвшруулах үйлчилгээтэй цэцэг.",
  },
  {
    id: "14",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t1.6435-9/48416304_745127155848594_6875170290641403904_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=MeOwePZxREgQ7kNvwFctfyc&_nc_oc=Adloizh-FGYP26-hYVX7TJRZ4Ocwh75NbpzFZhfoQQXKHKuG4_PAUOIDnLWVVFlysRU&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=4z4nLki7nVK7YmdjwvCNyg&oh=00_AfaZCg4ToPpXVFNWahL-njvvIZUeYjq3dJIyI7hu-UyARQ&oe=68FF16E6",
    ner: "чонын хэл ургамал",
    une: 15000,
    orts_nairlaga: ["Хатаасан чонын хэл"],
    jin_hemjee: "100гр",
    torol: "Бусад",
    uildverlegch: "Цайны Ба Эмийн Ургамал",
    delgerengui:
      "Чонын хэл ургамал нь ангина бронхит булчирхайн хорт хавдар бүгшүүлэн ханиалгах халуурах ханиад томуу гэх мэтчилэн маш их ач тустай.",
  },
  {
    id: "15",
    zurag: "https://monfoodland.mn/wp-content/uploads/2025/09/8.png",
    ner: "Шаргал жигнэмэг",
    une: 10000,
    orts_nairlaga: [
      "Овьёос",
      " улаан буудайн 1-р гурил",
      " ургамлын масло",
      "үзэм",
      ,
      "бор сахар",
    ],
    jin_hemjee: "15 ширхэг",
    torol: "Хүнс",
    uildverlegch: "Хөвсгөл Овьёос",
    delgerengui:
      "Өглөө өдөр орой гээд ямар ч үед бүхийл насны хүн хэрэглэж болохуйц эрүүл амттай овьёосны жигнэмэг.",
  },
  {
    id: "16",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/502736397_122110250678876745_7907029732870406973_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=J9qemwXr1EIQ7kNvwHW80wM&_nc_oc=Adl-afFsvp5kXw4ZpiN2A8iBjeQ3gtM5lU4MbBrQ9YmpUyDiN71QM1AA-DdympFFkbU&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=EA0Y1wN7xWuSGgfXImYZ0Q&oh=00_AfZDDuXSIvxSB75U_LvvQIrFmO0ROP98kZbKPTJoMFnY1w&oe=68DE92B8",
    ner: "Зуух сувинер",
    une: 70000,
    orts_nairlaga: ["Цэвэр ган төмөр"],
    jin_hemjee: "30см:20см",
    torol: "Гар урлал",
    uildverlegch: "Amaraa Amka ",
    delgerengui:
      "Бэлэн байгаа мөн захиалга авна олноор.Арц хүжээ уугуулна.Галаа тахиулахад ашиглана.Бэлэг болгон өгч болно.Галын хайч дэгээ төмөр чулуун суурь дагалдана.",
  },
  {
    id: "17",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/552505691_813135507902486_4805911141671036745_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=044szrc5OmsQ7kNvwHpAz-w&_nc_oc=AdlVgtPHtYbrggujdXX8fUQc7x7BPRpKp3zKP0x1mGAQOs7DbI0RgddKFl49wWoBP6s&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=_m6Z4K3x6mR990lMpHFcBw&oh=00_AfajQiQpBVj_OznG9OnhSx9J3lBBUHNRg8tVe1RywlHV3g&oe=68DEAB2F",
    ner: "Пүүзний уут",
    une: 20000,
    orts_nairlaga: ["Цэвэр даавуу"],
    jin_hemjee: "30см:20см",
    torol: "Гар урлал",
    uildverlegch: "Хайраар урлав.",
    delgerengui:
      "Анги нийтийн хүүхдүүдэд захиалгаар хийнэ.Хүүхдийн нэр болон анги сургуулийн лого наалгаж болно",
  },
  {
    id: "18",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/556223578_664971389985469_5569020668386342187_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=3qy7vhaGFBUQ7kNvwH1ceIO&_nc_oc=Adlv5X9T-A7sivi6jM9dO_He-ZGdX9xivcH6gYzyy38y3UYXegv2nEU3ZuTJ8KD7DeI&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=NkKp7KWNj-A5ZY0nwY3CjQ&oh=00_AfY2rz-lQiPVYJgG7HMW8lmlIf9leypb4GID_DvJ_oMy5A&oe=68DEBF5D",
    ner: "Нэхмэл утсаар нэхсэн цэцэг",
    une: 30000,
    orts_nairlaga: ["Нэхмэл утас"],
    jin_hemjee: "1багц цэцэг",
    torol: "Гар урлал",
    uildverlegch: "Zozka Zozka",
    delgerengui: "Хамгийн гоёыг хайраар урлав.",
  },
  {
    id: "19",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/555786262_1115164210681799_8227578279392776750_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BL3pFr3Yfr8Q7kNvwHIL1-7&_nc_oc=Adn1rmHMXFX4WhdS_7Q92avXedXltcOg5Zk6xW9Y0Drm6yq3ScdHnuMlGQNifXl9B0M&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=a_W2VlemMuS9_R6hfD8woQ&oh=00_Afa3a1BOqZAUJPeYdGlckD4Cyp4LEeOc_W05Bb7LpAC8yg&oe=68DE8D77",
    ner: "Шоколад",
    une: 10000,
    orts_nairlaga: [" Цэвэр какоа"],
    jin_hemjee: "1ширхэг",
    torol: "Хүнс",
    uildverlegch: "Бяцхан бэлэг",
    delgerengui:
      "Хамт олны зураг болон ажлын лого гэх мэтчилэн хүссэн зургаараа хийлгэж болно.Олон тоогоор хийнэ ",
  },
  {
    id: "20",
    zurag:
      "https://www.panz.mn/resource/altanzar/ad/2024/02/14/tufoa7a7yt70lkcg/image0.jpeg",
    ner: "Байгалийн бордоо",
    une: 30000,
    orts_nairlaga: ["Боловсруулсан бууц", "Био нүүрс", "Хар шороо"],
    jin_hemjee: "5кг",
    torol: "Бусад",
    uildverlegch: "Khotolbayar",
    delgerengui:
      "Малын болон ургамалын гаралтай хоёрдогч түүхий эдийг 100 хувь хаягдалгүй технологиор боловсруулж байгаль орчинд ээлтэй 8 төрлийн органик бордоо үйлдэрлэнэ.",
  },
  {
    id: "21",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/541052912_1356360092696632_2830618423169481893_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=6uMBR_5RxxAQ7kNvwEtStrq&_nc_oc=Adk5YHIF0f2Z_d_mu3HKxaOdNG5LZNRdp2FoZUR6X5ayfn1H3cjCe6unp8hb7qy-4Vg&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=rK55sg9gZCvkbyHDsXVkMQ&oh=00_AfaUeRV1CilSEdxZqCJTjRmvcKvT9qT-kecedFiE5gi6pQ&oe=68E0073A",
    ner: "Ваннны бөмбөлөг",
    une: 7000,
    orts_nairlaga: [
      "Сода",
      "Лемоны хүчил",
      "Цардуул",
      "Чийгшүүлэх тос",
      "Essential oil",
      "Лавендар ойл",
    ],
    jin_hemjee: " 1бөмбөлөг",
    torol: "Гар урлал",
    uildverlegch: "Оюун Эрдэнэ",
    delgerengui:
      "Харшилтай болон бүх төрлийн хүмүүс хэрэглэх боломжтой.Байгалийн гаралтай учир хүүхэд болон жирэмсэн хөхүүл ээжүүд ч хэрэглэж болно",
  },
  {
    id: "22",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/529932441_1451123685929711_8457954587845699671_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=100&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=f5j88JNAIOkQ7kNvwF0MhDy&_nc_oc=AdkvkxztMnuLXbzWX0tSGoW6xRbTTuIenDW46ikyZfu4o5IKJj7CS-HJy39satuOtgc&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=SXn0SFGZO9epjZvAvH_vvg&oh=00_AfaD1aUNS_-0nzGyKAADmAmmrCUBRR7_KqltqKRWjaOlCA&oe=68E01C40",
    ner: "Барьсан талх",
    une: "5000",
    orts_nairlaga: [
      "Хөх тарианы гурил",
      "Исгэгч",
      "Өндөг",
      "Цөцгийн тос",
      "Самар",
    ],
    jin_hemjee: "700гр",
    torol: "Хүнс",
    uildverlegch: "Амттай",
    delgerengui:
      "Үйлдвэрийн биш.Амт, зөөлөн бүтэцтэй, чанартай гар хийцийн талх.Өглөө бүр шинээр барьж, халуун дулаанаар хүргэнэ",
  },
  {
    id: "23",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/548213112_2576446712711321_351866343807164965_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=jmXZbqUIOlwQ7kNvwGjIxSJ&_nc_oc=AdnRXFCDWTLTAD1y7LtVkPqgnsIdAxKi4JJHVU889hAR88_54tMPo1xhmstkaYedjks&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=OGwaMoRIVaj3LyCLG_0JNQ&oh=00_AfbILEaT8vCvaAmxEe_hEMZzD_c9vLbt8UPXooW-u84MDw&oe=68E01AE2",
    ner: "Хэвийн ааруул",
    une: 300000,
    orts_nairlaga: ["Үнээний цэвэр аарц", "Сахар"],
    jin_hemjee: "1кг",
    torol: "Хүнс",
    uildverlegch: "Gana Tsoomoo",
    delgerengui:
      "Сарлагийн хэвийн  ааруул хорхой ааруул зарна. Байнга гаргана мөн хүргэлттэй.",
  },
  {
    id: "24",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/487420276_1248084367323040_8023840188990825762_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Hu_nadCIh08Q7kNvwEMF1Iy&_nc_oc=AdlN3sxHMu2LrSrBp3eChhMjCggPU-zy7kRTMoAdWU3V5PiH14kULIZiw0o5BpGKWJs&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=QKPr_EwJd28rJmFMV78hEw&oh=00_AfbKrrTX0XyOoLSgUyTNMjRaNBh_YgXTUZeLdbetINpmnA&oe=68DFFA44",
    ner: "Даам",
    une: 25000,
    orts_nairlaga: ["Хуванцар", "Байгалийн лак"],
    jin_hemjee: "100н буудалт",
    torol: "Бусад",
    uildverlegch: "Euro-Khuwsgul",
    delgerengui:
      "Хувнцарыг дахин боловсруулан хийсэн хүний биед хор хөнөөлгүй даам.Хуванцар учир хагарч гэмтэхгүй эдэлгээ даана.",
  },
  {
    id: "25",
    zurag:
      "https://scontent.fuln2-2.fna.fbcdn.net/v/t39.30808-6/475173777_1346474709707892_122729137104945213_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=2siSnH0nIV0Q7kNvwF7BPn6&_nc_oc=AdlgLmnFOOeWjALoRaAUEZy2eWU7M39JqoiNLwbbJLbaWeMXsBIbdhE4JT1NrXEjjmM&_nc_zt=23&_nc_ht=scontent.fuln2-2.fna&_nc_gid=KuLMNWTJPlhRNcPBPvCIVQ&oh=00_AfY_r6wKYHB8tR15lgFG4-4rbOs1RMU766-swFKuvl9S8w&oe=68DFF8F2",
    ner: "Өндөг",
    une: 20000,
    orts_nairlaga: [""],
    jin_hemjee: "24ширхэг",
    torol: "Хүнс",
    uildverlegch: " Khuwgul-egg",
    delgerengui: " Цэвэр  пермд даруулж боловсруулсан хөвсгөлийн өндөг.",
  },
];
export default initialProducts;

// 🔹 Context үүсгэх
const ProductsContext = createContext();

// 🔹 Provider компонент
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const value = { products, setProducts };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// 🔹 Custom hook context ашиглахад
export function useProducts() {
  return useContext(ProductsContext);
}
