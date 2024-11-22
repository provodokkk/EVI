import { getHumeAccessToken } from "../utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import ClientComponent from "../components/ClientComponent";
import GradientBackground from "../components/GradientBackground";

const Chat = dynamic(() => import("../components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    return (
      <div>
        <h1>Error: Unable to retrieve access token.</h1>
        <p>Please check your API key and client secret.</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col relative overflow-hidden ">
      <GradientBackground />
      <div className="relative z-10 mt-20">
        <ClientComponent accessToken={accessToken} />
      </div>
    </div>
  );
}
