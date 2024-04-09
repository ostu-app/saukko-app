import { sendEmail } from "../configMailer";
import mailerTemplate from "../mailerHtmlTemplate";

export interface ISendNewCustomerAddedEmail {
  degreeName: string;
  supervisorName: string;
  teacherName: string;
  verificationLink: string;
  userEmail: string;
}

export const sendNewCustomerAddedEmail = (params: ISendNewCustomerAddedEmail) => {

  const text =
  `
  Tervetuloa OsTu-appin käyttäjäksi! 

  Sinut on liitetty osaamisen tunnistamisen toteutukseen. 
  
  
  Tutkinto: ${params.degreeName}
  Työpaikkaohjaaja: ${params.supervisorName}
  Opettaja: ${params.teacherName}
  
  
  Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${params.verificationLink}">tästä linkistä</a>.
  
  Linkki vanhenee kahden tunnin kuluttua.
   
  
  Ystävällisin terveisin,
  Ylläpito
  
  `;

  const subject = 'Uuden asiakkaan lisääminen suoritukseen';
  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};

export interface ISendNewCustomerVerfiedEmail {
  userFirstName: string;
  userEmail: string;
}

export const sendNewCustomerVerifiedEmail = (params: ISendNewCustomerVerfiedEmail) => {

  const text =
  `
  Hei ${params.userFirstName}.

  Salasanasi on nyt vaihdettu ja tilisi aktivoitu. Sinulla on nyt käyttäjätili OsTu-appiin!
  
  Löydät asiakkuuteesi liittyvät tiedot omalta tililtäsi, jossa voit myös päivittää omia tietojasi.
  
  Tervetuloa mukaan!
  
  
  Ystävällisin terveisin,
  Ylläpito
  `;
 
  const subject = 'Uusi asiakas liitetty suoritukseen';
  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};


export interface ISendNewSupervisorAddedEmail {
  userEmail: string;
  customerName: string;
  degreeName: string;
  supervisorName: string;
  verificationLink: string;
}

export const sendNewSupervisorAddedEmail = (params: ISendNewSupervisorAddedEmail) => {

    const text =
    `
    Tervetuloa OsTu-appin käyttäjäksi! 
  
    Sinut on liitetty henkilön ${params.customerName} osaamisen tunnistamisen toteutukseen. 
    
    
    Asiakas: ${params.customerName}
    Tutkinto: ${params.degreeName}
    Työpaikkaohjaaja: ${params.supervisorName}
    
    
    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${params.verificationLink}">tästä linkistä</a>.
    
    Linkki vanhenee kahden tunnin kuluttua. 
      
    
    Ystävällisin terveisin, 
    Ylläpito 
    `;
  
    const subject = 'Uusi työpaikkaohjaaja liitetty suoritukseen';
    const html = mailerTemplate(text);
  
    sendEmail({ to: params.userEmail, subject, html });
  };

  export interface ISendOldSupervisorAddedEmail {
    userFirstName: string;
    userEmail: string;
    customerName: string;
    degreeName: string;
    teacherName: string;
  }

  
  export const sendOldSupervisorAddedEmail = (params: ISendOldSupervisorAddedEmail) => {

    const text =
    `
    Hei ${params.userFirstName}.
  
    Sinut on liitetty henkilön ${params.customerName} osaamisen tunnistamisen toteutukseen.
    
    
    Asiakas: ${params.customerName} 
    Tutkinto: ${params.degreeName} 
    Opettaja: ${params.teacherName} 
    
    
    Ystävällisin terveisin,
    Ylläpito
  
    `;
  
    const subject = 'Vanha työpaikkaohjaaja liitetty suoritukseen';
    const html = mailerTemplate(text);
  
    sendEmail({ to: params.userEmail, subject, html });
  };