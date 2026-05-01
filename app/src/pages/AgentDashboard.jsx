import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AgentDashboard() {

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);

  const [showProfile, setShowProfile] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res =
        await API.get("/agent/tasks");

      setTasks(res.data);

    } catch (err) {

      console.error(err);
    }
  };


  useEffect(() => {

    fetchTasks();

  }, []);


  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate("/");
  };


  // CHANGE PASSWORD
  const handleChangePassword = async () => {

    try {

      if (!oldPassword || !newPassword) {

        alert("Fill all fields");

        return;
      }

      setPasswordLoading(true);

      const res = await API.post(
        "/agent/changepassword",
        {
          oldPassword,
          newPassword
        }
      );

      alert(res.data.message);

      setShowPasswordModal(false);

      setOldPassword("");

      setNewPassword("");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.msg ||
        "Failed to change password"
      );

    } finally {

      setPasswordLoading(false);
    }
  };


  // UPDATE STATUS
  const updateStatus = async (
    requestId,
    status
  ) => {

    try {

      await API.post(
        "/agent/updatestatus",
        {
          requestId,
          status
        }
      );

      fetchTasks();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.msg ||
        "Failed"
      );
    }
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-black to-[#020617] text-white relative overflow-hidden">

      {/* OVERLAY */}
      {showProfile && (
        <div
          className="
            fixed
            inset-0
            bg-black/30
            backdrop-blur-sm
            z-[100]
          "
          onClick={() => setShowProfile(false)}
        />
      )}


      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />


      {/* HEADER */}
      <div className="relative z-[200] flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 px-6 md:px-10 pt-10">

        {/* LOGO */}
        <div>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-300 to-pink-500 bg-clip-text text-transparent">
            AGENT PANEL
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Delivery & Pickup Management
          </p>

        </div>


        {/* PROFILE */}
        <div className="relative">

          {/* PROFILE BUTTON */}
          <button
            type="button"
            onClick={() =>
              setShowProfile(!showProfile)
            }
            className="
              w-16 h-16
              rounded-full
              bg-gradient-to-br
              from-indigo-500
              to-purple-500
              flex
              items-center
              justify-center
              text-2xl
              font-bold
              shadow-2xl
              relative
              z-[300]
            "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </button>


          {/* PROFILE CARD */}
          {showProfile && (

            <div
              className="
                absolute
                top-20
                right-0
                w-[340px]
                rounded-3xl
                overflow-hidden
                border
                border-white/10
                bg-[#0f172a]
                shadow-2xl
                z-[300]
              "
            >

              {/* TOP */}
              <div className="p-6 border-b border-white/10">

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-20 h-20
                      rounded-3xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-pink-500
                      flex
                      items-center
                      justify-center
                      text-4xl
                      font-bold
                    "
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>

                    <h2 className="text-3xl font-bold">
                      {user?.name}
                    </h2>

                    <p className="text-gray-400 capitalize">
                      {user?.role}
                    </p>

                  </div>

                </div>

              </div>


              {/* ACTIONS */}
              <div className="p-5 space-y-4">

                {/* CHANGE PASSWORD */}
                <button
                  type="button"
                  onClick={() => {

                    setShowPasswordModal(true);

                    setShowProfile(false);
                  }}
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    hover:bg-white/20
                    transition
                    text-left
                  "
                >

                  <p className="font-semibold">
                    Change Password
                  </p>

                  <p className="text-sm text-gray-400">
                    Update your password
                  </p>

                </button>


                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    bg-red-500/10
                    border
                    border-red-500/20
                    hover:bg-red-500/20
                    transition
                    text-left
                  "
                >

                  <p className="font-semibold text-red-300">
                    Logout
                  </p>

                  <p className="text-sm text-red-200/60">
                    Sign out from account
                  </p>

                </button>

              </div>

            </div>
          )}

        </div>

      </div>


      {/* TASKS */}
      <div className="relative z-[1] px-6 md:px-10 pb-16 mt-12">

        {tasks.length === 0 ? (

          <div className="text-center text-gray-400 text-xl mt-20">
            No Tasks Assigned
          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  shadow-xl
                "
              >

                {/* TITLE */}
                <h2 className="text-2xl font-bold">
                  {task.description}
                </h2>

                <p className="text-gray-400 mt-2 capitalize">
                  Status: {task.status}
                </p>


                {/* ACTION BUTTONS */}
                <div className="mt-6 flex flex-wrap gap-4">

                  {task.status ===
                    "pickup_assigned" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "picked"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-blue-500
                        font-semibold
                      "
                    >
                      Mark Picked
                    </button>
                  )}


                  {task.status ===
                    "picked" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "in_transit"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-yellow-500
                        font-semibold
                      "
                    >
                      In Transit
                    </button>
                  )}


                  {task.status ===
                    "in_transit" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "delivered_to_shop"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-green-500
                        font-semibold
                      "
                    >
                      Delivered To Shop
                    </button>
                  )}


                  {task.status ===
                    "return_assigned" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "returning"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-orange-500
                        font-semibold
                      "
                    >
                      Returning
                    </button>
                  )}


                  {task.status ===
                    "returning" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "completed"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-green-600
                        font-semibold
                      "
                    >
                      Complete Delivery
                    </button>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>


      {/* PASSWORD MODAL */}
      {showPasswordModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-[9999]
            px-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#0f172a]
              p-8
              shadow-2xl
            "
          >

            <h2 className="text-3xl font-bold mb-6">
              Change Password
            </h2>


            {/* OLD PASSWORD */}
            <div className="mb-4">

              <label className="block mb-2 text-sm text-gray-400">
                Old Password
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
                placeholder="Enter old password"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  outline-none
                "
              />

            </div>


            {/* NEW PASSWORD */}
            <div className="mb-6">

              <label className="block mb-2 text-sm text-gray-400">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  outline-none
                "
              />

            </div>


            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={passwordLoading}
                className="
                  flex-1
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-pink-500
                  font-semibold
                "
              >
                {passwordLoading
                  ? "Updating..."
                  : "Update Password"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowPasswordModal(false)
                }
                className="
                  px-6
                  rounded-2xl
                  bg-white/10
                "
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AgentDashboard;