import React, { useState } from "react";

export default function CookieConsent({ onConsent }) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [promotionalChecked, setPromotionalChecked] = useState(false);
  const [neededChecked, setNeededChecked] = useState(false);

  const handleAccept = (event) => {
    event.preventDefault();

    if (!allChecked && !promotionalChecked && !neededChecked) {
      alert('Please agree to at least 1 cookie consent or decline');
    } else {
      console.log('Accepted');
      setConsentGiven(true);
      onConsent(true);
    }
  };

  const handleDecline = (event) => {
    event.preventDefault();
    console.log('Declined cookies');
    window.location.href = 'https://en.wikipedia.org/wiki/Cookie_Monster';
  };

  if (consentGiven) {
    return null;
  }

  return (
    <div className="cookie-consent-banner" id="cookieBanner">
      <p>We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.</p>
      <label htmlFor="All">All</label>
      <input type="checkbox" name="All" id="All" checked={allChecked} onChange={() => setAllChecked(!allChecked)} />

      <label htmlFor="Promotional">Promotional</label>
      <input type="checkbox" id="Promotional" checked={promotionalChecked} onChange={() => setPromotionalChecked(!promotionalChecked)} />

      <label htmlFor="Needed">Needed</label>
      <input type="checkbox" id="Needed" checked={neededChecked} onChange={() => setNeededChecked(!neededChecked)} />

      <button id="acceptButton" onClick={handleAccept}>Consent</button>
      <button id="declineButton" onClick={handleDecline}>Decline</button>
    </div>
  );
}