// components/ReCAPTCHAForm.tsx
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCAPTCHAForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmitWithReCAPTCHA = async (event: React.FormEvent) => {
    event.preventDefault();
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      // Process the token as needed
      console.log("reCAPTCHA Token:", token);
    }
  };

  return (
    <form onSubmit={onSubmitWithReCAPTCHA} className="w-full mb-4">
      <div className="w-full flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Ld30sAZAAAAACTxwbmIdj1Mo5EYDOK8Oxy7dEbv"
        />
      </div>
    </form>
  );
};

export default ReCAPTCHAForm;
