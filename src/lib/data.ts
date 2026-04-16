export interface CarVariant {
  name: string;
  price: string;
}

export interface Car {
  slug: string;
  name: string;
  shortName: string;
  startPrice: string;
  downPayment: string;
  image: string;
  heroImage: string;
  variants: CarVariant[];
  category: "suv" | "sedan" | "mpv" | "hatchback";
  description: string;
  specs: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    seats: string;
    fuel: string;
  };
}

export const cars: Car[] = [
  {
    slug: "new-kia-sonet",
    name: "New KIA Sonet",
    shortName: "Sonet",
    startPrice: "480.000.000 đ",
    downPayment: "159.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/sonet-xam.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/sonet-xam.png",
    category: "suv",
    description: "New KIA Sonet – SUV đô thị năng động với thiết kế trẻ trung, công nghệ hiện đại và không gian nội thất rộng rãi.",
    variants: [
      { name: "KIA Sonet 1.5 AT", price: "480.000.000 đ" },
      { name: "KIA Sonet 1.5 Deluxe", price: "504.000.000 đ" },
      { name: "KIA Sonet 1.5 Luxury", price: "544.000.000 đ" },
      { name: "KIA Sonet 1.5 Premium", price: "599.000.000 đ" },
    ],
    specs: { engine: "1.5L MPI", power: "115 mã lực", torque: "144 Nm", transmission: "6AT", seats: "5", fuel: "Xăng" },
  },
  {
    slug: "new-kia-seltos",
    name: "New KIA Seltos",
    shortName: "Seltos",
    startPrice: "569.000.000 đ",
    downPayment: "174.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/neptune-blue-b3a-0006-1.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/neptune-blue-b3a-0006-1.png",
    category: "suv",
    description: "New KIA Seltos – Crossover SUV phong cách, mạnh mẽ với công nghệ tiên tiến và thiết kế đẳng cấp.",
    variants: [
      { name: "Seltos 1.5L AT", price: "569.000.000 đ" },
      { name: "New Seltos 1.5L Deluxe", price: "590.000.000 đ" },
      { name: "New Seltos 1.5L Turbo Deluxe", price: "609.000.000 đ" },
      { name: "New Seltos 1.5L Luxury", price: "634.000.000 đ" },
      { name: "New Seltos 1.5L Turbo Luxury", price: "655.000.000 đ" },
      { name: "New Seltos 1.5L Premium", price: "699.000.000 đ" },
    ],
    specs: { engine: "1.5L MPI / 1.5L Turbo", power: "116 / 158 mã lực", torque: "144 / 253 Nm", transmission: "IVT / 7DCT", seats: "5", fuel: "Xăng" },
  },
  {
    slug: "kia-carens",
    name: "KIA Carens",
    shortName: "Carens",
    startPrice: "579.000.000 đ",
    downPayment: "186.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/carens_do-do.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/carens_do-do.png",
    category: "mpv",
    description: "KIA Carens – MPV 7 chỗ hiện đại, rộng rãi với thiết kế sang trọng và trang bị an toàn toàn diện.",
    variants: [
      { name: "Carens 1.5G Deluxe", price: "579.000.000 đ" },
      { name: "Carens 1.5G IVT", price: "589.000.000 đ" },
      { name: "Carens 1.5G Lux (mới)", price: "629.000.000 đ" },
    ],
    specs: { engine: "1.5L Turbo GDi", power: "158 mã lực", torque: "253 Nm", transmission: "6MT / IVT", seats: "7", fuel: "Xăng" },
  },
  {
    slug: "kia-k3",
    name: "KIA K3",
    shortName: "K3",
    startPrice: "584.000.000 đ",
    downPayment: "172.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/k3xanh2-1.webp",
    heroImage: "https://kia-hcm.com/wp-content/uploads/k3xanh2-1.webp",
    category: "sedan",
    description: "KIA K3 – Sedan hạng C thanh lịch, tinh tế với công nghệ hiện đại và vận hành tiết kiệm nhiên liệu.",
    variants: [
      { name: "KIA K3 1.6 AT Luxury", price: "584.000.000 đ" },
      { name: "KIA K3 Premium", price: "604.000.000 đ" },
      { name: "KIA K3 1.6 Turbo", price: "639.000.000 đ" },
    ],
    specs: { engine: "1.6L MPI / 1.6L Turbo GDi", power: "128 / 204 mã lực", torque: "157 / 265 Nm", transmission: "6AT / 7DCT", seats: "5", fuel: "Xăng" },
  },
  {
    slug: "kia-sportage",
    name: "KIA Sportage",
    shortName: "Sportage",
    startPrice: "819.000.000 đ",
    downPayment: "226.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/sportage_nau.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/sportage_nau.png",
    category: "suv",
    description: "KIA Sportage – SUV C-segment đầy phong cách với thiết kế táo bạo, công nghệ an toàn tiên tiến.",
    variants: [
      { name: "Sportage 2.0G Premium", price: "819.000.000 đ" },
      { name: "Sportage 2.0G Signature", price: "929.000.000 đ" },
      { name: "Sportage 2.0D Signature X-Line", price: "909.000.000 đ" },
      { name: "Sportage 2.0D Signature", price: "939.000.000 đ" },
      { name: "Sportage 1.6T Signature AWD X-Line", price: "988.000.000 đ" },
      { name: "Sportage 1.6T Signature AWD", price: "1.009.000.000 đ" },
    ],
    specs: { engine: "2.0L MPI / 2.0L CRDi / 1.6T GDi", power: "156 / 186 / 177 mã lực", torque: "192 / 416 / 265 Nm", transmission: "8AT / 6AT", seats: "5", fuel: "Xăng / Dầu" },
  },
  {
    slug: "kia-k5",
    name: "KIA K5",
    shortName: "K5",
    startPrice: "759.000.000 đ",
    downPayment: "198.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/kia-k5-avatar.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/kia-k5-avatar.png",
    category: "sedan",
    description: "KIA K5 – Sedan hạng D sang trọng, năng động với thiết kế thể thao và trang bị cao cấp.",
    variants: [
      { name: "KIA K5 2.0 Luxury", price: "759.000.000 đ" },
      { name: "KIA K5 2.0 Premium", price: "879.000.000 đ" },
      { name: "KIA K5 2.5 GT-Line", price: "925.000.000 đ" },
    ],
    specs: { engine: "2.0L MPI / 2.5L GDi", power: "152 / 194 mã lực", torque: "192 / 246 Nm", transmission: "8AT", seats: "5", fuel: "Xăng" },
  },
  {
    slug: "new-kia-carnival",
    name: "New KIA Carnival",
    shortName: "Carnival",
    startPrice: "1.274.000.000 đ",
    downPayment: "348.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/carnival-avatar.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/carnival-avatar.png",
    category: "mpv",
    description: "New KIA Carnival – MPV hạng sang 7-8 chỗ đẳng cấp, không gian rộng lớn như xe VIP.",
    variants: [
      { name: "New Carnival 2.2D Luxury 8S", price: "1.274.000.000 đ" },
      { name: "New Carnival 2.2D Premium 8S", price: "1.434.000.000 đ" },
      { name: "New Carnival 2.2D Premium 7S", price: "1.474.000.000 đ" },
      { name: "New Carnival 2.2D Signature 7S", price: "1.524.000.000 đ" },
      { name: "New Carnival 1.6T Hybrid Premium", price: "1.519.000.000 đ" },
      { name: "New Carnival 1.6T Hybrid", price: "1.699.000.000 đ" },
    ],
    specs: { engine: "2.2L CRDi / 1.6T Hybrid", power: "202 / 230 mã lực", torque: "441 / 350 Nm", transmission: "8AT", seats: "7-8", fuel: "Dầu / Hybrid" },
  },
  {
    slug: "new-kia-sorento",
    name: "New KIA Sorento",
    shortName: "Sorento",
    startPrice: "1.249.000.000 đ",
    downPayment: "320.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/new-sorento-xanh-duong.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/new-sorento-xanh-duong.png",
    category: "suv",
    description: "New KIA Sorento – SUV 7 chỗ cỡ lớn sang trọng, mạnh mẽ với trang bị an toàn vượt trội.",
    variants: [
      { name: "2.5G SIGNATURE (FWD) - Xăng", price: "1.249.000.000 đ" },
      { name: "2.5G SIGNATURE (AWD) - Xăng", price: "1.329.000.000 đ" },
      { name: "2.2D SIGNATURE (FWD) - Dầu", price: "1.389.000.000 đ" },
      { name: "2.2D SIGNATURE (AWD) - Dầu", price: "1.469.000.000 đ" },
    ],
    specs: { engine: "2.5L GDi / 2.2L CRDi", power: "277 / 202 mã lực", torque: "311 / 441 Nm", transmission: "8AT", seats: "7", fuel: "Xăng / Dầu" },
  },
  {
    slug: "kia-new-morning-2025",
    name: "KIA Morning 2025",
    shortName: "Morning",
    startPrice: "439.000.000 đ",
    downPayment: "132.000.000 đ",
    image: "https://kia-hcm.com/wp-content/uploads/new-morning-pngicon-2.png",
    heroImage: "https://kia-hcm.com/wp-content/uploads/new-morning-pngicon-2.png",
    category: "hatchback",
    description: "KIA New Morning 2025 – Hatchback đô thị cỡ nhỏ linh hoạt, tiết kiệm nhiên liệu và dễ dàng di chuyển.",
    variants: [
      { name: "New Morning AT", price: "439.000.000 đ" },
      { name: "New Morning GT-Line", price: "469.000.000 đ" },
    ],
    specs: { engine: "1.2L MPI", power: "84 mã lực", torque: "122 Nm", transmission: "4AT", seats: "5", fuel: "Xăng" },
  },
];

export const promotions = [
  "Hỗ trợ 100% lệ phí trước bạ",
  "Tặng bảo hiểm thân vỏ 1 năm",
  "Hỗ trợ trả góp lãi suất 0% trong 12 tháng",
  "Tặng phụ kiện chính hãng lên đến 20 triệu",
  "Bảo hành 5 năm / 150.000 km",
  "Hỗ trợ định giá xe cũ giá tốt nhất",
];

export const contact = {
  name: "THACO AUTO Trường Chinh TP.HCM",
  fullName: "CÔNG TY TNHH THACO AUTO Trường Chinh TP.HCM",
  address: "38 Chế Lan Viên, Tây Thạnh, Tân Phú, TP.HCM",
  hotline: "0931.456.204",
  phone: "0931.456.204",
  email: "vu@thaco.com.vn",
  hours: "7:30 - 21:00 (Tất cả các ngày trong tuần)",
  consultant: "Vũ",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3!2d106.6!3d10.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s38+Ch%E1%BA%BF+Lan+Vi%C3%AAn!5e0!3m2!1svi!2svn!4v1",
};
