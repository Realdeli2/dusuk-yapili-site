// --- 5. PASSWORD HASHING (SHA-256) SIMULATION ---
window.runHashTest = async function(inputPassId, logId) {
  const passInput = document.getElementById(inputPassId);
  const log = document.getElementById(logId);
  const plainText = passInput ? passInput.value : "GizliSifre123!";

  if (!plainText) {
    log.innerHTML = `<span style="color:#ff4d4d;">[HATA] Lütfen bir şifre girin!</span>`;
    return;
  }

  log.innerHTML = `[HESAPLANIYOR] Girilen Açık Metin (Plain-Text): <b>${plainText}</b><br>`;

  // Tarayıcının yerel Web Crypto API'si ile SHA-256 Hash üretme
  const msgUint8 = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  setTimeout(() => {
    log.innerHTML += `
      <span style="color:#ffcc00;">[VERİTABANINDA SAKLANAN HASH]:</span><br>
      <code style="word-break:break-all; color:#00ff00;">${hashHex}</code><br><br>
      <span style="color:#5cb85c;">[GÜVENLİK ANALİZİ]</span> Veritabanı ele geçirilse bile bu Hash geri çözülemez (One-Way Function).
    `;
  }, 400);
};
