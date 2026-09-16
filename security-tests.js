// --- 6. 2FA / MFA (İKI FAKTÖRLÜ DOĞRULAMA) SIMULATION ---
let generatedOTP = null;

window.sendOTPCode = function() {
  const log = document.getElementById('mfaLog');
  // 6 haneli rastgele OTP kodu üretme
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  
  log.innerHTML = `
    [SMS / AUTHENTICATOR] Yeni OTP Kodu Üretildi: <b style="color:#00ff00; font-size:14px;">${generatedOTP}</b><br>
    <span style="color:#ffcc00;">[BİLGİ]</span> Lütfen bu kodu aşağıdaki doğrulama kutusuna girin.
  `;
};

window.verifyOTPCode = function() {
  const log = document.getElementById('mfaLog');
  const userCode = document.getElementById('otpInput')?.value.trim();

  if (!generatedOTP) {
    log.innerHTML = `<span style="color:#ff4d4d;">[HATA] Önce 'OTP Kodu Gönder' butonuna basmalısınız!</span>`;
    return;
  }

  if (userCode === generatedOTP) {
    log.innerHTML += `<br><span style="color:#5cb85c; font-weight:bold;">[BAŞARILI 200 OK]</span> 2FA Doğrulandı! Oturum açıldı.`;
  } else {
    log.innerHTML += `<br><span style="color:#d9534f; font-weight:bold;">[REDDEDİLDİ 401]</span> Hatalı OTP Kodu! Erişim engellendi.`;
  }
};
