const mapData = {
"Nammalvar (900 CE)<br><span style='font-size:0.6rem;'>one of the 12th Alvar;</span><span style='font-size:0.6rem; display: block;'>incld in Naalayira Divya Prabandam, </span><span style='font-size:0.6rem; display: block;'>iled by Nathamuni":"POINT (77.9894221 8.8711605)",
"Manikkavacakar (900 CE)<br><span id='nl>wrote Thiruvasagam & Thirukkovaiyar (Shaivism)":"POINT (78.3145181 9.956938)",
"Ramanujacharya (1100 CE)<br><span style='font-size:0.6rem;'>founded Sri sect of Vaishnavism;</span><span style='font-size:0.6rem; display: block;'>exponent of Vishishtadvaita school;</span><span style='font-size:0.6rem; display: block;'>unlike his teacher Yadava Prakasa, </span><span style='font-size:0.6rem; display: block;'>who espoused the Advaita Vedant school":"POINT (78.633449 9.6849532)",
"Basavanna (1150 CE)<br><span style='font-size:0.6rem;'>founder of Lingayat school u. Shaivism;</span><span style='font-size:0.6rem; display: block;'>d. reign of Kalyani Chalukya (957–1184) ruler Bijjala II":"POINT (75.710031 16.8301708)",
"Jayadeva (1200 CE)<br><span style='font-size:0.6rem;'>authored Gita Govinda (brings Radha to fore as chief consort of Krishna)":"POINT (87.01933 23.08628)",
"Dnyaneshwar (1250 CE)<br><span style='font-size:0.6rem;'>Sant Dnyaneshwar Vitthalapant Kulkarni;</span><span style='font-size:0.6rem; display: block;'>d. Yadava/Seuna Dynasty (1187-1317 CE);</span><span style='font-size:0.6rem; display: block;'>authored Dnyaneshwari & Amrutanubhav;</span><span style='font-size:0.6rem; display: block;'>Advaita Vedanta & Vitobha worship":"POINT (75.4878957 19.4451702)",
"Namdev (1300 CE)<br><span style='font-size:0.6rem;'>Warkari tradition;</span><span style='font-size:0.6rem; display: block;'>d. Yadava/Seuna Dynasty (1187-1317 CE)":"POINT (74.5646809 16.8582302)",
"Ramananda (1400 CE)<br><span style='font-size:0.6rem;'>exponent of Sri sect of Vaishnavism (f. by Ramanujacharya)":"POINT (81.8537097 25.4824547)",
"Kabir (1400 CE)<br><span style='font-size:0.6rem;'>disciple of Ramananda (founder of Sri sect of Vaishnavism);</span><span style='font-size:0.6rem; display: block;'>verses incld in Guru Granth Sahib":"POINT (82.960176 25.3286876)",
"Ravidas (1400 CE)<br><span style='font-size:0.6rem;'>verses incld in Guru Granth Sahib & Dadu Panthis":"POINT (83.0437551 25.2944746)",
"Vidyapati (1400 CE)<br><span style='font-size:0.6rem;'>Maithil Kavi Koki;</span><span style='font-size:0.6rem; display: block;'>Madhubani dis, BR":"POINT (86.1347688 26.3091681)",
"Narsinh Mehta (1450 CE)<br><span style='font-size:0.6rem;'>Gujarati Adi Kavi;</span><span style='font-size:0.6rem; display: block;'>wrote 'Vaishnava Jana To'":"POINT (72.0519503 21.3746596)",
"Surdas (1500 CE)<br><span style='font-size:0.6rem;'>Faridabad ":"POINT (77.3177894 28.4089123)",
"Vallabhacharya (1500 CE)<br><span style='font-size:0.6rem;'>founded Puṣṭimārga sect of Vaishnavism (Krishna-focus)":"POINT (77.6921709 27.5166283)",
"Guru Nanak (1500 CE)<br><span style='font-size:0.6rem;'>1569-1639 CE;</span><span style='font-size:0.6rem; display: block;'>Rai Bhoi Ki Talvandi, Nankana Sahib, Punjab (PK)":"POINT (73.712479 31.449151)",
"Purandara Dasa (1500 CE)<br><span style='font-size:0.6rem;'>follower of Madhavacharya's Dvaita philosophy;</span><span style='font-size:0.6rem; display: block;'>shaped modern Carnatic music":"POINT (78.7476937 15.7061819)",
"Mirabai (1500 CE)<br><span style='font-size:0.6rem;'>Krishna hymns;</span><span style='font-size:0.6rem; display: block;'>anachronistic symbol of resistance":"POINT (74.3208791 26.2934392)",
"Sankardev (1500 CE)<br><span style='font-size:0.6rem;'>founder of Ekasarana sect of Vaishnavism;</span><span style='font-size:0.6rem; display: block;'>new music(Borgeet), theatre(Ankia Naat,Bhaona),</span><span style='font-size:0.6rem; display: block;'>dance(Sattriya), lang(Brajavali).":"POINT (92.6332408 26.3583051)",
"Dadu Dayal (1550 CE)<br><span style='font-size:0.6rem;'>Dadupanths are a martial sub-sect of the Sri sect</span><span style='font-size:0.6rem; display: block;'>(founded by Ramanujacharya) of Vaishnavism":"POINT (75.8369924 26.9416836)",
"Chaitanya Mahaprabhu (1500 CE)<br><span style='font-size:0.6rem;'>founder of Gaudiya Vaishnavism;</span><span style='font-size:0.6rem; display: block;'>worshipping Krishna with bhajan-kirtan and dance":"POINT (88.3743871 23.3005408)",
"Tulsidas (1600 CE)<br><span style='font-size:0.6rem;'>Vaishnavite;</span><span style='font-size:0.6rem; display: block;'>authored Hanuman Chalisa & Ramacharitmanas":"POINT (78.6463572 27.805037)",
"Eknath (1600 CE)<br><span style='font-size:0.6rem;'>imp in Warkari movement;</span><span style='font-size:0.6rem; display: block;'>Vitobha worship":"POINT (75.342219 19.8716726)",
"Tukaram (1600 CE)<br><span style='font-size:0.6rem;'>Warkari movement;</span><span style='font-size:0.6rem; display: block;'>Vitobha worship":"POINT (73.8576914 18.5287689)",
"Ramdas/ Bhadrachala Ramadasu (1650 CE)<br><span style='font-size:0.6rem;'>Rama devotee;</span><span style='font-size:0.6rem; display: block;'>estb Sita Ramachandraswamy Temple":"POINT (80.6914072 17.2875985)"
};


/* 
</span><span style='font-size:0.6rem; display: block;'>
"":"",
"":"",
"":"",
"":"",
"":"",
"":"",
remove comma for ending river*/