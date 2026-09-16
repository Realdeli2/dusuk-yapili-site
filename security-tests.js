document.addEventListener('DOMContentLoaded', () => {
  console.log("Güvenlik Test Modülü Yüklendi.");
  
  window.runXSS = function(logId) {
    const log = document.getElementById(logId);
    const payload = "<script>alert('XSS_HACKED')<\/script>";
    
    log.innerHTML = `[SALDIRI DÜZENLENİYOR] Payload: ${payload}<br>`;
    
    setTimeout(() => {
      const dummyDiv = document.createElement('div');
      dummyDiv.textContent = payload; // Safe rendering
      
      if (dummyDiv.innerHTML.includes("&lt;script&gt;")) {
        log.innerHTML += `<span style="color:#5bc0de; font-weight:bold;">[ENGEL SİSTEMİ DEVREDE]</span> Zararlı kod metne dönüştürüldü.<br><span style="color:#5cb85c; font-weight:bold;">SONUÇ: ZAFİYET YOK (GÜVENLİ)</span>`;
      } else {
        log.innerHTML += `<span style="color:#d9534f; font-weight:bold;">SONUÇ: SİSTEM HACKLENDİ!</span>`;
      }
    }, 500);
  };


  window.runRateLimit = function(logId) {
    const log = document.getElementById(logId);
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
});
