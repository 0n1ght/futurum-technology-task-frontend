import { useState } from "react";
import { apiFetch } from "../api";

export default function CampaignForm() {
  const [form, setForm] = useState({
    name: "",
    keywords: "",
    bidAmount: "",
    campaignFund: "",
    status: "",
    town: "",
    radius: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await apiFetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        keywords: form.keywords.split(",").map((k) => k.trim()),
      }),
    });

    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Campaign</h2>

      <input
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="keywords (comma separated)"
        value={form.keywords}
        onChange={(e) => setForm({ ...form, keywords: e.target.value })}
      />

      <input
        placeholder="bidAmount"
        value={form.bidAmount}
        onChange={(e) => setForm({ ...form, bidAmount: e.target.value })}
      />

      <input
        placeholder="campaignFund"
        value={form.campaignFund}
        onChange={(e) => setForm({ ...form, campaignFund: e.target.value })}
      />

      <input
        placeholder="status"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <input
        placeholder="town"
        value={form.town}
        onChange={(e) => setForm({ ...form, town: e.target.value })}
      />

      <input
        placeholder="radius"
        value={form.radius}
        onChange={(e) => setForm({ ...form, radius: e.target.value })}
      />

      <button type="submit">Create</button>
    </form>
  );
}