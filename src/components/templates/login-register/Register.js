import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";

import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword, valiadtePhone } from "@/utils/auth";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hideOtpForm = () => {
    setIsRegisterWithOtp(false);
  };

  const signUp = async () => {
    // Validation
    if (!name.trim()) {
      return showSwal("نام را وارد بکنید", "error", "تلاش مجدد");
    }

    const isValidPhone = valiadtePhone(phone);
    if (!isValidPhone) {
      return showSwal("شماره تماس وارد شده معتبر نیست", "error", "تلاش مجدد ");
    }

    if (email) {
      const isValidEmail = valiadteEmail(email);
      if (!isValidEmail) {
        return showSwal("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد ");
      }
    }

    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد وارد شده قابل حدس هست", "error", "تلاش مجدد ");
    }

    const user = { name, phone, email, password };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(res);
    if (res.status === 201) {
      showSwal("ثبت نام با موفقیت انجام شد", "success", "ورود به پنل کاربری");
    } else if (res.status === 422) {
      showSwal("کاربری با این اطلاعات از قبل وجود دارد", "error", "تلاش مجدد");
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="نام"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل (دلخواه)"
            />

            {isRegisterWithPass && (
              <input
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="رمز عبور"
              />
            )}

            <p
              style={{ marginTop: "1rem" }}
              onClick={() => setIsRegisterWithOtp(true)}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              style={{ marginTop: ".7rem" }}
              onClick={() => {
                if (isRegisterWithPass) {
                  signUp();
                } else {
                  setIsRegisterWithPass(true);
                }
              }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p className={styles.back_to_login}>برگشت به ورود</p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
