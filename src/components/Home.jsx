import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    apiFetch("/api/account/me")
      .then((res) => res.json())
      .then((data) => setAccount(data));

    apiFetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 20 }}>
        {account && (
          <div>
            <strong>{account.username}</strong> | Balance: {account.balance}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => {
                localStorage.removeItem("auth");
                window.location.href = "/register";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <h2>Campaigns</h2>

        <button
          onClick={() => {
            window.location.href = "/campaign/new";
          }}
        >
          Add campaign
        </button>

        {campaigns.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid black",
              margin: 10,
              padding: 10,
            }}
          >
            <h3>{c.name}</h3>
            <p>Status: {c.status}</p>
            <p>Budget: {c.campaignFund}</p>
            <p>Bid: {c.bidAmount}</p>
            <p>City: {c.town}</p>
            <p>Radius: {c.radius}</p>
            <p>Keywords: {c.keywords.join(", ")}</p>

            <button
              onClick={() => {
                window.location.href = `/campaign/${c.id}`;
              }}
            >
              Edit
            </button>

            <button
              onClick={async () => {
                await apiFetch(`/api/campaigns/${c.id}`, {
                  method: "DELETE",
                });

                setCampaigns((prev) => prev.filter((x) => x.id !== c.id));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}