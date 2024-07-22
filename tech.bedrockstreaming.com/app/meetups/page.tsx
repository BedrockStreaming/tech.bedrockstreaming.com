import Layout from "../../components/layout";
import React from "react";
import { Conference, getConferences } from "../../lib/api";

export default async function Page() {
  const conferences: Conference[] = getConferences();
  const sortedConferences = conferences.reduce((acc, conference) => {
    const year = conference.date.getFullYear();
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][conference.title]) {
      acc[year][conference.title] = [];
    }
    acc[year][conference.title].push(conference);
    return acc;
  }, {});
  return (
    <Layout>
      <section
        className={"bg-black text-white shadow-2xl p-[9%] font-bold text-4xl"}
        style={{ backgroundImage: "url(/images/common/banner_xl.jpg)" }}
      >
        <h1 className={"text-center my-5"}>Meetups & Conferences</h1>
      </section>
      <section className={"my-12 px-[15%]"}>
        <p>
          Bedrock through its actions, sponsors events in France, hosts Meetup
          and conferences in its auditorium. Each of those events is an
          opportunity for Bedrock members to give conferences in France or
          abroad.
        </p>
        <p className={"italic"}>⭐ sponsored by Bedrock 🏠 hosted by Bedrock</p>
      </section>
      <section className={"px-[15%] mb-16"}>
        {Object.keys(sortedConferences)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((year) => (
            <div key={year}>
              <h2 className={"text-2xl font-bold"}>{year}</h2>
              {Object.keys(sortedConferences[year]).map((title) => (
                <div key={title}>
                  <ul>
                    {sortedConferences[year][title].map(
                      (conference: Conference) => {
                        return (
                          <li key={conference.title}>
                            {`${conference.date
                              .toLocaleDateString("fr")
                              .slice(0, -5)} : ${conference.title}`}
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
              ))}
            </div>
          ))}
      </section>
    </Layout>
  );
}
