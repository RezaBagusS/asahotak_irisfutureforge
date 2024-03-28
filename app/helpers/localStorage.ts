'use client'

import { jwtDecode } from "jwt-decode";

// asahOtak_UD348 = userData
// asahOtak_TN903 = token
// asahOtak_EP728 = exp

  export const setLocalStorage = (userData:any, token:string) => {
    const exp:any = jwtDecode(token).exp;
  
    if (typeof window !== 'undefined') {
      localStorage.setItem("asahOtak_UD348", btoa(JSON.stringify(userData)));
      localStorage.setItem("asahOtak_TN903", token);
      localStorage.setItem("asahOtak_EP728", exp);
    }
  };

  export const customLocalStorage = (key:string, value:any) => {
    if (typeof window !== 'undefined') {
      localStorage
        .setItem(key, value);
    }
  }
  
  export const getActiveUser = () => {
    const expirationTime = localStorage.getItem("asahOtak_EP728");

    if (typeof window !== 'undefined') {
      const hasToken =
        localStorage.getItem("asahOtak_TN903") &&
        localStorage.getItem("asahOtak_UD348") &&
        expirationTime !== null &&
        Date.now() < Number(expirationTime) * 1000;

        return hasToken;
    }
    
  };

  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("asahOtak_TN903");
    }
  }

  export const getUser = () => {
    try {
      let decoded = atob(localStorage.getItem("asahOtak_UD348") || "");
      return JSON.parse(decoded);
    } catch (e) {
      return {};
    }
  };

export const invalidateSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
}