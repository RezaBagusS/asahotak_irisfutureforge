const CryptoJS = require('crypto-js');

  export const hashLink = (text: string) => {
    const hashAlgorithm = CryptoJS.SHA256;
  
    const hash = hashAlgorithm(text);
  
    const hashBase64 = hash.toString(CryptoJS.enc.Base64URLSafe);
  
    return hashBase64;
  };

export const slugify = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')         // Remove all non-word chars
      .replace(/--+/g, '-')           // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }