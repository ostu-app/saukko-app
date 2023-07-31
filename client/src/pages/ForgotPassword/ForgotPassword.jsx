import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import WavesHeader from '../../components/Header/WavesHeader';
import Notification from '../../components/Notification/Notification';
import * as EmailValidator from 'email-validator';
import { forgotPassword } from '../../api/user';

const ForgotPassword = () => {
  const color = '#00005E'
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const formRef = useRef();
  const emailRef = useRef();

  const processForgotPassword = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    if (!EmailValidator.validate(email)) {
      console.log('Invalid email');
      return;
    }

    try {
      const res = await forgotPassword(email);
      console.log(res);
      setNotificationVisible(true);
    } catch (error) {
      console.log(error);
    }

    // setNotificationVisible(true);
    console.log(email);
  };

  useEffect(() => {
    setButtonDisabled(email.length === 0);
  }, [email]);

  const buttonStyleDisabled = {
    color: 'var(--saukko-main-white)',
    border: 'var(--link-disabled)',
    background: 'var(--link-disabled)',
  };

  const buttonStyleEnabled = {
    color: 'var(--saukko-main-white)',
    border: 'var(--saukko-main-black)',
    background: 'var(--saukko-main-black)',
  };

  return (
    <main className='forgotPassword__wrapper'>
      {!notificationVisible && <WavesHeader title='Saukko' fill='#9fc9eb' header={color} />}
      {!notificationVisible && (
        <section className='forgotPassword__container'>
          <h2>Unohtuiko salasana?</h2>
          <p>Täytä sähköpostiosoitteesi alle, jotta saat<br></br>ohjeet salasanasi vaihtamiseen. </p>
          <form ref={formRef} onSubmit={processForgotPassword}>
            <section className='forgotPassword__container--form-text'>
              <label htmlFor='email'>Sähköposti *</label>
              <input
                ref={emailRef}
                type='email'
                id='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}

              />
            </section>
          </form>
        </section>
      )}
      {!notificationVisible && (
        <section className='forgotPassword__form--bottom'>
          <Button
            style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
            onClick={processForgotPassword}
            type='submit'
            text='Lähetä'
          />
        </section>
      )}

      {notificationVisible && (
        <Notification
          navigatePage="/login"
          headerColor={color}
          bodyColor={color}
          heading='Tarkista sähköpostisi'
          headingColor={'white'}
          icon='gg:check-o'
          iconColor={'white'}
        />
      )}
    </main>
  );
};

export default ForgotPassword;



