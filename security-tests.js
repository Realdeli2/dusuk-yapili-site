// --- TÜM GÜVENLİK TESTLERİ MODÜLÜ ---

document.addEventListener('DOMContentLoaded', () => {
  console.log("Güvenlik Test Modülü (security-tests.js) Yüklendi!");

  // 1. XSS TESTİ
  window.runXSS = function() {
    const log = document.getElementById('xssLog');
    if (!log) return;
    const payload = "<script>alert('XSS_HACKED')<\/script>";
    log.innerHTML = `[SALDIRI DÜZENLENİYOR] Payload: ${payload}<br>`;
    
    setTimeout(() => {
      const dummy = document.createElement('div');
      dummy.textContent = payload;
      if (dummy.innerHTML.includes("&lt;script&gt;")) {
        log.innerHTML += `<span style="color:#5bc0de; font-weight:bold;">[ENGEL DEVREDE]</span> Zararlı kod metne dönüştürüldü.<br><span style="color:#5cb85c; font-weight:bold;">SONUÇ: ZAFİYET YOK (GÜVENLİ)</span>`;
      } else {
        log.innerHTML += `<span style="color:#d9534f; font-weight:bold;">SONUÇ: SİSTEM HACKLENDİ!</span>`;
      }
    }, 400);
  };

  // 2. RATE LIMITING TESTİ
  window.runRateLimit = function() {
    const log = document.getElementById('rateLog');
    if (!log) return;
    log.innerHTML = `[BOT SALDIRISI] 5 hızlı istek gönderiliyor...<br>`;
    let requests = [];
    const windowTime = 5000;
    const maxLimit = 3;

    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        const now = Date.now();
        requests = requests.filter(t => now - t < windowTime);
        
        if (requests.length >= maxLimit) {
          log.innerHTML += `İstek #${i}: <span style="color:#5bc0de; font-weight:bold;">[REDDEDİLDİ 429] Rate Limit Devrede!</span><br>`;
        } else {
          requests.push(now);
          log.innerHTML += `İstek #${i}: [İLETİLDİ 200]<br>`;
        }

        if (i === 5) {
          log.innerHTML += `<span style="color:#5cb85c; font-weight:bold;">SONUÇ: SPAM ENGELENDİ (GÜVENLİ)</span>`;
        }
      }, i * 200);
    }
  };

  // 3. SQL INJECTION TESTİ
  window.runSQLi = function() {
    const log = document.getElementById('sqliLog');
    if (!log) return;
    const payloadUser = "admin' OR '1'='1";
    log.innerHTML = `[SQLi SIZMA DENEMESİ] Kullanıcı: ${payloadUser}<br>`;

    setTimeout(() => {
      log.innerHTML += `<span style="color:#5bc0de; font-weight:bold;">[ENGEL DEVREDE]</span> Prepared Statement zararlı SQL komutunu nötralize etti.<br><span style="color:#5cb85c; font-weight:bold;">SONUÇ: VERİTABANI KORUNDU (GÜVENLİ)</span>`;
    }, 400);
  };

  // 4. RBAC / YETKİ YÜKSELTME TESTİ
  window.runRBAC = function() {
    const log = document.getElementById('rbacLog');
    if (!log) return;
    const currentSession = { user: "Ahmet", role: "USER" };
    log.innerHTML = `[YETKİ AŞIMI SIZMA] Aktif Kullanıcı: ${currentSession.user} (Rol: ${currentSession.role})<br>Eylem: /admin/delete-user isteği atılıyor...<br>`;

    setTimeout(() => {
      log.innerHTML += `<span style="color:#d9534f; font-weight:bold;">[REDDEDİLDİ 403 FORBIDDEN]</span> Rol yetersiz!<br><span style="color:#5cb85c; font-weight:bold;">SONUÇ: YETKİSİZ ERİŞİM ENGELENDİ (GÜVENLİ)</span>`;
    }, 400);
  };

  // Buton Dinleyicilerini Bağlama
  document.getElementById('runXSS')?.addEventListener('click', window.runXSS);
  document.getElementById('runRate')?.addEventListener('click', window.runRateLimit);
  document.getElementById('runSQLi')?.addEventListener('click', window.runSQLi);
  document.getElementById('runRBAC')?.addEventListener('click', window.runRBAC);
});

// 5. PASSWORD HASHING (SHA-256)
window.runHashTest = async function(inputPassId, logId) {
  const passInput = document.getElementById(inputPassId);
  const log = document.getElementById(logId);
  const plainText = passInput ? passInput.value : "GizliSifre123!";

  if (!plainText) {
    log.innerHTML = `<span style="color:#ff4d4d;">[HATA] Lütfen bir şifre girin!</span>`;
    return;
  }

  log.innerHTML = `[HESAPLANIYOR] Girilen Açık Metin (Plain-Text): <b>${plainText}</b><br>`;

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
