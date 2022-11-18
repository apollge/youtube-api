import { type NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import axios from "../utils/axios";

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [videoResults, setVideoResults] = useState<any>();
  const [topResult, setTopResult] = useState<any>();

  const handleSubmit = useCallback(async () => {
    const { data } = await axios.get("/search", {
      params: {
        q: searchText,
      },
    });

    setVideoResults(data);
    setTopResult(data.items[0]);
  }, [searchText]);

  return (
    <>
      <Head>
        <title>YouTube API</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="white flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {/** Search Bar */}
          <div className="flex w-full flex-col justify-center gap-4">
            <h1 className="text-4xl font-bold">YouTube API</h1>
            <form
              className="flex w-full gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search for a video"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className=" rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="submit"
                onClick={handleSubmit}
              >
                Search
              </button>
            </form>
          </div>

          {searchText && (
            <div className="flex w-full flex-row gap-4">
              {topResult && (
                <div className="flex w-2/3 flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <iframe
                      id="player"
                      height="558"
                      src={`http://www.youtube.com/embed/${topResult.id.videoId}`}
                      className="rounded-md"
                    />
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-bold">
                        {topResult.snippet.title}
                      </h3>
                      <p>{topResult.snippet.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {videoResults && (
                <div className="flex w-1/3 flex-col gap-4">
                  {videoResults?.items.map((video: any) => (
                    <div
                      className="flex cursor-pointer gap-4"
                      key={video.id.videoId}
                      onClick={() => {
                        setTopResult(video);
                      }}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-1/2 rounded-md"
                      />
                      <h3 className="w-1/2 text-xl font-bold">
                        {video.snippet.title}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
