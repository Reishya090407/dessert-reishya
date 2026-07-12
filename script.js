// const daftarDessert = [
    { id: 1, nama: "Kue Cokelat Lumer", harga: 35000, gambar: "images/kue-cokelat.jpg" },
    { id: 2, nama: "Puding Mangga", harga: 20000, gambar: "images/puding-mangga.jpg" },
    { id: 3, nama: "Red Velvet Cake", harga: 40000, gambar: "images/red-velvet.jpg" },
    { id: 4, nama: "Macaron Rainbow", harga: 25000, gambar: "images/macaron.jpg" },
    { id: 5, nama: "Cupcake Vanilla", harga: 15000, gambar: "images/cupcake.jpg" },
    { id: 6, nama: "Strawberry Shortcake", harga: 45000, gambar: "images/strawberry-cake.jpg" },
    { id: 7, nama: "Tiramisu Box", harga: 38000, gambar: "images/tiramisu.jpg" },
    { id: 8, nama: "Cheesecake Melt", harga: 42000, gambar: "images/cheesecake.jpg" }
];


Array penampung daftar dessert yang dibeli
let dataKeranjang = [];

// Fungsi memasukkan menu ke keranjang
function tambahKeKeranjang(namaDessert, harga) {
    // Masukkan data barang berupa objek ke dalam array
    dataKeranjang.push({ nama: namaDessert, harga: harga });
    
    // Update jumlah angka di navbar
    document.getElementById('cart-count').innerText = dataKeranjang.length;
    
    alert("🧁 " + namaDessert + " masuk ke list pesanan!");
}

// Fungsi membuka pop-up rincian pesanan
function tampilkanKeranjang() {
    let modal = document.getElementById('cart-modal');
    let listTempatBarang = document.getElementById('cart-items-list');
    let tempatTotalHarga = document.getElementById('cart-total-price');
    
    listTempatBarang.innerHTML = ""; // Bersihkan teks kosong awal
    let totalHarga = 0;
    
    if (dataKeranjang.length === 0) {
        listTempatBarang.innerHTML = '<p style="color: #999; text-align: center; margin: 20px 0;">Keranjang masih kosong nih...</p>';
    } else {
        // Susun item belanjaan satu-satu ke dalam HTML pop-up
        dataKeranjang.forEach(function(item) {
            listTempatBarang.innerHTML += `
                <div class="cart-item">
                    <span>${item.nama}</span>
                    <strong>Rp ${item.harga.toLocaleString('id-ID')}</strong>
                </div>
            `;
            totalHarga += item.harga;
        });
    }
    
    // Tampilkan total harga akhir
    tempatTotalHarga.innerText = "Rp " + totalHarga.toLocaleString('id-ID');
    
    // Ubah style display CSS modal jadi block supaya muncul di layar
    modal.style.display = "block";
}

// Fungsi menutup pop-up keranjang
function tutupKeranjang() {
    document.getElementById('cart-modal').style.display = "none";
}

// Fungsi kirim pesanan otomatis langsung terketik ke WhatsApp admin
function checkoutWhatsApp() {
    if (dataKeranjang.length === 0) {
        alert("Keranjang belanja kamu masih kosong!");
        return;
    }
    
    let teksPesan = "Halo MINI BITES, saya mau pesan dessert ini:\n\n";
    let total = 0;
    
    dataKeranjang.forEach(function(item, index) {
        teksPesan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}\n`;
        total += item.harga;
    });
    
    teksPesan += `\n*Total Tagihan:* Rp ${total.toLocaleString('id-ID')}\n\nMohon diproses ya!`;
    
    // Format link WhatsApp universal
    let urlWhatsApp = "https://api.whatsapp.com/send?phone=6281310843010text=" + encodeURIComponent(teksPesan);
    
    // Buka tab WhatsApp baru
    window.open(urlWhatsApp, '_blank');
}