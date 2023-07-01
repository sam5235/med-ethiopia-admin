import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/patients");
  }, []);
  return (
    <div>
      <h1>Logged In</h1>
    </div>
  );
}

export default Home;
