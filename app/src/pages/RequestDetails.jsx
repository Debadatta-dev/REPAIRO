import { useLocation, useNavigate } from "react-router-dom";
import RequestTimeline from "../components/RequestTimeline";
import API from "../api/axios";
import { useState } from "react";

function RequestDetails() {

  const { state } = useLocation();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  // IMPORTANT
  if (!state) {

    return (

      <div className="
        min-h-screen
        bg-[#020617]
        text-white
        flex
        items-center
        justify-center
      ">

        <p className="text-xl text-gray-400">
          No request data found
        </p>

      </div>
    );
  }

  const req = state;

  const handleDecision = async (
    decision
  ) => {

    try {

      setLoading(true);

      await API.post(
        "/user/decision",
        {
          requestId: req._id,
          decision
        }
      );

      alert(
        decision === "approved"
          ? "Approved"
          : "Rejected"
      );

      window.location.reload();

    } catch (err) {

      console.error(err);

      alert("Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-[#0f172a]
      via-[#020617]
      to-black
      text-white
      p-4
      sm:p-8
    ">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="
          mb-6
          text-gray-300
          hover:text-white
          transition
        "
      >
        ← Back
      </button>

      {/* CARD */}
      <div className="
        max-w-2xl
        mx-auto
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        shadow-2xl
      ">

        {/* TITLE */}
        <h1 className="
          text-3xl
          font-bold
          mb-3
        ">
          Repair Request
        </h1>

        {/* DESCRIPTION */}
        <div className="mb-5">

          <p className="
            text-gray-400
            text-sm
            mb-2
          ">
            Description
          </p>

          <p className="text-lg">
            {req.description}
          </p>

        </div>

        {/* STATUS */}
        <div className="mb-5">

          <p className="
            text-gray-400
            text-sm
            mb-2
          ">
            Current Status
          </p>

          <span className="
            px-4
            py-2
            rounded-full
            bg-green-500/20
            text-green-400
            text-sm
            font-semibold
          ">
            {req.status}
          </span>

        </div>

        {/* DATE */}
        <div className="mb-5">

          <p className="
            text-gray-400
            text-sm
            mb-2
          ">
            Created At
          </p>

          <p>
            {new Date(
              req.createdAt
            ).toLocaleString()}
          </p>

        </div>

        {/* DIAGNOSIS */}
        {req.diagnosis && (

          <div className="
            mb-6
            p-4
            rounded-2xl
            bg-white/5
            border
            border-white/10
          ">

            <h2 className="
              text-xl
              font-semibold
              mb-3
            ">
              Diagnosis
            </h2>

            <p>
              Issue:
              {" "}
              {req.diagnosis.issue}
            </p>

            <p>
              Cost:
              {" "}
              ₹{req.diagnosis.cost}
            </p>

          </div>
        )}

        {/* APPROVAL */}
        {req.status === "diagnosed" && (

          <div className="
            flex
            gap-4
            mb-8
          ">

            <button
              onClick={() =>
                handleDecision(
                  "approved"
                )
              }
              disabled={loading}
              className="
                bg-green-500
                hover:bg-green-600
                px-5
                py-3
                rounded-xl
                font-semibold
              "
            >
              Approve
            </button>

            <button
              onClick={() =>
                handleDecision(
                  "rejected"
                )
              }
              disabled={loading}
              className="
                bg-red-500
                hover:bg-red-600
                px-5
                py-3
                rounded-xl
                font-semibold
              "
            >
              Reject
            </button>

          </div>
        )}

        {/* TIMELINE */}
        <RequestTimeline
          status={req.status}
        />

      </div>

    </div>
  );
}

export default RequestDetails;