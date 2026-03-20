import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api";

export default function CampaignEdit() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    keywords: "",
    bidAmount: "",
    campaignFund: "",
    status: "",
    town: "",
    radius: "",
  });

  useEffect(() => {
    apiFetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        const campaign = data.find((c) => c.id === Number(id));

        setForm({
          ...campaign,
          keywords: campaign.keywords.join(", "),
        });
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await apiFetch(`/api/campaigns/${id}`, {
      method: "PUT",
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
      <h2>Edit Campaign</h2>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="name"
      />

      <input
        value={form.keywords}
        onChange={(e) => setForm({ ...form, keywords: e.target.value })}
        placeholder="keywords (comma separated)"
      />

      <input
        value={form.bidAmount}
        onChange={(e) => setForm({ ...form, bidAmount: e.target.value })}
        placeholder="bidAmount"
      />

      <input
        value={form.campaignFund}
        onChange={(e) => setForm({ ...form, campaignFund: e.target.value })}
        placeholder="campaignFund"
      />

      <input
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        placeholder="status"
      />

      <input
        value={form.town}
        onChange={(e) => setForm({ ...form, town: e.target.value })}
        placeholder="town"
      />

      <input
        value={form.radius}
        onChange={(e) => setForm({ ...form, radius: e.target.value })}
        placeholder="radius"
      />

      <button type="submit">Save</button>
    </form>
  );
}