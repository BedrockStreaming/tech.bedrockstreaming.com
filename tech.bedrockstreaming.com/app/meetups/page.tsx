import Layout from "../../components/layout";
import React from "react";
import { Conference, getConferences } from "../../lib/api";

export default async function Page() {
  const conferences: Conference[] = getConferences();
  const sortedConferences = {};
  conferences.forEach((conference) => {
    if (!sortedConferences[conference.date.getFullYear()]) {
      sortedConferences[conference.date.getFullYear()] = [];
    }
    if (
      !sortedConferences[conference.date.getFullYear()][
        conference.eventName ?? ""
      ]
    ) {
      sortedConferences[conference.date.getFullYear()][
        conference.eventName ?? ""
      ] = [];
    }
    sortedConferences[conference.date.getFullYear()][
      conference.eventName ?? ""
    ].push(conference);
  });

  //TODO: display sortedConferences
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
          abroad.{" "}
        </p>
        <p className={"italic"}>⭐ sponsored by Bedrock 🏠 hosted by Bedrock</p>
      </section>
      <p>{}</p>
    </Layout>
  );
}
