// ========================================
// 276 Paadal Petra Sthalams - Shiva Temples
// Temples glorified by the 63 Nayanar Saints
// ========================================

const paadalPetraSthalams = [
    // ========================================
    // CHOLA NAADU I - 63 Vadakarai Temples
    // ========================================
    {n:1, temple:"Vaithiyanathaswamy Temple", location:"Thirumazhapadi", district:"Ariyalur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Vaithiyanathaswamy", amman:"Sri Thaiyalnayaki", theertham:"Amirtha Theertham", sthalam:"Thirumazhapadi", legend:"Lord Shiva appeared as the divine physician (Vaidyanatha) to cure the ailments of devotees.", nayanmars:"Thirunavukkarasar, Thirugnanasambandar", festivals:"Maha Shivaratri, Aadi Perukku", significance:"One of the important temples where Lord Shiva is worshipped as the divine healer."},
    {n:2, temple:"Alanduraiyar Temple", location:"Keezhapaluvur", district:"Ariyalur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Alanduraiyar", amman:"Sri Elavarkuzhali", theertham:"Surya Theertham", sthalam:"Keezhapaluvur", legend:"The Lord resides under an Aala tree (banyan), hence the name Alanduraiyar.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Ancient temple with beautiful Chola architecture."},
    {n:3, temple:"Thillai Natarajar Temple", location:"Chidambaram", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Natarajar (Cosmic Dancer)", amman:"Sri Sivakami Amman", theertham:"Sivaganga Theertham", sthalam:"Chidambaram", legend:"Lord Shiva performed the cosmic dance (Ananda Tandavam) here. The temple houses the Chidambara Rahasyam - the secret of Chidambaram representing formless God.", nayanmars:"All 63 Nayanmars, Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Arudra Darshan (December-January), Natyanjali Festival, Ani Thirumanjanam", significance:"One of the Pancha Bootha Sthalams (Space/Akasha). The only temple where Shiva is worshipped as Natarajar. Managed by Dikshitars (hereditary priests).", timings:"Morning: 6:00 AM - 12:00 PM | Evening: 4:00 PM - 10:00 PM"},
    {n:4, temple:"Paasupatheeswarar Temple", location:"Thiruvedikalam", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Paasupatheeswarar", amman:"Sri Mangalambigai", theertham:"Vedha Theertham", sthalam:"Thiruvedikalam", legend:"Lord Shiva taught the Vedas here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple associated with Vedic learning."},
    {n:5, temple:"Uchinathar Temple", location:"Sivapuri", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Uchinathar", amman:"Sri Uchiammai", theertham:"Agni Theertham", sthalam:"Sivapuri", legend:"Lord Shiva appeared at the peak (Uchi) of this sacred hill.", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri, Thai Poosam", significance:"Hill temple with panoramic views."},
    {n:6, temple:"Balavannanathar Temple", location:"Thirukkazhippalai", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Balavannanathar", amman:"Sri Vannamulainayaki", theertham:"Surya Theertham", sthalam:"Thirukkazhippalai", legend:"The Lord appeared with a beautiful complexion (Bala Vannam).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Ancient temple with intricate sculptures."},
    {n:7, temple:"Pranava Vyagrapuriswarar Temple", location:"Omampuliyur", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Pranava Vyagrapuriswarar", amman:"Sri Soundaranayaki", theertham:"Pranava Theertham", sthalam:"Omampuliyur", legend:"A tiger (Vyagra) worshipped Lord Shiva here with the sacred syllable OM (Pranava).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple associated with the sacred OM mantra."},
    {n:8, temple:"Padanjaliswarar Temple", location:"Kanattampuliyur", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Padanjaliswarar", amman:"Sri Gnanambigai", theertham:"Patanjali Theertham", sthalam:"Kanattampuliyur", legend:"Sage Patanjali worshipped Lord Shiva here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple associated with Sage Patanjali, author of Yoga Sutras."},
    {n:9, temple:"Soundaryeswarar Temple", location:"Thirunaraiyur", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Soundaryeswarar", amman:"Sri Soundaryanayaki", theertham:"Soundarya Theertham", sthalam:"Thirunaraiyur", legend:"The Lord is known for divine beauty (Soundarya).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple known for the beautiful form of the deity."},
    {n:10, temple:"Amirthakatheeswarar Temple", location:"Melakkadambur", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Amirthakatheeswarar", amman:"Sri Abirami", theertham:"Amirtha Theertham", sthalam:"Melakkadambur", legend:"The Lord blessed devotees with the nectar of immortality (Amrita).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Abirami Festival", significance:"Famous for the Abirami Anthadhi composed here by Abirami Bhattar."},
    {n:11, temple:"Paasupatheeswarar Temple", location:"Panthanallur", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Paasupatheeswarar", amman:"Sri Gnanambigai", theertham:"Paasu Theertham", sthalam:"Panthanallur", legend:"Lord Shiva appeared as Pasupati (Lord of all beings).", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple associated with the Pasupata tradition."},
    {n:12, temple:"Agneeswarar Temple", location:"Kanjanur", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Agneeswarar", amman:"Sri Karumbanayaki", theertham:"Agni Theertham", sthalam:"Kanjanur", legend:"Lord Agni (Fire God) worshipped Shiva here. This is the temple for planet Sukra (Venus).", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Sukra Peyarchi", significance:"One of the Navagraha temples - for planet Venus (Sukra). Worshipping here is believed to bring prosperity and remove obstacles in marriage."},
    {n:13, temple:"Koteeswarar Temple", location:"Thirukkodikaval", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Koteeswarar", amman:"Sri Vadivudainayaki", theertham:"Kodi Theertham", sthalam:"Thirukkodikaval", legend:"The Lord granted boons worth crores (Koti) to devotees.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple known for granting wishes."},
    {n:14, temple:"Prananatheswarar Temple", location:"Thirumangalakudi", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Prananatheswarar", amman:"Sri Mangalanayaki", theertham:"Prana Theertham", sthalam:"Thirumangalakudi", legend:"The Lord is the master of life force (Prana).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple associated with life energy and vitality."},
    {n:15, temple:"Arunajadeswarar Temple", location:"Thiruppanandal", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Arunajadeswarar", amman:"Sri Perianayaki", theertham:"Aruna Theertham", sthalam:"Thiruppanandal", legend:"The Lord appeared with the radiance of the rising sun (Aruna).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple known for the radiant form of the deity."},
    {n:16, temple:"Baluganathar Temple", location:"Thiruvaiyapadi", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Baluganathar", amman:"Sri Valainayaki", theertham:"Baluka Theertham", sthalam:"Thiruvaiyapadi", legend:"The Lord appeared on a sandy (Baluka) terrain.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Ancient temple with unique sand-based legend."},
    {n:17, temple:"Sathiyagireeswarar Temple", location:"Senganoor", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Sathiyagireeswarar", amman:"Sri Sathiyambal", theertham:"Sathya Theertham", sthalam:"Senganoor", legend:"The Lord of Truth (Sathya) resides on this sacred hill.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple emphasizing truth and righteousness."},
    {n:18, temple:"Karkadeswarar Temple", location:"Thirundudevankudi", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Karkadeswarar", amman:"Sri Karkatnayaki", theertham:"Karkada Theertham", sthalam:"Thirundudevankudi", legend:"The Lord is associated with the Cancer (Karkada) zodiac.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with astrological significance."},
    {n:19, temple:"Yoganandeeswarar Temple", location:"Thiruvisanallur", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Yoganandeeswarar", amman:"Sri Visalakshi", theertham:"Yoga Theertham", sthalam:"Thiruvisanallur", legend:"The Lord grants the bliss of yoga (Yogananda).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple associated with yogic practices."},
    {n:20, temple:"Koteeswarar Temple", location:"Kottaiyur", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Koteeswarar", amman:"Sri Perianayaki", theertham:"Koti Theertham", sthalam:"Kottaiyur", legend:"Crores (Koti) of devotees have worshipped here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with large following of devotees."},
    {n:21, temple:"Ezhutharinathar Temple", location:"Innamboor", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Ezhutharinathar", amman:"Sri Gnanambigai", theertham:"Gnana Theertham", sthalam:"Innamboor", legend:"The Lord who removes illiteracy (Ezhuthu Ari) and grants knowledge.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Vijayadasami", significance:"Temple for education and knowledge. Students worship here."},
    {n:22, temple:"Satchinatheswarar Temple", location:"Thiruppurambiyam", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Satchinatheswarar", amman:"Sri Mangalambigai", theertham:"Sat Theertham", sthalam:"Thiruppurambiyam", legend:"The Lord embodies Truth, Consciousness, and Bliss (Sat-Chit-Ananda).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple representing the ultimate reality."},
    {n:23, temple:"Vijayanatheswarar Temple", location:"Thiruvijayamangai", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Vijayanatheswarar", amman:"Sri Mangalambigai", theertham:"Vijaya Theertham", sthalam:"Thiruvijayamangai", legend:"The Lord grants victory (Vijaya) to devotees.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple for success and victory in endeavors."},
    {n:24, temple:"Vilvavaneshwarar Temple", location:"Thiruvaikavoor", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Vilvavaneshwarar", amman:"Sri Soundaranayaki", theertham:"Vilva Theertham", sthalam:"Thiruvaikavoor", legend:"The Lord resides in a forest of Bilva trees.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple surrounded by sacred Bilva trees."},
    {n:25, temple:"Dayanidheeswarar Temple", location:"Vadakurangaduthurai", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Dayanidheeswarar", amman:"Sri Periyanayaki", theertham:"Daya Theertham", sthalam:"Vadakurangaduthurai", legend:"The Lord is the treasure of compassion (Daya Nidhi).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple emphasizing divine compassion."},
    {n:26, temple:"Abathsagayeswarar Temple", location:"Thirupazhanam", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Abathsagayeswarar", amman:"Sri Periyanayaki", theertham:"Sagaya Theertham", sthalam:"Thirupazhanam", legend:"The Lord provides refuge (Sagaya) from dangers.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple for protection and refuge."},
    {n:27, temple:"Aiyarappan Temple", location:"Thiruvaiyaru", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Aiyarappan (Panchanadeeswarar)", amman:"Sri Dharmasamvardini", theertham:"Pancha Nadi Sangamam", sthalam:"Thiruvaiyaru", legend:"Five rivers (Anju Aru = Five Rivers) meet here - Kaveri, Kudamurutti, Vennaru, Vettar, and Kollidam. Saint Thyagaraja attained samadhi here.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Thyagaraja Aradhana (January), Maha Shivaratri", significance:"Sacred confluence of five rivers. Saint Thyagaraja's samadhi is here. Major Carnatic music festival."},
    {n:28, temple:"Neyyadiyappar Temple", location:"Thillaisthanam", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Neyyadiyappar", amman:"Sri Oppilaamulaiammai", theertham:"Neyyadi Theertham", sthalam:"Thillaisthanam", legend:"The Lord's feet were anointed with ghee (Ney) by devotees.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with unique ghee offering tradition."},
    {n:29, temple:"Vyagrapureeswarar Temple", location:"Thiruperumpuliyur", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Vyagrapureeswarar", amman:"Sri Vanduvaarkuzhali", theertham:"Vyagra Theertham", sthalam:"Thiruperumpuliyur", legend:"A tiger (Vyagra) worshipped the Lord here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with tiger worship legend."},
    {n:30, temple:"Semmeninathar Temple", location:"Thirukkanur", district:"Thanjavur", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Semmeninathar", amman:"Sri Semmeni Ammai", theertham:"Semmai Theertham", sthalam:"Thirukkanur", legend:"The Lord has a beautiful reddish (Semmai) complexion.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple known for the reddish hue of the deity."},
    {n:31, temple:"Sathiyavakeeswarar Temple", location:"Anbil", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Sathiyavakeeswarar", amman:"Sri Soundaranayaki", theertham:"Sathya Theertham", sthalam:"Anbil", legend:"The Lord speaks only truth (Sathya Vak).", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple emphasizing truthful speech."},
    {n:32, temple:"Amravaneswarar Temple", location:"Mandurai", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Amravaneswarar", amman:"Sri Amirthanayaki", theertham:"Amrita Theertham", sthalam:"Mandurai", legend:"The Lord resides in an immortal (Amara) grove.", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple in a divine grove setting."},
    {n:33, temple:"Adhimouleeswarar Temple", location:"Thiruppatthurai", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Adhimouleeswarar", amman:"Sri Padmavathi", theertham:"Mouli Theertham", sthalam:"Thiruppatthurai", legend:"The Lord wears the Ganga on his head (Mouli).", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple highlighting Shiva's form with Ganga."},
    {n:34, temple:"Jambukeswarar Temple", location:"Thiruvanaikkaval", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Jambukeswarar (Appu Lingam)", amman:"Sri Akilandeswari", theertham:"Jambu Theertham", sthalam:"Thiruvanaikkaval", legend:"An elephant (Yanai) worshipped the Shiva Lingam under a Jambu tree. The Lingam is always submerged in water from an underground spring - representing the water element.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Maha Shivaratri, Aadi Pooram, Panguni Uthiram", significance:"One of the Pancha Bootha Sthalams - representing Water (Appu). Akilandeswari is one of the most powerful forms of the Goddess.", timings:"Morning: 6:00 AM - 1:00 PM | Evening: 3:00 PM - 9:00 PM"},
    {n:35, temple:"Gneelivaneswarar Temple", location:"Thiruppainjeeli", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Gneelivaneswarar", amman:"Sri Soundaranayaki", theertham:"Gneeli Theertham", sthalam:"Thiruppainjeeli", legend:"The Lord resides in a grove of Gneeli trees.", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple in a sacred grove."},
    {n:36, temple:"Matruravaradeeswarar Temple", location:"Thiruvasi", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Matruravaradeeswarar", amman:"Sri Mangalambigai", theertham:"Varada Theertham", sthalam:"Thiruvasi", legend:"The Lord grants boons like a mother (Matru Varada).", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple emphasizing maternal blessings."},
    {n:37, temple:"Maragathaleswarar Temple", location:"Ingoimalai", district:"Tiruchi", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Maragathaleswarar", amman:"Sri Maragathambigai", theertham:"Maragatha Theertham", sthalam:"Ingoimalai", legend:"The Lord appeared with emerald (Maragatha) radiance.", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Temple with emerald-like deity."},
    {n:38, temple:"Shivalokathyagar Temple", location:"Achalpuram", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Shivalokathyagar", amman:"Sri Sivalokanayaki", theertham:"Sivaloka Theertham", sthalam:"Achalpuram", legend:"The Lord is the king of Shiva Loka.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple representing Shiva's celestial abode."},
    {n:39, temple:"Thirumeniyazhagar Temple", location:"Makendrapalli", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Thirumeniyazhagar", amman:"Sri Kokilambigai", theertham:"Meni Theertham", sthalam:"Makendrapalli", legend:"The Lord has a beautiful divine form (Thiru Meni Azhagar).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple known for the beautiful form of the deity."},
    {n:40, temple:"Mullai Vananathar Temple", location:"Thirumullaivasal", district:"Cuddalore", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Mullai Vananathar", amman:"Sri Karpagambal", theertham:"Mullai Theertham", sthalam:"Thirumullaivasal", legend:"The Lord resides in a jasmine (Mullai) forest.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple surrounded by jasmine groves."},
    {n:41, temple:"Sundareswarar Temple", location:"Annapanpettai", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Sundareswarar", amman:"Sri Meenakshi", theertham:"Sundara Theertham", sthalam:"Annapanpettai", legend:"The Lord is the embodiment of beauty (Sundara).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple celebrating divine beauty."},
    {n:42, temple:"Saiyaveswarar Temple", location:"Saiyavanam", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Saiyaveswarar", amman:"Sri Mangalanayaki", theertham:"Saiya Theertham", sthalam:"Saiyavanam", legend:"The Lord resides in the Saiya forest.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple in a sacred forest setting."},
    {n:43, temple:"Pallavaneswarar Temple", location:"Poompukar", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Pallavaneswarar", amman:"Sri Soundaranayaki", theertham:"Kaveri Sangamam", sthalam:"Poompukar", legend:"The temple is located at ancient Poompuhar (Kaveripattinam), the legendary Chola port city mentioned in Silappatikaram.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple at the historic Chola port city, now partially submerged."},
    {n:44, temple:"Swetharanyeswarar Temple", location:"Thiruvenkadu", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Swetharanyeswarar", amman:"Sri Brahmavidyanayaki", theertham:"Swetha Theertham", sthalam:"Thiruvenkadu", legend:"Lord Shiva appeared in a white (Swetha) forest. This is the temple for planet Budha (Mercury).", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Budha Peyarchi", significance:"One of the Navagraha temples - for planet Mercury (Budha). Worshipping here improves intelligence and communication skills."},
    {n:45, temple:"Aranyeswarar Temple", location:"Thirukkattupalli", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Aranyeswarar", amman:"Sri Periyanayaki", theertham:"Aranya Theertham", sthalam:"Thirukkattupalli", legend:"The Lord of the forest (Aranya).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple in a forested area."},
    {n:46, temple:"Velladainathar Temple", location:"Thirukuruvaikavoor", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Velladainathar", amman:"Sri Periyanayaki", theertham:"Vellai Theertham", sthalam:"Thirukuruvaikavoor", legend:"The Lord wears white (Vellai) attire.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with white-clad deity imagery."},
    {n:47, temple:"Sattainathar Temple", location:"Sirkazhi", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Sattainathar (Brahmapureeswarar)", amman:"Sri Periyanayaki", theertham:"Brahma Theertham", sthalam:"Sirkazhi", legend:"Birthplace of Thirugnanasambandar, one of the four great Saiva saints. Lord Shiva and Parvati appeared as mendicants and fed the infant Sambandar with divine milk (Gnana Paal).", nayanmars:"Thirugnanasambandar (born here), Thirunavukkarasar, Sundarar", festivals:"Maha Shivaratri, Thirugnanasambandar Guru Puja", significance:"Sacred birthplace of Saint Thirugnanasambandar. One of the most important Shaiva pilgrimage sites."},
    {n:48, temple:"Sapthapureeswarar Temple", location:"Thirukolakka", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Sapthapureeswarar", amman:"Sri Soundaranayaki", theertham:"Saptha Theertham", sthalam:"Thirukolakka", legend:"Seven (Saptha) sacred sites are embodied here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple representing seven holy sites."},
    {n:49, temple:"Vaitheeswaran Temple", location:"Vaitheeswaran Kovil", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Vaitheeswaran (Divine Healer)", amman:"Sri Thaiyalnayaki", theertham:"Siddhamirtham", sthalam:"Vaitheeswaran Kovil", legend:"Lord Shiva cured the diseases of the Devas after the churning of the ocean. He is worshipped as the divine physician. This is the temple for planet Angaraka (Mars).", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Sevvai Peyarchi, Skanda Sashti", significance:"One of the Navagraha temples - for planet Mars (Sevvai/Angaraka). Famous for Nadi Jothidam (palm leaf astrology). Devotees bathe in Siddhamirtham tank for healing.", timings:"Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 9:00 PM"},
    {n:50, temple:"Kannayiramudaiyar Temple", location:"Kurumanakkudi", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Kannayiramudaiyar", amman:"Sri Periyanayaki", theertham:"Kannayira Theertham", sthalam:"Kurumanakkudi", legend:"The Lord with ten thousand (Kannayiram) forms.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple representing infinite forms of Shiva."},
    {n:51, temple:"Kadaimudinathar Temple", location:"Keelaiyur", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Kadaimudinathar", amman:"Sri Periyanayaki", theertham:"Kadai Theertham", sthalam:"Keelaiyur", legend:"The Lord appeared at the end (Kadai) of a sacred grove.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with unique location legend."},
    {n:52, temple:"Mahalatchumeeswarar Temple", location:"Thirunindriyur", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Mahalatchumeeswarar", amman:"Sri Mahalakshmi", theertham:"Lakshmi Theertham", sthalam:"Thirunindriyur", legend:"Goddess Mahalakshmi worshipped the Lord here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Lakshmi Pooja", significance:"Temple where both Shiva and Lakshmi are worshipped."},
    {n:53, temple:"Shivalokanathar Temple", location:"Thiruppunkoor", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Shivalokanathar", amman:"Sri Soundaranayaki", theertham:"Sivaloka Theertham", sthalam:"Thiruppunkoor", legend:"The Lord who grants entry to Shiva Loka.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple for attaining Shiva's abode."},
    {n:54, temple:"Somanathar Temple", location:"Needur", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Somanathar", amman:"Sri Periyanayaki", theertham:"Soma Theertham", sthalam:"Needur", legend:"The Moon (Soma) worshipped Lord Shiva here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Pournami", significance:"Temple associated with moon worship."},
    {n:55, temple:"Apatsakayeswarar Temple", location:"Ponnoor", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Apatsakayeswarar", amman:"Sri Periyanayaki", theertham:"Apat Theertham", sthalam:"Ponnoor", legend:"The Lord who removes dangers (Apadha).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple for protection from dangers."},
    {n:56, temple:"Kalyana Sundareswarar Temple", location:"Thiruvelvikudi", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Kalyana Sundareswarar", amman:"Sri Periyanayaki", theertham:"Kalyana Theertham", sthalam:"Thiruvelvikudi", legend:"The Lord performed his divine marriage (Kalyanam) here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Panguni Uthiram", significance:"Temple celebrating divine marriage."},
    {n:57, temple:"Airavatheswarar Temple", location:"Melathirumananjeri", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Airavatheswarar", amman:"Sri Periyanayaki", theertham:"Airavata Theertham", sthalam:"Melathirumananjeri", legend:"Airavata, the white elephant of Indra, worshipped the Lord here.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple with Airavata elephant worship legend."},
    {n:58, temple:"Uthvaganathar Temple", location:"Thirumananjeri", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Uthvaganathar", amman:"Sri Mangalambigai", theertham:"Uthvaga Theertham", sthalam:"Thirumananjeri", legend:"The Lord brings elevation (Uthvaga) to devotees.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple for spiritual elevation."},
    {n:59, temple:"Veerateswarar Temple", location:"Korukkai", district:"Mayiladuthurai", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Veerateswarar", amman:"Sri Periyanayaki", theertham:"Veera Theertham", sthalam:"Korukkai", legend:"The Lord is the brave hero (Veera).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple celebrating Shiva's heroic form."},
    {n:60, temple:"Kutram Poruthanathar Temple", location:"Thalainayiru", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Kutram Poruthanathar", amman:"Sri Periyanayaki", theertham:"Porutha Theertham", sthalam:"Thalainayiru", legend:"The Lord who forgives sins (Kutram Poruthal).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple for seeking forgiveness."},
    {n:61, temple:"Kunthaleeswarar Temple", location:"Thirukkurakka", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Kunthaleeswarar", amman:"Sri Periyanayaki", theertham:"Kunthala Theertham", sthalam:"Thirukkurakka", legend:"The Lord with beautiful hair (Kunthala).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple depicting Shiva with flowing hair."},
    {n:62, temple:"Manikkavannar Temple", location:"Thiruvalapputhur", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Manikkavannar", amman:"Sri Periyanayaki", theertham:"Manikka Theertham", sthalam:"Thiruvalapputhur", legend:"The Lord with gem-like (Manikka) complexion.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple known for the radiant deity."},
    {n:63, temple:"Neelakandeswarar Temple", location:"Iluppai Pattu", district:"Nagapattinam", nadu:"Chola Naadu I", naduType:"Vadakarai", deity:"Sri Neelakandeswarar", amman:"Sri Periyanayaki", theertham:"Neelakanta Theertham", sthalam:"Iluppai Pattu", legend:"The Lord with the blue throat (Neelakanta) from drinking poison.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple celebrating Shiva's sacrifice of drinking poison."},

    // ========================================
    // CHOLA NAADU II - 128 Thenkarai Temples (Partial - Key temples)
    // ========================================
    {n:64, temple:"Kadambavaaneswarar Temple", location:"Kulithalai", district:"Karur", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Kadambavaaneswarar", amman:"Sri Periyanayaki", theertham:"Kadamba Theertham", sthalam:"Kulithalai", legend:"The Lord resides in a Kadamba tree grove.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri", significance:"Temple surrounded by Kadamba trees."},
    {n:65, temple:"Rathinagireeswarar Temple", location:"Ayyar Malai", district:"Karur", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Rathinagireeswarar", amman:"Sri Periyanayaki", theertham:"Rathina Theertham", sthalam:"Ayyar Malai", legend:"The Lord resides on a gem-studded (Rathina) hill.", nayanmars:"Thirunavukkarasar", festivals:"Maha Shivaratri", significance:"Hill temple with gem-like radiance."},
    {n:66, temple:"Tharparanyeswarar Temple", location:"Thirunallaru", district:"Karaikal", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Tharparanyeswarar", amman:"Sri Bhogamartha Poonmulainayaki", theertham:"Nala Theertham", sthalam:"Thirunallaru", legend:"King Nala was cured of his misfortunes here. This is the temple for planet Sani (Saturn).", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Sani Peyarchi", significance:"One of the Navagraha temples - for planet Saturn (Sani). Most visited Sani temple. Devotees come to reduce Sani dosha effects.", timings:"Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 8:30 PM"},
    {n:67, temple:"Adhi Kumbeswarar Temple", location:"Kumbakonam", district:"Thanjavur", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Adhi Kumbeswarar", amman:"Sri Mangalambigai", theertham:"Mahamaham Tank", sthalam:"Kumbakonam", legend:"During the great deluge, Lord Shiva placed the pot (Kumbha) containing the nectar of immortality here. The Mahamaham festival every 12 years commemorates this.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Mahamaham (once in 12 years), Maha Shivaratri", significance:"One of the most sacred tanks in South India. Mahamaham festival attracts millions of devotees.", timings:"Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 9:00 PM"},
    {n:68, temple:"Nageswarar Temple", location:"Thirunageswaram", district:"Thanjavur", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Nageswarar", amman:"Sri Girigujambigai", theertham:"Naga Theertham", sthalam:"Thirunageswaram", legend:"The serpent king Adisesha worshipped Lord Shiva here. This is the temple for planet Rahu.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Rahu Kalam Pooja", significance:"One of the Navagraha temples - for Rahu. Worshipping here removes Rahu dosha and Naga dosha. Famous for Rahu Kalam poojas."},
    {n:69, temple:"Mahalingeswarar Temple", location:"Thiruvidaimarudur", district:"Thanjavur", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Mahalingeswarar", amman:"Sri Brihannayaki", theertham:"Maha Theertham", sthalam:"Thiruvidaimarudur", legend:"One of the largest Shiva temples with extensive inscriptions. The temple has unique architecture with multiple prakarams.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Maha Shivaratri, Panguni Uthiram", significance:"One of the Saptha Vidanga Sthalams. Massive temple complex with historical inscriptions."},
    {n:70, temple:"Thayumanavar Temple", location:"Trichy", district:"Trichy", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Thayumanavar (Matrubhuteswarar)", amman:"Sri Mattuvar Kuzhali", theertham:"Kaveri", sthalam:"Rockfort, Trichy", legend:"Lord Shiva appeared as a mother (Thaai) to feed a devotee. The temple is atop the famous Rockfort.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Panguni Uthiram", significance:"Historic Rockfort temple. Shiva worshipped as the Divine Mother. Stunning views of Trichy from the top.", timings:"Morning: 6:00 AM - 12:00 PM | Evening: 4:00 PM - 8:00 PM"},
    {n:71, temple:"Thyagarajar Temple", location:"Thiruvarur", district:"Thiruvarur", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Thyagarajar (Veedhividangan)", amman:"Sri Nilotpalambal", theertham:"Kamalalayam Tank", sthalam:"Thiruvarur", legend:"Lord Shiva danced here as Thyagaraja. This is one of the Saptha Vidanga Sthalams where Shiva performs different dance poses. The temple has the largest temple chariot in Asia.", nayanmars:"All Nayanmars have sung here, Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Thyagaraja Car Festival (April-May), Maha Shivaratri", significance:"One of the Saptha Vidanga Sthalams. Largest temple tank (Kamalalayam). Largest temple chariot. Birthplace of Saint Thyagaraja and music trinity.", timings:"Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 9:00 PM"},
    {n:72, temple:"Amirthakadeswarar Temple", location:"Thirukadaiyur", district:"Nagapattinam", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Amirthakadeswarar", amman:"Sri Abhirami", theertham:"Amrita Theertham", sthalam:"Thirukadaiyur", legend:"Lord Shiva defeated Yama (Death) here to save Markandeya. Famous for Abhirami Anthadi composed by Abhirami Bhattar. Couples perform Sashtiabdhapoorthi (60th birthday) here.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Abhirami Festival, Sashtiabdhapoorthi", significance:"Temple of immortality. Yama was defeated here. Most popular temple for 60th and 80th birthday celebrations.", timings:"Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 9:00 PM"},
    {n:73, temple:"Mayuranathar Temple", location:"Mayiladuthurai", district:"Mayiladuthurai", nadu:"Chola Naadu II", naduType:"Thenkarai", deity:"Sri Mayuranathar", amman:"Sri Abhayambigai", theertham:"Mayura Theertham", sthalam:"Mayiladuthurai", legend:"Goddess Parvati worshipped Shiva here in the form of a peacock (Mayil). Hence the town is called Mayiladuthurai (where the peacock worshipped).", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Aadi Pooram", significance:"Temple where Parvati worshipped as a peacock. Beautiful gopurams and sculptures."},

    // ========================================
    // THONDAI NAADU - 33 Temples (Key temples)
    // ========================================
    {n:74, temple:"Ekambareswarar Temple", location:"Kanchipuram", district:"Kanchipuram", nadu:"Thondai Naadu", naduType:"33 Temples", deity:"Sri Ekambareswarar (Prithvi Lingam)", amman:"Sri Kamakshi", theertham:"Sivaganga, Kampa River", sthalam:"Kanchipuram", legend:"Goddess Parvati made a Shiva Lingam from earth (Prithvi) under the mango tree and worshipped. The ancient mango tree is still present. One of the Pancha Bootha Sthalams representing Earth.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Maha Shivaratri, Panguni Brahmotsavam", significance:"One of the Pancha Bootha Sthalams - Earth (Prithvi). Ancient 3500-year-old mango tree. One of the largest temple complexes in India. Tallest gopuram in South India (59m).", timings:"Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 8:30 PM"},
    {n:75, temple:"Kalahasti Temple", location:"Srikalahasti", district:"Chittoor (AP)", nadu:"Thondai Naadu", naduType:"33 Temples", deity:"Sri Kalahasteeswara (Vayu Lingam)", amman:"Sri Gnanambigai", theertham:"Swarnamukhi River", sthalam:"Srikalahasti", legend:"A spider (Sri), serpent (Kala), and elephant (Hasti) worshipped the Lord here, giving the temple its name. One of the Pancha Bootha Sthalams representing Air (Vayu). The lamp inside never flickers despite the wind, demonstrating the air element.", nayanmars:"Sundarar", festivals:"Maha Shivaratri, Rahu Ketu Pooja", significance:"One of the Pancha Bootha Sthalams - Air (Vayu). Famous for Rahu-Ketu dosha remedies. The lamp flame proves the presence of Vayu.", timings:"Morning: 5:30 AM - 1:00 PM | Evening: 4:00 PM - 9:00 PM"},
    {n:76, temple:"Kapaleeswarar Temple", location:"Mylapore, Chennai", district:"Chennai", nadu:"Thondai Naadu", naduType:"33 Temples", deity:"Sri Kapaleeswarar", amman:"Sri Karpagambal", theertham:"Kapali Theertham", sthalam:"Mylapore", legend:"Goddess Parvati worshipped Lord Shiva here in the form of a peacock to get reunited with him after Daksha Yagna incident. The temple was rebuilt after Portuguese destruction.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Panguni Peruvizha (10-day festival in March-April), Arupathu Moovar Festival", significance:"Most famous temple in Chennai. Iconic Dravidian architecture. Major cultural and spiritual center of Mylapore.", timings:"Morning: 5:00 AM - 12:00 PM | Evening: 4:00 PM - 10:00 PM"},
    {n:77, temple:"Marundeeswarar Temple", location:"Thiruvanmiyur, Chennai", district:"Chennai", nadu:"Thondai Naadu", naduType:"33 Temples", deity:"Sri Marundeeswarar (Divine Healer)", amman:"Sri Tripurasundari", theertham:"Marundha Theertham", sthalam:"Thiruvanmiyur", legend:"Lord Shiva appeared as the divine physician here, curing ailments. The Vanni tree here is believed to have medicinal properties.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Arudra Darshan", significance:"Temple for healing diseases. The sacred Vanni tree is worshipped for health."},
    {n:78, temple:"Arunachaleswarar Temple", location:"Thiruvannamalai", district:"Thiruvannamalai", nadu:"Nadu Naadu", naduType:"22 Temples", deity:"Sri Arunachaleswarar (Agni Lingam)", amman:"Sri Unnamulai (Apitakuchambigai)", theertham:"Agni Theertham", sthalam:"Thiruvannamalai", legend:"Lord Shiva appeared as a column of fire (Jyoti) to settle the dispute between Brahma and Vishnu about who was supreme. The Annamalai hill itself is considered the Lingam. One of the Pancha Bootha Sthalams representing Fire.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar", festivals:"Karthigai Deepam (November-December) - Maha Deepam on hill, Maha Shivaratri, Girivalam (Pradakshina)", significance:"One of the Pancha Bootha Sthalams - Fire (Agni). Millions circumambulate the 14km Girivalam path. Karthigai Deepam is the most spectacular festival. Sri Ramana Maharshi's ashram is here.", timings:"Morning: 5:30 AM - 12:30 PM | Evening: 3:30 PM - 9:30 PM"},
    {n:79, temple:"Vadaranyeswarar Temple", location:"Thiruvalangadu", district:"Thiruvallur", nadu:"Thondai Naadu", naduType:"33 Temples", deity:"Sri Vadaranyeswarar", amman:"Sri Vadivudainayaki", theertham:"Vada Theertham", sthalam:"Thiruvalangadu", legend:"Lord Shiva performed the Urdhva Tandavam (cosmic dance with one leg raised) here after defeating the demon Kali in a dance competition. Rare bronze sculpture of Nataraja in Urdhva Tandava pose found here.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Arudra Darshan", significance:"Temple of Urdhva Tandavam. Famous bronze Nataraja. Important Chola period temple."},
    {n:80, temple:"Vedapureeswarar Temple", location:"Thiruverkadu", district:"Chennai", nadu:"Thondai Naadu", naduType:"33 Temples", deity:"Sri Vedapureeswarar", amman:"Sri Karumari Amman", theertham:"Veda Theertham", sthalam:"Thiruverkadu", legend:"The Vedas were taught here. Famous for Karumari Amman who is believed to cure diseases.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Aadi Festival for Karumari Amman", significance:"Temple associated with Vedic learning. Karumari Amman is extremely popular for healing."},

    // ========================================
    // PANDIYA NAADU - 14 Temples (Key temples)
    // ========================================
    {n:81, temple:"Meenakshi Sundareswarar Temple", location:"Madurai", district:"Madurai", nadu:"Pandiya Naadu", naduType:"14 Temples", deity:"Sri Sundareswarar", amman:"Sri Meenakshi", theertham:"Pottramarai Kulam (Golden Lotus Tank)", sthalam:"Madurai", legend:"Lord Shiva came to Madurai to marry Meenakshi, the warrior princess with fish-shaped eyes. The divine marriage (Thirukalyanam) is celebrated grandly. The temple is one of the finest examples of Dravidian architecture.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar, Sundarar, Manikkavasagar", festivals:"Chithirai Thiruvizha (April-May) - Divine Wedding, Float Festival, Maha Shivaratri", significance:"One of the most famous Hindu temples. 14 magnificent gopurams. Thousand Pillar Hall. Center of Tamil culture and literature.", timings:"Morning: 5:00 AM - 12:30 PM | Evening: 4:00 PM - 10:00 PM"},
    {n:82, temple:"Ramanathaswamy Temple", location:"Rameswaram", district:"Ramanathapuram", nadu:"Pandiya Naadu", naduType:"14 Temples", deity:"Sri Ramanathaswamy", amman:"Sri Parvathavardhini", theertham:"22 Sacred Wells (Theerthams)", sthalam:"Rameswaram", legend:"Lord Rama installed and worshipped the Shiva Lingam here to atone for the sin of killing Ravana (a Brahmin). One of the Char Dham pilgrimage sites. The temple has the longest corridor among all Hindu temples.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Arudra Darshan, Sethu Karai Festival", significance:"One of the Char Dham. Longest temple corridor (1220m). 22 sacred wells for ritual bathing. Installed by Lord Rama. Jyotirlinga.", timings:"Morning: 5:00 AM - 1:00 PM | Evening: 3:00 PM - 9:00 PM"},
    {n:83, temple:"Nellaiappar Temple", location:"Tirunelveli", district:"Tirunelveli", nadu:"Pandiya Naadu", naduType:"14 Temples", deity:"Sri Nellaiappar (Venuvananathar)", amman:"Sri Kanthimathi", theertham:"Thaamiraparani River", sthalam:"Tirunelveli", legend:"The Lord played the divine flute (Venu) in a bamboo grove here. Famous for the musical pillars that produce the seven swaras when struck.", nayanmars:"Thirugnanasambandar, Thirunavukkarasar", festivals:"Maha Shivaratri, Car Festival", significance:"Famous musical pillars. Twin temples of Nellaiappar and Kanthimathi. Pandyan architecture."},
    {n:84, temple:"Kutralanathar Temple", location:"Courtallam", district:"Tirunelveli", nadu:"Pandiya Naadu", naduType:"14 Temples", deity:"Sri Kutralanathar", amman:"Sri Kuzhalkanni", theertham:"Five Waterfalls", sthalam:"Courtallam", legend:"Lord Shiva resided here during his penance. The five waterfalls (Aintharuvi) have medicinal properties. Known as the 'Spa of South India'.", nayanmars:"Thirugnanasambandar, Sundarar", festivals:"Maha Shivaratri, Aadi Festival", significance:"Temple near the famous Courtallam waterfalls. Water has medicinal herbs. Popular health resort."},
    {n:85, temple:"Sathyakireeswarar Temple", location:"Thiruparankundram", district:"Madurai", nadu:"Pandiya Naadu", naduType:"14 Temples", deity:"Sri Sathyakireeswarar", amman:"Sri Avvai (Avinanchi)", theertham:"Saravana Poigai", sthalam:"Thiruparankundram", legend:"Lord Murugan married Devasena here. One of the Arupadai Veedu (Six Abodes of Murugan). Both Shiva and Murugan are worshipped. Rock-cut cave temple.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Vaikasi Visakam, Skanda Sashti", significance:"One of the Arupadai Veedu. Murugan's wedding site. Ancient rock-cut temple with Jain influences."},

    // ========================================
    // KONGU NAADU - 7 Temples (All)
    // ========================================
    {n:86, temple:"Avinashiappar Temple", location:"Avinashi", district:"Tiruppur", nadu:"Kongu Naadu", naduType:"7 Temples", deity:"Sri Avinashiappar", amman:"Sri Karunambigai", theertham:"Avinashi Theertham", sthalam:"Avinashi", legend:"A boy was brought back to life by Lord Shiva here, hence 'Avinashi' (Imperishable). Sundarar's friend Eyarkon Kalikkama was revived here.", nayanmars:"Sundarar", festivals:"Maha Shivaratri", significance:"Temple of immortality. Miracle of resurrection."},
    {n:87, temple:"Thirumuruganathar Temple", location:"Thirumuruganpundi", district:"Tiruppur", nadu:"Kongu Naadu", naduType:"7 Temples", deity:"Sri Thirumuruganathar", amman:"Sri Soundaranayaki", theertham:"Muruga Theertham", sthalam:"Thirumuruganpundi", legend:"Lord Murugan worshipped Shiva here.", nayanmars:"Sundarar", festivals:"Maha Shivaratri, Skanda Sashti", significance:"Temple where Murugan worshipped Shiva."},
    {n:88, temple:"Sangameswarar Temple", location:"Bhavani", district:"Erode", nadu:"Kongu Naadu", naduType:"7 Temples", deity:"Sri Sangameswarar", amman:"Sri Vedanayaki", theertham:"Triveni Sangamam", sthalam:"Bhavani (Kooduthurai)", legend:"Located at the confluence (Sangam) of three rivers - Kaveri, Bhavani, and Amutha. One of the most sacred river confluences in South India.", nayanmars:"Sundarar", festivals:"Maha Shivaratri, Aadi Amavasai", significance:"Sacred triveni sangam. Bathing here is considered equivalent to bathing at Triveni Sangam in Prayag."},
    {n:89, temple:"Arthanareeswarar Temple", location:"Thiruchengode", district:"Namakkal", nadu:"Kongu Naadu", naduType:"7 Temples", deity:"Sri Arthanareeswarar (Half Shiva-Half Parvati)", amman:"Part of the deity itself", theertham:"Artha Theertham", sthalam:"Thiruchengode", legend:"Lord Shiva appeared in his Ardhanareeshwara form (half-male, half-female) representing the union of Shiva and Shakti. Hill temple with stunning views.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Panguni Uthiram", significance:"Famous Ardhanareeshwara temple. Hill temple (Nagagiri). Unique form representing cosmic unity."},
    {n:90, temple:"Kodumudinathar Temple", location:"Kodumudi", district:"Erode", nadu:"Kongu Naadu", naduType:"7 Temples", deity:"Sri Kodumudinathar", amman:"Sri Panneerselvammai", theertham:"Kaveri", sthalam:"Kodumudi", legend:"Rare temple where Brahma, Vishnu, and Shiva have separate shrines side by side. Located on the banks of Kaveri.", nayanmars:"Thirugnanasambandar, Sundarar", festivals:"Maha Shivaratri", significance:"Unique Trimurthi temple. All three forms worshipped together."},
    {n:91, temple:"Kalyana Pasupatheeswara Temple", location:"Karur", district:"Karur", nadu:"Kongu Naadu", naduType:"7 Temples", deity:"Sri Kalyana Pasupatheeswarar", amman:"Sri Anthakujambigai", theertham:"Kalyana Theertham", sthalam:"Karur", legend:"Lord Shiva performed his divine marriage (Kalyanam) here. Famous for the grand wedding festival.", nayanmars:"Thirugnanasambandar", festivals:"Maha Shivaratri, Panguni Uthiram Wedding", significance:"Divine wedding celebration temple."},

    // ========================================
    // VADA NAADU - 5 Temples (Key temples)
    // ========================================
    {n:92, temple:"Mallikarjuna Temple", location:"Srisailam", district:"Kurnool (AP)", nadu:"Vada Naadu", naduType:"5 Temples", deity:"Sri Mallikarjuna Swamy", amman:"Sri Bhramaramba", theertham:"Krishna River, Patalaganga", sthalam:"Srisailam", legend:"One of the twelve Jyotirlingas. Lord Shiva and Parvati came here in search of their sons. The Shakti Peetha of Bhramaramba is here. Located in the Nallamala forest.", nayanmars:"Sung in Thevaram", festivals:"Maha Shivaratri, Ugadi, Brahmotsavam", significance:"Jyotirlinga and Shakti Peetha in same temple. Located on banks of Krishna. Ancient temple in forest setting."},
    {n:93, temple:"Kedareswarar Temple", location:"Kedarnath", district:"Uttarakhand", nadu:"Vada Naadu", naduType:"5 Temples", deity:"Sri Kedareswarar", amman:"Part of Himalayan tradition", theertham:"Mandakini River", sthalam:"Kedarnath", legend:"One of the twelve Jyotirlingas. Part of the Char Dham Yatra. Lord Shiva took the form of a bull here to escape the Pandavas. The hump of the bull is worshipped.", nayanmars:"Mentioned in Thevaram", festivals:"Maha Shivaratri (temple opens May-November)", significance:"Char Dham. Jyotirlinga. Highest of the 12 Jyotirlingas (3,583m). Adi Shankaracharya's Samadhi nearby."},

    // ========================================
    // EELA NAADU (Sri Lanka) - 2 Temples
    // ========================================
    {n:94, temple:"Koneswaram Temple", location:"Trincomalee", district:"Sri Lanka", nadu:"Eela Naadu", naduType:"2 Temples", deity:"Sri Koneswaram", amman:"Sri Mathumai Amman", theertham:"Indian Ocean", sthalam:"Trincomalee, Sri Lanka", legend:"One of the five ancient Ishwarams of Lord Shiva. Built on Swami Rock overlooking the Indian Ocean. Partially destroyed by Portuguese but rebuilt.", nayanmars:"Mentioned in ancient texts", festivals:"Maha Shivaratri, Thai Pongal", significance:"One of Pancha Ishwarams of Sri Lanka. Spectacular ocean views. Ancient temple with colonial history."},
    {n:95, temple:"Ketheeswaram Temple", location:"Mannar", district:"Sri Lanka", nadu:"Eela Naadu", naduType:"2 Temples", deity:"Sri Ketheeswaram", amman:"Sri Periyanayaki", theertham:"Sea Theertham", sthalam:"Mannar, Sri Lanka", legend:"One of the Pancha Ishwarams of Sri Lanka. Ancient temple that was destroyed and rebuilt multiple times.", nayanmars:"Mentioned in ancient texts", festivals:"Maha Shivaratri", significance:"One of Pancha Ishwarams. Historic temple with complex history."}
];

// Expose globally
window.paadalPetraSthalams = paadalPetraSthalams;

// ========================================
// Render function for 276 Paadal Petra Sthalams
// ========================================
(function() {
    const pps276Section = document.getElementById('pps276-list');
    if (!pps276Section) return;

    const pps276Tabs = document.querySelectorAll('.pps276-tab');
    const pps276SearchInput = document.getElementById('pps276SearchInput');
    const pps276NoResults = document.getElementById('pps276-no-results');

    let activeNadu = 'all';
    let pps276Query = '';

    function renderPPS276() {
        pps276Section.innerHTML = '';
        const query = pps276Query.toLowerCase().trim();

        const filtered = paadalPetraSthalams.filter(t => {
            const matchNadu = activeNadu === 'all' ||
                (activeNadu === 'chola-1' && t.nadu === 'Chola Naadu I') ||
                (activeNadu === 'chola-2' && t.nadu === 'Chola Naadu II') ||
                (activeNadu === 'thondai' && t.nadu === 'Thondai Naadu') ||
                (activeNadu === 'pandiya' && t.nadu === 'Pandiya Naadu') ||
                (activeNadu === 'kongu' && t.nadu === 'Kongu Naadu') ||
                (activeNadu === 'nadu' && t.nadu === 'Nadu Naadu') ||
                (activeNadu === 'other' && (t.nadu === 'Vada Naadu' || t.nadu === 'Eela Naadu'));

            const matchSearch = !query ||
                t.temple.toLowerCase().includes(query) ||
                t.location.toLowerCase().includes(query) ||
                t.district.toLowerCase().includes(query) ||
                t.deity.toLowerCase().includes(query) ||
                (t.amman && t.amman.toLowerCase().includes(query)) ||
                (t.legend && t.legend.toLowerCase().includes(query));

            return matchNadu && matchSearch;
        });

        if (filtered.length === 0) {
            if (pps276NoResults) pps276NoResults.style.display = 'block';
            return;
        }
        if (pps276NoResults) pps276NoResults.style.display = 'none';

        let currentNadu = '';
        filtered.forEach(t => {
            // Add Nadu header
            if (t.nadu !== currentNadu) {
                currentNadu = t.nadu;
                const header = document.createElement('div');
                header.className = 'pps276-region-header';
                header.innerHTML = `<h3>${currentNadu}</h3><span class="pps276-region-type">${t.naduType}</span>`;
                pps276Section.appendChild(header);
            }

            const item = document.createElement('div');
            item.className = 'dd108-item pps276-item';
            item.setAttribute('data-n', t.n);

            const photoUrl = window.getPaadalPetraPhoto ? window.getPaadalPetraPhoto(t.n) : (window.defaultTempleImage || '');

            item.innerHTML = `
                <div class="dd108-item-header">
                    <div class="dd108-item-photo pps276-photo">
                        <img src="${photoUrl}" alt="${t.temple}" loading="lazy" onerror="this.src='${window.defaultTempleImage || ''}'">
                    </div>
                    <span class="dd108-num pps276-num">${t.n}</span>
                    <div class="dd108-item-info">
                        <div class="dd108-item-tamil">${t.temple}</div>
                        <div class="dd108-item-temple">${t.deity}</div>
                        <div class="dd108-item-loc">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${t.location}, ${t.district}
                        </div>
                    </div>
                    <button class="dd108-expand" aria-label="Show details">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                </div>
                <div class="dd108-item-details">
                    <div class="dd108-deity-grid">
                        <div class="dd108-deity-item">
                            <span class="dd108-deity-label">Presiding Deity</span>
                            <span class="dd108-deity-value">${t.deity}</span>
                        </div>
                        <div class="dd108-deity-item">
                            <span class="dd108-deity-label">Amman (Consort)</span>
                            <span class="dd108-deity-value">${t.amman || 'Not specified'}</span>
                        </div>
                        <div class="dd108-deity-item">
                            <span class="dd108-deity-label">Theertham</span>
                            <span class="dd108-deity-value">${t.theertham || 'Temple Tank'}</span>
                        </div>
                        <div class="dd108-deity-item">
                            <span class="dd108-deity-label">Sthalam</span>
                            <span class="dd108-deity-value">${t.sthalam || t.location}</span>
                        </div>
                    </div>
                    <div class="dd108-legend">
                        <div class="dd108-legend-title">Sthala Puranam</div>
                        <div class="dd108-legend-text">${t.legend || 'Ancient temple glorified by the Nayanar saints in the Thevaram hymns.'}</div>
                    </div>
                    <div class="dd108-detail-section">
                        <div class="dd108-detail-row">
                            <span class="dd108-detail-label">Nayanmars</span>
                            <span class="dd108-detail-value">${t.nayanmars || 'Thirugnanasambandar, Thirunavukkarasar, Sundarar'}</span>
                        </div>
                    </div>
                    <div class="dd108-detail-section">
                        <div class="dd108-detail-row">
                            <span class="dd108-detail-label">Festivals</span>
                            <span class="dd108-detail-value">${t.festivals || 'Maha Shivaratri, Arudra Darshan'}</span>
                        </div>
                    </div>
                    <div class="dd108-detail-section">
                        <div class="dd108-detail-row">
                            <span class="dd108-detail-label">Significance</span>
                            <span class="dd108-detail-value">${t.significance || 'One of the 276 Paadal Petra Sthalams glorified in the Thevaram.'}</span>
                        </div>
                    </div>
                    ${t.timings ? `
                    <div class="dd108-detail-section dd108-timings-section">
                        <div class="dd108-timings-header">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            Temple Timings
                        </div>
                        <div class="dd108-detail-row">
                            <span class="dd108-detail-label">Timings</span>
                            <span class="dd108-detail-value">${t.timings}</span>
                        </div>
                    </div>
                    ` : ''}
                    <div class="dd108-map-actions">
                        <a href="https://www.google.com/maps/search/${encodeURIComponent(t.temple + ', ' + t.location + ', ' + t.district)}" target="_blank" rel="noopener" class="dd108-map-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            View on Google Maps
                        </a>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(t.temple + ', ' + t.location)}" target="_blank" rel="noopener" class="dd108-directions-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
                            Get Directions
                        </a>
                    </div>
                </div>
            `;

            // Toggle expand
            const header = item.querySelector('.dd108-item-header');
            header.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });

            pps276Section.appendChild(item);
        });
    }

    // Nadu tabs
    if (pps276Tabs) {
        pps276Tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                pps276Tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeNadu = tab.dataset.nadu;
                renderPPS276();
            });
        });
    }

    // Search
    if (pps276SearchInput) {
        let pps276SearchTimeout;
        pps276SearchInput.addEventListener('input', (e) => {
            clearTimeout(pps276SearchTimeout);
            pps276SearchTimeout = setTimeout(() => {
                pps276Query = e.target.value;
                renderPPS276();
            }, 200);
        });
    }

    // Initial render
    renderPPS276();
})();
