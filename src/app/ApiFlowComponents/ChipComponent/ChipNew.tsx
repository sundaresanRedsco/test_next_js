import * as React from "react";
// import { ReactMultiEmail, isEmail } from "react-multi-email";
// import "react-multi-email/dist/style.css";

interface Props {}

function ChipNew(props: Props) {
  const [emails, setEmails] = React.useState<string[]>([]);
  const [focused, setFocused] = React.useState(false);

  return (
    <form>
      <h3>Email</h3>
      {/* <ReactMultiEmail
        placeholder="Input your email"
        emails={emails}
        onChange={(_emails: string[]) => {
          setEmails(_emails);
        }}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      /> */}
      <br />
      <h4>react-multi-email value</h4>
      <h3>Focused: {focused ? "true" : "false"}</h3>
      <p>{emails.join(", ") || "empty"}</p>
    </form>
  );
}

export default ChipNew;
