import React from "react";
import { Link } from "react-router-dom";

const jobOpenings = [
  {
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote",
    description: "React.js, Tailwind CSS, UI/UX understanding required.",
  },
  {
    title: "Backend Developer",
    type: "Full Time",
    location: "Remote",
    description: "Node.js, Express, MongoDB, and REST API skills required.",
  },
  {
    title: "Customer Support Executive",
    type: "Part Time",
    location: "Mumbai Office",
    description: "Strong communication and problem-solving skills required.",
  },
];

export default function Career() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="mb-8 text-lg">
          At Matrimon, we’re building a platform that helps people find meaningful relationships.
          If you're passionate about technology and making a difference, check out our openings below.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {jobOpenings.map((job, idx) => (
            <div key={idx} className="bg-base-100 shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {job.type} • {job.location}
              </p>
              <p className="mb-4">{job.description}</p>
              <Link
                to="/apply"
                className="btn bg-pink-600 text-white btn-sm"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
