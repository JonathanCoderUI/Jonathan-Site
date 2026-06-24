let stok = 10;

function beliProduk() {
    if (stok > 0) {
        stok = stok - 1;
        
        document.getElementById("stok-case").innerText = stok + " pcs";
        
        alert("🛒 Transaksi Berhasil! Terima kasih sudah berbelanja.");
    } else {
        alert("❌ Maaf, stok Premium Case sudah habis!");
    }
}