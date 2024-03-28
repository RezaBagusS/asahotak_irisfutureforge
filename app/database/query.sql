INSERT INTO `Course`(`title`, `description`, `codeCourse`, `countCourse`) 
VALUES 
    ('Pengetahuan Kuantitatif','description of the course','PK','9'),
    ('Penalaran Matematika','description of the course','PM','7'),
    ('Kemampuan Penalaran Umum','description of the course','PU','8'),
    ('Literasi Bahasa Inggris','description of the course','LI','5'),
    ('Pengetahuan dan Pemahaman Umum','description of the course','PPU','8'),
    ('Kemampuan Memahami Bacaan dan Menulis','description of the course','PBM','5'),
    ('Literasi Bahasa Indonesia','description of the course','LB','6')


INSERT INTO `User`(`email`, `username`, `password`, `intensif`, `getAccess`) 
VALUES 
	('rezabagus@gmail.com','rezabagus','rezabagus123','0','1'),
	('irisuser@gmail.com','irisdutureforge','irisuser123','1','0'),
	('peserta!gmail.com','peserta123','peserta123','1','1')

INSERT INTO `Lesson`(`title`, `codeLesson`, `openLesson`, `id_course`) 
VALUES 
	('Pendahuluan, Bilangan, dan Himpunan','PK001','1','1'),
	('Sistem Persamaan dan Pertidaksamaan','PK002','0','1'),
	('Fungsi dan Fungsi Kuadrat','PK003','0','1'),
	('Barisan','PK004','0','1'),
	('Sudut dan Trigonometri','PK005','0','1'),
	('Bangun Datar dan Kesebangunan','PK006','0','1'),
	('Bangun Ruang','PK007','0','1'),
	('Statistika','PK008','0','1'),
	('Peluang','PK009','0','1'),

	('Pendahuluan dan Fungsi','PM001','1','2'),
	('Perbandingan','PM002','0','2'),
	('Kecepatan dan Debit','PM003','0','2'),
	('Aritmatika Sosial Part 1','PM004','0','2'),
	('Aritmatika Sosial Part 2','PM005','0','2'),
	('Statistika','PM006','0','2'),
	('Peluang','PM007','0','2'),

	('Pendahuluan, Prinsip Pengerjaan Penalaran Umum','PU001','1','3'),
	('Kemampuan Memecahkan Masalah Baru dan Kemampuan Bernalar Abstrak','PU002','0','3'),
	('Penalaran Induktif: Identifikasi Prinsip Yang Mendasari Fakta','PU003','0','3'),
	('Penalaran Induktif: Menemukan Pola dan Generalisasi Berdasar Pengamatan Induktif','PU004','0','3'),
	('Penalaran Deduktif: Menyusun Argumen Deduktif (Logika Dasar)','PU005','0','3'),
	('Penalaran Deduktif: Menguji Pernyataan Berdasar Premis','PU006','0','3'),
	('Penalaran Kuantitatif: Hubungan Matematika Sederhana, Interpretasi Data.','PU007','0','3'),
	('Penalaran Kuantitatif: Menggunakan Operator Aritmetika Dasar, Estimasi Angka.','PU008','0','3'),

	('Main Idea and Topic','LI001','1','4'),
	('Summarizing the Passage ','LI002','0','4'),
	('Hypothesizing Information','LI003','0','4'),
	('Restating Phrases and Sentences + Finding Contextual Meaning','LI004','0','4'),
	('Comprehending Detailed Information','LI005','0','4'),

	('Pendahuluan','PPU001','1','5'),
	('Bahasa dan Keterampilan Berbahasa','PPU002','0','5'),
	('Informasi Umum','PPU003','0','5'),
	('Kedalaman Pengetahuan Umum','PPU004','0','5'),
	('Main Idea and Topic','PPU005','0','5'),
	('Summarizing a Text','PPU006','0','5'),
	('Comprehending Detailed Information','PPU007','0','5'),
	('Finding Contextual Meaning','PPU008','0','5'),

	('Teknik dan Startegi Membaca Teks Paragraf','PBM001','1','6'),
	('Paragraf','PBM002','0','6'),
	('Kepaduan Teks','PBM003','0','6'),
	('EYD','PBM004','0','6'),
	('Kalimat Efektif','PBM005','0','6'),

    ('Inti Bacaan dan Simpulan','LB001','1','7'),
    ('Menentukan Tema dan Judul Dalam Teks','LB002','0','7'),
    ('Keakuratan Paparan','LB003','0','7'),
    ('Kelebihan dan Kekurangan Objek Bahasan','LB004','0','7'),
    ('Ketepatan Opini Atas Objek','LB005','0','7'),
    ('Fakta atau Data Yang Relevan atau Tidak Relevan Pada Bacaan Teks Argumentatif','LB006','0','7')

INSERT INTO `userLesson`(`id_user`, `id_lesson`, `isDone`) 
VALUES 
	('2','1','1'),
	('2','2','0'),
	('2','3','0'),
	('2','4','0'),
	('2','5','0'),
	('2','6','0'),
	('2','7','0'),
	('2','8','0'),
	('2','9','0')

