// Rota Karnataka — dataset of real Karnataka destinations
// lat/lng: WGS84 decimal coordinates, cost: estimated entry fee in INR, hours: average visit length
// cat: heritage | nature | beach | hills | wildlife | city

export const CATEGORIES = {
  heritage: 'Temples, ruins & forts',
  nature: 'Waterfalls, lakes & parks',
  beach: 'Beaches & coast',
  hills: 'Hills & coffee country',
  wildlife: 'Parks & reserves',
  city: 'Cities, museums & markets',
};

export const START_CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { id: 'mysuru', name: 'Mysuru', lat: 12.3052, lng: 76.6552 },
  { id: 'mangaluru', name: 'Mangaluru', lat: 12.9141, lng: 74.8560 },
  { id: 'hubballi', name: 'Hubballi–Dharwad', lat: 15.3647, lng: 75.1240 },
  { id: 'belagavi', name: 'Belagavi', lat: 15.8497, lng: 74.4977 },
];

export const PLACES = [
  // ——— Mysuru and around ———
  { id: 'mysuru-palace', name: 'Mysuru Palace', region: 'Mysuru', cat: 'heritage', lat: 12.3052, lng: 76.6552, cost: 100, hours: 2, blurb: 'The Wadiyar palace, lit by 97,000 lamps during the Dasara festival.' },
  { id: 'chamundi-hill', name: 'Chamundi Hills & Nandi', region: 'Mysuru', cat: 'heritage', lat: 12.2725, lng: 76.6710, cost: 0, hours: 2, blurb: 'Temple of goddess Chamundi and the giant monolithic Nandi, with views over Mysuru.' },
  { id: 'brindavan-gardens', name: 'Brindavan Gardens', region: 'Mysuru', cat: 'nature', lat: 12.4205, lng: 76.5746, cost: 50, hours: 2, blurb: 'Terraced gardens with musical fountains in front of the Krishna Raja dam.' },
  { id: 'st-philo', name: 'St. Philomena Cathedral', region: 'Mysuru', cat: 'heritage', lat: 12.3140, lng: 76.6580, cost: 0, hours: 1, blurb: 'Neo-Gothic cathedral modelled on Cologne, one of the largest churches in India.' },
  { id: 'devaraja-market', name: 'Devaraja Market', region: 'Mysuru', cat: 'city', lat: 12.3040, lng: 76.6520, cost: 0, hours: 1, blurb: 'Covered market running since 1905: jasmine, spices and colour at full volume.' },
  { id: 'rail-museum', name: 'Rail Museum Mysuru', region: 'Mysuru', cat: 'city', lat: 12.3140, lng: 76.6450, cost: 50, hours: 1, blurb: 'Vintage steam locomotives and historic railway stock.' },
  { id: 'karanji-lake', name: 'Karanji Lake Nature Park', region: 'Mysuru', cat: 'nature', lat: 12.2900, lng: 76.6450, cost: 50, hours: 2, blurb: 'Urban wetland with a butterfly house and lakeside trails.' },
  { id: 'srirangapatna', name: 'Ranganathaswamy Temple, Srirangapatna', region: 'Mysuru', cat: 'heritage', lat: 12.4160, lng: 76.6830, cost: 0, hours: 2, blurb: 'Sacred island in the Cauvery river, Vaishnava temple and Tipu Sultan fort.' },
  { id: 'somanathapura', name: 'Keshava Temple, Somanathapura', region: 'Mysuru', cat: 'heritage', lat: 12.3800, lng: 76.6780, cost: 50, hours: 1, blurb: 'The 1268 Hoysala gem, soapstone carvings in spiralling bands.' },
  { id: 'balmuri-falls', name: 'Balmuri Falls', region: 'Mysuru', cat: 'nature', lat: 12.4400, lng: 76.6500, cost: 20, hours: 2, blurb: 'Weir on the Cauvery and a favourite picnic spot for local families.' },
  { id: 'himvad-gopalaswamy', name: 'Himavad Gopalaswamy Betta', region: 'Mysuru', cat: 'hills', lat: 11.9600, lng: 76.5700, cost: 100, hours: 2, blurb: 'Misty hill on the Bandipur fringe with a hilltop temple and wide views.' },

  // ——— Coorg / Kodagu ———
  { id: 'rajas-seat', name: "Raja's Seat, Madikeri", region: 'Coorg', cat: 'nature', lat: 12.4200, lng: 75.7400, cost: 50, hours: 1, blurb: 'Sunset terrace over the hills of Madikeri.' },
  { id: 'abbey-falls', name: 'Abbey Falls', region: 'Coorg', cat: 'nature', lat: 12.4500, lng: 75.7400, cost: 50, hours: 1, blurb: 'Waterfall tucked between coffee and cardamom plantations.' },
  { id: 'talacauvery', name: 'Talacauvery', region: 'Coorg', cat: 'heritage', lat: 12.3800, lng: 75.4900, cost: 0, hours: 2, blurb: 'Sacred source of the Cauvery river on the Brahmagiri ridge.' },
  { id: 'dubare-elephants', name: 'Dubare Elephant Camp', region: 'Coorg', cat: 'wildlife', lat: 12.3700, lng: 75.8600, cost: 300, hours: 3, blurb: 'Elephant camp on the Cauvery: bathing, feeding and keeper talks.' },
  { id: 'nisargadhama', name: 'Nisargadhama', region: 'Coorg', cat: 'nature', lat: 12.3500, lng: 75.8800, cost: 10, hours: 2, blurb: 'Artificial island with bamboo groves, deer and a hanging bridge.' },
  { id: 'bylakuppe', name: 'Golden Temple, Bylakuppe', region: 'Coorg', cat: 'heritage', lat: 12.0000, lng: 75.9500, cost: 0, hours: 2, blurb: "South India's largest Tibetan settlement." },
  { id: 'iruppu-falls', name: 'Iruppu Falls', region: 'Coorg', cat: 'nature', lat: 11.8900, lng: 75.6600, cost: 50, hours: 2, blurb: 'Falls on the Rama Tirtha stream, trail through shola forest.' },
  { id: 'nagarhole', name: 'Nagarhole National Park', region: 'Coorg', cat: 'wildlife', lat: 11.9000, lng: 76.1500, cost: 500, hours: 4, blurb: 'Safari in the tiger reserve: elephants, gaur and dholes.' },

  // ——— Chikkamagaluru and coffee hills ———
  { id: 'mullayanagiri', name: 'Mullayanagiri', region: 'Chikkamagaluru', cat: 'hills', lat: 13.3800, lng: 75.7700, cost: 0, hours: 3, blurb: "Karnataka's highest peak, 1,930 m in the Western Ghats." },
  { id: 'baba-budangiri', name: 'Baba Budangiri', region: 'Chikkamagaluru', cat: 'hills', lat: 13.4100, lng: 75.7600, cost: 0, hours: 2, blurb: 'Cave shrines on the range credited with India’s first coffee.' },
  { id: 'manikyadhara', name: 'Manikyadhara Falls', region: 'Chikkamagaluru', cat: 'nature', lat: 13.4000, lng: 75.7700, cost: 50, hours: 2, blurb: 'Perennial falls on a cliff face at 1,200 m.' },
  { id: 'kemmangundi', name: 'Kemmangundi', region: 'Chikkamagaluru', cat: 'hills', lat: 13.2700, lng: 75.7500, cost: 100, hours: 3, blurb: 'Hill station with botanical gardens and viewpoints.' },
  { id: 'hebbe-falls', name: 'Hebbe Falls', region: 'Chikkamagaluru', cat: 'nature', lat: 13.2600, lng: 75.7500, cost: 300, hours: 3, blurb: 'Two-tier waterfall reached by jeep from Kemmangundi.' },

  // ——— Malnad and waterfalls ———
  { id: 'jog-falls', name: 'Jog Falls', region: 'Malnad', cat: 'nature', lat: 14.2300, lng: 74.8100, cost: 50, hours: 2, blurb: 'One of India’s tallest falls: 253 m in four separate cascades.' },
  { id: 'yana', name: 'Yana Rocks', region: 'Malnad', cat: 'nature', lat: 14.5600, lng: 74.8400, cost: 50, hours: 3, blurb: 'Limestone caves and black monoliths deep in the forest.' },
  { id: 'unchalli-falls', name: 'Unchalli Falls', region: 'Malnad', cat: 'nature', lat: 14.5400, lng: 74.9900, cost: 50, hours: 2, blurb: 'The Aghanashini drop, 116 m through untouched forest.' },
  { id: 'magod-falls', name: 'Magod Falls', region: 'Malnad', cat: 'nature', lat: 14.4300, lng: 74.9600, cost: 50, hours: 2, blurb: 'Twin drop wrapped in the mist of Sagar taluk.' },
  { id: 'dandeli', name: 'Dandeli — rafting & jungle', region: 'Malnad', cat: 'wildlife', lat: 15.2700, lng: 74.6200, cost: 600, hours: 4, blurb: 'White-water rafting on the Kali and jungle safari: leopards and hornbills.' },

  // ——— Coast ———
  { id: 'gokarna', name: 'Gokarna — Mahabaleshwar', region: 'Costa', cat: 'heritage', lat: 14.5500, lng: 74.3200, cost: 0, hours: 2, blurb: '12th-century Shiva temple, a living pilgrimage site.' },
  { id: 'om-beach', name: 'Om Beach', region: 'Costa', cat: 'beach', lat: 14.5550, lng: 74.3150, cost: 0, hours: 3, blurb: 'Bay shaped like the sacred Om, long waves and beach cafes.' },
  { id: 'kudle-beach', name: 'Kudle Beach', region: 'Costa', cat: 'beach', lat: 14.5450, lng: 74.3100, cost: 0, hours: 3, blurb: 'Crescent of sand with restaurants up on the headland.' },
  { id: 'murudeshwar', name: 'Murudeshwar', region: 'Costa', cat: 'heritage', lat: 14.0900, lng: 74.4900, cost: 100, hours: 2, blurb: "India's second-largest Shiva statue, 123 m above the sea." },
  { id: 'netrani', name: 'Netrani Island (snorkelling)', region: 'Costa', cat: 'beach', lat: 14.0800, lng: 74.5400, cost: 1500, hours: 4, blurb: 'Heart-shaped island with clear water and coral reefs.' },
  { id: 'karwar', name: 'Devbagh Beach, Karwar', region: 'Costa', cat: 'beach', lat: 14.8100, lng: 74.1300, cost: 200, hours: 3, blurb: 'Lagoon between river and sea in the Gulf of Karnataka.' },
  { id: 'malpe', name: 'Malpe Beach', region: 'Costa', cat: 'beach', lat: 13.3300, lng: 74.7000, cost: 0, hours: 3, blurb: "Udupi's beach, rock islets and a fishing pier." },
  { id: 'kaup', name: 'Kaup Beach & Lighthouse', region: 'Costa', cat: 'beach', lat: 13.2100, lng: 74.7400, cost: 0, hours: 2, blurb: '1901 lighthouse on windy cliffs, temple of a thousand tongues.' },
  { id: 'maravanthe', name: 'Maravanthe Beach', region: 'Costa', cat: 'beach', lat: 13.8300, lng: 74.6700, cost: 0, hours: 2, blurb: 'Highway 66 squeezed between the ocean and the Sauparnika river.' },
  { id: 'panambur', name: 'Panambur Beach, Mangaluru', region: 'Costa', cat: 'beach', lat: 12.8700, lng: 74.8300, cost: 0, hours: 2, blurb: 'City beach with water sports and sunsets over the estuary.' },
  { id: 'pilikula', name: 'Pilikula Nisargadhama', region: 'Costa', cat: 'nature', lat: 12.9000, lng: 74.8800, cost: 100, hours: 3, blurb: 'Lake, arboretum and science centre on the edge of Mangaluru.' },

  // ——— North: Hampi and the Deccan ———
  { id: 'hampi-vittala', name: 'Hampi — Vitthala Temple & Stone Chariot', region: 'Hampi', cat: 'heritage', lat: 15.3390, lng: 76.4710, cost: 50, hours: 3, blurb: 'The stone chariot and singing pillars of the Vijayanagara empire.' },
  { id: 'hampi-virupaksha', name: 'Virupaksha Temple', region: 'Hampi', cat: 'heritage', lat: 15.3364, lng: 76.4610, cost: 50, hours: 2, blurb: 'Temple in continuous worship since 1444, painted ceilings and monkeys.' },
  { id: 'hampi-royal', name: 'Royal Enclosure & Lotus Mahal', region: 'Hampi', cat: 'heritage', lat: 15.3300, lng: 76.4580, cost: 50, hours: 3, blurb: 'Royal court, queen’s bath and the arched Lotus Mahal.' },
  { id: 'anegundi', name: 'Anegundi — North Bank', region: 'Hampi', cat: 'heritage', lat: 15.3450, lng: 76.4750, cost: 50, hours: 3, blurb: 'The village across the Tungabhadra: banyans and rock art.' },
  { id: 'matanga', name: 'Matanga Hill — Sunrise over Hampi', region: 'Hampi', cat: 'nature', lat: 15.3330, lng: 76.4640, cost: 0, hours: 2, blurb: 'Climb the boulders for the best view of the Hampi landscape.' },
  { id: 'badami', name: 'Badami Caves', region: 'Deccan', cat: 'heritage', lat: 15.9180, lng: 75.6800, cost: 30, hours: 3, blurb: 'Four rock-cut cave temples from the 6th century in red sandstone.' },
  { id: 'aihole', name: 'Aihole', region: 'Deccan', cat: 'heritage', lat: 15.9450, lng: 75.9700, cost: 30, hours: 3, blurb: 'The Chalukyan open-air laboratory: some 120 temples.' },
  { id: 'pattadakal', name: 'Pattadakal', region: 'Deccan', cat: 'heritage', lat: 15.9500, lng: 75.8200, cost: 30, hours: 2, blurb: 'UNESCO site: nine temples blending northern and southern styles.' },
  { id: 'gol-gumbaz', name: 'Gol Gumbaz, Vijayapura', region: 'Deccan', cat: 'heritage', lat: 16.8300, lng: 75.7150, cost: 50, hours: 2, blurb: 'The subcontinent’s largest dome and its whispering gallery.' },
  { id: 'ibrahim-rauza', name: 'Ibrahim Rauza', region: 'Deccan', cat: 'heritage', lat: 16.8340, lng: 75.7190, cost: 50, hours: 2, blurb: 'The Taj of the Deccan: tomb and mosque mirrored across a garden.' },
  { id: 'tungabhadra', name: 'Tungabhadra Dam & River View', region: 'Hampi', cat: 'nature', lat: 15.3500, lng: 76.4500, cost: 0, hours: 2, blurb: 'Dam viewpoint, coracles and the stone circles of the riverbed.' },
  { id: 'lakkundi', name: 'Lakkundi', region: 'Deccan', cat: 'heritage', lat: 15.4100, lng: 75.7000, cost: 0, hours: 2, blurb: 'Late Chalukya temples and stepwells, almost empty of crowds.' },

  // ——— Hoysala belt and south ———
  { id: 'belur', name: 'Chennakeshava Temple, Belur', region: 'Hoysala', cat: 'heritage', lat: 13.1660, lng: 75.8800, cost: 50, hours: 2, blurb: 'The 1117 Hoysala temple with 60 dancing Madanika figures.' },
  { id: 'halebidu', name: 'Hoysaleswara, Halebidu', region: 'Hoysala', cat: 'heritage', lat: 13.2300, lng: 76.0000, cost: 50, hours: 2, blurb: 'Stone carved like lace, never finished, still the finest in the belt.' },
  { id: 'shravanabelagola', name: 'Shravanabelagola', region: 'Hoysala', cat: 'heritage', lat: 12.8500, lng: 76.4800, cost: 0, hours: 3, blurb: 'The 17 m Gommateshwara reached by 614 rock-cut steps.' },
  { id: 'shivanasamudra', name: 'Shivanasamudra — Gaganachukki', region: 'Hoysala', cat: 'nature', lat: 12.3000, lng: 77.1700, cost: 50, hours: 2, blurb: 'Braided falls of the Kaveri around forested islands.' },
  { id: 'talakadu', name: 'Talakadu — Dunes of the Cauvery', region: 'Hoysala', cat: 'heritage', lat: 12.1900, lng: 77.0300, cost: 0, hours: 3, blurb: 'Town buried in sand dunes; five temples surface every few years.' },
  { id: 'dharmasthala', name: 'Dharmasthala', region: 'Hoysala', cat: 'heritage', lat: 12.9600, lng: 75.5700, cost: 0, hours: 2, blurb: 'Manjunatha temple and the golden Bahubali, with free meals for every pilgrim.' },
  { id: 'kukke', name: 'Kukke Subramanya', region: 'Hoysala', cat: 'heritage', lat: 12.7500, lng: 75.7300, cost: 0, hours: 2, blurb: 'Serpent-deity temple at the foot of the Ghats, on the Sangha river.' },

  // ——— Bengaluru and around ———
  { id: 'lalbagh', name: 'Lalbagh Botanical Garden', region: 'Bengaluru', cat: 'nature', lat: 12.9500, lng: 77.5840, cost: 30, hours: 2, blurb: 'Garden since 1760 with the Victorian glass house and 3,000 species.' },
  { id: 'cubbon-park', name: 'Cubbon Park', region: 'Bengaluru', cat: 'nature', lat: 12.9760, lng: 77.5930, cost: 0, hours: 2, blurb: '300 acres of rain trees in the greenest quarter of the city.' },
  { id: 'bangalore-palace', name: 'Bangalore Palace', region: 'Bengaluru', cat: 'heritage', lat: 12.9980, lng: 77.5920, cost: 230, hours: 2, blurb: 'A Tudor-style castle in miniature, built by the Wadiyars.' },
  { id: 'vidhana-soudha', name: 'Vidhana Soudha', region: 'Bengaluru', cat: 'city', lat: 12.9790, lng: 77.5910, cost: 0, hours: 1, blurb: 'Karnataka’s legislature in Neo-Dravidian style, built from granite blocks.' },
  { id: 'bannerghatta', name: 'Bannerghatta National Park', region: 'Bengaluru', cat: 'wildlife', lat: 12.8000, lng: 77.5800, cost: 400, hours: 4, blurb: 'Lion and tiger safari, butterfly park and elephant sanctuary.' },
  { id: 'nandi-hills', name: 'Nandi Hills', region: 'Bengaluru', cat: 'hills', lat: 13.3700, lng: 77.6800, cost: 0, hours: 3, blurb: 'Sunrise above the clouds, 60 km from the city, with Tipu’s fort.' },
  { id: 'savandurga', name: 'Savandurga', region: 'Bengaluru', cat: 'nature', lat: 12.9350, lng: 77.2900, cost: 100, hours: 4, blurb: 'One of Asia’s largest monoliths, a steep scramble to the top.' },

  // ——— Elsewhere ———
  { id: 'agumbe', name: 'Agumbe — Sunset Point', region: 'Malnad', cat: 'hills', lat: 13.5100, lng: 75.0500, cost: 0, hours: 3, blurb: 'The Cherrapunji of the south, famous for its ridge-top sunset.' },
  { id: 'karkala', name: 'Gommateshwara, Karkala', region: 'Costa', cat: 'heritage', lat: 13.2100, lng: 74.9900, cost: 0, hours: 1, blurb: 'The first Gommateshwara statue, carved in 1421 on a lone hill.' },
  { id: 'moodabidri', name: 'Moodabidri Jain Basadi', region: 'Costa', cat: 'heritage', lat: 13.0600, lng: 75.0000, cost: 0, hours: 2, blurb: 'Jain temple town: 18 carved basadis, the Saavira Kambada.' },
  { id: 'udupi-temple', name: 'Krishna Temple, Udupi', region: 'Costa', cat: 'heritage', lat: 13.3400, lng: 74.7500, cost: 0, hours: 2, blurb: 'The 12th-century temple that gave Udupi its name and its dosa.' },
  { id: 'kollur', name: 'Mookambika, Kollur', region: 'Costa', cat: 'heritage', lat: 13.8600, lng: 74.7400, cost: 0, hours: 2, blurb: 'Devi shrine on the Sauparnika, gateway to Kodachadri.' },
  { id: 'mookambika-kodachadri', name: 'Kodachadri', region: 'Malnad', cat: 'hills', lat: 13.9300, lng: 74.8600, cost: 100, hours: 4, blurb: 'Sacred summit at 1,343 m, named after the peacock crest.' },
  { id: 'kittur', name: "Kittur — Rani Chennamma's Fort", region: 'Belagavi', cat: 'heritage', lat: 15.6400, lng: 74.5200, cost: 25, hours: 2, blurb: 'The queen who took on the British in 1824, decades before 1857.' },
  { id: 'gokak-falls', name: 'Gokak Falls', region: 'Belagavi', cat: 'nature', lat: 15.8500, lng: 74.8300, cost: 50, hours: 2, blurb: 'Horseshoe falls with a late-19th-century suspension bridge.' },
  { id: 'chandragiri-fort', name: 'Chandragiri Fort', region: 'Costa', cat: 'heritage', lat: 12.9900, lng: 74.9400, cost: 0, hours: 2, blurb: 'The Kolathiri fort: 170 steps and a Keladi Nayaka tomb.' },
];

// Daily cost estimates in INR
export const DAILY = {
  stay: 1800, // mid-range guesthouse or hotel night
  food: 900, // three meals
  transportPerKm: 10, // self-drive rental or taxi share
};
