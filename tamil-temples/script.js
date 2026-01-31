// ========================================
// Temples of Tamil Nadu - JavaScript
// ========================================

// Temple Data
const temples = [
    {
        id: 1,
        name: "Brihadeeswarar Temple",
        location: "Thanjavur",
        district: "Thanjavur",
        deity: "Lord Shiva",
        dynasty: "Chola",
        builder: "Raja Raja Chola I",
        year: "1010 CE",
        categories: ["unesco", "chola", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Thanjavur_Brihadeeswara_Temple.jpg/1280px-Thanjavur_Brihadeeswara_Temple.jpg",
        shortDesc: "The crown jewel of Chola architecture. This magnificent temple, also known as the Big Temple, features a 66-meter vimana tower that was the tallest structure in India for centuries.",
        fullDesc: "Built by Raja Raja Chola I between 1003 and 1010 AD, the Brihadeeswarar Temple (also called Rajarajeswaram) is a brilliant testimony to the heights achieved by the Cholas in temple architecture. The temple is dedicated to Lord Shiva and stands as the greatest achievement of the Chola dynasty.\n\nThe massive vimana (temple tower) rises to 66 meters (216 feet), making it one of the tallest temple towers in the world. The capstone (Kumbam) on top weighs approximately 80 tonnes and was reportedly moved to the top using a ramp that started 6 km away. The main hall has a massive Nandi (bull) carved from a single rock, measuring about 16 feet long and 13 feet high.\n\nThe temple walls feature some of the finest Chola murals and over 250 lingams around the circumambulatory passage. The entire structure is built from granite, and remarkably, the vimana casts no shadow at noon.",
        highlights: [
            "UNESCO World Heritage Site since 1987",
            "66-meter vimana — among the tallest in the world",
            "80-tonne capstone placed without modern machinery",
            "Massive Nandi carved from a single rock",
            "Chola bronze sculptures and murals",
            "The shadow of the vimana reportedly does not fall on the ground at noon"
        ]
    },
    {
        id: 2,
        name: "Meenakshi Amman Temple",
        location: "Madurai",
        district: "Madurai",
        deity: "Goddess Meenakshi & Lord Sundareswarar",
        dynasty: "Nayak",
        builder: "Vishwanatha Nayak (rebuilt)",
        year: "17th century (ancient origins)",
        categories: ["major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Madurai_Meenakshi_Amman_Temple_North_Tower.jpg/1280px-Madurai_Meenakshi_Amman_Temple_North_Tower.jpg",
        shortDesc: "An iconic masterpiece of Dravidian architecture in the heart of Madurai, with 14 magnificent gopurams covered in thousands of colorful sculptures.",
        fullDesc: "The Meenakshi Amman Temple is a historic Hindu temple located on the southern bank of the Vaigai River in Madurai. It is dedicated to Goddess Meenakshi (a form of Parvati) and her consort Lord Sundareswarar (a form of Shiva). The temple is the heart and lifeline of Madurai and has been a significant symbol of Tamil culture for centuries.\n\nThe current structure was largely rebuilt by Vishwanatha Nayak in the 17th century after the original was destroyed during Malik Kafur's invasion. The temple complex covers 14 acres and has 14 gopurams (gateway towers), the tallest being the southern tower at 170 feet. The gopurams are adorned with thousands of mythological figures painted in vivid colors.\n\nThe temple contains the famous Hall of Thousand Pillars (actually 985 pillars), each exquisitely carved. The Ashta Shakti Mandapam, Meenakshi Nayakkar Mandapam, and the Golden Lotus Tank are other notable features. The temple attracts 15,000 visitors daily and about 25,000 on Fridays.",
        highlights: [
            "14 magnificent gopurams with colorful sculptures",
            "Thousand Pillar Hall with 985 carved pillars",
            "Golden Lotus Tank (Porthamarai Kulam)",
            "Annual Chithirai Festival attracts over a million visitors",
            "Musical pillars that produce different notes when struck",
            "Houses over 33,000 sculptures"
        ]
    },
    {
        id: 3,
        name: "Shore Temple",
        location: "Mahabalipuram",
        district: "Kanchipuram",
        deity: "Lord Shiva & Lord Vishnu",
        dynasty: "Pallava",
        builder: "Narasimhavarman II (Rajasimha)",
        year: "8th century CE",
        categories: ["unesco", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shore_Temple_01.jpg/1280px-Shore_Temple_01.jpg",
        shortDesc: "One of the oldest structural stone temples of South India, standing majestically on the shores of the Bay of Bengal at Mahabalipuram.",
        fullDesc: "The Shore Temple is a complex of elegant shrines built around 700 CE, standing on the shore of the Bay of Bengal at Mahabalipuram. It is considered the finest early example of medieval southern Indian temple architecture and one of the oldest structural (versus rock-cut) stone temples in South India.\n\nBuilt during the reign of Pallava king Narasimhavarman II (also known as Rajasimha), the complex consists of three shrines. Two shrines are dedicated to Lord Shiva and face east and west respectively, while a smaller shrine between them is dedicated to a reclining Vishnu. The architectural style features pyramidal kutina-type towers with stepped stories topped by cupolas and finials.\n\nThe temple is believed to have been part of the legendary Seven Pagodas — a complex of seven temples, most now submerged under the sea. The 2004 tsunami temporarily exposed the ruins of an ancient temple nearby, fueling this theory. The outer walls and boundary walls feature extensive sculptures of Nandi bulls.",
        highlights: [
            "UNESCO World Heritage Site since 1984",
            "One of the oldest structural stone temples in South India",
            "Part of the legendary Seven Pagodas complex",
            "2004 tsunami revealed submerged temple ruins nearby",
            "Features both Shaiva and Vaishnava shrines",
            "Built with blocks of granite, facing the Bay of Bengal"
        ]
    },
    {
        id: 4,
        name: "Gangaikonda Cholapuram Temple",
        location: "Gangaikonda Cholapuram",
        district: "Ariyalur",
        deity: "Lord Shiva",
        dynasty: "Chola",
        builder: "Rajendra Chola I",
        year: "1035 CE",
        categories: ["unesco", "chola"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Gangaikonda_cholapuram.jpg/1280px-Gangaikonda_cholapuram.jpg",
        shortDesc: "Built by Rajendra Chola I to commemorate his victorious march to the Ganges. The temple served as the capital of the Chola dynasty for over 250 years.",
        fullDesc: "The Gangaikonda Cholapuram Temple was built by Rajendra Chola I in 1035 CE to commemorate his military expedition to the Ganges in North India. The temple was the centerpiece of his new capital city, Gangaikonda Cholapuram (City of the Chola who conquered the Ganges), which served as the Chola capital for over 250 years.\n\nThe main temple tower (vimana) stands 55 meters tall with a distinctive convex curvature, unlike the straight-sided tower of the Thanjavur temple. The presiding deity is represented as a 13-foot tall Shiva Lingam. The temple complex features some of the finest Chola sculptures, including a remarkable Nataraja, Saraswati, Chandesanugraha, and Ardhanarisvara.\n\nThe temple complex originally included a massive artificial lake (Cholagangam) built to replicate the Ganges, with water brought from the actual river. Rajendra's vision was to create a monument that rivaled his father's achievement at Thanjavur while celebrating his northern conquests.",
        highlights: [
            "UNESCO World Heritage Site (Great Living Chola Temples)",
            "55-meter vimana with distinctive convex curvature",
            "13-foot tall Shiva Lingam",
            "Some of the finest Chola bronze and stone sculptures",
            "Capital of the Chola empire for 250+ years",
            "Originally featured a massive artificial lake (Cholagangam)"
        ]
    },
    {
        id: 5,
        name: "Airavatesvara Temple",
        location: "Darasuram, Kumbakonam",
        district: "Thanjavur",
        deity: "Lord Shiva (Airavatesvara)",
        dynasty: "Chola",
        builder: "Rajaraja Chola II",
        year: "12th century CE",
        categories: ["unesco", "chola"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Darasuram_Temple_3.jpg/1280px-Darasuram_Temple_3.jpg",
        shortDesc: "Named after Airavata, Lord Indra's white elephant. Famous for its musical steps that produce the seven musical notes and its chariot-shaped mandapam.",
        fullDesc: "The Airavatesvara Temple at Darasuram near Kumbakonam was built by Chola emperor Rajaraja II in the 12th century CE. The temple is named after Airavata, the white elephant of Lord Indra. According to legend, Airavata was cursed by Sage Durvasa to lose his white colour, and was freed from the curse after praying to Lord Shiva at this location and bathing in the temple tank.\n\nThe temple's vimana stands 85 feet high and the front mandapam is designed in the form of a huge chariot drawn by horses — a stunning architectural innovation. The temple incorporates shrines and sculptures of major Vedic and Puranic deities including Indra, Agni, Varuna, Vayu, Brahma, Surya, Vishnu, Durga, Saraswati, Lakshmi, and the Saptamatrikas.\n\nOne of the most remarkable features is the 'musical steps' — seven stone steps leading to the altar that produce the seven musical notes (sa-ri-ga-ma-pa-da-ni) when struck. The temple also features an optical illusion sculpture of an elephant and bull sharing a single head, where the animal appears different depending on your viewing angle.",
        highlights: [
            "UNESCO World Heritage Site (Great Living Chola Temples)",
            "Chariot-shaped mandapam drawn by stone horses",
            "Musical steps producing seven musical notes",
            "Elephant-bull optical illusion sculpture",
            "85-foot vimana tower",
            "Under care of Archaeological Survey of India since 1954"
        ]
    },
    {
        id: 6,
        name: "Ekambareswarar Temple",
        location: "Kanchipuram",
        district: "Kanchipuram",
        deity: "Lord Shiva (Prithvi Lingam)",
        dynasty: "Pallava / Chola / Vijayanagara",
        builder: "Multiple dynasties",
        year: "c. 600 CE onwards",
        categories: ["pancha", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Front_view_of_Ekambareshwarar_temple.jpg/800px-Front_view_of_Ekambareshwarar_temple.jpg",
        shortDesc: "Representing the Earth element among the Pancha Bootha Stalams. Houses a sacred mango tree believed to be over 3,500 years old with four branches bearing four types of fruit.",
        fullDesc: "The Ekambareswarar Temple in Kanchipuram is one of the five Pancha Bootha Stalam temples, representing the element of Earth (Prithvi). The temple is spread over 25 acres, making it one of the largest temple complexes in India. The main tower (Rajagopuram) stands 59 meters (194 feet) tall and was built by the Vijayanagara kings.\n\nThe temple houses the Prithvi Lingam, which is said to be made of sand/earth, symbolizing the earth element. One of its most sacred features is an ancient mango tree (Sthala Vriksham) believed to be over 3,500 years old. The tree has four branches, each said to bear mangoes of different tastes, representing the four Vedas.\n\nThe temple complex contains a thousand-pillar hall built during the Vijayanagara period, with exquisitely carved pillars depicting various mythological scenes. The temple has been mentioned in the 7th century Tevaram hymns by the Nayanar saints and is classified as a Paadal Petra Sthalam.",
        highlights: [
            "Pancha Bootha Stalam — Earth (Prithvi) element",
            "3,500+ year old sacred mango tree with four types of fruit",
            "25-acre temple complex, one of the largest in India",
            "59-meter Rajagopuram (Vijayanagara period)",
            "Thousand-pillar hall with mythological carvings",
            "Mentioned in 7th century Tevaram hymns"
        ]
    },
    {
        id: 7,
        name: "Jambukeswarar Temple",
        location: "Thiruvanaikaval, Trichy",
        district: "Tiruchirappalli",
        deity: "Lord Shiva (Appu Lingam)",
        dynasty: "Early Chola / Hoysala / Vijayanagara",
        builder: "Kocengannan Chola",
        year: "c. 1st-2nd century CE",
        categories: ["pancha", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Thiruvanaikaval_JambukeswaraTemple_Thiruchirapalli.jpg/1280px-Thiruvanaikaval_JambukeswaraTemple_Thiruchirapalli.jpg",
        shortDesc: "Representing the Water element. A perennial underground spring flows beneath the Lingam, keeping it perpetually submerged — symbolizing the water element.",
        fullDesc: "The Jambukeswarar Temple (also Thiruvanaikaval Temple) in Trichy represents the Water element (Appu) among the Pancha Bootha Stalams. It is one of the largest temple complexes in Tamil Nadu with five concentric enclosures (prakarams) and seven gopurams.\n\nThe most remarkable feature is the Appu Lingam — a lingam in the inner sanctum with a perpetual stream of water flowing from an underground spring, keeping it always submerged. This naturally occurring phenomenon perfectly symbolizes the water element. The inner sanctum remains slightly flooded despite continuous pumping, a phenomenon that has defied modern explanation.\n\nAccording to legend, Goddess Parvati (in the form of Akilandeswari) worshipped Lord Shiva here in the form of a water lingam under a Jambu (rose apple) tree on the banks of the river Kaveri. The temple also houses the Akilandeswari shrine, considered one of the most powerful Shakti temples in South India.",
        highlights: [
            "Pancha Bootha Stalam — Water (Appu) element",
            "Perpetual underground spring keeps Lingam submerged",
            "Five concentric enclosures and seven gopurams",
            "Akilandeswari shrine — powerful Shakti temple",
            "One of the largest temple complexes in Tamil Nadu",
            "Legend of Goddess Parvati worshipping under Jambu tree"
        ]
    },
    {
        id: 8,
        name: "Arunachaleshwarar Temple",
        location: "Thiruvannamalai",
        district: "Tiruvannamalai",
        deity: "Lord Shiva (Agni Lingam)",
        dynasty: "Chola / Vijayanagara / Hoysala",
        builder: "Multiple dynasties",
        year: "9th century CE onwards",
        categories: ["pancha", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Tiruvannamalai_arunachaleswarar.jpg/1280px-Tiruvannamalai_arunachaleswarar.jpg",
        shortDesc: "Representing the Fire element, spread over 25 acres at the foot of the sacred Annamalai hill. The annual Karthigai Deepam festival lights a massive beacon visible for miles.",
        fullDesc: "The Arunachaleshwarar Temple at the foot of Annamalai hill in Thiruvannamalai represents the Fire element (Agni) among the Pancha Bootha Stalams. Spread over 25 acres, it is one of the largest temples in India with four towering gopurams.\n\nThe temple is dedicated to Lord Shiva as Arunachaleshwarar (Lord of the Holy Mountain). The sacred Annamalai Hill itself is considered a manifestation of Shiva as a column of fire. According to legend, Brahma and Vishnu once argued about who was superior, and Shiva appeared as an infinite column of fire, challenging them to find its ends — which neither could.\n\nThe annual Karthigai Deepam festival (November-December) is the temple's most spectacular event. A massive ghee lamp (Maha Deepam) is lit atop the 2,668-foot Annamalai Hill, visible for miles around. Millions of devotees participate in this event. The Girivalam (circumambulation of the hill) path is 14 km and is walked by hundreds of thousands of devotees every full moon.",
        highlights: [
            "Pancha Bootha Stalam — Fire (Agni) element",
            "25-acre complex, one of India's largest temples",
            "Annual Karthigai Deepam — massive beacon atop the hill",
            "Sacred Annamalai Hill — 2,668 feet, considered Shiva himself",
            "14 km Girivalam path walked by devotees on full moon nights",
            "Associated with Ramana Maharshi's spiritual teachings"
        ]
    },
    {
        id: 9,
        name: "Thillai Nataraja Temple",
        location: "Chidambaram",
        district: "Cuddalore",
        deity: "Lord Shiva as Nataraja",
        dynasty: "Chola / Pallava",
        builder: "Various Chola kings",
        year: "10th century CE (current form)",
        categories: ["pancha", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Chidambaram_temple_Rajagopuram.jpg/800px-Chidambaram_temple_Rajagopuram.jpg",
        shortDesc: "Representing the Ether/Space element. The only Pancha Bootha temple where Shiva is worshipped as Nataraja (cosmic dancer) rather than as a Lingam.",
        fullDesc: "The Thillai Nataraja Temple in Chidambaram represents the Ether/Space (Akasha) element among the Pancha Bootha Stalams. It is unique among these five temples because Lord Shiva is worshipped here not as a Lingam but as Nataraja — the cosmic dancer performing the Ananda Tandava (dance of bliss).\n\nThe temple is famous for the 'Chidambara Rahasyam' (Secret of Chidambaram) — a curtain within the inner sanctum that, when drawn, reveals an empty space adorned with golden vilva leaves, symbolizing the formless nature of God and the element of ether/space. This philosophical concept represents one of the most profound ideas in Hindu theology.\n\nThe temple complex covers 40 acres with four gopurams, each depicting 108 classical dance poses (Bharatanatyam karanas) from the Natya Shastra. The famous Nataraja bronze icon, depicting Shiva's cosmic dance within a circle of flames, originates from this temple and has become one of the most recognized symbols of Indian art worldwide.",
        highlights: [
            "Pancha Bootha Stalam — Ether/Space (Akasha) element",
            "Shiva worshipped as Nataraja (cosmic dancer), not a Lingam",
            "Chidambara Rahasyam — the philosophical 'secret' of empty space",
            "108 Bharatanatyam dance poses carved on gopurams",
            "40-acre complex managed by Dikshitar priests",
            "Origin of the world-famous Nataraja bronze iconography"
        ]
    },
    {
        id: 10,
        name: "Sri Ranganathaswamy Temple",
        location: "Srirangam, Trichy",
        district: "Tiruchirappalli",
        deity: "Lord Ranganatha (Vishnu)",
        dynasty: "Multiple (Chola, Pandya, Hoysala, Vijayanagara)",
        builder: "Multiple dynasties over centuries",
        year: "10th century CE onwards (ancient origins)",
        categories: ["divyadesam", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Srirangam_Temple.jpg/1280px-Srirangam_Temple.jpg",
        shortDesc: "The foremost of all 108 Divya Desams and the largest functioning Hindu temple in the world, spread over 156 acres with 21 gopurams and 7 prakarams (enclosures).",
        fullDesc: "Sri Ranganathaswamy Temple at Srirangam is the largest functioning Hindu temple in the world, covering 156 acres (631,000 sq meters) with a perimeter of 4 km. It is the foremost among all 108 Divya Desams and is revered as 'Bhuloka Vaikuntham' (heaven on earth).\n\nThe temple has seven concentric enclosures (prakarams) with 21 gopurams. The outermost enclosure is so large that it encompasses an entire town within its walls, including houses, shops, and streets. The main deity, Lord Ranganatha, is depicted in a reclining posture on the serpent Adisesha, facing south — an unusual orientation.\n\nAll twelve Alvars have sung in praise of this temple, making it the only Divya Desam with this distinction. The temple's history spans over 2,000 years, with contributions from the Chola, Pandya, Hoysala, and Vijayanagara dynasties. The 21-day Vaikunta Ekadasi festival in December-January attracts over a million devotees who come to pass through the 'Paramapada Vasal' (gates to heaven), which is opened only during this festival.",
        highlights: [
            "Foremost of all 108 Divya Desams",
            "Largest functioning Hindu temple in the world (156 acres)",
            "7 concentric enclosures and 21 gopurams",
            "Only Divya Desam praised by all twelve Alvars",
            "Vaikunta Ekadasi festival — over a million devotees",
            "Town exists within the temple's outer walls"
        ]
    },
    {
        id: 11,
        name: "Suryanar Kovil",
        location: "Suryanar Kovil, near Kumbakonam",
        district: "Thanjavur",
        deity: "Lord Shiva / Surya (Sun)",
        dynasty: "Chola",
        builder: "Kulottunga Chola I",
        year: "11th century CE (1060-1118 AD)",
        categories: ["navagraha"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Suryanar_Kovil_Thanjavur_DSCN0485.jpg/1280px-Suryanar_Kovil_Thanjavur_DSCN0485.jpg",
        shortDesc: "The Navagraha temple dedicated to Surya (Sun), the most important of the nine planetary deities. Built during the reign of Kulottunga Chola in the 11th century.",
        fullDesc: "Suryanar Kovil is the Navagraha temple dedicated to Surya (the Sun God), the chief among the nine planetary deities. Located west of Mayiladuthurai and east of Kumbakonam, about 2 km from Aduthurai, this temple was built during the reign of Kulottunga Choladeva (AD 1060-1118).\n\nWhat makes this temple unique is that all nine planetary deities (Navagrahas) have independent shrines within the complex, though Surya is the presiding deity. The sanctum houses a granite image of Surya driving a chariot pulled by seven horses, representing the seven days of the week and the seven colors of the spectrum.\n\nDevotees visit this temple seeking relief from the adverse effects of the Sun in their horoscope. The temple is considered especially auspicious for those undergoing Surya Dasha or facing Sun-related afflictions. It is also one of the Paadal Petra Stalams, having been glorified in the Tevaram hymns of the Nayanar saints.",
        highlights: [
            "Navagraha temple for Surya (Sun God)",
            "All nine planetary deities have independent shrines",
            "Built during Kulottunga Chola I's reign (11th century)",
            "Surya depicted driving a chariot with seven horses",
            "Paadal Petra Stalam glorified in Tevaram",
            "Considered auspicious for Sun-related horoscope remedies"
        ]
    },
    {
        id: 12,
        name: "Vaitheeswaran Kovil",
        location: "Vaitheeswaran Kovil, near Mayiladuthurai",
        district: "Nagapattinam",
        deity: "Lord Shiva / Angaraka (Mars)",
        dynasty: "Chola",
        builder: "Chola rulers",
        year: "7th century CE onwards",
        categories: ["navagraha"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vaitheeswaran_koil%2C_nagapattinam%2C_Tamil_Nadu.jpg/800px-Vaitheeswaran_koil%2C_nagapattinam%2C_Tamil_Nadu.jpg",
        shortDesc: "The Navagraha temple for Mars (Angaraka/Mangala), also famous as the 'Temple of Healing' where Lord Shiva is worshipped as the divine physician.",
        fullDesc: "Vaitheeswaran Kovil (Temple of the God of Healing) is the Navagraha temple dedicated to Angaraka (Mars). Located 14 km from Mayiladuthurai on the Sirkazhi road, this temple is unique because Lord Shiva is worshipped here as Vaidyanatha — the divine physician and healer.\n\nThe temple is famous for Nadi astrology (Nadi Jyothidam), an ancient form of astrology where future predictions are read from palm leaf manuscripts said to have been written by sages thousands of years ago. Hundreds of Nadi readers have their establishments around the temple.\n\nAccording to legend, Mars (Angaraka) was afflicted with leprosy and worshipped Lord Shiva here, who cured him. The temple tank (Siddhamirtham) is believed to have healing properties. Devotees with health issues bathe in this tank before offering prayers. The temple is one of the Paadal Petra Stalams, praised in the Tevaram hymns.",
        highlights: [
            "Navagraha temple for Angaraka (Mars)",
            "Lord Shiva worshipped as divine physician (Vaidyanatha)",
            "Famous center for Nadi Astrology (palm leaf readings)",
            "Healing temple tank (Siddhamirtham)",
            "Legend of Mars being cured of leprosy here",
            "One of the Paadal Petra Stalams"
        ]
    },
    {
        id: 13,
        name: "Naganathar Temple",
        location: "Tirunageswaram, near Kumbakonam",
        district: "Thanjavur",
        deity: "Lord Shiva / Rahu",
        dynasty: "Chola",
        builder: "Chola rulers",
        year: "9th-12th century CE",
        categories: ["navagraha"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/ThirunageswaramNaganathaswamyTemple1.JPG/800px-ThirunageswaramNaganathaswamyTemple1.JPG",
        shortDesc: "The Navagraha temple for Rahu, located in Tirunageswaram village on the outskirts of Kumbakonam. Known for the Rahu Kala Puja performed during inauspicious hours.",
        fullDesc: "The Naganathar Temple (also known as Rahu Stalam) in Tirunageswaram is the Navagraha temple dedicated to Rahu, one of the shadow planets in Hindu astrology. Located on the outskirts of Kumbakonam, the temple is a Shiva temple with Naganathar (Lord of Serpents) as the presiding deity.\n\nThe temple is particularly known for its Rahu Kala Puja — a special worship performed during Rahu Kalam (the inauspicious period of the day associated with Rahu). Devotees believe performing prayers during this specific time at this temple can mitigate the negative effects of Rahu in their horoscope.\n\nThe temple features unique sculptures of serpent deities and hosts special pujas for those affected by Sarpa Dosha (serpent afflictions) and Rahu-related problems. Milk abhishekam is performed to the Rahu deity, and it is believed that the milk changes color during the ritual.",
        highlights: [
            "Navagraha temple for Rahu (shadow planet)",
            "Famous for Rahu Kala Puja during inauspicious hours",
            "Milk abhishekam said to change color",
            "Remedies for Sarpa Dosha and Rahu afflictions",
            "Located near Kumbakonam in the Navagraha belt",
            "Unique serpent deity sculptures"
        ]
    },
    {
        id: 14,
        name: "Saniswarar Temple",
        location: "Tirunallar",
        district: "Karaikal (Puducherry)",
        deity: "Lord Shiva / Shani (Saturn)",
        dynasty: "Chola",
        builder: "Chola rulers",
        year: "9th-12th century CE",
        categories: ["navagraha"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/ThirunallarDharbaranyeswarar1.jpg/800px-ThirunallarDharbaranyeswarar1.jpg",
        shortDesc: "The Navagraha temple for Shani (Saturn). One of the most visited Navagraha temples, famous for Shani Peyarchi when Saturn transits between zodiac signs.",
        fullDesc: "The Saniswarar Temple (Dharbaranyeswarar Temple) at Tirunallar is the Navagraha temple dedicated to Shani (Saturn). Located 33 km south of Mayiladuthurai in the Karaikal district, it is one of the most visited Navagraha temples due to the significant influence attributed to Saturn in Hindu astrology.\n\nSaturn is feared as the most powerful malefic planet, and devotees flock here seeking relief from the 7.5-year Sade Sati period (Saturn's transit through adjacent houses to one's moon sign). The temple is especially crowded during Shani Peyarchi (Saturn's transit between zodiac signs), which occurs approximately every 2.5 years.\n\nAccording to legend, even King Nala of the Mahabharata suffered under Saturn's influence and was relieved only after worshipping at this temple. The presiding deity is Lord Shiva as Dharbaranyeswarar, and the Navagraha shrine with Saturn as the primary deity draws enormous crowds on Saturdays.",
        highlights: [
            "Navagraha temple for Shani (Saturn)",
            "Most visited Navagraha temple",
            "Relief from Sade Sati (7.5-year Saturn transit)",
            "Shani Peyarchi draws massive crowds",
            "Legend of King Nala's deliverance from Saturn",
            "Especially crowded on Saturdays"
        ]
    },
    {
        id: 15,
        name: "Ramanathaswamy Temple",
        location: "Rameswaram",
        district: "Ramanathapuram",
        deity: "Lord Shiva",
        dynasty: "Pandya / Setupathi",
        builder: "Various rulers over centuries",
        year: "12th century CE onwards",
        categories: ["major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Rameswaram_temple_%281%29.jpg/1280px-Rameswaram_temple_%281%29.jpg",
        shortDesc: "One of the twelve Jyotirlinga temples and the southernmost of the Char Dham pilgrimage. Famous for its 1,212-meter-long corridor — the longest in any Hindu temple.",
        fullDesc: "The Ramanathaswamy Temple on Rameswaram Island is one of the most sacred temples in Hinduism. It is both one of the twelve Jyotirlingas (sacred abodes of Shiva) and the southernmost of the four Char Dham pilgrimage sites.\n\nAccording to the Ramayana, Lord Rama worshipped Lord Shiva here to atone for the sin of killing Ravana (a Brahmin). He sent Hanuman to bring a Lingam from Kailash, but when Hanuman was delayed, Sita made a lingam from sand (the Ramalingam). When Hanuman returned with the lingam from Kailash (Vishwalingam), Rama installed both, with the Vishwalingam being worshipped first.\n\nThe temple boasts the longest corridor of any Hindu temple in India, stretching 1,212 meters with 1,212 intricately carved pillars. The corridors are adorned with fine Nayak-period paintings. The temple also has 22 sacred wells (theerthams) within its complex, each believed to have unique healing and spiritual properties. Pilgrims bathe in all 22 wells before entering the sanctum.",
        highlights: [
            "One of the 12 Jyotirlinga temples",
            "Southernmost Char Dham pilgrimage site",
            "Longest temple corridor in India (1,212 meters)",
            "22 sacred wells with unique spiritual properties",
            "Associated with Lord Rama and the Ramayana",
            "Dhanushkodi nearby — the tip of peninsular India"
        ]
    },
    {
        id: 16,
        name: "Sarangapani Temple",
        location: "Kumbakonam",
        district: "Thanjavur",
        deity: "Lord Vishnu (Sarangapani)",
        dynasty: "Chola / Nayak",
        builder: "Various rulers",
        year: "12th century CE onwards",
        categories: ["divyadesam"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sarangapani_temple_%28Kumbakonam%29_Rajagopuram.JPG/800px-Sarangapani_temple_%28Kumbakonam%29_Rajagopuram.JPG",
        shortDesc: "The largest Vishnu temple in Kumbakonam with the tallest temple tower (173 feet) in the town. One of the most important Divya Desams in the Thanjavur region.",
        fullDesc: "The Sarangapani Temple is the largest Vishnu temple in Kumbakonam and one of the most important Divya Desams. The temple's Rajagopuram (main tower) stands at 173 feet, making it the tallest in Kumbakonam. 'Sarangapani' means 'the one who holds the bow called Saranga,' referring to Lord Vishnu.\n\nThe temple is believed to have been built by the Cholas and later expanded by the Nayak rulers. The main deity is Lord Vishnu in a reclining posture (Bhujanga Sayanam) on the serpent Adisesha. The temple tank, Potramarai Kulam, is considered sacred and is mentioned in the Alvars' hymns.\n\nAccording to legend, when the cosmic deluge (Pralaya) occurred, Lord Vishnu saved the Vedas by taking the form of a fish and brought them to Kumbakonam, making this town one of the holiest Vaishnavite centers. The temple is glorified in the hymns of the Alvars and is an essential stop on the Divya Desam pilgrimage circuit.",
        highlights: [
            "One of the 108 Divya Desams",
            "Largest Vishnu temple in Kumbakonam",
            "173-foot Rajagopuram — tallest in Kumbakonam",
            "Lord Vishnu in reclining posture",
            "Glorified in the hymns of the Alvars",
            "Sacred Potramarai Kulam (temple tank)"
        ]
    },
    {
        id: 17,
        name: "Varadharaja Perumal Temple",
        location: "Kanchipuram",
        district: "Kanchipuram",
        deity: "Lord Vishnu (Varadaraja)",
        dynasty: "Pallava / Chola / Vijayanagara",
        builder: "Multiple dynasties",
        year: "11th century CE onwards",
        categories: ["divyadesam", "major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Varadaraja_Perumal_temple_Kanchipuram_%282%29.jpg/800px-Varadaraja_Perumal_temple_Kanchipuram_%282%29.jpg",
        shortDesc: "One of the most important Divya Desams in Kanchipuram, famous for the Athigiri Varadhar festival where a sacred wooden idol is displayed once every 40 years.",
        fullDesc: "The Varadharaja Perumal Temple (also called Devarajaswami Temple) in Kanchipuram is one of the most important Divya Desams. The temple is dedicated to Lord Vishnu as Varadaraja (the king who grants boons) and is spread across 23 acres.\n\nThe temple is most famous for the Athigiri Varadhar festival, during which a sacred sandalwood idol of Lord Varadaraja, normally kept immersed in the temple tank, is taken out and displayed to the public once every 40 years. The last such event in 2019 attracted millions of devotees from around the world.\n\nThe temple features a magnificent 100-pillar hall with intricate carvings depicting scenes from the epics and puranas. A unique chain carved from a single stone hangs from the ceiling of the mandapam. The temple was built by the Pallavas and expanded significantly during the Chola and Vijayanagara periods.",
        highlights: [
            "One of the 108 Divya Desams",
            "Athigiri Varadhar — sacred idol shown once every 40 years",
            "23-acre temple complex",
            "100-pillar hall with intricate carvings",
            "Stone chain carved from a single rock",
            "Major contributions from Pallava, Chola, and Vijayanagara dynasties"
        ]
    },
    {
        id: 18,
        name: "Kapaleeshwarar Temple",
        location: "Mylapore, Chennai",
        district: "Chennai",
        deity: "Lord Shiva",
        dynasty: "Pallava / Vijayanagara",
        builder: "Vijayanagara rulers (current structure)",
        year: "7th century CE origins, rebuilt 16th century",
        categories: ["major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sri_Kapaleeshwarar_Temple%2C_Mylapore_01.jpg/800px-Sri_Kapaleeshwarar_Temple%2C_Mylapore_01.jpg",
        shortDesc: "The most prominent Shiva temple in Chennai, located in the historic Mylapore neighborhood. A Paadal Petra Stalam glorified in the Tevaram hymns of the Nayanar saints.",
        fullDesc: "The Kapaleeshwarar Temple in Mylapore is the most prominent and oldest Shiva temple in Chennai. The name 'Kapaleeshwarar' means 'Lord of the Skull' — referring to a legend where Brahma's fifth head was plucked off by Shiva. The temple is believed to have been originally located closer to the shore but was rebuilt at its current location during the Vijayanagara period after the original was destroyed.\n\nThe temple features a classic Dravidian gopuram rising to about 120 feet, covered with colorful sculptures depicting Hindu deities and mythological scenes. The temple tank, known as 'Kapali Theertham,' is located to the east of the temple.\n\nMylapore itself gets its name from 'Mayilai' (land of peacocks), and the legend goes that Goddess Parvati worshipped Lord Shiva here in the form of a peacock (Myilai). The annual Arubathimoovar festival during the Tamil month of Panguni (March-April) features a grand procession of 63 Nayanar saints and is a major cultural event in Chennai.",
        highlights: [
            "Most prominent Shiva temple in Chennai",
            "Paadal Petra Stalam praised in Tevaram",
            "120-foot Dravidian gopuram",
            "Arubathimoovar festival — procession of 63 Nayanar saints",
            "Mylapore named after the peacock legend",
            "Historic cultural center of Chennai for centuries"
        ]
    },
    {
        id: 19,
        name: "Parthasarathy Temple",
        location: "Triplicane, Chennai",
        district: "Chennai",
        deity: "Lord Krishna (Vishnu)",
        dynasty: "Pallava",
        builder: "Pallava kings",
        year: "8th century CE",
        categories: ["divyadesam"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Parthasarathy_temple_in_Triplicane%2C_Chennai.jpg/800px-Parthasarathy_temple_in_Triplicane%2C_Chennai.jpg",
        shortDesc: "One of the oldest temples in Chennai, dating to the 8th century Pallava period. A Divya Desam dedicated to Lord Krishna as Parthasarathy — the charioteer of Arjuna.",
        fullDesc: "The Parthasarathy Temple in Triplicane, Chennai, is one of the oldest structures in the city, dating back to the 8th century Pallava period. It is dedicated to Lord Krishna in his form as Parthasarathy — the charioteer of Arjuna in the Mahabharata war at Kurukshetra.\n\nUnique among Vishnu temples, the main deity here bears scars from the wounds of battle (arrow marks on the body), representing Krishna's participation in the Kurukshetra war. The temple houses five forms of Vishnu: Narasimha, Rama, Gajendra Varada, Ranganatha, and Krishna as Parthasarathy.\n\nThe temple is one of the 108 Divya Desams, glorified in the hymns of the Alvars. The temple tank, known as 'Kaivara Pushkarini,' is one of the few temple tanks still surviving in Chennai's urban landscape. The temple underwent significant renovations during the Vijayanagara and British periods.",
        highlights: [
            "One of the 108 Divya Desams",
            "One of the oldest temples in Chennai (8th century)",
            "Deity bears battle scars — unique among Vishnu temples",
            "Houses five forms of Lord Vishnu",
            "Glorified in the hymns of the Alvars",
            "Kaivara Pushkarini temple tank still survives"
        ]
    },
    {
        id: 20,
        name: "Nellaiappar Temple",
        location: "Tirunelveli",
        district: "Tirunelveli",
        deity: "Lord Shiva & Goddess Kanthimathi",
        dynasty: "Pandya / Nayak",
        builder: "Pandya and Nayak rulers",
        year: "7th century CE onwards",
        categories: ["major"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tirunelveli_Nellaiappar_Temple_Tower.jpg/800px-Tirunelveli_Nellaiappar_Temple_Tower.jpg",
        shortDesc: "A twin temple dedicated to Lord Shiva (Nellaiappar) and Goddess Kanthimathi, famous for its musical pillars and the chain made from a single stone.",
        fullDesc: "The Nellaiappar Temple in Tirunelveli is actually a twin temple — the Nellaiappar Temple (dedicated to Shiva) and the Kanthimathi Amman Temple (dedicated to his consort) were originally separate but connected by a chain bridge mandapam during the Nayak period.\n\nThe temple is renowned for its musical pillars in the Mani Mandapam. These intricately carved granite pillars produce different musical notes when tapped — a remarkable feat of acoustic engineering from centuries ago. The pillars are still functional and produce distinct swaras (musical notes).\n\nAnother famous feature is a chain carved from a single block of granite, demonstrating exceptional stone-carving skills. The temple complex is spread over 14 acres and features Pandya and Nayak architectural styles. The city of Tirunelveli derives its name from this temple — 'Tiru-nel-veli' means 'sacred paddy fence,' referring to the bamboo fence that once surrounded the temple's paddy fields.",
        highlights: [
            "Twin temple complex (Shiva and Parvati temples connected)",
            "Musical pillars producing distinct musical notes",
            "Chain carved from a single granite block",
            "14-acre complex with Pandya and Nayak architecture",
            "City of Tirunelveli named after this temple",
            "Paadal Petra Stalam praised by Nayanar saints"
        ]
    }
];

// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const searchInput = document.getElementById('searchInput');
const templeGrid = document.getElementById('templeGrid');
const noResults = document.getElementById('noResults');
const filterTags = document.querySelectorAll('.filter-tag');
const categoryCards = document.querySelectorAll('.category-card');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

let activeFilter = 'all';
let searchQuery = '';

// ========================================
// Navigation
// ========================================
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('open');
    }
});

// ========================================
// Temple Card Rendering
// ========================================
function createTempleCard(temple) {
    const badgeMap = {
        unesco: { class: 'badge-unesco', text: 'UNESCO' },
        chola: { class: 'badge-chola', text: 'Chola' },
        navagraha: { class: 'badge-navagraha', text: 'Navagraha' },
        pancha: { class: 'badge-pancha', text: 'Pancha Bootha' },
        divyadesam: { class: 'badge-divyadesam', text: 'Divya Desam' },
        major: { class: 'badge-major', text: 'Major Temple' }
    };

    const badges = temple.categories
        .map(cat => {
            const badge = badgeMap[cat];
            return badge ? `<span class="card-badge ${badge.class}">${badge.text}</span>` : '';
        })
        .join('');

    const card = document.createElement('div');
    card.className = 'temple-card fade-in';
    card.dataset.categories = temple.categories.join(',');
    card.innerHTML = `
        <div class="temple-card-image">
            <img src="${temple.image}" alt="${temple.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, var(--primary), var(--gold))'; this.style.display='none';">
            <div class="card-badges">${badges}</div>
        </div>
        <div class="temple-card-content">
            <h3>${temple.name}</h3>
            <div class="temple-card-location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${temple.location}, ${temple.district}
            </div>
            <p class="temple-card-description">${temple.shortDesc}</p>
            <div class="temple-card-footer">
                <span class="temple-card-deity"><strong>Deity:</strong> ${temple.deity}</span>
                <span class="card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openModal(temple));
    return card;
}

function renderTemples() {
    templeGrid.innerHTML = '';
    const query = searchQuery.toLowerCase().trim();

    const filtered = temples.filter(temple => {
        const matchesFilter = activeFilter === 'all' || temple.categories.includes(activeFilter);
        const matchesSearch = !query ||
            temple.name.toLowerCase().includes(query) ||
            temple.location.toLowerCase().includes(query) ||
            temple.district.toLowerCase().includes(query) ||
            temple.deity.toLowerCase().includes(query) ||
            temple.dynasty.toLowerCase().includes(query) ||
            temple.shortDesc.toLowerCase().includes(query) ||
            temple.categories.some(c => c.toLowerCase().includes(query));
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        filtered.forEach((temple, index) => {
            const card = createTempleCard(temple);
            card.style.transitionDelay = `${index * 0.05}s`;
            templeGrid.appendChild(card);
        });

        // Trigger fade-in animation
        requestAnimationFrame(() => {
            document.querySelectorAll('.temple-card.fade-in').forEach(card => {
                card.classList.add('visible');
            });
        });
    }
}

// ========================================
// Filtering & Search
// ========================================
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeFilter = tag.dataset.filter;
        renderTemples();
    });
});

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        // Set filter
        activeFilter = category;
        filterTags.forEach(t => {
            t.classList.toggle('active', t.dataset.filter === category);
        });
        renderTemples();
        // Scroll to temples section
        document.getElementById('temples').scrollIntoView({ behavior: 'smooth' });
    });
});

let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchQuery = e.target.value;
        renderTemples();
    }, 200);
});

// ========================================
// Modal
// ========================================
function openModal(temple) {
    const badgeMap = {
        unesco: { class: 'badge-unesco', text: 'UNESCO Heritage' },
        chola: { class: 'badge-chola', text: 'Chola Dynasty' },
        navagraha: { class: 'badge-navagraha', text: 'Navagraha' },
        pancha: { class: 'badge-pancha', text: 'Pancha Bootha' },
        divyadesam: { class: 'badge-divyadesam', text: 'Divya Desam' },
        major: { class: 'badge-major', text: 'Major Temple' }
    };

    document.getElementById('modalImage').style.backgroundImage = `url('${temple.image}')`;
    document.getElementById('modalTitle').textContent = temple.name;

    document.getElementById('modalBadges').innerHTML = temple.categories
        .map(cat => {
            const badge = badgeMap[cat];
            return badge ? `<span class="card-badge ${badge.class}">${badge.text}</span>` : '';
        })
        .join('');

    document.getElementById('modalMeta').innerHTML = `
        <span class="modal-meta-item"><strong>Location:</strong> ${temple.location}, ${temple.district}</span>
        <span class="modal-meta-item"><strong>Deity:</strong> ${temple.deity}</span>
        <span class="modal-meta-item"><strong>Dynasty:</strong> ${temple.dynasty}</span>
        <span class="modal-meta-item"><strong>Period:</strong> ${temple.year}</span>
        ${temple.builder ? `<span class="modal-meta-item"><strong>Builder:</strong> ${temple.builder}</span>` : ''}
    `;

    document.getElementById('modalDescription').innerHTML = temple.fullDesc
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('');

    document.getElementById('modalDetails').innerHTML = `
        <h4>Key Highlights</h4>
        <ul>
            ${temple.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
function initAnimations() {
    document.querySelectorAll('.category-card, .timeline-item, .planet-card, .element-card, .dd-info-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    renderTemples();
    initAnimations();
});
