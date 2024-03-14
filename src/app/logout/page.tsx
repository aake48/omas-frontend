"use client";

export default function page() {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  window.dispatchEvent(new Event("localStorageChange"));
  window.location.href = "/kirjaudu";
  return null;
}
