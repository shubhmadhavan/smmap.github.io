const mapData = {
"Agra Fort<br><span class='nl'>Babur built a baoli here after winning Panipat; Humayun was crowned here, went to Suris briefly; Akbar made it his capital & rebuilt it w. red sandstone</span>":"POINT (78.021112 27.1795328)",
"Ajanta Caves<br><span class='nl'>gorge of Waghur River</span>":"POINT (75.7069356 20.5513286)",
"Victorian & Art Deco Ensemble of Mumbai<br><span class='nl'>bordering the Oval Maidan (formerly 'Esplanade') open space; Victorian Neo-Gothic style and then, in the early 20th century, in the Art Deco idiom; Bombay HC is here</span>":"POINT (72.82884570000002 18.9289749)",
"Jantar Mantar<br>early 18th century":"POINT (75.82456 26.924762)",
"Architectural Work of Le Corbusier (CH)<br><span class='nl'>17 sites across 7 countries; (Tokyo JP, La Plata ARG, Marseille FRA most imp); Modern Movement architecture":"POINT (76.8023693 30.7566254)",
"Nalanda Mahavihar<br><span class='nl'>built by Kumaragupta I around 427 CE; revived by Dharmapala (770-810 CE); Pithipatis of Bodh Gaya also patronised it;attacked by Huns under Mihirakula in 5th CE & Gauda King of BN in 8th CEnt; Mohd Bakhtiyar Khalji raised it in 1200 CE; Nagarjuna (Madhyamaka), Silabhadra (Yogachara), Hiueng Zang (traveller); today, an Inst. of Nat. Imp.":"POINT (85.4458458 25.1355943)",
"Buddhist Monuments at Sanchi<br><span class='nl'>loc. just west of Betwa; orig. coms. by Ashoka in 3rd BC; Torans added in 1st Cent</span>":"POINT (77.7398976 23.4809623)",
"Champaner-Pavagadh Archaeological Park (GJ)<br><span class='nl'>in Panchamahal, GJ; near historical city of Champaner – founded by Vanraj Chavda in 8th CE (Chavda dys 690-942)":"POINT (73.5372445 22.4858293)",
"Chhatrapati Shivaji Maharaj Terminus (MH) <br><span class='nl'>loc. South of old Bori Buder RW station; designed by a British eng. Frederick William Stevens based on initial design by Axel Haig; completed in 1887 – Queen Victoria's Golden Jubilee; Italian Gothic style":"POINT (72.8354475 18.9398446)",
"Churches and Convents of Goa (GA)<br><span class='nl'> monuments assoc. w. Por India – imp in dissemination of Wn art (Manueline, Mannerist & Baroque styles); most imp is Basilica of Bom Jesus of (tomb of Francisco Xavier)":"POINT (73.9117653 15.5023377)",
"Dholavira (IVC)<br><span class='nl'>  also k.a Kotada Timba; on Khadirbet island (Bhachau Taluka, Kutch, GJ) in Desert WLS, GJ; b.w Mansar & Manhar seasonal streams; history of EQs since 2600 BC; loc on Tr. of Cancer; a heavily fortified castle and ceremonial ground":"POINT (70.2140444 23.8808877)",
"Elephanta Caves (MH)<br><span class='nl'> primarily for Shiva; aka Gharapuri Caves; loc. in Mumbai Harbour, near JN Port; houses 5 Hindu caves & a few Buddhist stupas & Buddhist caves w. water tanks; as old as 2nd Cent BC; syncretism of Hindu-Buddhist ideas & iconography; high relief rock-cut stone sculptures":"POINT (72.9314864 18.9633474)",
"Ellora Caves (MH)<br><span class='nl'> 34 monasteries and temples; near Aurangabad, MH; uninterrupted sequence of monuments from 600-1000 CE; Bdhsm, Jain, Hinduism all located; several caves have no roofs; Kailash Temple (chariot-shaped monument for Shiva) is the largest single monolithic rock excavation in world; earliest cave built by Vakatakas (250-510 CE) & Traikutakas (388-486), then by Kalachuris of Mahismati/ Early Kalachuris (550-625) ; most Ellora caves, however, were by Rashtrakutas (753-982) & later by Yadavas (1187-1317)":"POINT (75.1770869 20.0267844)",
"Fatehpur Sikri<br><span class='nl'> founded by Akbar as his cap. in 1571 CE – abandoned in 1585 for Punjab campaign (new capital Lahore) and later left completely; lit. 'City of Victory'; Jama Masjid here is one of the largest mosques in India":"POINT (77.6679292 27.0945291)",
"Great Chola Living Temples (TN)":"POINT (79.1314587 10.7826954)",
"Group of Monuments at Hampi":"POINT (76.4619233 15.3349769)",
"Group of Monuments at Pattadakal":"POINT (75.816252 15.9495996)",
"Group of Monuments at Mahabalipuram":"POINT (80.1987624 12.6165386)",
"Hill forts of Rajasthan":"POINT (74.6473548 24.8839686)",
"Historic City of Ahmadabad":"POINT (72.5872009 23.0276426)",
"Humayun’s Tomb":"POINT (77.2507492 28.5932848)",
"Pink City of Jaipur":"POINT (75.8184343 26.9247365)",
"Ramappa Kakatiya Ramalingeshwara (Rudreshwara) Temple":"POINT (79.9433064 18.2593333)",
"Khajuraho Temple Complex":"POINT (79.9219494 24.8531752)",
"Mahabodhi Temple Complex":"POINT (84.9914193 24.6959222)",
"Moidam Mound-Burial of Ahoms":"POINT (94.8759751 26.9413085)",
"Mountain Railways of India":"POINT (88.3215627 26.8818035)",
"Qutab Minar":"POINT (77.1852057 28.524426)",
"Rani Ki Vav":"POINT (72.101933 23.858924)",
"Red Fort":"POINT (77.2410203 28.6561592)",
"Bhimbetka Rock Shelters<br><span class='nl'>foothills of Vindhyas":"POINT (77.6124331 22.9395461)",
"Sacred Ensembles of Hoysalas":"POINT (75.994155 13.212786)",
"Santiniketan":"POINT (87.6852323 23.6776471)",
"Konark Sun Temple":"POINT (86.0945364 19.8875953)",
"Taj Mahal":"POINT (78.0421422 27.1751448)",
"Great Himalayan National Park (HP)":"POINT (77.5160134 31.7985414)",
"Kaziranga National Park":"POINT (92.993808 26.5252813)",
"Keoladeo National Park":"POINT (77.5218127 27.1596085)",
"Manas National Park":"POINT (91.2394832 26.8101743)",
"Nanda Devi NP & Valley of Flowers NP":"POINT (79.8386542 30.6587637)",
"Sundarban NP":"POINT (88.8853765 21.8842354)",
"Western Ghats":"POINT (75.0 14.0)",
"Kanchenjunga NP (Mixed":"POINT (88.3245556 27.6672446)"
};


/* 
<br><span class='nl'></span>

<br><span class='nl'>originally commissioned by the Mauryan emperor</span>
"":"",
"":"",
"":"",
"":"",
"":"",
"":"",
remove comma for ending river*/