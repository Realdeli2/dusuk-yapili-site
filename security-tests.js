<script>
  // OTP kodunu saklayan değişken
  let generatedOTP = null;

  // Global erişim için window nesnesine açıkça atıyoruz
  window.sendOTPCode = function() {
    const log = document.getElementById('mfaLog');
    if (!log) {
      alert("Hata: mfaLog kutusu bulunamadı!");
      return;
    }
    
    // 6 haneli rastgele OTP kodu üretme
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    
    log.innerHTML = `[SMS / AUTHENTICATOR] Yeni OTP Kodu Üretildi: <b style="color:#00ff00; font-size:16px;">${generatedOTP}</b><br><span style="color:#ffcc00;">[BİLGİ]</span> Bu kodu kutuya girip Doğrula'ya basın.`;
  };

  window.verifyOTPCode = function() {
    const log = document.getElementById('mfaLog');
    const input = document.getElementById('otpInput');
    const userCode = input ? input.value.trim() : '';

    if (!log) return;

    if (!generatedOTP) {
      log.innerHTML = `<span style="color:#ff4d4d;">[HATA] Önce '1. Adım: OTP Kodu Gönder' butonuna basmalısınız!</span>`;
      return;
    }

    if (userCode === generatedOTP) {
      log.innerHTML = `<span style="color:#5cb85c; font-weight:bold;">[BAŞARILI 200 OK]</span> 2FA Doğrulandı! Oturum açıldı.<br><small style="color:#aaa;">(OTP Kodu kullanıldı)</small>`;
      generatedOTP = null; 
      if (input) input.value = '';
    } else {
      log.innerHTML = `[SMS / AUTHENTICATOR] Üretilen Kod: <b style="color:#00ff00;">${generatedOTP}</b><br><span style="color:#d9534f; font-weight:bold;">[REDDEDİLDİ 401]</span> Hatalı OTP Kodu! Lütfen tekrar deneyin.`;
    }
  };
</script>
