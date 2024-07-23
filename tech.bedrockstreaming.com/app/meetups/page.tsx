import Layout from "../../components/layout";
import React from "react";
import { Conference, getAuthor, getConferences } from "../../lib/api";
import { format } from "date-fns";
import Link from "next/link";
import Author from "../../interfaces/author";

export default async function Page() {
  const conferences: Conference[] = getConferences();
  const sortedConferences = conferences.sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const groupedConferences = sortedConferences.reduce(
    (acc, conference) => {
      const year = conference.date.getFullYear();
      const dateKey = format(conference.date, "yyyy-MM-dd");
      const eventKey = conference.eventName || "";

      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][dateKey]) {
        acc[year][dateKey] = {};
      }
      if (!acc[year][dateKey][eventKey]) {
        acc[year][dateKey][eventKey] = [];
      }
      acc[year][dateKey][eventKey].push(conference);
      return acc;
    },
    {} as Record<number, Record<string, Record<string, Conference[]>>>,
  );

  return (
    <Layout>
      <section
        className={"bg-black text-white shadow-2xl p-[9%] font-bold text-4xl"}
        style={{ backgroundImage: "url(/images/common/banner_xl.jpg)" }}
      >
        <h1 className={"text-center my-5"}>Meetups & Conferences</h1>
      </section>
      <section className={"mt-12 mb-4 px-[15%]"}>
        <p>
          Bedrock through its actions, sponsors events in France, hosts Meetup
          and conferences in its auditorium. Each of those events is an
          opportunity for Bedrock members to give conferences in France or
          abroad.
        </p>
        <p className={"italic"}>⭐ sponsored by Bedrock 🏠 hosted by Bedrock</p>
      </section>
      <section className={"px-[15%] mb-16"}>
        {Object.entries(groupedConferences)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([year, yearData]) => (
            <div key={year}>
              <h2 className={"text-2xl font-bold my-2"}>{year}</h2>
              {Object.entries(yearData).map(([dateKey, dateData]) => (
                <div key={dateKey}>
                  {Object.entries(dateData).map(
                    ([eventKey, eventConferences]) => (
                      <div key={`${dateKey}-${eventKey}`} className="mb-4">
                        <p className="font-semibold">
                          {`${format(new Date(dateKey), "dd/MM")} : ${eventKey}`}
                          {eventConferences[0].sponsored && " ⭐️"}
                          {eventConferences[0].hosted && " 🏠"}
                        </p>
                        {eventConferences.map((conference) => {
                          let author: Author[] | null = null;
                          if (conference.author) {
                            if (Array.isArray(conference.author)) {
                              author = conference.author.map((a) =>
                                getAuthor(a),
                              );
                            } else {
                              author = [getAuthor(conference.author)];
                            }
                          }

                          let authorOrNothing = author && (
                            <div
                              className={
                                "ml-2 inline-flex justify-around gap-2"
                              }
                            >
                              <span>-</span>
                              {author.map((a) => {
                                if (!a.url) {
                                  return a.name;
                                }
                                return (
                                  <Link
                                    key={a.name}
                                    href={a.url}
                                    className={"hover:text-orange-500"}
                                  >
                                    {a.name}
                                  </Link>
                                );
                              })}
                            </div>
                          );

                          return (
                            <div
                              key={`${conference.date}-${conference.title}`}
                              className="ml-4"
                            >
                              <p className={"inline"}>
                                {conference.eventUrl ? (
                                  <Link
                                    href={conference.eventUrl}
                                    className={"text-orange-500"}
                                  >
                                    {conference.title}
                                  </Link>
                                ) : (
                                  conference.title
                                )}
                              </p>
                              {authorOrNothing}
                            </div>
                          );
                        })}
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          ))}
      </section>
    </Layout>
  );
}
