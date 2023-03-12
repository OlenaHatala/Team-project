import useAxiosPrivate from "./useAxiosPrivate";

const API_EDIT_USER_URL = "/user/update";

const useUserApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchUser = async () => {
    try {
      const response = await axiosPrivate.get(API_GET_USER_URL, {
        headers: { "Content-Type": "application/json" },
      });
      const responseUser = response?.data?.user;
      return {
        user: {
          email: responseUser.email,
          surname: responseUser.surname,
          name: responseUser.name,
          mobileNum: responseUser.mobile_number,
        },
      };
    } catch (err) {
      let errMsg = "";
      if (!err?.response) {
        errMsg = "Server failed to send your data";
      } else if (err.response?.status === 400) {
        errMsg =
          err.response?.data?.message ||
          "Server failed to send your data. Try to sign in again";
      } else {
        errMsg = "Server failed to send your data";
      }
      return { error: errMsg };
    }
  };

  const updateUser = async ({firstname, lastname, email, number}) => {

    const userData = {
      name: firstname,
      surname: lastname,
      email: email,
      mobile_number: number,
    };

    try {
      const response = await axiosPrivate.patch(
        API_EDIT_USER_URL,
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseUser = response?.data?.user;

      console.log(responseUser)

      return {
        user: {
          email: responseUser.email,
          surname: responseUser.surname,
          name: responseUser.name,
          mobileNum: responseUser.mobile_number,
        },
      };
    } catch (err) {
      let errMsg = "";
      if (!err?.response) {
        errMsg = "No Server Response";
      } else if (err.response?.status === 409) {
        errMsg = err.response?.data?.message || "Changing data failed";
      } else if (err.response?.status === 400) {
        errMsg = err.response?.data?.message || "Invalid Entry";
      } else {
        errMsg = "Changing data failed";
      }
      return { error: errMsg };
    }
  };

  return { fetchUser, updateUser };
};

export default useUserApi;
