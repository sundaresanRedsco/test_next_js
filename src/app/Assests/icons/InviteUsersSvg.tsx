import React from "react";

type Props = {
  color?: string;
};

export default function InviteUsersSvg({ color }: Props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3208 6.69913C18.3376 5.68228 17.874 4.49459 17.3208 3.91702L14.8803 1.47657C13.8554 0.45972 12.6758 0.923405 12.0982 1.47657L10.7153 2.86763H8.60839C7.06278 2.86763 6.16795 3.68111 5.7124 4.61662L2.10053 8.22848V11.4824L1.52296 12.0518C0.506107 13.0768 0.969792 14.2564 1.52296 14.834L3.96341 17.2744C4.40269 17.7137 4.87451 17.8764 5.32192 17.8764C5.8995 17.8764 6.42826 17.5917 6.74552 17.2744L8.94192 15.0699H11.8623C13.2452 15.0699 13.9448 14.2076 14.197 13.3616C15.1163 13.1175 15.6206 12.4179 15.824 11.7346C17.0849 11.4092 17.5567 10.2134 17.5567 9.37549V6.93504H17.0767L17.3208 6.69913ZM15.9297 9.37549C15.9297 9.74156 15.7752 10.189 15.1163 10.189H14.3028V11.0025C14.3028 11.3685 14.1482 11.8159 13.4893 11.8159H12.6758V12.6294C12.6758 12.9955 12.5212 13.4429 11.8623 13.4429H8.27487L5.60664 16.1111C5.35446 16.347 5.20804 16.2087 5.11855 16.1193L2.68624 13.6951C2.45033 13.4429 2.58862 13.2965 2.67811 13.207L3.7275 12.1495V8.89553L5.35446 7.26857V8.56201C5.35446 9.54632 6.00525 11.0025 7.79491 11.0025C9.58457 11.0025 10.2354 9.54632 10.2354 8.56201H15.9297V9.37549ZM16.1656 5.54399L14.7827 6.93504H8.60839V8.56201C8.60839 8.92807 8.45383 9.37549 7.79491 9.37549C7.13599 9.37549 6.98143 8.92807 6.98143 8.56201V6.12156C6.98143 5.74736 7.11972 4.49459 8.60839 4.49459H11.3824L13.2371 2.63985C13.4893 2.40394 13.6357 2.54224 13.7252 2.63172L16.1575 5.0559C16.3934 5.30808 16.2551 5.4545 16.1656 5.54399Z"
        fill={color ? color : "#F3F3F3"}
        fillOpacity="1"
      />
    </svg>
  );
}
