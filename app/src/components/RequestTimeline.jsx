const steps = [
  { key: "pending", label: "Request Created" },
  { key: "pickup_assigned", label: "Agent Assigned" },
  { key: "picked", label: "Picked Up" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered_to_shop", label: "Arrived at Shop" },
  { key: "diagnosed", label: "Diagnosed" },
  { key: "approved", label: "Approved" },
  { key: "repair_in_progress", label: "Repair Started" },
  { key: "repaired", label: "Repaired" },
  { key: "return_assigned", label: "Return Agent Assigned" },
  { key: "returning", label: "Returning to Customer" },
  { key: "completed", label: "Completed" }
];

function RequestTimeline({ status }) {

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="mt-8 relative">

      {steps.map((step, index) => {

        const active = index <= currentIndex;

        return (
          <div
            key={step.key}
            className="flex items-start relative pb-8"
          >

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-[11px] top-5 w-[2px] h-full ${
                  active
                    ? "bg-green-400"
                    : "bg-gray-600"
                }`}
              />
            )}

            {/* DOT */}
            <div
              className={`w-6 h-6 rounded-full z-10 border-4 ${
                active
                  ? "bg-green-400 border-green-300 shadow-lg shadow-green-500/40"
                  : "bg-gray-600 border-gray-500"
              }`}
            />

            {/* TEXT */}
            <div className="ml-4">

              <p
                className={`font-medium ${
                  active
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </p>

              {active && index === currentIndex && (
                <p className="text-green-400 text-sm">
                  Current Status
                </p>
              )}

            </div>

          </div>
        );
      })}
    </div>
  );
}

export default RequestTimeline;