INSERT INTO `userCourse` (`id_user`, `id_course`, `percentage`) 
VALUES
(2, 1, 11),
(2, 2, 28),
(2, 3, 50),
(2, 4, 60),
(2, 5, 0),
(2, 6, 0),
(2, 7, 0);


-- Answer Table
INSERT INTO `Answer`(`answer`, `isTrue`, `id_soal`) 
VALUES 
('<p>0</p>','0','1'),
('<p>1</p>','0','1'),
('<p>2</p>','0','1'),
('<p>3</p>','1','1'),
('<p>4</p>','0','1'),

('<p>11</p>','0','8'),
('<p>12</p>','1','8'),
('<p>13</p>','0','8'),
('<p>14</p>','0','8'),
('<p>15</p>','0','8'),

('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i), (ii), dan (iii)</span></p>','0','9'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i) dan (iii)</span></p>','1','9'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(ii) dan (iv)</span></p>','0','9'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(iv)</span></p>','0','9'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">Semua pernyataan benar</span></p>','0','9'),

('<p>1232</p>','1','10'),
('<p>1223</p>','0','10'),
('<p>1322</p>','0','10'),
('<p>2132</p>','0','10'),
('<p>2123</p>','0','10'),

('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i), (ii), dan (iii)</span></p>','0','11'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i) dan (iii)</span></p>','0','11'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(ii) dan (iv)</span></p>','0','11'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(iv)</span></p>','1','11'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">Semua pernyataan benar</span></p>','0','11'),

('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i), (ii), dan (iii)</span></p>','0','12'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i) dan (iii)</span></p>','1','12'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(ii) dan (iv)</span></p>','0','12'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(iv)</span></p>','0','12'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">Semua pernyataan benar</span></p>','0','12'),

('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i), (ii), dan (iii)</span></p>','0','13'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i) dan (iii)</span></p>','0','13'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(ii) dan (iv)</span></p>','0','13'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(iv)</span></p>','0','13'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">Semua pernyataan benar</span></p>','1','13'),

('<p>5</p>','0','14'),
('<p>6</p>','0','14'),
('<p>7</p>','0','14'),
('<p>8</p>','1','14'),
('<p>9</p>','0','14'),

('<p>Kuantitas P lebih besar daripada Kuantitas Q</p>','1','15'),
('<p>Kuantitas P lebih kecil daripada Kuantitas Q</p>','0','15'),
('<p>Kuantitas P sama dengan Kuantitas Q</p>','0','15'),
('<p>Hubungan antara P dan Q tidak dapat ditentukan</p>','0','15'),
('<p>Tidak ada jawaban yang benar</p>','0','15'),

('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i), (ii), dan (iii)</span></p>','0','16'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(i) dan (iii)</span></p>','0','16'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(ii) dan (iv)</span></p>','0','16'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">(iv)</span></p>','0','16'),
('<p><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="isPasted">Semua pernyataan benar</span></p>','1','16'),

('<p>Kuantitas P lebih besar daripada Kuantitas Q</p>','0','17'),
('<p>Kuantitas P lebih kecil daripada Kuantitas Q</p>','0','17'),
('<p>Kuantitas P sama dengan Kuantitas Q</p>','0','17'),
('<p>Hubungan antara P dan Q tidak dapat ditentukan</p>','1','17'),
('<p>Tidak ada jawaban yang benar</p>','0','17'),

('<p>Pernyataan (i) saja cukup menjawab pertanyaan tetapi pernyataan (ii) saja tidak cukup</p>','0','18'),
('<p>Pernyataan (ii) saja cukup menjawab pertanyaan tetapi pernyataan (i) saja tidak cukup</p>','1','18'),
('<p>Dua pernyataan bersama-sama cukup untuk menjawab pertanyaan, tetapi satu pernyataan saja tidak cukup</p>','0','18'),
('<p>Pernyataan (i) saja cukup menjawab pertanyaan dan pernyataan (ii) saja cukup menjawab pertanyaan</p>','0','18'),
('<p>Dua pernyataan bersama-sama tidak cukup untuk menjawab pertanyaan</p>','0','18'),

('<p>Toko Antik dan Budaya</p>','0','19'),
('<p>Toko Budaya dan Cure</p>','0','19'),
('<p>Toko Cure dan Dekorasi</p>','0','19'),
('<p>Toko Dekorasi dan Ekonomi</p>','1','19'),
('<p>Toko Ekonomi dan Antik</p>','0','19'),

('<p>(3, 6)</p>','1','20'),
('<p>(3, 7)</p>','0','20'),
('<p>(3, 5)</p>','0','20'),
('<p>(3, 4)</p>','0','20'),
('<p>(3, 3)</p>','0','20'),

('<p>1 : 3</p>','1','21'),
('<p>3 : 1</p>','0','21'),
('<p>1 : 2</p>','0','21'),
('<p>2 : 1</p>','0','21'),
('<p>1 : 4</p>','0','21'),



