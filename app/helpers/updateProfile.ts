

// const backendURL = "https://be-travel-go.vercel.app";
const backendURL = "/api/v1/updateUser";

interface updateFormData {
    data : {
        username: string;
        email: string;
        password: string;
    }
}

export const updateProfileHandle = async ({
    data,
    }: updateFormData
) => {

    const response = await fetch(`${backendURL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("asahOtak_UD348")}`,
      },
      body: JSON.stringify(data),
    });
  
    const dataRes = await response.json();
    console.log("Data Res : ", dataRes);
    
    return {
      error: dataRes.error || false,
      message: dataRes.message,
    };

};
