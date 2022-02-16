import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { BiEditAlt } from "react-icons/bi";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { CgUserList } from "react-icons/cg";
import "../users/users.css";

const Users = () => {
  const [users, setUsers] = useState();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [id, setId] = useState();
  const [role_id, SetRole_id] = useState();

  const getAllUsers = () => {
    axios
      .get("/users/")
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //===========================================
  //delete user
  const handleDeleteUser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((result) => {
        getAllUsers();
      })
      .catch((err) => {});
  };

  //===========================================
  //update user role
  const handleUpdateUser = (id) => {
    axios
      .put(
        `/users/role/${id}`,
        role_id === 1 ? { role_id: 2 } : { role_id: 1 }
      )
      .then((res) => {
        getAllUsers();
      })
      .catch((err) => {});
  };

  //===========================================

  return (
    <div className="divContainerUser">
      <div className="divUserPage">
        <div className="userPage">
          <CgUserList className="userIcon" />
          <h1>Users List</h1>
        </div>
      </div>
      <div className="underLineU"></div>
      <div className="usersTable">
        {deleteStatus || updateStatus ? (
          <div className="userMessage">
            <div id="messageContainer">
              <div className="message">
                {deleteStatus ? "Delete User ?" : "Update User Role ?"}
              </div>
              <div className="messageIcons">
                <FcApprove
                  className="approve"
                  onClick={() => {
                    deleteStatus
                      ? handleDeleteUser(id)
                      : handleUpdateUser(id, role_id);
                    setUpdateStatus(false);
                    setDeleteStatus(false);
                  }}
                />
                <FcDisapprove
                  className="disApprove"
                  onClick={() => {
                    setUpdateStatus(false);
                    setDeleteStatus(false);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <table className="tableUsers">
          <tr>
            <th className="thUsers">Image</th>
            <th className="thUsers">Name</th>
            <th className="thUsers">Email</th>
            <th className="thUsers">Country</th>
            <th className="thRole">Role</th>
            <th className="thDelete"></th>
          </tr>
          {users &&
            users.map((user) => {
              return (
                <>
                  <tr className="tdUsers">
                    <td>
                      <img
                        className="userImg"
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                      />
                    </td>
                    <td>{`${user.firstName && user.firstName} ${
                      user.lastName && user.lastName
                    }`}</td>
                    <td>{user.email && user.email}</td>
                    <td>{user.country && user.country}</td>
                    <td>
                      <select className="updateSelect">
                        <option>
                          {user.role_id === 1
                            ? user.role_id + " .user "
                            : user.role_id + " .admin "}
                        </option>
                        <option>
                          {user.role_id === 1 ? "2.admin" : "1.user"}
                        </option>
                      </select>

                      <BiEditAlt
                        className="editRole"
                        onClick={() => {
                          setId(user.id);
                          SetRole_id(user.role_id);
                          setUpdateStatus(true);
                        }}
                      />
                    </td>
                    <td>
                      <TiDelete
                        className="deleteIcons"
                        onClick={() => {
                          setId(user.id);
                          setDeleteStatus(true);
                        }}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Users;
