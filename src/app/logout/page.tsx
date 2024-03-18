"use client";

export default function page() {

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    window.dispatchEvent(new Event("localStorageChange"));
    window.location.href = "/kirjaudu";
  }
  return null;
}
