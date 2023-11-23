import Image from "next/image";
import React from "react";

const listItems = [
  {
    title: "Professional Connections",
    description:
      "Forge valuable professional relationships, exchange insights, and grow your network.",
    image: "/images/professional-connections.svg",
  },
  {
    title: "Romance and Friendship",
    description:
      "Find romance or develop lasting friendships with individuals who share your interests and values.",
    image: "/images/romance-and-friendship.svg",
  },
  {
    title: "Collaboration Opportunities",
    description:
      "Find the perfect partner for your next project or join forces with talented individuals in your field.",
    image: "/images/collaboration-opportunities.svg",
  },
  {
    title: "Join Existing Projects",
    description:
      "Accelerate your projects by joining pre-formed teams with complementary skills and shared goals.",
    image: "/images/join-existing-projects.svg",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-secondary">
      <div id="features" className="container py-16">
        <div className="grid place-items-stretch gap-12 lg:grid-cols-2">
          {listItems.map(({ title, description, image }) => (
            <div
              key={title}
              className="px-12 py-16 text-center bg-background rounded-xl flex flex-col justify-between items-center gap-6"
            >
              <div>
                <h3 className="tracking-tight text-4xl sm:text-5xl">{title}</h3>

                <p className="mt-8 text-muted-foreground sm:">{description}</p>
              </div>

              <Image
                src={image}
                alt=""
                width={500}
                height={500}
                className="w-auto p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
