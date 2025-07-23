import React, { useState } from "react";

export default function Apply() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0].name : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Application submitted!");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Job Application</h2>

        <div className="mb-4">
          <label className="label">Full Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="label">Position</label>
          <input
            type="text"
            name="position"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="label">Upload Resume</label>
          <input
            type="file"
            name="resume"
            className="file-input file-input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn bg-pink-500 text-white w-full">Submit Application</button>
      </form>
    </div>
  );
}
