import Image from "next/image";
import React from "react";

const listItems = [
  {
    title: "Professional Connections",
    description:
      "Forge valuable professional relationships, exchange insights, and grow your network.",
    image: "/images/professional-connections.png",
  },
  {
    title: "Romance and Friendship",
    description:
      "Find romance or develop lasting friendships with individuals who share your interests and values.",
    image: "/images/romance-and-friendship.png",
  },
  {
    title: "Forums and Communities",
    description:
      "Engage in meaningful discussions, ask questions, and share your knowledge.",
    image: "/images/forums-and-communities.png",
  },
  {
    title: "Collaboration Opportunities",
    description:
      "Find the perfect partner for your next project or join forces with talented individuals in your field.",
    image: "/images/collaboration-opportunities.png",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-secondary">
      <div id="why-choose-us" className="container py-16">
        <div className="grid place-items-stretch gap-12 lg:grid-cols-2">
          {listItems.map(({ title, description, image }) => (
            <div
              key={title}
              className="px-12 py-16 text-center bg-background flex flex-col justify-between items-center gap-6"
            >
              <div>
                <h3 className="text-5xl tracking-tight">{title}</h3>

                <p className="mt-8 text-xl text-muted-foreground">
                  {description}
                </p>
              </div>

              <div className="h-auto">
                <Image src={image} alt="" width={500} height={500} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
