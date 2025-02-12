import WelcomePage from "./apiflow_components/sign/Welcome-page";

export default async function Home() {
  // If none of the above conditions are met, render the App component
  return <WelcomePage />;
}
