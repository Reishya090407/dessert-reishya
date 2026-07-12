let dataKeranjang = [];

// Fungsi memasukkan menu ke keranjang
function tambahKeKeranjang(namaDessert, harga) {
    dataKeranjang.push({ nama: namaDessert, harga: harga });
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
        listTempatBarang.innerHTML = "<p style='text-align:center; color:#999;'>Keranjang kamu kosong</p>";
        tempatTotalHarga.innerText = "Rp 0";
        modal.style.display = "block";
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

        // Menampilkan total harga setelah selesai looping semua item
        tempatTotalHarga.innerText = "Total: Rp " + totalHarga.toLocaleString('id-ID');
        modal.style.display = "block";
    }
}

// Fungsi menutup pop-up keranjang
function tutupKeranjang() {
    document.getElementById('cart-modal').style.display = "none";
}

// Fungsi kirim pesanan otomatis langsung terketik ke WhatsApp admin
function checkoutWhatsApp() {
    let teksPesan = "Halo MINI BITES, saya mau pesan dessert ini:\n\n";
    let total = 0;

    dataKeranjang.forEach(function(item, index) {
        teksPesan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}\n`;
        total += item.harga;
    });

    teksPesan += `\n*Total Tagihan:* Rp ${total.toLocaleString('id-ID')}\n\nMohon diproses ya!`;

    // Format link WhatsApp universal
    let urlWhatsApp = "https://api.whatsapp.com/send?phone=6281310843010&text=" + encodeURIComponent(teksPesan);

    // Buka tab WhatsApp baru
    window.open(urlWhatsApp, '_blank');
}
