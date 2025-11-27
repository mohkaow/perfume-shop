// ตัวอย่างสินค้า น้ำหอม ปรับเองทีหลังได้
export const products = [
  {
    id: 'p1',
    name: 'Coach Green',
    description: 'กลิ่นเฟรชโทน เปิดด้วยความสดชื่นของกีวี่และซิตรัส ให้ฟีลหนุ่มชิลล์สบาย ๆ แต่ยังดูเนี้ยบ ปิดท้ายด้วยกลิ่นไม้แห้งและมอส ใส่ได้ทุกวัน ทั้งไปทำงานและวันหยุด',
    price: 2390, // ปรับราคาตามที่มึงขาย
    image: '/images/perfumes/1.coach-green.webp', // รูปขวดเขียวของมึง
    volume: '100 ml',
    notes: 'Kiwi • Citrus • Fresh Woody'
  },

  {
    id: 'p2',
    name: 'BVLGARI Omnia Amethyste',
    description: 'โทนดอกไม้สีม่วง หรูหราแต่ยังดูใส ๆ เปิดด้วยเกรปฟรุตสดชื่น ตามด้วยไอริสและกุหลาบบัลแกเรีย ให้ลุคผู้หญิงสุภาพ เรียบโก้ ใช้ได้ทั้งไปทำงานและออกเดต',
    price: 3290, // ปรับราคาตามหน้าร้านของมึง
    image: '/images/perfumes/2.omnia-amethyste.jpg', // ชี้ไปที่รูปขวดม่วงของมึง
    volume: '65 ml',
    notes: 'Grapefruit • Iris • Elegant Floral'
  },
  {
    id: 'p3',
    name: 'BVLGARI Man Rain Essence',
    description: 'น้ำหอมผู้ชายกลิ่นสดชื่นคลีน ๆ ได้แรงบันดาลใจจากกลิ่นฝน เปิดด้วยชาเขียวและส้มให้ฟีลอากาศหลังฝนตก สะอาด สุภาพ แต่ยังมีเสน่ห์จากไวท์โลตัส มัสก์ และไม้หอม ใส่ได้ทั้งไปทำงานและออกเดต',
    price: 2990, // ปรับตามราคาที่มึงขาย
    image: '/images/perfumes/3.bvlgari-man-rain-essence.avif',
    volume: '100 ml',
    notes: 'Green Tea • Orange • White Lotus • Musk'
  },
  {
    id: 'p4',
    name: 'Chanel Chance Eau Fraîche',
    description: 'น้ำหอมกลิ่นสดชื่นหรูสไตล์ชาเนล เปิดด้วยซิตรอนเปรี้ยวใส ตามด้วยมะลิและดอกไม้โทนเขียว ให้ฟีลคุณหนูคลีน ๆ ดูแพง ใส่ได้ทั้งไปทำงานและวันสบาย ๆ',
    price: 3990, // ใส่ราคาจริงที่มึงจะขายแทน 0
    image: '/images/perfumes/4.chance-eau-fraiche.webp',
    volume: '100 ml',
    notes: 'Citron • Jasmine • Fresh Floral'
  },
  {
    id: 'p5',
    name: 'Calvin Klein Eternity for Men',
    description: 'กลิ่นผู้ชายคลีน ๆ สไตล์คุณสุภาพบุรุษ เปิดด้วยซิตรัสผสมลาเวนเดอร์ กลิ่นสะอาดเหมือนเพิ่งอาบน้ำเสร็จ ตามด้วยกลิ่นสมุนไพรและไม้หอม ใส่ได้ทุกวัน ทั้งไปทำงาน ออกเดต หรือใช้เป็นกลิ่นประจำตัว',
    price: 2190, // ราคาโดยประมาณ มึงปรับตามที่ขายจริงได้เลย
    image: '/images/perfumes/5.ck-eternity-men.webp',
    volume: '100 ml',
    notes: 'Lavender • Citrus • Woody Aromatic'
  },
  {
    id: 'p6',
    name: 'Coach Dreams',
    description: 'น้ำหอมฟรุตตี้ฟลอรัลหวานใส เปิดด้วยแพร์ฉ่ำ ๆ ผสมส้มขมให้ความสดใส ตามด้วยการ์ดีเนียและดอกแคคตัส ให้ฟีลสาวขี้เล่น ชอบออกทริป หอมหวานแต่ไม่เลี่ยน ใช้ได้ทั้งทุกวันและออกเดต',
    price: 2590, // ราคาประมาณ ๆ มึงค่อยปรับตามหน้าร้านได้
    image: '/images/perfumes/6.coach-dreams.webp',
    volume: '90 ml',
    notes: 'Pear • Bitter Orange • Gardenia • Cactus Flower'
  },
  {
    id: 'p7',
    name: 'Jo Malone Moonlit Camomile',
    description: 'โคโลญจน์กลิ่นละมุนสายโคซี่ เหมือนนั่งจิบชาคาโมมายล์ใต้แสงจันทร์ ผสมดอกไอริสและมอสเบา ๆ ให้ฟีลสงบ ผ่อนคลาย แต่ยังดูแพง ใส่ก่อนนอนหรือวันชิล ๆ อยู่บ้าน/คาเฟ่ได้สบาย',
    price: 3990, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/7.jo-malone-moonlit-camomile.webp',
    volume: '100 ml',
    notes: 'Camomile • Moonflower • Musk • Soft Woody'
  },
  {
    id: 'p8',
    name: 'Chanel Gabrielle',
    description: 'น้ำหอมดอกไม้โทนหรูที่ได้แรงบันดาลใจจากตัวตนของ Gabrielle Chanel เปิดด้วยกลิ่นซิตรัสบาง ๆ ตามด้วยช่อดอกไม้ขาวอย่างมะลิ ทิวเบอร์โรส และดอกส้ม ให้ฟีลผู้หญิงมั่นใจ ดูแพง มีตัวตน เหมาะทั้งใส่ออกงานและเป็นกลิ่นประจำตัว',
    price: 4390, // ราคาประมาณ ๆ มึงปรับตามที่ขายจริงได้
    image: '/images/perfumes/8.chanel-gabrielle.webp',
    volume: '100 ml',
    notes: 'Jasmine • Tuberose • Ylang-Ylang • Orange Blossom'
  },
  {
    id: 'p9',
    name: 'Chloé Eau de Parfum',
    description: 'กลิ่นดอกกุหลาบฟีลคุณหนูฝรั่งเศส หวานใสแบบผู้หญิงอบอุ่น เปิดด้วยพีโอนีและลิ้นจี่ ตามด้วยกุหลาบและดอกไม้ขาว กลิ่นสะอาดแพง ๆ ใส่ไปทำงานก็สุภาพ ใช้ออกเดตก็ดูละมุนมีเสน่ห์',
    price: 3190, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/9.chloe-edp.jpg',
    volume: '75 ml',
    notes: 'Rose • Peony • Lychee • Cedarwood'
  },
  {
    id: 'p10',
    name: 'Chanel Paris – Biarritz',
    description: 'น้ำหอมซิตรัสสดชื่นได้แรงบันดาลใจจากเมืองตากอากาศ Biarritz เปิดด้วยเกรปฟรุตและส้มแมนดารินสุดมีชีวิตชีวา ตามด้วยดอกลิลลี่ออฟเดอะวัลเลย์และกลิ่นไม้หอมเบา ๆ ให้ฟีลสะอาด โปร่ง โล่งเหมือนลมทะเล ใส่ได้ทุกวันโดยเฉพาะหน้าร้อน',
    price: 3990, // ราคาประมาณ ๆ ปรับตามที่มึงขายได้เลย
    image: '/images/perfumes/10.chanel-paris-biarritz.webp',
    volume: '125 ml',
    notes: 'Grapefruit • Mandarin • Lily-of-the-Valley • Vetiver'
  },
  {
    id: 'p11',
    name: 'Jo Malone Wild Bluebell',
    description: 'โคโลญจน์กลิ่นดอกไม้ใส ๆ แบบป่าหลังฝน เปิดด้วยกลิ่นบลูเบลล์และกานพลูบาง ๆ ให้ฟีลสดชื่นเหมือนเดินเล่นในสวน ตามด้วยลิลลี่ออฟเดอะวัลเลย์และมะลิ ปิดท้ายด้วยมัสก์และแอมเบอร์นุ่ม ๆ เหมาะกับสายคลีน สายมินิมอล ใส่ได้ทุกวัน',
    price: 3790, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/11.jo-wild-bluebell.jpg',
    volume: '100 ml',
    notes: 'Bluebell • Lily-of-the-Valley • Jasmine • White Musk'
  },
  {
    id: 'p12',
    name: "Issey Miyake L'Eau d'Issey Pour Homme",
    description: 'น้ำหอมผู้ชายกลิ่นสดชื่นสะอาดสไตล์มินิมอล เปิดด้วยยูซุและซิตรัสให้ฟีลเหมือนอาบน้ำใหม่ ๆ ผสมกลิ่นทะเลและสมุนไพรเล็กน้อย ปิดท้ายด้วยไม้หอมและมัสก์ เหมาะเป็นกลิ่นประจำตัว ใส่ไปทำงานได้ทุกวัน',
    price: 2390, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/12.issey-pour-homme.png',
    volume: '125 ml',
    notes: 'Yuzu • Aquatic • Spicy • Woody'
  },
  {
    id: 'p13',
    name: 'Jean Paul Gaultier Scandal',
    description: 'น้ำหอมสายหวานเซ็กซี่ขวดขาในตำนาน เปิดด้วยส้มเลือดและส้มแมนดารินสดชื่น ตามด้วยดอกการ์ดีเนียที่ราดด้วยน้ำผึ้งหอมหนา ให้ฟีลสาวปาร์ตี้สุดมั่น ลึกลับนิด ๆ ดึงดูดสุด ๆ เหมาะใส่กลางคืนหรือโอกาสพิเศษ',
    price: 3290, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/13.jpg-scandal.jpg',
    volume: '80 ml',
    notes: 'Blood Orange • Honey • Gardenia • Patchouli'
  },
  {
    id: 'p14',
    name: 'Versace Eros',
    description: 'น้ำหอมผู้ชายกลิ่นฟรุตตี้ฟูเจร์ในตำนาน เปิดด้วยมิ้นต์ แอปเปิลเขียว และเลมอนให้ความสดชื่นแมน ๆ ตามด้วยท็องก้าบีนกับแอมบร็อกซานให้ความหอมแน่นเซ็กซี่ ปิดท้ายด้วยวานิลลาและไม้หอม เหมาะกับสายปาร์ตี้และเดตกลางคืนแต่ใส่ไปทำงานวันศุกร์ก็ยังรอด',
    price: 2890, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/14.versace-eros.avif',
    volume: '100 ml',
    notes: 'Mint • Green Apple • Lemon • Vanilla'
  },
  {
    id: 'p15',
    name: 'Dior Sauvage Eau de Parfum',
    description: 'น้ำหอมผู้ชายสุดฮิตสายเท่ มีเอกลักษณ์ด้วยเบอร์กาม็อตสดชื่นตัดกับพริกไทยเผ็ดนิด ๆ ตามด้วยลาเวนเดอร์และวานิลลาให้ความอบอุ่นเซ็กซี่ กลิ่นสะอาดแมน ๆ ใส่ได้ทั้งไปทำงานและออกเดตตอนกลางคืน',
    price: 3490, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/15.dior-sauvage-edp.webp',
    volume: '100 ml',
    notes: 'Bergamot • Sichuan Pepper • Lavender • Vanilla'
  },
  {
    id: 'p16',
    name: 'Guy Laroche Drakkar Intense',
    description: 'น้ำหอมผู้ชายโทนสไปซี่ฟูเชร์ กลิ่นแน่นเท่แบบวินเทจแต่ปรับให้โมเดิร์น เปิดด้วยแอบซินท์ ผสมเบอร์กาม็อตและโรสแมรี่เผ็ดนิด ๆ ตามด้วยลาเวนเดอร์และเสจให้ความอบอุ่น ปิดท้ายด้วยแพทชูลี มอส และหนังกลับ เหมาะกับสายแมนเข้ม ใส่กลางคืนยิ่งเด่น',
    price: 2590, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/16.drakkar-intense.webp',
    volume: '100 ml',
    notes: 'Wormwood • Bergamot • Lavender • Patchouli • Suede'
  },
  {
    id: 'p17',
    name: 'YSL Black Opium',
    description: 'กลิ่นซิกเนเจอร์กาแฟผสมวานิลลา หอมหวานเข้มข้น แอบสไปซ์นิด ๆ ให้ฟีลลึกลับ เซ็กซี่ เหมาะกับสายปาร์ตี้กลางคืนหรือเดตพิเศษ',
    price: 1690, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/17.black-opium.webp',
    volume: '50 ml',
    notes: 'Coffee • Vanilla • Oriental Night'
  },
  {
    id: 'p18',
    name: 'Bleu de Chanel Eau de Parfum',
    description: 'น้ำหอมผู้ชายตัวท็อปสายหล่อเนี้ยบ เปิดด้วยเกรปฟรุตและมินต์ให้ความสดชื่นแมน ๆ ตามด้วยขิงและพริกไทยเพิ่มความเท่มีสไตล์ ปิดท้ายด้วยไม้ซีดาร์ จันทน์ และกำยาน กลิ่นสะอาด หรู ดูแพง ใส่ได้ทุกโอกาสทั้งทำงานและออกเดต',
    price: 3990, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/18.bleu-de-chanel-edp.webp',
    volume: '100 ml',
    notes: 'Grapefruit • Mint • Incense • Cedarwood'
  },
  {
    id: 'p19',
    name: 'BVLGARI Man In Black',
    description: 'น้ำหอมผู้ชายโทนเข้ม สุขุม เซ็กซี่ เปิดด้วยกลิ่นรัมและเครื่องเทศอุ่น ๆ ตามด้วยหนังและดอกไม้ขาวนิด ๆ ปิดท้ายด้วยท็องก้าบีนและไม้หอม ให้ฟีลหนุ่มเท่ลุคสไตล์แบดบอย ใส่กลางคืนหรือโอกาสพิเศษแล้วโคตรเด่น',
    price: 3290, // ราคาประมาณ ๆ มึงค่อยปรับตามที่ขายจริงได้
    image: '/images/perfumes/19.bvlgari-man-in-black.jpg',
    volume: '100 ml',
    notes: 'Rum • Spices • Leather • Tonka Bean'
  }







];



